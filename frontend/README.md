# Gen-AI Resume Rater & Optimizer - Frontend

This is the React 19 client application for the **Gen-AI Resume Rater & Interview Optimizer** platform.

## Tech Stack & Architecture
- **Framework**: React 19 & Vite 8
- **Routing**: React Router v8
- **Styling**: Sass (SCSS)
- **HTTP Client**: Axios (with centralized `apiClient.js` configured with `withCredentials: true`)
- **State Management**: React Context API (`AuthProvider`)

## Available Routes
- `/login`: User authentication login page
- `/register`: User registration page
- `/`: Protected home dashboard

## Running Development Server
```bash
npm install
npm run dev
```

For complete system setup and backend API documentation, see the main [root README.md](../README.md).
