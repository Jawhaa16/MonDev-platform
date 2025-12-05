from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, func
from app.database import get_db
from app.models.course import Course
from app.models.user import User
from app.schemas.course import CourseListResponse, CourseResponse
from typing import Optional

router = APIRouter()


@router.get("/", response_model=CourseListResponse)
async def search_courses(
    q: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    is_free: Optional[bool] = None,
    sort_by: str = "created_at",
    page: int = 1,
    page_size: int = 20,
    db: AsyncSession = Depends(get_db)
):
    """
    Advanced search for courses.
    
    Search query (q) searches in title and description.
    """
    
    query = select(Course, User).join(User, Course.instructor_id == User.id).where(Course.is_published == True)
    
    # Text search
    if q:
        search_term = f"%{q}%"
        query = query.where(
            or_(
                Course.title.ilike(search_term),
                Course.description.ilike(search_term)
            )
        )
    
    # Filters
    if category:
        query = query.where(Course.category == category)
    
    if is_free is not None:
        query = query.where(Course.is_free == is_free)
    else:
        # Price filters only apply to paid courses
        if min_price is not None:
            query = query.where(Course.price >= min_price)
        if max_price is not None:
            query = query.where(Course.price <= max_price)
    
    # Sorting
    if sort_by == "price_asc":
        query = query.order_by(Course.price.asc())
    elif sort_by == "price_desc":
        query = query.order_by(Course.price.desc())
    elif sort_by == "title":
        query = query.order_by(Course.title.asc())
    else:  # default: created_at (newest first)
        query = query.order_by(Course.created_at.desc())
    
    # Count total results
    count_query = select(func.count()).select_from(query.subquery())
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
        
        course_resp = CourseResponse.from_orm(course)
        course_resp.instructor_name = instructor.full_name
        course_resp.instructor_avatar = instructor.profile_image
        courses_response.append(course_resp)
    
    return CourseListResponse(
        courses=courses_response,
        total=total,
        page=page,
        page_size=page_size
    )
