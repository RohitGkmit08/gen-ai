import "../style/home.scss"
import { useInterview } from "../hooks/useInterview.js";
import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { loading, generateReport } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!jobDescription.trim()) {
      setError("Job description is required.");
      return;
    }
    if (!resumeFile) {
      setError("Please upload your resume (PDF).");
      return;
    }

    try {
      const report = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      if (report && report._id) {
        navigate(`/interview/${report._id}`);
      } else {
        setError("Failed to generate report. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || 
        "Something went wrong while generating the interview plan. Please try again."
      );
    }
  };

  return (
    <main className="home">
      <div className="home-header">
        <h1>Create your custom interview plan</h1>
        <p>Let our AI analyse the JD and your profile to build the best strategy</p>
      </div>

      <form onSubmit={handleSubmit} className="interview-input-grp">
        <div className="left input-group">
          <label htmlFor="jobDescription">Target job description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste the target job description details here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="right">
          <div className="input-group">
            <label htmlFor="resume">Upload resume (PDF)</label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="selfDescription">Quick self description</label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your relevant background..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn primary-btn"
            disabled={loading}
          >
            {loading ? "Generating strategy..." : "Generate interview strategy"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Home;