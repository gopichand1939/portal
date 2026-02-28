# Backend (Login API)

Clean structure: one file for models, one for controllers, one for routes.

## Setup

```bash
cd Backend
cp .env.example .env   # then set DATABASE_URL, JWT_SECRET, PORT
npm install
npm start
```

Server runs on `PORT` (default 15013).

**Create the `users` table in your remote DB** (e.g. Neon SQL Editor). Run the SQL in `scripts/create-users-table.sql`.

## Login API

| Method | Path | Body | Auth |
|--------|------|------|------|
| POST | /api/auth/register | `{ "email", "password", "name?" }` | - |
| POST | /api/auth/login | `{ "email", "password" }` | - |
| GET | /api/auth/me | - | Bearer &lt;token&gt; |

- **Register**: returns `{ user, token }`
- **Login**: returns `{ user, token }`
- **Me**: returns `{ user }` (requires `Authorization: Bearer <token>`)

## Structure

- `config/db.js` – PostgreSQL (Neon) pool
- `models/models.js` – all models (User)
- `controller/controller.js` – all controllers (auth)
- `routes/routes.js` – all routes (auth)
- `middleware/authMiddleware.js` – JWT verify
- `app.js` – Express app
- `server.js` – start server
- `scripts/create-users-table.sql` – run this in your remote DB to create `users`
