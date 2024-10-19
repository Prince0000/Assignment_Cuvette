import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import OTPVerification from "./components/OTPVerification";
import Dashboard from "./components/Dashboard";

const BasicHeader = () => (
  <header className="app-header">
    <div className="header-content">
      <div className="logo">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E16AQF1yNSc7eP_9Q/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1632465014435?e=2147483647&v=beta&t=S0oErGA4glovm16NXR-DnK3EW4xR4dpSPElytnsHkGw"
          alt="Covette Logo"
        />
      </div>
      <nav className="nav-links">
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  </header>
);

const ProtectedHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const userName = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).name;

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <img
            src="https://media.licdn.com/dms/image/v2/C4E16AQF1yNSc7eP_9Q/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1632465014435?e=2147483647&v=beta&t=S0oErGA4glovm16NXR-DnK3EW4xR4dpSPElytnsHkGw"
            alt="Covette Logo"
          />
        </div>
        <nav className="nav-links">
          <Link to="/contact">Contact</Link>
          <span className="nav-spacer"></span>
          <select
            className="user-dropdown"
            onChange={(e) => {
              if (e.target.value === "logout") {
                handleLogout();
              }
            }}
          >
            <option value="">{userName}</option>
            <option value="logout">Logout</option>
          </select>
        </nav>
      </div>
    </header>
  );
};

const Header = () => {
  const location = useLocation();
  const isProtectedRoute = ["/dashboard"].includes(location.pathname);
  return isProtectedRoute ? <ProtectedHeader /> : <BasicHeader />;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
