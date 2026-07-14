# Gen-AI Resume Rater & Optimizer (Work In Progress)

A modern full-stack web application designed to evaluate, rate, and provide AI-driven optimization feedback on professional resumes using Generative AI.

> **Project Status:** This project is currently under active development. The user authentication module (User Registration, Login, Logout, and Auth Guards) is fully implemented. The Gen-AI resume analysis and rating functionality are planned in the next phases of development.

---

## Implemented Features
- **User Registration**: Create a new account with email, username, and password. Passwords are securely hashed before storage.
- **User Login**: Session-based login with JSON Web Tokens (JWT) stored securely in HTTP-only cookies.
- **Session Persistence**: Automatic token validation and user details fetching via middleware to maintain user state.
- **Secure Logout & Token Invalidations**: Active JWT token blacklisting in MongoDB database upon logging out.
- **Router Guards**: Protected routes (`/` for authenticated users) and guest-only routes (`/login`, `/register`) implemented on the frontend.

---

## Technology Stack
### Frontend
- **Framework**: [React.js](https://react.dev/) (v19) powered by [Vite](https://vite.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (v8)
- **HTTP Client**: [Axios](https://axios-http.com/) (with credential sharing for HTTP-only cookies)
- **Styling**: [Sass (SCSS)](https://sass-lang.com/) for modern, structured styles
- **State Management**: React Context API for global Authentication state

### Backend
- **Runtime Environment**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) Object Modeling
- **Security & Authentication**:
  - `bcryptjs` for secure password hashing
  - `jsonwebtoken` (JWT) for secure authentication tokens
  - `cookie-parser` for handling HTTP-only cookie operations
  - CORS integration for safe cross-origin resource sharing

---

## Repository Structure
```text
genai/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection setup
│   │   ├── controllers/     # Authentication & request handlers
│   │   ├── middleware/      # Auth middleware for route protection
│   │   ├── models/          # MongoDB User & Blacklist Schemas
│   │   ├── routes/          # Express API route definitions
│   │   └── app.js           # Express App configuration
│   ├── server.js            # Node server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/        # Login, Register pages, contexts, services
    │   │   └── ai/          # Placeholder for resume rating features
    │   ├── styles/          # SCSS styling rules
    │   ├── app.routes.jsx   # Client-side routing configuration
    │   ├── App.jsx          # Root Component wrapping Context and Router
    │   └── main.jsx         # Vite entry point
    └── package.json
```

---

## Getting Started & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection URI

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Run the backend server in development mode:
   ```bash
   npm run dev
   ```
   *The server will start running on [http://localhost:3000](http://localhost:3000).*

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client app will start running on [http://localhost:5173](http://localhost:5173).*

---

## Roadmap / Next Steps
1. **Resume File Upload**: Support for PDF and DOCX formats.
2. **Text Parsing & Extraction**: Extract text contents from uploaded resume files.
3. **Gen-AI Evaluation Engine**: Integrate with Google Gemini API to rate resumes, benchmark against job descriptions, and highlight key strengths and gaps.
4. **Interactive Dashboard**: Track resume rating history, download optimized resumes, and display clean scoring charts.
