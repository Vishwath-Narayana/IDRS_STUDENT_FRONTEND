// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // For development - allow direct access to dashboard
  if (!token && window.location.pathname === "/dashboard") {
    localStorage.setItem("token", "dev-token");
    return children;
  }

  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
