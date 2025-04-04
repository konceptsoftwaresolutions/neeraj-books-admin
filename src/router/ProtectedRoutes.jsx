import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, redirect, isAuthenticated, role }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  } else if (role === "user") {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
