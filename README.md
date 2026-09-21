# Matanuska Employee Lifecycle

Production-ready Next.js app for tracking **employee onboarding** and **offboarding**.

> **Security warning:** v1 has **no authentication**. Do not deploy publicly until you add auth (e.g. NextAuth, Clerk, or Vercel Auth).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma ORM + SQLite locally (`prisma/dev.db`)
- Ready for Neon Postgres or Turso in production

## Features

- Dashboard with counts for active onboardings, outstanding offboardings, and completed records
- Onboarding & offboarding: list, search, filter by status, create, edit, detail, delete
- Statuses:
  - Onboarding: `Initiated`, `In Progress`, `Complete`
  - Offboarding: `Outstanding`, `In Progress`, `Complete`
- Offboarding exit checklist (checkboxes): Exit Interview, Equipment Return, System Access Removed, Final Paycheck, Knowledge Transfer

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env and create the database
cp .env.example .env
npm run db:push
npm run db:seed

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run db:push` | Push Prisma schema to the database |
| `npm run db:seed` | Seed sample onboarding + offboarding rows |
| `npm run db:studio` | Open Prisma Studio |

## Sample seed data

- **Onboarding:** EMP001 John Smith (Warehouse Supervisor) — status Initiated
- **Offboarding:** EMP002 Jane Doe (ICT) — status Outstanding; checklist No/No/Yes/No/No

## Push to GitHub

Target repo: [https://github.com/KevinBrits14/employee-lifecycle](https://github.com/KevinBrits14/employee-lifecycle)

If the remote is empty (or you are creating it for the first time):

```bash
cd employee-lifecycle   # after unzipping
git init
git add .
git commit -m "Initial commit: Matanuska Employee Lifecycle app"
git branch -M main
git remote add origin https://github.com/KevinBrits14/employee-lifecycle.git
git push -u origin main
```

If the repo already exists and you only need to add a remote:

```bash
git remote add origin https://github.com/KevinBrits14/employee-lifecycle.git
git push -u origin main
```

Use SSH (`git@github.com:KevinBrits14/employee-lifecycle.git`) if you prefer.

## Deploy on Vercel

1. Push the repo to GitHub (steps above).
2. Import the project in [Vercel](https://vercel.com) → Framework: Next.js.
3. Set environment variables (see below).
4. Deploy. Build command: `prisma generate && next build` (or rely on `postinstall`).

SQLite file storage is **not durable** on Vercel’s serverless filesystem. For production, use Neon or Turso.

### Neon Postgres (recommended)

1. Create a database at [Neon](https://neon.tech) and copy the connection string.
2. In `prisma/schema.prisma`, change:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Set `DATABASE_URL` in Vercel to your Neon URL (use the pooled URL if available).
4. Locally (or in a CI step): `npx prisma db push` then `npm run db:seed`.
5. Redeploy.

### Turso (SQLite at the edge)

1. Create a database at [Turso](https://turso.tech).
2. Follow current Prisma + Turso adapter docs (`@libsql/client`, `@prisma/adapter-libsql`).
3. Set `DATABASE_URL` / `TURSO_AUTH_TOKEN` in Vercel per those docs.

See comments in `.env.example`.

## Project structure

```
app/
  page.tsx                 # Dashboard
  onboarding/              # List, new, [id], [id]/edit + server actions
  offboarding/             # List, new, [id], [id]/edit + server actions
components/                # Nav, forms, badges, search
lib/prisma.ts              # Prisma client singleton
prisma/schema.prisma       # Data model
prisma/seed.ts             # Sample data
```

## License

Private / internal use for Matanuska unless otherwise stated.
