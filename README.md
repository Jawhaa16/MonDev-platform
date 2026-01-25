# MonDev.mn - Сургалтын Платформ

Мэргэжилтэн болон залуучуудад зориулсан онлайн сургалтын платформ

![MonDev.mn](https://img.shields.io/badge/MonDev.mn-Learning%20Platform-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI-green)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)

## 📋 Танилцуулга

MonDev.mn нь гадаадын том том компаниудад (Google, Meta, Amazon гэх мэт) ажилдаг монгол хүмүүсийн туршлага, мэдлэгийг монголын залуучуудтай хуваалцах зорилготой платформ юм.

## ✨ Онцлог функцүүд

### Хэрэглэгчийн функцүүд
- 🔐 **Google OAuth2 нэвтрэлт** - Gmail ашиглан аюулгүй нэвтрэх
- 👥 **Хоёр төрлийн хэрэглэгч**:
  - Суралцагч (Viewer) - Хичээл үзэх, багш нарт subscribe хийх
  - Багш (Instructor) - Хичээл оруулах, орлого олох
- 📚 **Хичээл удирдлага** - Үнэгүй болон төлбөртэй хичээлүүд
- 🎥 **Видео тоглуулагч** - Чанартай видео үзэх систем
- 🔍 **Өргөн хайлт** - Хичээл, категориор хайх
- ❤️ **Харилцан үйлчлэл** - Like, Subscribe, Comment
- 💳 **QPay төлбөр** - Монголын QPay системээр төлбөр төлөх

### Багшийн функцүүд
- 📤 **Хичээл оруулах** - Видео upload, багц хичээл үүсгэх
- 💰 **Үнэ тогтоох** - Үнэгүй эсвэл төлбөртэй хичээл үүсгэх
- 📊 **Орлогын дэлгэрэнгүй** - Сарын үнэлгээ, орлогын график
- 📈 **Статистик** - Үзэлт, Like, Subscribe тоо

### Хамгаалалт
- 🔒 **JWT Authentication** - Аюулгүй token систем
- 🛡️ **Encryption** - Нууц мэдээлэл шифрлэх
- 🚫 **Rate Limiting** - DDOS халдлагаас хамгаалах
- ✅ **Input Validation** - SQL Injection сэргийлэх

## 🏗️ Технологийн стек

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy + Alembic
- **Authentication**: JWT + Google OAuth2
- **Payment**: QPay API
- **Validation**: Pydantic

### Frontend
- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Authentication**: NextAuth.js

### Deployment
- **Platform**: Render
- **Database**: PostgreSQL (Cloud)
- **Domain**: MonDev.mn
- **SSL**: Auto (Render)

## 📦 Төслийн бүтэц

```
hugjil/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── routers/      # API endpoints
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helper functions
│   ├── tests/
│   ├── requirements.txt
│   └── README.md
│
├── frontend/             # Next.js frontend
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   ├── public/           # Static files
│   ├── package.json
│   └── README.md
│
└── README.md            # Энэ файл
```

## 🚀 Хэрхэн эхлүүлэх

### Шаардлагатай зүйлс

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Google OAuth2 credentials
- QPay merchant account

### Backend setup

```bash
cd backend

# Virtual environment үүсгэх
python -m venv venv
venv\Scripts\activate  # Windows

# Dependencies суулгах
pip install -r requirements.txt

# Environment variables
cp .env.example .env
# .env файлыг засаарай

# Database migration
alembic upgrade head

# Server эхлүүлэх
uvicorn app.main:app --reload
```

Backend: http://localhost:8000
API Docs: http://localhost:8000/docs

### Frontend setup

```bash
cd frontend

# Dependencies суулгах
npm install

# Environment variables
cp .env.example .env.local
# .env.local файлыг засаарай

# Development server
npm run dev
```

Frontend: http://localhost:3000

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/mondev
SECRET_KEY=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback
QPAY_USERNAME=your-qpay-username
QPAY_PASSWORD=your-qpay-password
PLATFORM_FEE_PERCENT=15
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## 📊 Database Schema

```sql
users           - Хэрэглэгчид (email, google_id, user_type)
courses         - Хичээлүүд (title, price, instructor_id)
videos          - Видеонууд (course_id, video_url)
purchases       - Төлбөрүүд (user_id, course_id, qpay_invoice_id)
subscriptions   - Subscribe (subscriber_id, instructor_id)
likes           - Like (user_id, video_id)
comments        - Сэтгэгдэл (user_id, video_id, content)
```

## 🎨 Дизайн

- **Үндсэн өнгө**: Хар (#000000)
- **Стиль**: Минимал, орчин үеийн
- **Font**: Inter (Google Fonts)
- **Responsive**: Mobile, Tablet, Desktop
- **Theme**: Dark mode

## 📝 API Documentation

API-н дэлгэрэнгүй docs:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

Үндсэн endpoints:
```
POST   /api/auth/google/callback  - Google OAuth
GET    /api/auth/me               - Current user
GET    /api/courses               - List courses
POST   /api/courses               - Create course
GET    /api/courses/{id}          - Course details
POST   /api/videos                - Upload video
POST   /api/payments/create-invoice - Create payment
GET    /api/search                - Search courses
```

## 🧪 Testing

### Backend tests
```bash
cd backend
pytest tests/
```

### Frontend tests
```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Render deployment

1. **Backend**:
   - Create Web Service from backend folder
   - Add PostgreSQL database
   - Set environment variables
   - Deploy

2. **Frontend**:
   - Create Web Service from frontend folder
   - Set environment variables
   - Deploy

3. **Domain**:
   - Add custom domain MonDev.mn
   - Configure DNS settings

## 📈 Төлөвлөсөн хөгжүүлэлт

- [ ] Mobile app (React Native)
- [ ] Live streaming
- [ ] AI хичээл санал болгох систем
- [ ] Certificate олгох
- [ ] Q&A forum
- [ ] Instructor analytics dashboard

## 👥 Contributors

- Developer: [Your Name]

## 📄 License

Copyright © 2025 MonDev.mn. All rights reserved.

## 📞 Contact

- Website: https://mondev.mn
- Email: jawhactwt@gmail.com

---

**MonDev.mn** - Мэргэжлээ дээшлүүлье! 🚀
