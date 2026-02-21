# Forbidden Developers Web

Marketing site and supporting API for Forbidden Developers.

## Tech

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB (Mongoose)

## Local development

### Frontend

```bash
npm install
npm run dev
```

- Dev server: `http://localhost:5173`

### Backend

```bash
cd backend
npm install
npm start
```

- API server: `http://localhost:5000` (default)

## Environment variables

Create `backend/.env` (this repo ignores it by default).

Minimum:

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign/verify auth tokens

Optional:

- `PORT` — backend port (default: `5000`)
- `NODE_ENV` — `development` or `production`
- `ALLOWED_ORIGINS` — comma-separated list for CORS (defaults include local dev)

## Build

```bash
npm run build
npm run preview
```

## Repo structure

- `src/` — frontend app
- `public/` — static assets (including `manifest.json`)
- `backend/` — API server
