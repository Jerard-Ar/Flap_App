import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NextPage from "./NextPage"; // Import the NextPage component
import SignUp from "./SignUp"; // Import the SignUp component
import Login from "./Login"; // Import the Login component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/next" element={<NextPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function StartPage() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the SignUp page
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <div
      style={{
        backgroundImage: `url('/images/lung-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1>Welcome to Flap!</h1>
      <button
        onClick={handleSignUpClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          margin: "10px",
        }}
      >
        Sign Up
      </button>
      <button
        onClick={handleLoginClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          margin: "10px",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default App;
