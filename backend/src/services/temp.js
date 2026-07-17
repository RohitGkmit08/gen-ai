const resume = `
Rohit Sinha
Full-Stack Developer
Udaipur, India

Professional Summary:
Full-Stack Developer with hands-on experience building backend systems and web applications using React, TypeScript, Node.js, and MongoDB.
Experienced with RBAC workflows, audit logging, double-entry ledger systems, transaction handling, payment integrations using Razorpay, and HMAC-SHA256 verification.
Solved 300+ LeetCode problems and 150+ CodeChef problems.

Technical Skills:
- Languages: JavaScript (ES6+), TypeScript, C++
- Frontend: React.js, Redux Toolkit, HTML5, CSS3, Vite
- Backend: Node.js, Express.js, REST APIs, JWT Authentication, OAuth2
- Database: MongoDB, Mongoose, MongoDB Atlas
- Testing: Vitest, React Testing Library
- DevOps: Docker, AWS EC2, Vercel, Railway, Render, Git, GitHub, Postman, pnpm

Experience:
Frontend Developer Intern | GKM IT
Sept 2025 - Mar 2026

- Built RBAC and workflow state transitions into a Jira-like task management platform.
- Developed a blogging platform with JWT authentication and admin moderation workflows.
- Designed reusable React components with debounced search and async pagination.
- Improved MongoDB query performance and managed deployments on AWS EC2.
- Wrote unit and integration tests using Vitest and React Testing Library.

Projects:

1. SwiftCart
Tech Stack: React, Redux Toolkit, Node.js, Express, MongoDB, Razorpay, Cloudinary
- Integrated Razorpay payments with backend HMAC-SHA256 validation.
- Implemented OTP email verification.
- Built admin analytics dashboard.
- Managed inventory updates using transactional flows.

2. Ledger System
Tech Stack: Node.js, Express, MongoDB, Mongoose
- Implemented double-entry bookkeeping.
- Used MongoDB transactions and idempotency keys.
- Added Gmail OAuth2 email notifications.

3. Full-Stack Blog Platform
Tech Stack: React, Vite, Node.js, Express, MongoDB, JWT
- JWT authentication.
- Admin moderation dashboard.
- Automated notification workflows.

4. Jira Task Manager
Tech Stack: React, TypeScript, Vite
- Kanban board with drag-and-drop.
- Workflow state machine.
- Role based access control and audit logs.

Achievements:
- 300+ LeetCode problems solved.
- 150+ CodeChef problems solved.
- NPTEL Certifications in Discrete Mathematics and Probability & Statistics.
`

const selfDescription = `
I am a full-stack developer who enjoys building systems that solve real-world problems rather than simple CRUD applications.

My primary stack consists of React, TypeScript, Node.js, Express, and MongoDB. I have experience building complete products from frontend interfaces to backend APIs, database design, deployment, and monitoring.

I particularly enjoy backend engineering challenges such as:
- RBAC authorization systems
- Audit logging
- Double-entry ledger design
- Atomic transactions
- Idempotency handling
- Payment processing
- Caching and performance optimization

I have deployed applications on AWS EC2, Vercel, Railway, and Render, and I am comfortable working with Git workflows, pull requests, and production deployments.

I care about writing maintainable code, designing reusable components, and building systems that remain reliable under real-world edge cases.

Outside of development, I actively practice Data Structures and Algorithms and have solved more than 300 problems on LeetCode and 150 problems on CodeChef.

Currently, I am looking for opportunities in Frontend Engineering, Full-Stack Development, or Backend Engineering where I can contribute to product development while continuing to grow as an engineer.
`

const jobDescription = `
Position: Full Stack Engineer

Responsibilities:
- Build and maintain scalable React and Node.js applications.
- Design secure REST APIs and backend services.
- Implement authentication and authorization mechanisms.
- Work with databases and optimize queries for performance.
- Collaborate with designers, product managers, and engineers.
- Write tests and participate in code reviews.
- Deploy and maintain production applications.

Requirements:
- Strong JavaScript and TypeScript knowledge.
- Experience with React and modern frontend tooling.
- Experience with Node.js and Express.js.
- Understanding of MongoDB and database design.
- Familiarity with JWT authentication and RBAC systems.
- Knowledge of Git workflows and CI/CD practices.

Preferred Skills:
- Experience with payment integrations such as Razorpay or Stripe.
- Knowledge of Docker and cloud deployment.
- Experience with Redis caching.
- Understanding of transactional systems and distributed architectures.
- Familiarity with testing frameworks and automated testing.

Nice to Have:
- Experience with GraphQL.
- Experience building financial systems or workflow engines.
- Strong DSA and problem-solving skills.
`

module.exports = { resume, selfDescription, jobDescription };
