# 🧠 AI Codebase Explainer

Understand any GitHub repository instantly using AI. Paste a URL, get a full breakdown — architecture, code explanation, setup steps, and an interactive chat assistant.

**Stack:** React · Tailwind CSS · Framer Motion · Node.js · Express · MongoDB · Google Gemini AI

---

## 📁 Project Structure

```
ai-codebase-explainer/
├── frontend/               # React + Vite + Tailwind
│   └── src/
│       ├── pages/          # Landing, Login, Signup, Dashboard, Analyzer, Chat
│       ├── components/
│       │   ├── layout/     # Navbar
│       │   ├── ui/         # SpotlightCursor
│       │   └── analyzer/   # FileTree, CodeViewer, AIPanel
│       ├── context/        # AuthContext (JWT)
│       ├── utils/          # Axios API client
│       └── styles/         # globals.css
│
└── backend/                # Node.js + Express
    ├── server.js
    ├── config/             # MongoDB connection
    ├── models/             # User, Repository, Analysis
    ├── middleware/         # JWT auth
    ├── controllers/        # auth, user, repo, ai
    ├── routes/             # /auth /user /repo /ai
    └── utils/              # github.js, gemini.js
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Google Gemini API key
- GitHub Personal Access Token

---

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ai-codebase-explainer
JWT_SECRET=your_random_32_char_secret_here
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_pat_token
CLIENT_URL=http://localhost:5173
```

```bash
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env
```

`.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔑 Getting API Keys

| Key | Where |
|-----|-------|
| `MONGO_URI` | [MongoDB Atlas](https://cloud.mongodb.com) → Create cluster → Connect |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `GITHUB_TOKEN` | GitHub → Settings → Developer settings → Personal access tokens → Fine-grained → `repo` read scope |
| `JWT_SECRET` | Any random string: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

---

## 🌐 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/user/profile` | ✅ | Get current user |
| POST | `/api/repo/analyze` | ✅ | Analyze a GitHub repo |
| POST | `/api/repo/explain-code` | ✅ | AI explain a file |
| GET | `/api/repo/history` | ✅ | Past analyses |
| GET | `/api/repo/:repoId` | ✅ | Get single repo |
| POST | `/api/ai/chat` | ✅ | Chat with AI |

---

## 🚢 Deployment

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Import into [Vercel](https://vercel.com)
3. Set env var: `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy

### Backend → Render
1. Push `backend/` to GitHub
2. New Web Service on [Render](https://render.com)
3. Build: `npm install` · Start: `node server.js`
4. Add all env vars from `.env.example`
5. Deploy

### Database → MongoDB Atlas
- Free M0 tier is sufficient to start
- Whitelist `0.0.0.0/0` for Render's dynamic IPs

---

## ✨ Features

- 🔍 **GitHub repo analysis** — fetch file tree + key files
- 🤖 **Gemini AI** — summary, architecture, code explanations
- 🗂 **VS Code layout** — file explorer + code viewer + AI panel
- 💬 **Chat assistant** — repo-aware AI chat
- 🔐 **JWT auth** — signup/login with bcrypt passwords
- 📦 **History** — all past analyses saved, instant re-open
- 📱 **Responsive** — mobile-friendly on all pages
- ✨ **Aurora bg + spotlight cursor** — premium dark UI

---

## 🎨 Design System

- Background: `#0d1117` (GitHub dark)
- Surface: `#161b22`
- Border: `#30363d`
- Accent: `#58a6ff` (blue)
- Muted: `#8b949e`
- Font: Inter (UI) + JetBrains Mono (code)
