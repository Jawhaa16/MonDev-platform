# Node.js Суулгах Заавар

## Windows дээр Node.js суулгах

### Арга 1: Node.js Website-с татаж авах (Зөвлөмж)

1. [Node.js Official Website](https://nodejs.org/) руу ороорой
2. **LTS хувилбар** (Long Term Support) татаж авах - одоогоор 20.x хувилбар
3. Installer ажиллуулах (node-v20.x.x-x64.msi)
4. "Add to PATH" гэсэн option-г заавал идэвхжүүлэх
5. Install дарж дуусгах

### Арга 2: Chocolatey ашиглах (PowerShell Admin)

```powershell
# PowerShell-г Admin эрхээр нээх (Right-click → Run as Administrator)

# Chocolatey суулгах (хэрэв байхгүй бол)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Node.js суулгах
choco install nodejs-lts -y
```

### Арга 3: winget ашиглах (Windows Package Manager)

```powershell
# PowerShell дээр
winget install OpenJS.NodeJS.LTS
```

---

## Суулгасны дараа шалгах

PowerShell шинээр нээгээд:

```powershell
node --version
# v20.x.x гэж гарвал амжилттай

npm --version
# 10.x.x гэж гарвал амжилттай
```

---

## MonDev.mn Төслийг эхлүүлэх

### Backend Setup

```powershell
# hugjil folder руу очих
cd C:\Users\jawha\Desktop\hugjil

# Backend directory
cd backend

# Virtual environment үүсгэх
python -m venv venv

# Activate хийх
.\venv\Scripts\activate

# Dependencies суулгах (шинэчилсэн requirements.txt)
pip install -r requirements.txt

# .env file үүсгэх
copy .env.example .env

# Database migration (PostgreSQL running байх ёстой)
alembic upgrade head

# Server эхлүүлэх
uvicorn app.main:app --reload
```

Backend: http://localhost:8000

---

### Frontend Setup (Node.js суулгасны дараа)

```powershell
# Шинэ PowerShell нээх
cd C:\Users\jawha\Desktop\hugjil

# Frontend directory
cd frontend

# Dependencies суулгах
npm install

# .env.local үүсгэх
copy .env.example .env.local

# Dev server эхлүүлэх
npm run dev
```

Frontend: http://localhost:3000

---

## Түгээмэл асуудал

### npm олдохгүй байна
- PowerShell **шинээр** нээх (Node.js суулгасны дараа)
- System restart хийх
- PATH environment variable шалгах

### Backend requirements install алдаатай
- `python-cors` package байхгүй (би устгасан)
- requirements.txt шинэчлэгдсэн

### PostgreSQL байхгүй
Backend ажиллуулахын тулд PostgreSQL хэрэгтэй:
- [PostgreSQL Download](https://www.postgresql.org/download/windows/)
- Эсвэл Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`

---

Амжилт хүсье! 🚀
