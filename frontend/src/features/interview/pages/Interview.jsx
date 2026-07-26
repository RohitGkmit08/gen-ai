import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/interview.scss";

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { report, loading, generateReportById } = useInterview();

  const [activeTab, setActiveTab] = useState("technical"); 
  const [expandedQuestion, setExpandedQuestion] = useState(null); 

  useEffect(() => {
    if (interviewId && (!report || report._id !== interviewId)) {
      generateReportById(interviewId).catch((err) => {
        console.error("Failed to load interview report:", err);
      });
    }
  }, [interviewId, report, generateReportById]);

  const toggleQuestion = (idx) => {
    setExpandedQuestion((prev) => (prev === idx ? null : idx));
  };

  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  if (loading && !report) {
    return (
      <div className="interview-loading">
        <div className="spinner"></div>
        <p>Loading your interview preparation plan...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="interview-error">
        <p>Could not load the interview report. Please check if the ID is valid.</p>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const matchScore = report.matchScore || 0;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  return (
    <main className="interview-page">
      <div className="interview-dashboard">
        
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

            {activeTab === "technical" && (
              <div className="questions-list">
                {report.technicalQuestions && report.technicalQuestions.length > 0 ? (
                  report.technicalQuestions.map((q, idx) => {
                    const isExpanded = expandedQuestion === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`question-card ${isExpanded ? "expanded" : ""}`}
                        onClick={() => toggleQuestion(idx)}
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
                  })
                ) : (
                  <p className="no-data">No technical questions available.</p>
                )}
              </div>
            )}

            {activeTab === "behavioural" && (
              <div className="questions-list">
                {report.behaviouralQuestions && report.behaviouralQuestions.length > 0 ? (
                  report.behaviouralQuestions.map((q, idx) => {
                    const isExpanded = expandedQuestion === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`question-card ${isExpanded ? "expanded" : ""}`}
                        onClick={() => toggleQuestion(idx)}
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
                  })
                ) : (
                  <p className="no-data">No behavioral questions available.</p>
                )}
              </div>
            )}

            {activeTab === "roadmap" && (
              <div className="roadmap-timeline">
                {report.preparationPlan && report.preparationPlan.length > 0 ? (
                  report.preparationPlan.map((dayPlan, idx) => (
                    <div key={idx} className="timeline-day-card">
                      <div className="day-badge">Day {dayPlan.day}</div>
                      <div className="day-content">
                        <h4>{dayPlan.focus}</h4>
                        <ul className="tasks-list">
                          {dayPlan.tasks && dayPlan.tasks.map((task, index) => (
                            <li key={index} className="task-item">
                              <input type="checkbox" id={`task-${dayPlan.day}-${index}`} />
                              <label htmlFor={`task-${dayPlan.day}-${index}`}>{task}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No roadmap tasks available.</p>
                )}
              </div>
            )}
          </div>
        </section>

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
              <div className="score-number">{matchScore}%</div>
            </div>
            
            <p className="score-description">
              Candidate profile matches target JD requirements.
            </p>
          </div>

          <div className="stats-box skill-gaps-box">
            <h4>Skills Gap Analysis</h4>
            <div className="skills-list">
              {report.skillGaps && report.skillGaps.length > 0 ? (
                report.skillGaps.map((sg, idx) => (
                  <div key={idx} className="skill-gap-item">
                    <span className="skill-name">{sg.skill}</span>
                    <span className={`severity-badge ${sg.severity}`}>
                      {sg.severity}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-data">No skill gaps identified.</p>
              )}
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default Interview;