# MonDev.mn Frontend

MonDev.mn сургалтын платформын Frontend (Next.js 14)

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Minimalist Dark Design
- 🔐 Google OAuth Authentication
- 📱 Responsive Design
- 🎥 Video Player
- 💳 QPay Payment Integration
- 🔍 Advanced Search
- ⚡ Fast & Optimized

## Installation

```bash
# Dependencies суулгах
npm install
# эсвэл
yarn install
```

## Environment Setup

`.env.local` файл үүсгэх:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## Development

```bash
npm run dev
# эсвэл
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   ├── globals.css       # Global styles
│   └── (routes)/         # Page routes
├── components/
│   ├── ui/               # Reusable components
│   ├── layout/           # Layout components
│   └── course/           # Course components
├── lib/
│   └── api.ts            # API client
├── public/               # Static assets
└── package.json
```

## Design System

### Colors
- Black: `#000000`
- Gray-900: `#0a0a0a`
- Gray-800: `#1a1a1a`
- Accent: `#3b82f6`

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

## Pages

- `/` - Landing page
- `/courses` - Course listing
- `/courses/[id]` - Course detail
- `/login` - Login page
- `/register` - Registration
- `/profile` - User profile
- `/instructor` - Instructor dashboard

## License

Copyright © 2025 MonDev.mn
