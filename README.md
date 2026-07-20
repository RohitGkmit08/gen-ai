# Gen-AI Resume Rater & Interview Optimizer

A modern full-stack web application powered by **Google Gemini 3.5 Flash** designed to parse resumes, evaluate job description compatibility, detect skill gaps, generate tailored technical & behavioral interview questions, and create personalized step-by-step preparation roadmaps.

---

## Key Features

### AI Evaluation & Interview Preparation Engine
- **PDF Resume Parsing**: Automatic in-memory text extraction from uploaded PDF resumes using `pdf-parse` and `multer`.
- **Comprehensive Profile Matching**: Evaluates candidate resumes alongside self-descriptions against target job requirements.
- **Structured AI Outputs (Zod Schema)**: Leverages `@google/genai` with strict Zod structured JSON schemas to deliver:
  - **Match Score**: Percentage compatibility rating (0-100%).
  - **Candidate Strengths**: Key candidate advantages relevant to the role.
  - **Tailored Technical Questions**: Expected technical questions with interviewer intention and answer guidelines.
  - **Behavioral Questions**: Scenario-based questions with recommended STAR-method answering strategies.
  - **Skill Gap Analysis**: Categorized missing skills and technologies rated by severity level (`low`, `medium`, `high`).
  - **Day-by-Day Preparation Roadmap**: Structured daily study plan with specific actionable tasks.
- **Report Persistence**: Automatically saves generated interview reports to MongoDB for user review.

### Authentication & Security
- **User Management**: Registration, login, user profile retrieval, and secure logout.
- **Password Hashing**: Passwords stored securely using `bcryptjs`.
- **JWT Session Security**: JSON Web Tokens supported via both HTTP-only cookies and `Authorization: Bearer <token>` headers.
- **Token Blacklisting**: Database-backed JWT token invalidation in MongoDB upon user logout.
- **Client Route Guards**: Protected routes (`/`) and guest-only routes (`/login`, `/register`) managed via React Router.

---

## Technology Stack

### Backend
- **Runtime & Framework**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) (v5)
- **Generative AI SDK**: [`@google/genai`](https://www.npmjs.com/package/@google/genai) using model `gemini-3.5-flash`
- **Schema Validation**: [Zod](https://zod.dev/) & `zod-to-json-schema` for structured AI output parsing
- **Database & Modeling**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **File & PDF Processing**: `multer` (memory storage) & `pdf-parse`
- **Security**: `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `cors`, `dotenv`

### Frontend
- **Library & Build Tool**: [React 19](https://react.dev/) powered by [Vite 8](https://vite.dev/)
- **Routing**: [React Router v8](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/) (with credential sharing for HTTP-only cookies)
- **Styling**: [Sass (SCSS)](https://sass-lang.com/)
- **State Management**: React Context API (`AuthProvider`)

---

## Repository Structure

```text
genai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection setup
│   │   ├── controllers/
│   │   │   ├── auth.controller.js    # Auth request handlers (register, login, logout, getMe)
│   │   │   └── interview.controller.js # PDF parsing & AI report generation handler
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js   # JWT authentication & token blacklist guard
│   │   │   └── file.middleware.js   # Multer file upload middleware (3MB PDF limit)
│   │   ├── models/
│   │   │   ├── user.model.js        # User Mongoose schema
│   │   │   ├── blacklist.model.js   # JWT Token blacklist schema
│   │   │   └── interview.model.js   # Interview report schema (strengths, questions, gaps, plan)
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # Auth API route definitions
│   │   │   └── interview.routes.js  # Interview API route definitions
│   │   └── services/
│   │       ├── ai.service.js        # Google Gemini AI integration & Zod response schema
│   │       └── temp.js              # Development test fixtures
│   ├── server.js                    # Express server entry point
│   ├── package.json
│   └── README.md
└── frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/                # Auth components, context, forms, hooks & pages
    │   │   └── ai/                  # AI dashboard & report view components (in progress)
    │   ├── services/
    │   │   └── apiClient.js         # Centralized Axios instance
    │   ├── styles/                  # SCSS styles and themes
    │   ├── app.routes.jsx           # React Router route configuration
    │   ├── App.jsx                  # Root App component
    │   └── main.jsx                 # Client entry point
    ├── package.json
    └── README.md
```

---

## API Endpoints Overview

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user (`email`, `username`, `password`) |
| `POST` | `/api/auth/login` | Public | Authenticate credentials & set JWT token |
| `GET` | `/api/auth/get-me` | Private | Retrieve current user profile |
| `GET` | `/api/auth/logout` | Private | Blacklist JWT token & clear auth cookie |

### Interview & AI Evaluation (`/api/interview`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/interview/` | Private | Upload resume (PDF) + `jobDescription` + `selfDescription` (optional) to generate AI evaluation report |

#### Sample Request (`POST /api/interview/`):
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `resume`: PDF File (up to 3MB)
  - `jobDescription`: Target job requirements string (Required)
  - `selfDescription`: Candidate background overview string (Optional)

---

## Getting Started & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection URI
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### 1. Environment Configuration
Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/genai_resume_rater
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Backend server will start running on [http://localhost:3000](http://localhost:3000).*

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend dev server will start running on [http://localhost:5173](http://localhost:5173).*

---

## Author & License

Developed as part of the **Gen-AI Resume Rater & Interview Optimizer** project.
Distributed under the MIT License.
