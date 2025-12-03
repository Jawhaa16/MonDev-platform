# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for MonDev.mn.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Enter project name: `MonDev`
4. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: MonDev.mn
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue"
   - Scopes: Add `email`, `profile`, `openid`
   - Click "Save and Continue"
   - Test users: Add your Gmail address
   - Click "Save and Continue"

4. Create OAuth Client ID:
   - Application type: Web application
   - Name: MonDev Frontend
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://localhost:8000`
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback`
   - Click "Create"

5. **Copy your Client ID and Client Secret** - you'll need these!

## Step 4: Configure Environment Variables

### Frontend (.env.local)

Create `frontend/.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

Replace `YOUR_CLIENT_ID_HERE` with your actual Google Client ID.

### Backend (.env)

Create `backend/.env` file:

```env
# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/mondev

# JWT Settings
SECRET_KEY=your-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Google OAuth2
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

# Application Settings
APP_NAME=MonDev.mn
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development

# CORS
CORS_ORIGINS=["http://localhost:3000"]

# File Upload
MAX_FILE_SIZE=524288000
UPLOAD_DIR=./uploads

# Platform Fee
PLATFORM_FEE_PERCENT=15
```

Replace:
- `YOUR_CLIENT_ID_HERE` with your Google Client ID
- `YOUR_CLIENT_SECRET_HERE` with your Google Client Secret
- `your-secret-key-here-change-this-in-production` with a random secure string

## Step 5: Restart Servers

After creating the `.env` files:

```bash
# Stop the frontend (Ctrl+C in the terminal)
# Restart it
cd frontend
npm run dev

# In another terminal, start the backend
cd backend
uvicorn app.main:app --reload
```

## Step 6: Test OAuth Flow

1. Open http://localhost:3000/login
2. Click "Google-ээр нэвтрэх"
3. You should be redirected to Google's consent screen
4. After granting permission, you'll be redirected back to the app
5. You should be logged in!

## Troubleshooting

### Error 401: invalid_client
- Double-check your Client ID in both `.env.local` and `.env`
- Make sure the redirect URI in Google Cloud Console matches exactly: `http://localhost:3000/auth/callback`

### Error 400: redirect_uri_mismatch
- The redirect URI in your code doesn't match what's configured in Google Cloud Console
- Add `http://localhost:3000/auth/callback` to Authorized redirect URIs

### Can't find .env files
- Make sure you created them in the correct directories:
  - `frontend/.env.local` (not `frontend/.env`)
  - `backend/.env`
- Restart your development servers after creating the files
