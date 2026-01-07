import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const getUser = () => {
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

const PublicRoute = () => {
  const user = getUser();
  if (user) {
    // If already logged in, redirect based on role
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
        replace
      />
    );
  }
  return <Outlet />;
};

export default PublicRoute;
