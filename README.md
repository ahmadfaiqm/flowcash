# projectBLN1 — Express REST API Boilerplate (Feature Modules)

Boilerplate production-ready: Express 4.x, PostgreSQL + Prisma, JWT auth, validasi Zod,
logging Winston, rate-limit, Jest + Supertest, ESLint + Prettier.

## Struktur

```text
src/
  app.js, server.js
  config/{env.js, database.js}
  common/
    logger.js
    middlewares/{asyncHandler, notFound, errorHandler, validate, auth, rateLimiter}
    utils/{ApiError, ApiResponse, pagination}
  modules/
    health/   GET /api/v1/health (publik)
    auth/     POST /api/v1/auth/register|login (publik), GET /api/v1/auth/me (Bearer)
    users/    GET /api/v1/users (publik, paginasi ?page&limit),
              GET /api/v1/users/:id + POST /api/v1/users (Bearer)
prisma/schema.prisma   # model User + Post contoh
```

## Run

1. Install: `npm.cmd install` (Windows: pakai `npm.cmd`, karena `npm.ps1` sering diblokir ExecutionPolicy)
2. `cp .env.example .env` lalu sesuaikan `DATABASE_URL` dan `JWT_SECRET`
3. `npx prisma migrate dev` (butuh PostgreSQL lokal; bila belum ada, API tetap jalan untuk endpoint non-DB)
4. `npm run dev` → http://localhost:3000 — health di `/api/v1/health`, legacy `GET /` tetap ada

## Test & Quality

- `npm test` — Jest + Supertest (users/auth memakai mock repository; butuh `prisma generate` sekali setelah install)
- `npx prisma validate` — validasi schema
- `npm run lint` / `npm run format`

## Response envelope

Sukses: `{ success: true, message, data, meta? }` — Error: `{ success: false, message, details? }`.
Route tak dikenal → 404, validasi gagal → 400, token hilang/kadaluarsa → 401, email duplikat → 409.
