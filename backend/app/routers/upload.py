from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from app.routers.auth import get_current_user
from app.models.user import User
from typing import List, Optional
import shutil
import os
from pathlib import Path
import uuid
from app.config import settings
from app.utils.cloudinary_utils import upload_file_to_cloudinary, delete_file_from_cloudinary

router = APIRouter()

# Allowed file extensions
ALLOWED_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.jfif', '.pjpeg', '.pjp'}
ALLOWED_VIDEO_EXTENSIONS = {'.mp4', '.webm', '.mov', '.avi'}

def get_file_extension(filename: str) -> str:
    return Path(filename).suffix.lower()

def is_allowed_file(filename: str, allowed_extensions: set) -> bool:
    return get_file_extension(filename) in allowed_extensions


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Upload an image (thumbnail for course or video) to Cloudinary."""
    
    if not is_allowed_file(file.filename, ALLOWED_IMAGE_EXTENSIONS):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_IMAGE_EXTENSIONS)}"
        )
    
    # Upload to Cloudinary
    # Folder structure: mondev/images
    result = await upload_file_to_cloudinary(file, folder="mondev/images", resource_type="image")
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload image to Cloudinary"
        )
    
    # Return URL and public_id (as filename for compatibility)
    return {
        "url": result.get("secure_url"), 
        "filename": result.get("public_id") # e.g., "mondev/images/xyz123"
    }


@router.post("/video")
async def upload_video(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Upload a video file to Cloudinary."""
    
    if not is_allowed_file(file.filename, ALLOWED_VIDEO_EXTENSIONS):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_VIDEO_EXTENSIONS)}"
        )
    
    # Upload to Cloudinary
    # Folder structure: mondev/videos
    # Note: Video upload might take time. Cloudinary supports large files.
    result = await upload_file_to_cloudinary(file, folder="mondev/videos", resource_type="video")
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload video to Cloudinary"
        )
    
    return {
        "url": result.get("secure_url"), 
        "filename": result.get("public_id")
    }


@router.delete("/{filename:path}")
async def delete_file(
    filename: str,
    resource_type: str = "image", # Default to image, but might need to specifying video
    current_user: User = Depends(get_current_user)
):
    """
    Delete an uploaded file from Cloudinary.
    Filename should be the public_id (e.g., 'mondev/images/xyz').
    """
    
    # Determine resource type based on likely folder name if possible, 
    # or rely on frontend to pass it? 
    # Current frontend likely passes just the filename from the upload response.
    # If the upload response returned "mondev/images/xyz", that's what we get here.
    
    actual_resource_type = "image"
    if "videos" in filename:
        actual_resource_type = "video"
        
    result = delete_file_from_cloudinary(filename, resource_type=actual_resource_type)
    
    if result:
        return {"message": "File deleted successfully"}
    else:
         raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete file from Cloudinary"
        )

