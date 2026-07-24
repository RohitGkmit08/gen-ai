import { useState } from "react";
import "../style/interview.scss";

// Dummy data matching backend schema structure
const mockReport = {
  matchScore: 85,
  technicalQuestions: [
    {
      id: "t1",
      question: "Can you explain how you handle database connections and schema design in a Node.js application using MongoDB?",
      intention: "To evaluate the candidate's practical experience with MongoDB, which is explicitly mentioned in the job description but not deeply detailed in the resume.",
      answer: "The candidate should discuss Mongoose ORM, connection pooling, handling connection errors gracefully, and structuring schemas for scalability and performance optimization."
    },
    {
      id: "t2",
      question: "How do you manage state and side effects in a complex React application?",
      intention: "To assess frontend architectural skills and modern React patterns.",
      answer: "The candidate should mention React hooks like useState, useEffect, useContext, and state management libraries like Redux Toolkit or Zustand if applicable, along with handling asynchronous API calls."
    },
    {
      id: "t3",
      question: "Explain the difference between SQL and NoSQL databases, and when you would choose one over the other.",
      intention: "To test core architectural knowledge regarding database scaling and structured vs unstructured data.",
      answer: "Discuss SQL for relational consistency, transactions (ACID properties), and complex joins. Discuss NoSQL (like MongoDB) for horizontal scaling, schema flexibility, and rapid prototyping."
    }
  ],
  behaviouralQuestions: [
    {
      id: "b1",
      question: "Tell me about a time when you had to troubleshoot a performance bottleneck in a full-stack web application.",
      intention: "To evaluate problem-solving abilities, technical depth across the stack, and systematic debugging skills.",
      answer: "Use the STAR method (Situation, Task, Action, Result). Describe a specific instance where an application was slow, how profiling tools (like Chrome DevTools or Node.js profilers) were used to identify the bottleneck, and the measurable improvement achieved."
    },
    {
      id: "b2",
      question: "Describe a situation where you had a disagreement with a team member on a technical approach. How did you resolve it?",
      intention: "To evaluate collaboration, conflict resolution skills, and professionalism.",
      answer: "Focus on active listening, looking at objective data or benchmarks, running quick prototypes/proof-of-concepts, and aligning on what is best for the project and user rather than personal preference."
    }
  ],
  skillGaps: [
    { skill: "MongoDB Schema Design", severity: "high" },
    { skill: "Zustand State Management", severity: "medium" },
    { skill: "Docker & Containerization", severity: "low" },
    { skill: "TypeScript Integration", severity: "low" }
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "MongoDB & NoSQL Concepts",
      tasks: [
        "Review MongoDB aggregation framework and pipelines",
        "Practice writing efficient index strategies for query optimization",
        "Implement schema validations using Mongoose ORM models"
      ]
    },
    {
      day: 2,
      focus: "React State Management & Hooks",
      tasks: [
        "Build a local global-state setup using React Context API",
        "Convert standard state management to Zustand for simplified boilerplate",
        "Review asynchronous side effects handling in React useEffect"
      ]
    },
    {
      day: 3,
      focus: "Full Stack Integration & Testing",
      tasks: [
        "Connect Express.js backend endpoints to the React client app",
        "Setup Axios interceptors for automatic credentials & error handling",
        "Write integration tests to verify authentication cookies are parsed correctly"
      ]
    }
  ]
};

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical"); 
  const [expandedQuestion, setExpandedQuestion] = useState(null); // stores question id

  const toggleQuestion = (id) => {
    setExpandedQuestion((prev) => (prev === id ? null : id));
  };

  // Helper for rendering SVG circular score progress
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (mockReport.matchScore / 100) * circumference;

  return (
    <main className="interview-page">
      <div className="interview-dashboard">
        
        {/* SECTION 1: Left Tabs */}
        <aside className="section-tabs">
          <div className="tabs-header">
            <h3>Dashboard</h3>
            <p>Interview Prep</p>
          </div>
          <nav className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === "technical" ? "active" : ""}`}
              onClick={() => { setActiveTab("technical"); setExpandedQuestion(null); }}
            >
              <span className="tab-icon">⚡</span>
              Technical Questions
            </button>
            <button 
              className={`tab-btn ${activeTab === "behavioural" ? "active" : ""}`}
              onClick={() => { setActiveTab("behavioural"); setExpandedQuestion(null); }}
            >
              <span className="tab-icon">💬</span>
              Behavioral Questions
            </button>
            <button 
              className={`tab-btn ${activeTab === "roadmap" ? "active" : ""}`}
              onClick={() => { setActiveTab("roadmap"); setExpandedQuestion(null); }}
            >
              <span className="tab-icon">🎯</span>
              Roadmap Plan
            </button>
          </nav>
        </aside>

        {/* SECTION 2: Middle Content */}
        <section className="section-content">
          <div className="content-header">
            <h2>
              {activeTab === "technical" && "Technical Interview Questions"}
              {activeTab === "behavioural" && "Behavioral Questions"}
              {activeTab === "roadmap" && "Day-by-Day Preparation Roadmap"}
            </h2>
            <p className="tab-subtitle">
              {activeTab === "technical" && "Tailored technical questions designed for the target role."}
              {activeTab === "behavioural" && "Situation-based questions using recommended STAR strategies."}
              {activeTab === "roadmap" && "Personalized timeline roadmap to complete your preparation."}
            </p>
          </div>

          <div className="content-scrollable">
            {/* Technical Questions */}
            {activeTab === "technical" && (
              <div className="questions-list">
                {mockReport.technicalQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestion === q.id;
                  return (
                    <div 
                      key={q.id} 
                      className={`question-card ${isExpanded ? "expanded" : ""}`}
                      onClick={() => toggleQuestion(q.id)}
                    >
                      <div className="question-summary">
                        <span className="question-number">Q{idx + 1}</span>
                        <h4>{q.question}</h4>
                        <span className="arrow-icon">{isExpanded ? "▼" : "▶"}</span>
                      </div>
                      
                      {isExpanded && (
                        <div className="question-details" onClick={(e) => e.stopPropagation()}>
                          <div className="detail-section">
                            <h5>Intention</h5>
                            <p>{q.intention}</p>
                          </div>
                          <div className="detail-section">
                            <h5>Model Answer</h5>
                            <p>{q.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Behavioural Questions */}
            {activeTab === "behavioural" && (
              <div className="questions-list">
                {mockReport.behaviouralQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestion === q.id;
                  return (
                    <div 
                      key={q.id} 
                      className={`question-card ${isExpanded ? "expanded" : ""}`}
                      onClick={() => toggleQuestion(q.id)}
                    >
                      <div className="question-summary">
                        <span className="question-number">Q{idx + 1}</span>
                        <h4>{q.question}</h4>
                        <span className="arrow-icon">{isExpanded ? "▼" : "▶"}</span>
                      </div>
                      
                      {isExpanded && (
                        <div className="question-details" onClick={(e) => e.stopPropagation()}>
                          <div className="detail-section">
                            <h5>Intention</h5>
                            <p>{q.intention}</p>
                          </div>
                          <div className="detail-section">
                            <h5>STAR Strategy</h5>
                            <p>{q.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Roadmap */}
            {activeTab === "roadmap" && (
              <div className="roadmap-timeline">
                {mockReport.preparationPlan.map((dayPlan) => (
                  <div key={dayPlan.day} className="timeline-day-card">
                    <div className="day-badge">Day {dayPlan.day}</div>
                    <div className="day-content">
                      <h4>{dayPlan.focus}</h4>
                      <ul className="tasks-list">
                        {dayPlan.tasks.map((task, index) => (
                          <li key={index} className="task-item">
                            <input type="checkbox" id={`task-${dayPlan.day}-${index}`} />
                            <label htmlFor={`task-${dayPlan.day}-${index}`}>{task}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Right Stats Panel */}
        <aside className="section-stats">
          <div className="stats-box match-score-box">
            <h4>Match Score</h4>
            
            <div className="score-ring-wrapper">
              <svg className="score-ring" width="120" height="120">
                <circle
                  className="ring-bg"
                  cx="60"
                  cy="60"
                  r={radius}
                  strokeWidth={strokeWidth}
                />
                <circle
                  className="ring-bar"
                  cx="60"
                  cy="60"
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="score-number">{mockReport.matchScore}%</div>
            </div>
            
            <p className="score-description">
              Candidate profile matches target JD requirements.
            </p>
          </div>

          <div className="stats-box skill-gaps-box">
            <h4>Skills Gap Analysis</h4>
            <div className="skills-list">
              {mockReport.skillGaps.map((sg, idx) => (
                <div key={idx} className="skill-gap-item">
                  <span className="skill-name">{sg.skill}</span>
                  <span className={`severity-badge ${sg.severity}`}>
                    {sg.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default Interview;