from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from authlib.integrations.starlette_client import OAuth
from app.database import get_db
from app.models.user import User, UserType
from app.schemas.user import UserCreate, UserResponse, TokenResponse, GoogleAuthRequest
from app.utils.security import create_access_token, create_refresh_token, verify_token
from app.config import settings
import httpx
from typing import Optional

router = APIRouter()
security = HTTPBearer()

# OAuth setup
oauth = OAuth()
oauth.register(
    name='google',
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """Get current authenticated user from JWT token."""
    token = credentials.credentials
    payload = verify_token(token)
    
    if not payload or payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    return user


security_optional = HTTPBearer(auto_error=False)

async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_optional),
    db: AsyncSession = Depends(get_db)
) -> Optional[User]:
    """Get current authenticated user from JWT token if present."""
    if not credentials:
        return None
        
    token = credentials.credentials
    try:
        payload = verify_token(token)
        if not payload or payload.get("type") != "access":
            return None
            
        user_id = payload.get("sub")
        if not user_id:
            return None
            
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        
        if not user or not user.is_active:
            return None
            
        return user
    except Exception:
        return None


@router.post("/google/callback", response_model=TokenResponse)
async def google_callback(
    auth_data: GoogleAuthRequest,
    db: AsyncSession = Depends(get_db)
):
    """Handle Google OAuth callback and create/login user."""
    print(f"Received Google Callback with code: {auth_data.code[:10]}...")
    print(f"Using Redirect URI: {settings.GOOGLE_REDIRECT_URI}")
    
    # Exchange authorization code for tokens
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            'https://oauth2.googleapis.com/token',
            data={
                'code': auth_data.code,
                'client_id': settings.GOOGLE_CLIENT_ID,
                'client_secret': settings.GOOGLE_CLIENT_SECRET,
                'redirect_uri': settings.GOOGLE_REDIRECT_URI,
                'grant_type': 'authorization_code'
            }
        )
        
        if token_response.status_code != 200:
            print(f"Google Token Error Status: {token_response.status_code}")
            print(f"Google Token Error Body: {token_response.text}")
            print(f"Sent Redirect URI: {settings.GOOGLE_REDIRECT_URI}")
            print(f"Sent Client ID: {settings.GOOGLE_CLIENT_ID}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to get access token from Google: {token_response.text}"
            )
        
        tokens = token_response.json()
        access_token = tokens.get('access_token')
        
        # Get user info from Google
        userinfo_response = await client.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            headers={'Authorization': f'Bearer {access_token}'}
        )
        
        if userinfo_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to get user info from Google"
            )
        
        user_info = userinfo_response.json()
    
    # Check if user exists
    result = await db.execute(
        select(User).where(User.google_id == user_info['id'])
    )
    user = result.scalar_one_or_none()
    
    if not user:
        # Create new user
        user = User(
            email=user_info['email'],
            google_id=user_info['id'],
            full_name=user_info.get('name'),
            profile_image=user_info.get('picture'),
            user_type=auth_data.user_type,
            is_active=True
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    
    # Generate JWT tokens
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.from_orm(user)
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user info."""
    return UserResponse.from_orm(current_user)


@router.post("/refresh", response_model=dict)
async def refresh_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
):
    """Refresh access token using refresh token."""
    token = credentials.credentials
    payload = verify_token(token)
    
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    user_id = payload.get("sub")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Create new access token
    new_access_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }
