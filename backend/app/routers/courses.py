from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.user import User, UserType
from app.models.course import Course
from app.models.video import Video
from app.schemas.course import CourseCreate, CourseUpdate, CourseResponse, CourseListResponse
from app.routers.auth import get_current_user
from typing import Optional
from uuid import UUID

router = APIRouter()


@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_course(
    course_data: CourseCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new course (instructors only)."""
    
    if current_user.user_type != UserType.INSTRUCTOR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only instructors can create courses"
        )
    
    # Validate price
    if not course_data.is_free and (course_data.price is None or course_data.price <= 0):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Price must be set for paid courses"
        )
    
    course = Course(
        instructor_id=current_user.id,
        **course_data.model_dump()
    )
    
    db.add(course)
    await db.commit()
    await db.refresh(course)
    
    return CourseResponse.from_orm(course)


@router.get("/", response_model=CourseListResponse)
async def list_courses(
    page: int = 1,
    page_size: int = 20,
    category: Optional[str] = None,
    is_free: Optional[bool] = None,
    instructor_id: Optional[UUID] = None,
    db: AsyncSession = Depends(get_db)
):
    """List all published courses with pagination."""
    
    query = select(Course).where(Course.is_published == True)
    
    if category:
        query = query.where(Course.category == category)
    if is_free is not None:
        query = query.where(Course.is_free == is_free)
    if instructor_id:
        query = query.where(Course.instructor_id == instructor_id)
    
    # Count total
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_query)
    total = total_result.scalar()
    
    # Pagination
    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    courses = result.scalars().all()
    
    return CourseListResponse(
        courses=[CourseResponse.from_orm(c) for c in courses],
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/{course_id}", response_model=CourseResponse)
async def get_course(
    course_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Get course details."""
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    return CourseResponse.from_orm(course)


@router.put("/{course_id}", response_model=CourseResponse)
async def update_course(
    course_id: UUID,
    course_update: CourseUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update course (instructor only)."""
    
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    if course.instructor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own courses"
        )
    
    # Update fields
    update_data = course_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(course, field, value)
    
    await db.commit()
    await db.refresh(course)
    
    return CourseResponse.from_orm(course)


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(
    course_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete course (instructor only)."""
    
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    if course.instructor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own courses"
        )
    
    await db.delete(course)
    await db.commit()
