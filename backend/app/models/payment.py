from sqlalchemy import Column, String, DateTime, ForeignKey, DECIMAL, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base
import uuid
import enum


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    REFUNDED = "refunded"
    FAILED = "failed"


class Purchase(Base):
    __tablename__ = "purchases"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    course_id = Column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    platform_fee = Column(DECIMAL(10, 2), nullable=True)
    instructor_amount = Column(DECIMAL(10, 2), nullable=True)
    payment_status = Column(SQLEnum(PaymentStatus), default=PaymentStatus.PENDING)
    qpay_invoice_id = Column(String(255), nullable=True)
    qpay_payment_id = Column(String(255), nullable=True)
    purchased_at = Column(DateTime(timezone=True), server_default=func.now())
    paid_to_instructor_at = Column(DateTime(timezone=True), nullable=True)
    
    def __repr__(self):
        return f"<Purchase {self.id}>"
