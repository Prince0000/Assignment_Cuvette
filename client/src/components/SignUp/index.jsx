import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css"; // You can adjust styles here
// Add import for the AlertModal component
import AlertModal from "../AlertModal";
// Add import for the Loader component
import Loader from "../Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginOTP, setLoginOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Add state for the alert modal
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  // Add state for the loader
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        if (!otpSent) {
          // Request OTP for login
          const response = await axios.post(
            "http://localhost:5000/api/login-request",
            { email: loginEmail }
          );
          setAlertModal({
            isOpen: true,
            message: "OTP sent to your email!",
            type: "success",
          });
          setOtpSent(true);
        } else {
          // Verify OTP and login
          const response = await axios.post(
            "http://localhost:5000/api/login-verify",
            { email: loginEmail, otp: loginOTP }
          );
          const { token } = response.data;
          localStorage.setItem("token", token);
          navigate("/dashboard");
        }
      } else {
        // Existing registration logic
        const response = await axios.post(
          "http://localhost:5000/api/register",
          formData
        );
        const { token } = response.data;
        setAlertModal({
          isOpen: true,
          message:
            "Registration successful! Redirecting to OTP verification...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/otp-verification", { state: { token } });
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertModal({
        isOpen: true,
        message:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to close the alert modal
  const closeAlertModal = () => {
    setAlertModal({ ...alertModal, isOpen: false });
  };

  return (
    <div className="signup-container">
      <div className="left-text">
        <h1>Welcome to Covette</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <p>Lorem Ipsum is simply dummy text</p>

          {isLogin ? (
            <>
              <input
                type="email"
                name="loginEmail"
                placeholder="Company Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              {otpSent && (
                <input
                  type="text"
                  name="loginOTP"
                  placeholder="Enter OTP"
                  value={loginOTP}
                  onChange={(e) => setLoginOTP(e.target.value)}
                />
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone no."
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="companyEmail"
                placeholder="Company Email"
                value={formData.companyEmail}
                onChange={handleChange}
              />
              <input
                type="text"
                name="employeeSize"
                placeholder="Employee Size"
                value={formData.employeeSize}
                onChange={handleChange}
              />
            </>
          )}

          {!isLogin && (
            <p>
              By clicking on proceed you will accept our{" "}
              <a href="/terms">Terms & Conditions</a>
            </p>
          )}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading
              ? "Processing..."
              : isLogin
              ? otpSent
                ? "Login"
                : "Send OTP"
              : "Proceed"}
          </button>
          <button
            type="button"
            className="submit-button"
            style={{ background: "white", color: "black" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>

      {/* Add Loader component */}
      {isLoading && <Loader />}

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={closeAlertModal}
      />
    </div>
  );
};

export default SignUp;
