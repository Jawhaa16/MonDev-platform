from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import User, UserType
from app.schemas.user import UserResponse, UserUpdate
from app.routers.auth import get_current_user
from typing import List
from uuid import UUID

router = APIRouter()


@router.get("/instructors", response_model=List[UserResponse])
async def get_instructors(
    db: AsyncSession = Depends(get_db)
):
    """Get all instructors."""
    result = await db.execute(
        select(User).where(User.user_type == UserType.INSTRUCTOR, User.is_active == True)
    )
    instructors = result.scalars().all()
    
    return [UserResponse.from_orm(instructor) for instructor in instructors]


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Get user by ID."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse.from_orm(user)


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update current user's profile."""
    
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    if user_update.bio is not None:
        current_user.bio = user_update.bio
    if user_update.profile_image is not None:
        current_user.profile_image = user_update.profile_image
    
    await db.commit()
    await db.refresh(current_user)
    
    return UserResponse.from_orm(current_user)
