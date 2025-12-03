from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID
from decimal import Decimal
from app.models.payment import PaymentStatus


class PurchaseCreate(BaseModel):
    course_id: UUID


class PurchaseResponse(BaseModel):
    id: UUID
    user_id: UUID
    course_id: UUID
    amount: Decimal
    platform_fee: Optional[Decimal]
    instructor_amount: Optional[Decimal]
    payment_status: PaymentStatus
    qpay_invoice_id: Optional[str]
    purchased_at: datetime
    paid_to_instructor_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class QPayInvoiceResponse(BaseModel):
    invoice_id: str
    qr_text: str
    qr_image: str
    urls: list


class PaymentWebhook(BaseModel):
    object_type: str
    object_id: str
    payment_id: str
    invoice_id: str
