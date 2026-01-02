# Articles Portal (Django + DRF + React + MUI)

Production-ready full-stack project:
- Backend: Django + Django REST Framework + PostgreSQL + JWT (SimpleJWT)
- Frontend: Vite + React (JavaScript) + MUI

## Requirements

- Python 3.11+ (recommended)
- Node.js 18+ (recommended)
- PostgreSQL 14+

---

## Backend setup

### 1) Create and fill environment file

Create `backend/.env` (or copy from `backend/.env.example`):

```env
SECRET_KEY=change-me
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=articles_portal
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### 2) Install dependencies

```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 3) Migrations

```bash
python manage.py migrate
```

### 4) Create admin user (optional)

```bash
python manage.py createsuperuser
```

### 5) Seed data (required)

Creates at least: 2 users (admin + normal), 2 articles, 2 comments per article.

```bash
python manage.py seed
```

Seed creates demo credentials:
- Admin: `admin / admin123456`
- User: `user / user123456`

### 6) Run backend

```bash
python manage.py runserver
```

Backend runs on `http://localhost:8000`.

---

## Frontend setup

### 1) Create environment file

Create `frontend/.env` (or copy from `frontend/.env.example`):

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 2) Install dependencies

```bash
cd frontend
npm install
```

### 3) Run frontend

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## API Summary

### Auth
- `POST /api/register/`
- `POST /api/token/`
- `POST /api/token/refresh/`

### Articles
- `GET /api/articles/`
- `GET /api/articles/?search=<query>`
- `GET /api/articles/<id>/`
- `POST /api/articles/` (admin only)
- `PUT /api/articles/<id>/` (admin only)
- `DELETE /api/articles/<id>/` (admin only)

### Comments
- `GET /api/articles/<id>/comments/`
- `POST /api/articles/<id>/comments/` (authenticated only)
- `DELETE /api/comments/<id>/` (admin only)

---

## JWT refresh flow (frontend)

- Access and refresh tokens are stored in `localStorage`.
- Axios adds `Authorization: Bearer <access>` automatically.
- If a request fails with `401`, the client tries `POST /api/token/refresh/`.
- On success: retries the original request.
- On failure: logs out, redirects to `/login`, shows snackbar error.

Admin detection:
- Backend includes `is_staff` in the token response (`/api/token/`) and as a JWT claim.
- Frontend decodes the access token payload to set `isAdmin` reliably.

---

## Architecture notes

- Backend apps: `users`, `articles`, `comments`.
- Tags are stored as a comma-separated string in `Article.tags` (e.g. `django,react,jwt`).
- Permissions:
  - Guests: view articles + comments.
  - Authenticated: can add comments.
  - Admin: can create/update/delete articles, delete comments.
- Frontend: MUI-only UI, fully responsive, Hamburger Drawer on mobile, Dark Mode, global Snackbar.
