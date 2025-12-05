from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import User
from app.models.course import Course
from app.models.payment import Purchase, PaymentStatus
from app.schemas.payment import PurchaseCreate, PurchaseResponse, QPayInvoiceResponse, PaymentWebhook
from app.routers.auth import get_current_user
from app.config import settings
from decimal import Decimal
import httpx
from uuid import UUID

router = APIRouter()


class QPayService:
    """QPay payment integration service."""
    
    def __init__(self):
        self.base_url = settings.QPAY_API_URL
        self.username = settings.QPAY_USERNAME
        self.password = settings.QPAY_PASSWORD
        self.invoice_code = settings.QPAY_INVOICE_CODE
    
    async def get_access_token(self) -> str:
        """Get QPay access token."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/auth/token",
                headers={"Authorization": f"Basic {self.username}:{self.password}"}
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to authenticate with QPay"
                )
            
            return response.json()["access_token"]
    
    async def create_invoice(self, amount: Decimal, description: str, purchase_id: str):
        """Create QPay invoice."""
        access_token = await self.get_access_token()
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/invoice",
                json={
                    "invoice_code": self.invoice_code,
                    "sender_invoice_no": f"COURSE_{purchase_id}",
                    "invoice_receiver_code": "terminal",
                    "invoice_description": description,
                    "amount": float(amount),
                    "callback_url": f"{settings.BACKEND_URL}/api/payments/webhook"
                },
                headers={"Authorization": f"Bearer {access_token}"}
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to create QPay invoice"
                )
            
            return response.json()


qpay_service = QPayService()


@router.post("/create-invoice", response_model=dict)
async def create_payment_invoice(
    purchase_data: PurchaseCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create payment invoice for course purchase."""
    
    # Get course
    result = await db.execute(select(Course).where(Course.id == purchase_data.course_id))
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    if course.is_free:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This course is free"
        )
    
    # Check if already purchased
    existing_purchase = await db.execute(
        select(Purchase).where(
            Purchase.user_id == current_user.id,
            Purchase.course_id == course.id,
            Purchase.payment_status == PaymentStatus.COMPLETED
        )
    )
    if existing_purchase.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already purchased this course"
        )
    
    # Calculate fees
    platform_fee = course.price * Decimal(settings.PLATFORM_FEE_PERCENT) / 100
    instructor_amount = course.price - platform_fee
    
    # Create purchase record
    purchase = Purchase(
        user_id=current_user.id,
        course_id=course.id,
        amount=course.price,
        platform_fee=platform_fee,
        instructor_amount=instructor_amount,
        payment_status=PaymentStatus.PENDING
    )
    
    db.add(purchase)
    await db.commit()
    await db.refresh(purchase)
    
    # Create QPay invoice
    try:
        invoice_data = await qpay_service.create_invoice(
            amount=course.price,
            description=f"MonDev.mn - {course.title}",
            purchase_id=str(purchase.id)
        )
        
        # Update purchase with invoice ID
        purchase.qpay_invoice_id = invoice_data.get("invoice_id")
        await db.commit()
        
        return {
            "purchase_id": str(purchase.id),
            "qpay_data": invoice_data
        }
    
    except Exception as e:
        # If QPay fails, delete the purchase record
        await db.delete(purchase)
        await db.commit()
        raise e


@router.post("/webhook")
async def payment_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """Handle QPay payment webhook."""
    
    data = await request.json()
    
    # Extract invoice ID
    invoice_id = data.get("invoice_id")
    payment_id = data.get("payment_id")
    
    if not invoice_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid webhook data"
        )
    
    # Find purchase
    result = await db.execute(
        select(Purchase).where(Purchase.qpay_invoice_id == invoice_id)
    )
    purchase = result.scalar_one_or_none()
    
    if not purchase:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Purchase not found"
        )
    
    # Update purchase status
    purchase.payment_status = PaymentStatus.COMPLETED
    purchase.qpay_payment_id = payment_id
    
    await db.commit()
    
    return {"status": "success"}


@router.get("/history", response_model=list[PurchaseResponse])
async def get_payment_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's payment history."""
    
    result = await db.execute(
        select(Purchase)
        .where(Purchase.user_id == current_user.id)
        .order_by(Purchase.purchased_at.desc())
    )
    purchases = result.scalars().all()
    
    return [PurchaseResponse.from_orm(p) for p in purchases]


@router.get("/check-access/{course_id}")
async def check_course_access(
    course_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Check if user has access to a course."""
    
    # Get course
    result = await db.execute(select(Course).where(Course.id == str(course_id)))
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Free courses are accessible to everyone
    if course.is_free:
        return {"has_access": True, "reason": "free_course"}
    
    # Check if user is the instructor
    if course.instructor_id == current_user.id:
        return {"has_access": True, "reason": "instructor"}
    
    # Check if purchased
    purchase_result = await db.execute(
        select(Purchase).where(
            Purchase.user_id == current_user.id,
            Purchase.course_id == course_id,
            Purchase.payment_status == PaymentStatus.COMPLETED
        )
    )
    purchase = purchase_result.scalar_one_or_none()
    
    if purchase:
        return {"has_access": True, "reason": "purchased"}
    
    return {"has_access": False}
