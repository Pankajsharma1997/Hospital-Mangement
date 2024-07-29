import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("admintoken");
  return auth ? <Outlet /> : <Navigate to="/dashboard" />;
};
export default PrivateComponent;
