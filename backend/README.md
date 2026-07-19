# Gen-AI Resume Rater & Optimizer - Backend

This is the Node.js Express backend service for the **Gen-AI Resume Rater & Interview Optimizer** platform.

## Features & Tech Stack
- **Framework**: Node.js & Express 5
- **Generative AI**: `@google/genai` (Gemini 3.5 Flash) with Zod structured output schema (`zod`, `zod-to-json-schema`)
- **PDF Extraction**: `pdf-parse` & `multer` (memory storage)
- **Database**: MongoDB & Mongoose
- **Authentication**: JSON Web Token (`jsonwebtoken`), `bcryptjs`, cookie handling (`cookie-parser`), and token blacklisting

## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & issue JWT
- `GET /api/auth/get-me` - Fetch authenticated user info
- `GET /api/auth/logout` - Logout & blacklist JWT token
- `POST /api/interview/` - Submit PDF resume, job description & self-description to generate AI report

## Environment Variables
Create a `.env` file in `backend/`:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/genai
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

## Running Development Server
```bash
npm install
npm run dev
```

For full system installation details, see the main [root README.md](../README.md).
