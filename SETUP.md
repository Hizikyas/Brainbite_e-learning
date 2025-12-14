# Quick Setup Guide

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following:

```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NUXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

**To get your Supabase credentials:**
1. Go to https://supabase.com/dashboard
2. Select your project (or create a new one)
3. Go to Settings → API
4. Copy the "Project URL" → use as `NUXT_PUBLIC_SUPABASE_URL`
5. Copy the "anon public" key → use as `NUXT_PUBLIC_SUPABASE_ANON_KEY`

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres

# Supabase
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=sk-your-openai-key
OPENAI_MODEL=gpt-4o-mini

# Server
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

**To get your Supabase database URL:**
1. Go to Supabase Dashboard → Settings → Database
2. Copy the connection string under "Connection string" → use as `DATABASE_URL`
3. For `DIRECT_URL`, use the same connection string but change port from 6543 to 5432

**To get your Service Role Key:**
1. Go to Supabase Dashboard → Settings → API
2. Copy the "service_role" key (keep this secret!) → use as `SUPABASE_SERVICE_ROLE_KEY`

**To get your OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new API key → use as `OPENAI_API_KEY`

## After Setting Up Environment Variables

1. **Backend:**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   npm run start:dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Troubleshooting

- **"Supabase URL and API key are required"**: Make sure you created the `.env` file in the `frontend` directory with the correct variable names
- **"Cannot find module"**: Run `npm install` in both frontend and backend directories
- **Database connection errors**: Verify your `DATABASE_URL` is correct and your Supabase project is active
