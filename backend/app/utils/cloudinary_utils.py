import cloudinary
import cloudinary.uploader
from app.config import settings

# Configure Cloudinary
cloudinary.config( 
  cloud_name = settings.CLOUDINARY_CLOUD_NAME, 
  api_key = settings.CLOUDINARY_API_KEY, 
  api_secret = settings.CLOUDINARY_API_SECRET,
  secure = True
)

async def upload_file_to_cloudinary(file, folder: str, resource_type: str = "auto") -> dict:
    """
    Uploads a file to Cloudinary.
    
    Args:
        file: The file object to upload (from UploadFile).
        folder: The folder in Cloudinary to store the file (e.g., "mondev/images").
        resource_type: "image", "video", or "auto".
        
    Returns:
        dict: The result from Cloudinary including 'secure_url' and 'public_id'.
    """
    try:
        # Cloudinary expects a file-like object or path. 
        # file.file is a SpooledTemporaryFile which works.
        response = cloudinary.uploader.upload(
            file.file,
            folder=folder,
            resource_type=resource_type
        )
        return response
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None

def delete_file_from_cloudinary(public_id: str, resource_type: str = "image"):
    """
    Deletes a file from Cloudinary.
    """
    try:
        cloudinary.uploader.destroy(public_id, resource_type=resource_type)
        return True
    except Exception as e:
        print(f"Cloudinary delete error: {e}")
        return False
