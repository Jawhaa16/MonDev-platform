# 🔐 Нууц үгийн аюулгүй байдал

MonDev платформ дээр таны нууц үг **дээд зэргийн аюулгүй байдлаар** хадгалагдана.

## 🛡️ Хэрхэн ажилладаг вэ?

### 1. **Bcrypt Hashing Algorithm**
Бид нууц үгийг хадгалахдаа дэлхийн хамгийн найдвартай **bcrypt** алгоритм ашигладаг:

```
Таны оруулсан нууц үг: "MyPassword123!"
                ↓
         Bcrypt Hashing
                ↓
Database-д хадгалагдах: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqgTNekaa2"
```

### 2. **12 Rounds (4096 Iterations)**
- Бид bcrypt-ийн **12 rounds** ашигладаг (өгөгдмөл 10-аас өндөр)
- Энэ нь 2^12 = **4096 давталт** гэсэн үг
- Хакер 1 нууц үгийг таахад ~0.3 секунд шаардагдана
- 1 сая нууц үг таахад ~3.5 хоног шаардагдана!

### 3. **Автомат Salt Generation**
- Нууц үг бүрт **өвөрмөц salt** (санамсаргүй утга) үүсгэгдэнэ
- Ижил нууц үг байсан ч өөр өөр hash үүснэ:
  ```
  User 1: "Password123!" → $2b$12$abc...xyz
  User 2: "Password123!" → $2b$12$def...uvw  (өөр!)
  ```
- Энэ нь **Rainbow Table** халдлагаас хамгаална

### 4. **One-Way Hashing**
- Нууц үгийг hash хийсний дараа **буцааж олох боломжгүй**
- Бид өөрөө ч таны нууц үгийг харж чадахгүй!
- Зөвхөн таны оруулсан нууц үг зөв эсэхийг шалгаж чадна

## 🔒 Хадгалалтын байршил

### Backend (Server)
```
📁 backend/
  └── 📁 mondev.db (SQLite Database)
      └── 📋 users table
          └── password_hash column
              └── "$2b$12$..." (Hashed password)
```

### Хадгалагдах формат:
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),  -- Энд хадгалагдана
    ...
);
```

### Жишээ өгөгдөл:
| email | password_hash |
|-------|---------------|
| user@example.com | `$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqgTNekaa2` |

## 🚫 Юу ХЭЗЭЭ Ч хадгалагдахгүй вэ?

❌ Таны жинхэнэ нууц үг  
❌ Таны нууц үгийн хувилбар  
❌ Таны нууц үгийн хэсэг  

✅ Зөвхөн **буцаах боломжгүй hash** хадгалагдана

## 🔐 Нэмэлт аюулгүй байдал

### 1. **Timing Attack Protection**
- Нууц үг шалгахад тогтмол хугацаа зарцуулна
- Хакер зөв эсэхийг хугацаагаар тааж чадахгүй

### 2. **Password Requirements**
Бид хүчтэй нууц үг шаарддаг:
- ✅ Хамгийн багадаа 8 тэмдэгт
- ✅ Том үсэг (A-Z)
- ✅ Жижиг үсэг (a-z)
- ✅ Тоо (0-9)
- ✅ Тусгай тэмдэгт (!@#$%^&*)

### 3. **HTTPS Encryption**
- Бүх мэдээлэл SSL/TLS шифрлэлттэй дамжина
- Сүлжээгээр дамжих үед таны нууц үг хамгаалагдана

## 📊 Аюулгүй байдлын түвшин

```
🔴 Муу:     Plain text хадгалалт
🟡 Дунд:    MD5/SHA1 hash
🟢 Сайн:    Bcrypt 10 rounds
🟢🟢 Маш сайн: Bcrypt 12 rounds ← БИД ЭНД БАЙНА
```

## 💡 Зөвлөмж

1. **Давхардсан нууц үг бүү ашигла**
   - Өөр сайтуудад ашигласан нууц үгээ бүү ашигла

2. **Password Manager ашигла**
   - LastPass, 1Password, Bitwarden гэх мэт

3. **2FA идэвхжүүл** (Ирээдүйд нэмэгдэнэ)
   - Нэмэлт хамгаалалтын давхарга

## 🔍 Техникийн дэлгэрэнгүй

### Bcrypt Hash Format:
```
$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqgTNekaa2
│ │  │  │                      │
│ │  │  │                      └─ Hash (31 chars)
│ │  │  └─ Salt (22 chars)
│ │  └─ Cost factor (12 rounds)
│ └─ Bcrypt version
└─ Algorithm identifier
```

### Код жишээ:
```python
# Нууц үг hash хийх
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__rounds=12  # 4096 iterations
)

# Hash үүсгэх
hashed = pwd_context.hash("MyPassword123!")
# → "$2b$12$..."

# Шалгах
is_valid = pwd_context.verify("MyPassword123!", hashed)
# → True
```

## 📞 Асуулт байвал

Нууц үгийн аюулгүй байдлын талаар асуулт байвал:
- 📧 Email: security@mondev.mn
- 🔒 Аюулгүй байдлын асуудал илрүүлбэл шууд мэдэгдээрэй!

---

**Таны нууц үг таны хамгийн чухал хөрөнгө. Бид түүнийг хамгаална! 🛡️**
