# MonDev Platform Deployment Plan

Энэхүү баримт бичиг нь MonDev платформыг хөгжүүлэлтийн орчноос (Localhost) бодит интернет орчин (Production) руу шилжүүлэх дэлгэрэнгүй төлөвлөгөө юм.

## 1. Ерөнхий Бүтэц (Architecture)

Бид вэбсайтыг дараах үйлчилгээнүүд дээр байршуулна:

| Хэсэг | Одоогийн байдал | Deployment шийдэл | Тайбар |
|-------|-----------------|-------------------|--------|
| **Frontend** | Localhost:3000 | **Vercel** | Free, Next.js-тэй төгс зохицно, маш хурдан. |
| **Backend** | Localhost:8000 | **Render.com** | Free tier-тэй, Python FastAPI-г дэмждэг. |
| **Database** | SQLite (test.db) | **Supabase** эсвэл **Neon** | Cloud PostgreSQL. SQLite нь сервер дээр ажиллахгүй (файл устах эрсдэлтэй). |
| **Storage** | Local (/uploads) | **Cloudinary** | Зураг/Видео хадгалах үүлэн үйлчилгээ. Render нь файл хадгалдаггүй тул заавал хэрэгтэй. |

---

## 2. Бэлтгэл Ажил (Prerequisites)

Та дараах бүртгэлүүдийг үүсгэх шаардлагатай:
1.  **GitHub Account** (https://github.com): Кодоо хадгалах.
2.  **Cloudinary Account** (https://cloudinary.com): Зураг хадгалах (API Key хэрэгтэй болно).
3.  **Supabase Account** (https://supabase.com): Өгөгдлийн бааз үүсгэх (Database URL хэрэгтэй).
4.  **Vercel Account** (https://vercel.com): Frontend байршуулах (GitHub-тай холбогдоно).
5.  **Render Account** (https://render.com): Backend байршуулах (GitHub-тай холбогдоно).

---

## 3. Алхамчилсан Төлөвлөгөө (Step-by-Step)

### Алхам 1: Storage системийг шинэчлэх (Cloudinary)
Одоогоор бид зургийг `backend/uploads` фолдерт хадгалж байгаа. Үүнийг `Cloudinary` руу хуулдаг болгож өөрчилнө.
- `requirements.txt` дээр `cloudinary` санг нэмэх.
- `backend/app/routers/upload.py`-ийг өөрчилж Cloudinary API ашиглах.
- `.env` файлд API түлхүүрүүдээ оруулах.

### Алхам 2: Өгөгдлийн баазыг бэлдэх (PostgreSQL)
SQLite ("test.db") нь зөвхөн ганц файл тул олон хүн зэрэг хандахад тохиромжгүй.
- `requirements.txt` дээр `psycopg2-binary` нэмэх.
- Backend код дээрх DB холболтыг `DATABASE_URL` хувьсагчаас авдаг болгох.
- Supabase дээр шинэ төсөл үүсгэж, холболтын кодыг авах.

### Алхам 3: Кодны цэгцлэлт ба GitHub руу хуулах
- `frontend` болон `backend` хавтаснуудад тус тусад нь `requirements.txt` (Backend) болон `package.json` (Frontend) бүрэн эсэхийг шалгах.
- Төслийг GitHub Repository руу `push` хийх.

### Алхам 4: Backend-ийг Render.com дээр байршуулах
1. Render дээр "New Web Service" үүсгэнэ.
2. GitHub репогоо сонгоно.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
5. Environment Variables нэмнэ (DATABASE_URL, CLOUDINARY_URL, JWT_SECRET, гэх мэт).

### Алхам 5: Frontend-ийг Vercel дээр байршуулах
1. Vercel дээр "Add New Project" дарна.
2. GitHub репогоо сонгоно.
3. Root Directory-г `frontend` гэж зааж өгнө.
4. Environment Variables нэмнэ (`NEXT_PUBLIC_API_URL` -> Render дээрх backend хаяг).
5. "Deploy" товч дарна.

### Алхам 6: Эцсийн тохиргоо
- Backend дээрх `origins` (CORS) тохиргоонд Vercel-ийн шинэ домэйныг нэмж зөвшөөрнө.
- Google OAuth (Login) тохиргоонд шинэ домэйнуудыг "Authorized Redirect VRIs" хэсэгт нэмнэ.

---

Энэхүү дарааллаар явбал таны вэбсайт бүрэн ажиллагаатай болж, хүмүүс ашиглах боломжтой болно.
Бид эхлээд **Алхам 1 (Cloudinary)**-ээс эхлэх үү?
