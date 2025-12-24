# Next Logbook

Simple learning log app built with Next.js (App Router), Prisma 7, and PostgreSQL.

## Setup

1) Install dependencies:
```bash
npm install
```

2) Set your database URL in `.env`:
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/next_logbook?schema=public"
```

3) Run migrations and generate client:
```bash
npx prisma migrate dev --name init
```

4) Start the dev server:
```bash
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` logs list (ISR)
- `/logs/new` create form (client component)
- `/logs/[id]` log detail (SSR)
- `/dashboard` server component stats
