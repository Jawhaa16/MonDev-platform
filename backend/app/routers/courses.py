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
    
    print(f"Created Course: {course.title}, ID: {course.id}, Instructor: {course.instructor_id}")
    
    return CourseResponse.from_orm(course)


@router.get("/", response_model=CourseListResponse)
async def list_courses(
    page: int = 1,
    page_size: int = 20,
    category: Optional[str] = None,
    is_free: Optional[bool] = None,
    instructor_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """List all published courses with pagination."""
    
    # Subquery to count videos
    video_count_subquery = (
        select(func.count(Video.id))
        .where(Video.course_id == Course.id)
        .correlate(Course)
        .scalar_subquery()
    )

    query = select(Course, User, video_count_subquery.label("video_count")).join(User, Course.instructor_id == User.id)
    
    # Only filter by published if not filtering by specific instructor
    # This allows instructors to see their own draft courses
    if not instructor_id:
        query = query.where(Course.is_published == True)
    
    if category:
        query = query.where(Course.category == category)
    if is_free is not None:
        query = query.where(Course.is_free == is_free)
    if instructor_id:
        query = query.where(Course.instructor_id == str(instructor_id))
    
    # Count total
    # For count query we need to be careful with the subquery
    count_query = select(func.count()).select_from(Course)
    if not instructor_id:
        count_query = count_query.where(Course.is_published == True)
    if category:
        count_query = count_query.where(Course.category == category)
    if is_free is not None:
        count_query = count_query.where(Course.is_free == is_free)
    if instructor_id:
        count_query = count_query.where(Course.instructor_id == str(instructor_id))

    total_result = await db.execute(count_query)
    total = total_result.scalar()
    
    # Pagination
    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    rows = result.all()
    
    courses_response = []
    for row in rows:
        course = row[0]
        instructor = row[1]
        video_count = row[2]
        
        course_resp = CourseResponse.from_orm(course)
        course_resp.video_count = video_count or 0
        course_resp.instructor_name = instructor.full_name
        course_resp.instructor_avatar = instructor.profile_image
        courses_response.append(course_resp)
    
    return CourseListResponse(
        courses=courses_response,
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
    result = await db.execute(
        select(Course, User)
        .join(User, Course.instructor_id == User.id)
        .where(Course.id == str(course_id))
    )
    row = result.first()
    
    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    course, instructor = row
    
    # Count videos
    video_count_result = await db.execute(
        select(func.count()).where(Video.course_id == str(course_id))
    )
    video_count = video_count_result.scalar()
    
    course_response = CourseResponse.from_orm(course)
    course_response.video_count = video_count
    course_response.instructor_name = instructor.full_name
    course_response.instructor_avatar = instructor.profile_image
    
    return course_response


@router.put("/{course_id}", response_model=CourseResponse)
async def update_course(
    course_id: UUID,
    course_update: CourseUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update course (instructor only)."""
    
    result = await db.execute(select(Course).where(Course.id == str(course_id)))
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
    
    result = await db.execute(select(Course).where(Course.id == str(course_id)))
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


@router.get("/{course_id}/videos")
async def get_course_videos(
    course_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Get all videos for a course."""
    from app.schemas.course import VideoResponse
    
    result = await db.execute(
        select(Video).where(Video.course_id == str(course_id)).order_by(Video.order_index)
    )
    videos = result.scalars().all()
    
    return {"videos": [VideoResponse.from_orm(video) for video in videos]}
