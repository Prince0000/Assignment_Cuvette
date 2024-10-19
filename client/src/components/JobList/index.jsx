import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingEmails, setSendingEmails] = useState(false);
  const [emailStatus, setEmailStatus] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
    const intervalId = setInterval(fetchJobs, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSendAllEmails = async (jobId) => {
    setSendingEmails(true);
    setEmailStatus({});
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/jobs/send-all-emails",
        { jobId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Server response:", response.data);
      setEmailStatus(response.data.emailStatus);
      alert("Email sending process completed. Check the status for details.");
    } catch (err) {
      console.error(
        "Error sending emails:",
        err.response ? err.response.data : err.message
      );
      alert(
        `Failed to send emails. Error: ${
          err.response ? err.response.data.message : err.message
        }`
      );
    } finally {
      setSendingEmails(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="job-list">
      <h2>Your Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs created yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Description</th>
                <th>Experience Level</th>
                <th>Candidates</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td data-label="Job Title">{job.jobTitle}</td>
                  <td data-label="Description">{job.jobDescription}</td>
                  <td data-label="Experience Level">{job.experienceLevel}</td>
                  <td data-label="Candidates">
                    {job.candidates.length > 0 ? (
                      <ul>
                        {job.candidates.map((candidate, index) => (
                          <li key={index}>
                            {candidate}
                            {emailStatus[candidate] && (
                              <span
                                className={`email-status ${emailStatus[candidate]}`}
                              >
                                {emailStatus[candidate]}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No candidates yet"
                    )}
                  </td>
                  <td data-label="End Date">
                    {new Date(job.endDate).toLocaleDateString()}
                  </td>
                  <td data-label="Actions">
                    <button
                      onClick={() => handleSendAllEmails(job._id)}
                      className="send-all-emails-btn"
                      disabled={job.candidates.length === 0 || sendingEmails}
                    >
                      {sendingEmails ? "Sending..." : "Send Emails"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobList;
