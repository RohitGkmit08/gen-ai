import "../style/home.scss"

const Home = () => {
  return (
    <main className="home">
      
      <div className="home-header">
        <h1>Create your custom interview plan</h1>
        <p>Let our AI analyse the JD and your profile to build the best strategy</p>
      </div>

      <div className="interview-input-grp">

        <div className="left input-group">
            <label htmlFor="jobDescription">Target job description</label>
            <textarea name="jobDescription" id="jobDescription" placeholder="Paste the target job description details here..."></textarea>
        </div>

        <div className="right">
            <div className="input-group">
                <label htmlFor="resume">Upload resume (PDF)</label>
                <input type="file" name="resume" id="resume" accept=".pdf"/>
            </div>

            <div className="input-group">
              <label htmlFor="selfDescription">Quick self description</label>
              <textarea name="selfDescription" id="selfDescription" placeholder="Briefly describe your relevant background..."></textarea>
            </div>

            <button className="btn primary-btn">Generate interview strategy</button>
        </div>

      </div>
    
    </main>
  )
}

export default Home