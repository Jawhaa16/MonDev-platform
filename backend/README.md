# MonDev.mn Backend

MonDev.mn сургалтын платформын Backend API (FastAPI)

## Features

- 🔐 Google OAuth2 нэвтрэлт
- 👥 Хоёр төрлийн хэрэглэгч (Суралцагч / Багш)
- 📚 Хичээл болон видео удирдлага
- 💳 QPay төлбөрийн систем
- 🔍 Өргөн хайлтын систем
- ❤️ Like, Subscribe, Comment
- 🎯 Аюулгүй байдал (JWT, CORS, Rate limiting)

## Installation

```bash
# Virtual environment үүсгэх
python -m venv venv

# Activate
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Dependencies суулгах
pip install -r requirements.txt
```

## Environment Setup

`.env` файл үүсгээд дараах environment variables оруулах:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/mondev
SECRET_KEY=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
QPAY_USERNAME=your-qpay-username
QPAY_PASSWORD=your-qpay-password
```

## Database Migration

```bash
# Alembic initialization
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Run migration
alembic upgrade head
```

## Run Development Server

```bash
uvicorn app.main:app --reload
```

API Documentation: http://localhost:8000/docs

## Project Structure

```
backend/
├── app/
│   ├── main.py           # FastAPI app
│   ├── config.py         # Settings
│   ├── database.py       # DB connection
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas
│   ├── routers/          # API endpoints
│   ├── services/         # Business logic
│   └── utils/            # Helper functions
├── tests/
├── requirements.txt
└── .env
```

## API Endpoints

### Authentication
- `POST /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### Courses
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course (instructor)
- `GET /api/courses/{id}` - Get course details
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Videos
- `POST /api/videos` - Upload video
- `GET /api/videos/{id}` - Get video
- `POST /api/videos/{id}/like` - Like video
- `DELETE /api/videos/{id}/unlike` - Unlike video

### Payments
- `POST /api/payments/create-invoice` - Create payment invoice
- `POST /api/payments/webhook` - QPay webhook
- `GET /api/payments/history` - Payment history
- `GET /api/payments/check-access/{course_id}` - Check course access

### Search
- `GET /api/search` - Search courses

## License

Copyright © 2025 MonDev.mn
