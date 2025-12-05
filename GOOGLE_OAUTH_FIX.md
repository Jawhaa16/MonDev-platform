# Google OAuth Redirect URI Засварлах Заавар

## Асуудал
Та бүртгүүлэх гэхэд Google-ээс **400 (Bad Request)** алдаа гарч байна.
Шалтгаан: Redirect URI буруу тохируулагдсан байна.

## Шийдэл

### 1. Google Cloud Console дээр очих
- Зураг дээр харагдаж байгаа хуудас дээр байна уу
- URL: https://console.cloud.google.com/apis/credentials

### 2. OAuth Client-ээ засах
Та аль хэдийн зөв хуудас дээр байна. Одоо:

#### A. "Authorised redirect URIs" хэсэгт очих
Зургаас харахад 2 URI байна:
- `http://localhost:3000`
- `http://localhost:8000/api/auth/google/callback`

#### B. Зөв URI-г нэмэх
**"+ Add URI"** товч дарж дараах URI-г нэмнэ:

```
http://localhost:3000/auth/callback
```

⚠️ **Анхаар**: `/auth/callback` гэсэн хэсэг маш чухал!

#### C. Хуучин URI-уудыг устгах (сонголттой)
Хэрэв хүсвэл эхний 2 URI-г устгаж болно, гэхдээ үлдээж болно.

### 3. Хадгалах
- **"SAVE"** эсвэл **"OAuth client saved"** гэсэн товч дарах
- Хэдэн секунд хүлээх (Google-ийн системд шинэчлэгдэх хүртэл)

### 4. Client Secret авах
Хэрэв та Client Secret-аа хараагүй бол:
1. Client ID-ийн хажууд байгаа **download** icon дарах
2. JSON файл татаж авах
3. Эсвэл "Client secret"-ийг хуулах

### 5. Backend .env файлд Client Secret оруулах

Backend folder дээр очоод `.env` файлыг нээж:

```bash
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxx
```

Энэ мөрийг өөрийн жинхэнэ Client Secret-аар солих.

## Дараа нь хийх зүйлс

### 1. Backend server-ыг дахин эхлүүлэх
PowerShell дээр:
```powershell
# Backend terminal дээр Ctrl+C дарж зогсоох
# Дараа нь дахин эхлүүлэх:
cd c:\Users\jawha\Desktop\hugjil\backend
.\venv\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend server-ыг дахин эхлүүлэх
Өөр PowerShell terminal дээр:
```powershell
# Frontend terminal дээр Ctrl+C дарж зогсоох
# Дараа нь дахин эхлүүлэх:
cd c:\Users\jawha\Desktop\hugjil\frontend
npm run dev
```

### 3. Дахин туршиж үзэх
1. http://localhost:3000 нээх
2. "Бүртгүүлэх" эсвэл "Нэвтрэх" дарах
3. "Google-ээр нэвтрэх" дарах
4. Одоо ажиллах ёстой! ✅

## Түгээмэл асуудал

### Q: Client Secret хаана байна?
A: Google Cloud Console дээр:
- Client ID-ийн хажууд байгаа "Show" icon дарах
- Эсвэл JSON файл татаж авах

### Q: Redirect URI яагаад `http://localhost:3000/auth/callback` байх ёстой вэ?
A: Таны frontend код (login/page.tsx) дээр:
```typescript
redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_FRONTEND_URL + '/auth/callback')}
```
гэж бичсэн байна. Тиймээс `/auth/callback` хэсэг шаардлагатай.

### Q: Одоо ч ажиллахгүй бол?
A: 
1. Browser cache цэвэрлэх (Ctrl+Shift+Delete)
2. Incognito/Private mode ашиглах
3. Google Cloud Console дээр хадгалсан эсэхээ шалгах
4. .env файлууд зөв эсэхийг шалгах

## Амжилт хүсье! 🚀
