from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID
from app.models.user import UserType


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    user_type: UserType


class UserCreate(UserBase):
    google_id: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None


class UserResponse(UserBase):
    id: str
    google_id: Optional[str]
    profile_image: Optional[str]
    bio: Optional[str]
    created_at: datetime
    is_active: bool
    
    class Config:
        from_attributes = True


class PublicUserResponse(BaseModel):
    id: str
    full_name: Optional[str] = None
    user_type: UserType
    profile_image: Optional[str]
    bio: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


class GoogleAuthRequest(BaseModel):
    code: str
    user_type: UserType
    redirect_uri: Optional[str] = None

