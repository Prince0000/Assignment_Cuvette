import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JobForm.css";
import Loader from "../Loader";
import AlertModal from "../AlertModal";

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    candidates: [],
    endDate: "",
    createdBy: null, // Initialize as null
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({
        show: true,
        message: "Please log in to create a job.",
        type: "error",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      // Decode the token to get the user ID
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setFormData((prevData) => ({
        ...prevData,
        createdBy: decodedToken.userId, // This should be a valid ObjectId string
      }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      // Ensure createdBy is set before sending the request
      if (!formData.createdBy) {
        throw new Error("User ID not found. Please log in again.");
      }

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Authentication failed. Please log in again.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job");
      }

      const data = await response.json();
      setAlert({
        show: true,
        message: data.message || "Job created successfully!",
        type: "success",
      });
      setFormData({
        jobTitle: "",
        jobDescription: "",
        experienceLevel: "",
        candidates: [],
        endDate: "",
        createdBy: "",
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setAlert({ show: true, message: error.message, type: "error" });
      if (error.message.includes("Please log in again")) {
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form-container">
      {loading && <Loader />}
      {alert.show && (
        <AlertModal
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "" })}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle" className="label-title">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            placeholder="Enter Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobDescription" className="label-title">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Enter Job Description"
            value={formData.jobDescription}
            onChange={handleChange}
            className="textarea-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="experienceLevel" className="label-title">
            Experience Level
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="select-field"
          >
            <option value="">Select Experience Level</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="candidates" className="label-title">
            Add Candidates
          </label>
          <input
            type="text"
            id="candidates"
            name="candidates"
            placeholder="xyz@gmail.com, abc@gmail.com"
            value={formData.candidates.join(", ")}
            onChange={(e) => {
              const inputValue = e.target.value.trim();
              const candidatesArray = inputValue
                ? inputValue.split(",").map((email) => email.trim())
                : [];
              setFormData((prevData) => ({
                ...prevData,
                candidates: candidatesArray,
              }));
            }}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="label-title">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
