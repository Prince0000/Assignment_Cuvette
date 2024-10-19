import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OTPVerification.css";
// Add import for AlertModal
import AlertModal from "../AlertModal";
// Add import for Loader component
import Loader from "../Loader";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  // Replace message state with alertModal state
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // Add loading state
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        { otp, token }
      );
      localStorage.setItem("token", token); // Store the token in localStorage
      setAlertModal({
        isOpen: true,
        message: "OTP verified successfully. Redirecting...",
        type: "success",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("OTP verification error:", error);
      setAlertModal({
        isOpen: true,
        message:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add function to close the alert modal
  const closeAlertModal = () => {
    setAlertModal({ ...alertModal, isOpen: false });
  };

  return (
    <div className="otp-container">
      <div className="left-text">
        <h1>Welcome to Covette</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="otp-box">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p>Lorem Ipsum is simply dummy text</p>

          <input
            type="text"
            value={otp}
            onChange={handleChange}
            placeholder="Email OTP"
            maxLength={6}
            disabled={isLoading} // Disable input while loading
          />
          <button type="submit" className="verify-button" disabled={isLoading}>
            {isLoading ? <Loader size="small" /> : "Verify"}
          </button>
        </form>
      </div>

      {/* Replace message display with AlertModal component */}
      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={closeAlertModal}
      />
    </div>
  );
};

export default OTPVerification;
