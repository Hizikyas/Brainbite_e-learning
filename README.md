# BrainBite - AI-Powered E-Learning Platform

A lightweight e-learning MVP that allows users to log in, browse courses, view course details, and generate new courses using AI.

## Tech Stack

- **Frontend**: Nuxt 3 with TypeScript, Tailwind CSS, Pinia
- **Backend**: NestJS with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenAI (GPT-4o-mini)
- **Deployment**: Vercel/Netlify (frontend), Render/Railway (backend)

## Project Structure

```
Brainbite_e-learning/
├── frontend/          # Nuxt 3 application
│   ├── app/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── middleware/
│   │   └── pages/
│   └── nuxt.config.ts
├── backend/           # NestJS application
│   ├── src/
│   │   ├── ai/        # AI service for course generation
│   │   ├── auth/      # Authentication guard
│   │   ├── courses/   # Course management
│   │   └── prisma/    # Database service
│   └── prisma/
│       └── schema.prisma
└── README.md
```

## Features

### Authentication
- Email/password authentication via Supabase
- Session management
- Protected routes with middleware

### Course Management
- Browse all published courses
- View course details with 4 content pages (lessons)
- Generate new courses using AI
- Course subjects, descriptions, and metadata

### Course Content
- 4 structured lesson pages per course
- Markdown content rendering
- Tab-based navigation between lessons
- Text-to-Speech (TTS) using Web Speech API

### Assessment
- 2 MCQ questions per course
- Answer selection and validation
- Score calculation and feedback
- Visual feedback for correct/incorrect answers

## Local Setup

### Prerequisites

- Node.js 18+ and npm/pnpm
- Supabase account and project
- OpenAI API key
- PostgreSQL database (via Supabase)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the `backend` directory:
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

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations (if you have migrations)
npx prisma migrate dev

# Or push schema directly
npx prisma db push
```

5. Start the backend server:
```bash
npm run start:dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
Create a `.env` file in the `frontend` directory:
```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NUXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

4. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

The frontend will run on `http://localhost:3000`

## Database Schema

The application uses the following main tables:

- **courses**: Course metadata (title, subject, description, published status)
- **course_pages**: Individual lesson pages (4 per course)
- **questions**: MCQ questions (2 per course)
- **question_options**: Answer options for each question
- **attempts**: User quiz attempts (optional)

See `backend/prisma/schema.prisma` for the complete schema.

## API Endpoints

### Backend (NestJS)

All endpoints require authentication via Bearer token (Supabase JWT).

- `GET /courses` - List all published courses (and user's unpublished courses)
- `GET /courses/:id` - Get course details with pages and questions
- `POST /courses/generate` - Generate a new course using AI
  - Body: `{ subject: string, level?: string, age_range?: string, language?: string }`

## Deployment

### Frontend (Vercel/Netlify)

1. Connect your GitHub repository
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/.output`
4. Configure environment variables:
   - `NUXT_PUBLIC_SUPABASE_URL`
   - `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NUXT_PUBLIC_BACKEND_URL` (your deployed backend URL)

### Backend (Render/Railway/Fly.io)

1. Connect your GitHub repository
2. Set build command: `cd backend && npm install && npm run build`
3. Set start command: `cd backend && npm run start:prod`
4. Configure environment variables (same as local `.env`)
5. Ensure CORS is configured for your frontend domain

## Testing

### Backend Tests

```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage
```

### Frontend Tests

```bash
cd frontend
npm run test          # Unit tests (if configured)
```

## Key Features Implementation

### Authentication Flow
1. User signs up/logs in via Supabase Auth
2. Frontend receives JWT token
3. Token is sent to backend in Authorization header
4. Backend verifies token using Supabase client
5. Protected routes are accessible

### Course Generation Flow
1. User fills in course subject (and optional metadata)
2. Frontend sends request to `/courses/generate`
3. Backend calls OpenAI API with structured prompt
4. AI generates JSON with course content (4 pages, 2 questions)
5. Backend validates and stores in database
6. Frontend redirects to new course page

### Text-to-Speech
- Uses browser's Web Speech API
- Activated via "Listen to this lesson" button
- Cleans markdown syntax before speaking
- Works on modern browsers (Chrome, Edge, Safari)

## Troubleshooting

### Backend Issues

- **Database connection errors**: Verify `DATABASE_URL` is correct and database is accessible
- **JWT verification fails**: Ensure `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- **AI generation fails**: Check `OPENAI_API_KEY` and API quota

### Frontend Issues

- **Authentication not working**: Verify Supabase environment variables
- **API calls failing**: Check `NUXT_PUBLIC_BACKEND_URL` and CORS settings
- **TTS not working**: Ensure browser supports Web Speech API

## Development Notes

- The backend uses Prisma ORM for database access
- Supabase JWT tokens are verified using Supabase client (not NestJS JWT)
- Route protection is handled via Nuxt middleware
- AI prompts are structured to ensure consistent JSON responses
- All course content is stored as Markdown

## License

Private - Assessment Project
