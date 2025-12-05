# MonDev.mn - Render Deployment Guide

Таны код GitHub дээр бэлэн болсон тул одоо Render.com дээр байршуулцгаая. Бид **Blueprint** ашиглах тул маш хялбар байна.

## Арга 1: Blueprint ашиглах (Санал болгож байна 🌟)

Энэ арга нь Database, Backend, Frontend гурвыг автоматаар холбож үүсгэнэ.

### Алхам 1: Render дээр Blueprint үүсгэх
1. [Render Dashboard](https://dashboard.render.com/) руу орно.
2. Баруун дээд буланд **New +** товчийг дараад **Blueprint**-ийг сонгоно.
3. GitHub repository-оо жагсаалтаас олоод **Connect** дарна.
4. **Service Group Name** дээр `mondev-platform` гэж бичнэ.
5. **Apply** товчийг дарна.

Render автоматаар `render.yaml` файлыг уншиж, бүх зүйлийг үүсгэж эхэлнэ. Энэ процесс 5-10 минут үргэлжилнэ.

### Алхам 2: Database тохиргоо (Migration)
Deploy хийгдэж дууссаны дараа (бүгд ногоон болох үед) Database хоосон байгаа тул хүснэгтүүдийг үүсгэх хэрэгтэй.

1. Render Dashboard дээр **mondev-backend** service рүү орно.
2. **Shell** цэс рүү орно.
3. Дараах командыг бичээд Enter дарна:
   ```bash
   alembic upgrade head
   ```
   *Хэрэв алдаа гарвал:*
   ```bash
   python -c "import asyncio; from app.database import engine, Base; asyncio.run(engine.begin().__aenter__().run_sync(Base.metadata.create_all))"
   ```

### Алхам 3: CORS тохиргоог шинэчлэх
Blueprint ашиглахад Frontend URL автоматаар үүсдэг тул Backend-д энэ URL-ийг таниулах хэрэгтэй.

1. Render Dashboard -> **mondev-frontend** руу ороод зүүн дээд талд байгаа URL-ийг хуулж авна (жишээ нь: `https://mondev-frontend-xyz.onrender.com`).
2. **mondev-backend** -> **Environment** цэс рүү орно.
3. `CORS_ORIGINS` гэсэн хувьсагчийг хайж олоод, утгыг нь хуулж авсан URL-ээрээ солино. (Одоогоор `*` байгаа тул ажиллана, гэхдээ аюулгүй байдлын үүднээс солих нь дээр).

---

## Арга 2: Гараар үүсгэх (Manual)

Хэрэв Blueprint болохгүй бол энэ аргыг ашиглаарай.

### 1. Database үүсгэх
1. **New +** -> **PostgreSQL**.
2. Name: `mondev-db`, Region: `Singapore`.
3. Үүссэний дараа **Internal Database URL**-ийг хуулж авна.

### 2. Backend үүсгэх
1. **New +** -> **Web Service**.
2. Repo сонгоно.
3. Name: `mondev-backend`, Runtime: `Python`.
4. Root Directory: `backend`.
5. Build Command: `pip install -r requirements.txt`.
6. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`.
7. **Environment Variables** нэмнэ:
   - `DATABASE_URL`: (Internal Database URL)
   - `SECRET_KEY`: (Дурын нууц үг)
   - `CORS_ORIGINS`: `*`

### 3. Frontend үүсгэх
1. **New +** -> **Web Service**.
2. Repo сонгоно.
3. Name: `mondev-frontend`, Runtime: `Node`.
4. Root Directory: `frontend`.
5. Build Command: `npm install && npm run build`.
6. Start Command: `npm start`.
7. **Environment Variables** нэмнэ:
   - `NEXT_PUBLIC_API_URL`: (Backend URL, жишээ нь `https://mondev-backend.onrender.com`)

---

## Амжилт! 🚀
Одоо таны вэбсайт дэлхий даяар нээлттэй боллоо.