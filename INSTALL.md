# MonDev.mn - Суулгах зааварчилгаанууд

Төслийг ажиллуулахын тулд дараах зүйлсийг суулгах хэрэгтэй:

## 🔧 Системийн шаардлага

### Backend Requirements
```bash
# Python 3.10 эсвэл дээш хувилбар
python --version

# PostgreSQL 14+ database
# Windows: https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
```

### Frontend Requirements
```bash
# Node.js 18+ болон npm
node --version
npm --version

# Хэрэв Node.js байхгүй бол:
# Windows: https://nodejs.org/
# Mac: brew install node
```

---

## 📦 Backend Setup

### 1. Virtual Environment үүсгэх
```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Dependencies суулгах
```bash
pip install -r requirements.txt
```

Энэ нь дараах packages-уудыг суулгана:
- FastAPI (web framework)
- Uvicorn (ASGI server)
- SQLAlchemy + AsyncPG (database)
- Alembic (migrations)
- Python-Jose (JWT)
- Passlib (password hashing)
- Authlib (OAuth)
- Httpx (HTTP requests)
- Pydantic (validation)

### 3. Environment Variables
```bash
# .env файл үүсгэх
copy .env.example .env

# .env файлыг засаарай:
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/mondev
SECRET_KEY=your-very-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
QPAY_USERNAME=your-qpay-username
QPAY_PASSWORD=your-qpay-password
```

### 4. Database Setup
```bash
# PostgreSQL database үүсгэх
createdb mondev

# Эсвэл psql ашиглан:
psql -U postgres
CREATE DATABASE mondev;
\q

# Alembic migration ажиллуулах
alembic upgrade head
```

### 5. Backend эхлүүлэх
```bash
uvicorn app.main:app --reload
```

✅ Backend: http://localhost:8000  
✅ API Docs: http://localhost:8000/docs

---

## 🎨 Frontend Setup

### 1. Dependencies суулгах
```bash
cd frontend
npm install
```

Энэ нь дараах packages-уудыг суулгана:
- Next.js 14 (framework)
- React 18 (UI library)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Axios (HTTP client)
- Next-Auth (authentication)

### 2. Environment Variables
```bash
# .env.local файл үүсгэх
copy .env.example .env.local

# .env.local файлыг засаарай:
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXTAUTH_SECRET=random-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Frontend эхлүүлэх
```bash
npm run dev
```

✅ Frontend: http://localhost:3000

---

## 🔑 Google OAuth Setup

1. [Google Cloud Console](https://console.cloud.google.com/) нээх
2. Шинэ project үүсгэх
3. APIs & Services → Credentials
4. Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs нэмэх:
   - `http://localhost:8000/api/auth/google/callback` (backend)
   - `http://localhost:3000/api/auth/callback/google` (frontend)
7. Client ID болон Client Secret авах
8. `.env` файлд оруулах

---

## 💳 QPay Setup

1. [QPay Merchant](https://merchant.qpay.mn/) дээр бүртгүүлэх
2. Merchant account үүсгэх
3. API credentials авах
4. `.env` файлд username, password оруулах

---

## 🚀 Бүх зүйл ажиллаж байгаа эсэхийг шалгах

### Backend Health Check
```bash
curl http://localhost:8000/health
# Response: {"status":"healthy"}
```

### Frontend Check
Браузер дээр http://localhost:3000 нээх

### Database Check
```bash
# psql ашиглан
psql -U postgres -d mondev
\dt  # Tables харах
```

---

## 📝 Түгээмэл асуудал

### Backend ажиллахгүй байна
```bash
# Virtual environment activate хийсэн эсэхээ шалгах
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Dependencies дахин суулгах
pip install -r requirements.txt --upgrade
```

### Frontend ажиллахгүй байна
```bash
# node_modules устгаад дахин суулгах
rm -rf node_modules
npm install

# Cache цэвэрлэх
npm cache clean --force
```

### Database холбогдохгүй байна
```bash
# PostgreSQL running эсэхээ шалгах
# Windows: services.msc → PostgreSQL
# Mac: brew services list

# Database байгаа эсэхийг шалгах
psql -U postgres -l
```

---

## 🎯 Next Steps

Бүх зүйл ажиллаж байвал:

1. ✅ http://localhost:3000 дээр бүртгүүлэх
2. ✅ Хичээл үүсгэх (instructor)
3. ✅ Төлбөр төл (QPay test mode)
4. ✅ Видео үзэх

---

## 📚 Нэмэлт зөвлөмж

### Development Tips
- Backend болон Frontend-г хоёуланд нь холбогдуулах
- `.env` файлуудыг git-д оруулахгүй
- Database migration бүрийг шалгаж байх

### Production Deployment
- Environment variables production values-руу өөрчлөх
- SECRET_KEY-г random strong value ашиглах
- Database backup тохируулах
- HTTPS https only mode идэвхжүүлэх

Амжилт хүсье! 🚀
