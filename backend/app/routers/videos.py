from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.user import User
from app.models.course import Course
from app.models.video import Video
from app.models.interaction import Like
from app.schemas.course import VideoCreate, VideoUpdate, VideoResponse
from app.routers.auth import get_current_user
from uuid import UUID
import aiofiles
import os
from app.config import settings

router = APIRouter()


@router.post("/", response_model=VideoResponse, status_code=status.HTTP_201_CREATED)
async def create_video(
    video_data: VideoCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new video for a course."""
    
    # Check if course exists and belongs to current user
    result = await db.execute(select(Course).where(Course.id == video_data.course_id))
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    if course.instructor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only add videos to your own courses"
        )
    
    video = Video(**video_data.model_dump())
    db.add(video)
    await db.commit()
    await db.refresh(video)
    
    return VideoResponse.from_orm(video)


@router.get("/{video_id}", response_model=VideoResponse)
async def get_video(
    video_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Get video details."""
    result = await db.execute(select(Video).where(Video.id == video_id))
    video = result.scalar_one_or_none()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    # Get like count
    like_count_result = await db.execute(
        select(func.count()).where(Like.video_id == video_id)
    )
    like_count = like_count_result.scalar()
    
    video_response = VideoResponse.from_orm(video)
    video_response.like_count = like_count
    
    return video_response


@router.post("/{video_id}/like", status_code=status.HTTP_201_CREATED)
async def like_video(
    video_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Like a video."""
    
    # Check if video exists
    result = await db.execute(select(Video).where(Video.id == video_id))
    video = result.scalar_one_or_none()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    # Check if already liked
    like_result = await db.execute(
        select(Like).where(
            Like.user_id == current_user.id,
            Like.video_id == video_id
        )
    )
    existing_like = like_result.scalar_one_or_none()
    
    if existing_like:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already liked this video"
        )
    
    like = Like(user_id=current_user.id, video_id=video_id)
    db.add(like)
    await db.commit()
    
    return {"message": "Video liked successfully"}


@router.delete("/{video_id}/unlike", status_code=status.HTTP_204_NO_CONTENT)
async def unlike_video(
    video_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Unlike a video."""
    
    result = await db.execute(
        select(Like).where(
            Like.user_id == current_user.id,
            Like.video_id == video_id
        )
    )
    like = result.scalar_one_or_none()
    
    if not like:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Like not found"
        )
    
    await db.delete(like)
    await db.commit()


@router.delete("/{video_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_video(
    video_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete video (instructor only)."""
    
    result = await db.execute(select(Video).where(Video.id == video_id))
    video = result.scalar_one_or_none()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    # Check if user owns the course
    course_result = await db.execute(select(Course).where(Course.id == video.course_id))
    course = course_result.scalar_one_or_none()
    
    if course.instructor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete videos from your own courses"
        )
    
    await db.delete(video)
    await db.commit()
