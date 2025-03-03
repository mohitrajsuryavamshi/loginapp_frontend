import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard"; // ✅ Create a Dashboard page for logged-in users

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* ✅ Redirect unknown routes to Registration */}
      </Routes>
    </Router>
  );
}

export default App;
