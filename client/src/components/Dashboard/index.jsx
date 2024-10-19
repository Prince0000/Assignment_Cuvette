import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import JobForm from "../JobForm";
import JobList from "../JobList";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const handleJobCreated = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="home-icon">
          <FontAwesomeIcon icon={faHome} />
        </div>
      </nav>

      <div className="main-content">
        <div className="content">
          <div className="job-form-container">
            <JobForm onJobCreated={handleJobCreated} />
          </div>
          <div className="job-list-container">
            <JobList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
