import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useAuthUser";

const UnAuthentication = () => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default UnAuthentication;
