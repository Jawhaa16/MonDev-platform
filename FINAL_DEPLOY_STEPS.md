# MonDev Platform - Эцсийн Байршуулах Заавар (Deployment Steps)

Та бүх account-аа нээчихсэн тул одоо дараах 4 алхамыг хийхэд л болно.

---

## АЛХАМ 1: Cloudinary (Зураг хадгалах) тохиргоо

1.  **[Cloudinary Dashboard](https://console.cloudinary.com/console/)** руу орно.
2.  "Product Environment Credentials" гэсэн хэсгээс дараах 3 зүйлийг олно:
    *   `Cloud Name`
    *   `API Key`
    *   `API Secret`
3.  Тэдгээрийг хуулж `backend/.env` файлынхаа хамгийн доор нь нэмж бичнэ. (Бид сая кодонд нь орон зайг нь бэлдчихсэн байгаа).

**`backend/.env` дотор ингэж харагдах ёстой:**
```env
CLOUDINARY_CLOUD_NAME=dy7... (таны cloud name)
CLOUDINARY_API_KEY=893... (таны api key)
CLOUDINARY_API_SECRET=abc... (таны api secret)
```

---

## АЛХАМ 2: Supabase (Өгөгдлийн бааз) тохиргоо

1.  **[Supabase Dashboard](https://supabase.com/dashboard/projects)** руу орж сая үүсгэсэн Project руугаа орно.
2.  Зүүн дээд буланд байх **Connect** товчийг дарна.
3.  "URI" гэсэн табыг сонгоод **Session pooler** биш **Transaction pooler** эсвэл шууд **Direct connection**-г сонго (Direct нь илүү найдвартай).
4.  Холболтын кодыг хуулж авна. Энэ нь `postgresql://postgres:[PASSWORD]@db...` гэж эхэлсэн байна.
5.  `[PASSWORD]` гэсэн хэсэгт Superbase бүртгүүлэхдээ хийсэн нууц үгээ бичнэ.
6.  `backend/.env` файлын `DATABASE_URL` хэсгийг үүгээр солино.

**`backend/.env` дотор ингэж харагдах ёстой:**
```env
DATABASE_URL=postgresql://postgres.xxyyzz:password@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

---

## АЛХАМ 3: GitHub руу кодоо хуулах

Та `Jawhaa16/MonDev-platform` (эсвэл үүнтэй төстэй) нэртэй Repository үүсгэсэн байх. Одоо кодоо тийшээ хуулна.

Terminal дээрээ (MonDev-platform фолдер дотроо) дараах коммандуудыг ээлжлэн бичнэ:

1.  `git init` (хэрэв хийгээгүй бол)
2.  `git add .`
3.  `git commit -m "Deployment ready"`
4.  `git branch -M main`
5.  `git remote add origin https://github.com/Jawhaa16/TANI_REPO_NER.git` (Энийг GitHub дээрээсээ хуулж авна)
6.  `git push -u origin main`

---

## АЛХАМ 4: Render (Backend) дээр байршуулах

1.  **[Render Dashboard](https://dashboard.render.com/)** руу орно.
2.  **New +** дараад **Web Service** сонгоно.
3.  GitHub-аа сонгоод **MonDev** репогоо сонгоно.
4.  Дараах тохиргоог хийнэ:
    *   **Name:** `mondev-backend`
    *   **Runtime:** `Python 3`
    *   **Build Command:** `pip install -r requirements.txt`
    *   **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port 10000`
5.  **Environment Variables** хэсэгт `.env` доторх чухал зүйлсээ *ЗААВАЛ* хуулж оруулна:
    *   `DATABASE_URL` (Supabase-ийнх)
    *   `CLOUDINARY_CLOUD_NAME`
    *   `CLOUDINARY_API_KEY`
    *   `CLOUDINARY_API_SECRET`
    *   `SECRET_KEY` (дурын урт нууц үг зохиогоод биччих)
    *   `ENVIRONMENT` = `production`
6.  **Create Web Service** дарна.

---

## АЛХАМ 5: Vercel (Frontend) дээр байршуулах

1.  **[Vercel Dashboard](https://vercel.com/dashboard)** руу орно.
2.  **Add New...** -> **Project**.
3.  GitHub репогоо сонгоод **Import** дарна.
4.  **Framework Preset:** `Next.js` (автоматаар сонгогдоно).
5.  **Root Directory:** `frontend` гэж сонгоно (Edit дарж байгаад сонгоно).
6.  **Environment Variables:**
    *   `NEXT_PUBLIC_API_URL`: Энд Render дээр үүссэн backend-ийн линкийг тавина (Жш: `https://mondev-backend.onrender.com`). *Эхлээд алгасаад дараа нь нэмж болно*.
7.  **Deploy** дарна.

---
Эхлээд **АЛХАМ 1** ба **АЛХАМ 2**-ыг хийж дуусгаад, `.env` файлаа янзалсан бол хэлээрэй. Би GitHub руу хуулахад нь тусалъя.
