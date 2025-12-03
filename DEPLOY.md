# MonDev.mn - Render Deployment Guide

Энэхүү заавар нь MonDev платформыг Render.com дээр байршуулах алхмуудыг тайлбарлана.

## Урьдчилсан нөхцөл
1. GitHub дээр кодоо push хийсэн байх.
2. Render.com дээр бүртгэлтэй байх.

---

## Алхам 1: Database үүсгэх (PostgreSQL)

1. Render Dashboard руу ороод **New +** товчийг дараад **PostgreSQL**-г сонгоно.
2. **Name**: `mondev-db` (эсвэл хүссэн нэрээ өгнө).
3. **Database**: `mondev`
4. **User**: `mondev_user`
5. **Region**: `Singapore` (Монголтой хамгийн ойр нь) эсвэл `Frankfurt`.
6. **Plan**: `Free` (туршилтад) эсвэл `Starter`.
7. **Create Database** товчийг дарна.
8. Үүссэний дараа **Internal Database URL** болон **External Database URL**-ийг хуулж авна.

---

## Алхам 2: Backend үүсгэх (Web Service)

1. Render Dashboard -> **New +** -> **Web Service**.
2. GitHub repository-оо сонгоно.
3. Тохиргоог дараах байдлаар хийнэ:
   - **Name**: `mondev-backend`
   - **Region**: Database-тэй ижил region сонгоно.
   - **Branch**: `main` (эсвэл таны код байгаа branch).
   - **Root Directory**: `backend` (⚠️ Чухал: backend фолдер дотор байгаа тул).
   - **Runtime**: `Python 3`.
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
4. **Environment Variables** хэсэгт дараах хувьсагчдыг нэмнэ:
   - `DATABASE_URL`: (Алхам 1 дээр авсан **Internal Database URL**)
     - ⚠️ Анхаар: URL нь `postgres://` гэж эхэлж байвал `postgresql+asyncpg://` болгож өөрчлөөрэй.
   - `SECRET_KEY`: (Дурын урт нууц үг, жишээ нь: `supersecretkey123`)
   - `ENVIRONMENT`: `production`
   - `CORS_ORIGINS`: `https://mondev-frontend.onrender.com` (Frontend үүсгэсний дараа энэ URL-г шинэчлэх хэрэгтэй болно, одоохондоо `*` тавьж болно).
5. **Create Web Service** дарна.

---

## Алхам 3: Frontend үүсгэх (Web Service)

1. Render Dashboard -> **New +** -> **Web Service**.
2. GitHub repository-оо сонгоно (Backend-тэй ижил repo).
3. Тохиргоо:
   - **Name**: `mondev-frontend`
   - **Region**: Database/Backend-тэй ижил.
   - **Branch**: `main`
   - **Root Directory**: `frontend` (⚠️ Чухал).
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: (Алхам 2 дээр үүссэн Backend URL, жишээ нь: `https://mondev-backend.onrender.com`)
     - ⚠️ Төгсгөлд нь `/` тэмдэгт **байхгүй** байх ёстой.
5. **Create Web Service** дарна.

---

## Алхам 4: Холболтыг шалгах

1. Frontend deploy хийгдэж дууссаны дараа Backend-ийн `CORS_ORIGINS` тохиргоог шинэчилнэ.
   - Backend service -> Environment -> `CORS_ORIGINS` -> Frontend URL-ээ оруулна (жишээ нь: `https://mondev-frontend.onrender.com`).
2. Frontend URL руу орж бүртгүүлэх, нэвтрэх үйлдлүүдийг шалгана.

## Нийтлэг алдаанууд

- **Database Connection Error**: `DATABASE_URL` буруу эсвэл `postgresql+asyncpg://` protocol ашиглаагүй үед гарна.
- **CORS Error**: Backend дээр `CORS_ORIGINS` тохиргоо дутуу эсвэл буруу үед гарна.
- **Build Failed**: `Root Directory`-г буруу заасан үед гарна.

## Database Migration (Хүснэгтүүд үүсгэх)

Backend deploy хийгдсэний дараа database хоосон байна. Хүснэгтүүдийг үүсгэхийн тулд Render дээрх Backend service-ийн **Shell** цэс рүү ороод дараах тушаалыг бичнэ:

```bash
alembic upgrade head
```

Хэрэв alembic ашиглаагүй бол Python консол руу орж үүсгэж болно:

```bash
python
>>> import asyncio
>>> from app.database import engine, Base
>>> async def init_db():
...     async with engine.begin() as conn:
...         await conn.run_sync(Base.metadata.create_all)
...
>>> asyncio.run(init_db())
>>> exit()
```
