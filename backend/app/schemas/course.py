from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class CourseBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: Optional[str] = None
    category: Optional[str] = None
    is_free: bool = True
    price: Optional[float] = Field(None, ge=0)
    thumbnail_url: Optional[str] = None


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    description: Optional[str] = None
    category: Optional[str] = None
    is_free: Optional[bool] = None
    price: Optional[float] = Field(None, ge=0)
    is_published: Optional[bool] = None
    thumbnail_url: Optional[str] = None


class CourseResponse(CourseBase):
    id: str
    instructor_id: str
    is_published: bool
    created_at: datetime
    updated_at: datetime
    video_count: int = 0
    instructor_name: Optional[str] = None
    instructor_avatar: Optional[str] = None
    
    class Config:
        from_attributes = True


class CourseListResponse(BaseModel):
    courses: list[CourseResponse]
    total: int
    page: int
    page_size: int


# Video Schemas
class VideoBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: Optional[str] = None
    video_url: str
    thumbnail_url: Optional[str] = None
    duration: Optional[int] = None
    order_index: int = 0


class VideoCreate(VideoBase):
    course_id: str


class VideoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    description: Optional[str] = None
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    duration: Optional[int] = None
    order_index: Optional[int] = None
    is_published: Optional[bool] = None


class VideoResponse(VideoBase):
    id: str
    course_id: str
    is_published: bool
    created_at: datetime
    updated_at: datetime
    like_count: Optional[int] = 0
    is_liked: bool = False
    
    class Config:
        from_attributes = True
