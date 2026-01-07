import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (!user || !user._id || !user.role) return null;
    return user;
  } catch {
    return null;
  }
};

const ProtectedRoute = () => {
  const user = isAuthenticated();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
