# Google OAuth Алдаа Засах Заавар

## Асуудал:
Google-ээр нэвтрэхэд "Алдаа гарлаа" мессеж гарч байна.

## Шийдэл 1: localStorage цэвэрлэх

1. Browser дээр `F12` дарж Developer Tools нээнэ
2. **Console** tab руу орно
3. Дараах команд бичиж Enter дарна:
```javascript
localStorage.clear()
```
4. Browser-ыг refresh хийнэ (`F5` эсвэл Ctrl+R)
5. Дахин нэвтрэх оролдоно

## Шийдэл 2: Backend log шалгах

1. Backend terminal дээр алдааны мессежийг хайна
2. Хэрэв `database` болон `table` холбоотой алдаа байвал доорх шийдлийг харна уу

## Шийдэл 3: Database дахин үүсгэх

Backend terminal дээр дараах командуудыг ажиллуулна:

```powershell
# Backend directory руу орно
cd c:\Users\jawha\Desktop\hugjil\backend

# Database файлыг устгана (хэрэв байвал)
Remove-Item mondev.db -ErrorAction SilentlyContinue

# Python хэрэглэж database үүсгэнэ
python -c "from app.database import Base, engine; import asyncio; asyncio.run(Base.metadata.create_all(bind=engine))"
```

## Шийдэл 4: Server дахин эхлүүлэх

Backend server автоматаар reload хийдэг тул файлууд өөрчлөгдөхөд дахин эхэлнэ.
Гэхдээ terminal зогсоод дахин эхлүүлж болно:

```powershell
# Backend terminal дээр Ctrl+C дарж зогсоох
# Дараа нь дахин эхлүүлэх:
.\venv\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Шалгалт:

1. Browser console дээр алдааны дэлгэрэнгүй мэдээлэл авах:
```javascript
// Console дээр бичнэ үү
console.log('Check auth errors')
```

2. Backend status шалгах:
   - Browser дээр очно: `http://localhost:8000/docs`
   - Хэрэв API docs харагдаж байвал backend ажиллаж байна

3. Test хийх:
   - `/login` хуудас руу очно
   - Google-ээр нэвтрэх товч дарна
   - Callback алдаа гарсан эсэхийг шалгана

## Анхааруулга:

Database устахад бүх өмнөх хэрэглэгч болон хичээлийн мэдээлэл устана.
Хэрэв та үүнийг хүсэхгүй байвал эхлээд backup авна уу.
