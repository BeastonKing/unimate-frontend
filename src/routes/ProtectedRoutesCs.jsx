import React from "react";
import { Navigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import SideNavCs from "../components/navbar/SideNavCs";
import { Outlet } from "react-router-dom";
const ProtectedRoutesCs = () => {
  const auth = useAuthUser();

  if (auth.role && auth.role === "CUSTOMER_SERVICE") {
    return (
      <div className="flex item-center w-full mt-8">
        <div>
          <SideNavCs />
        </div>

        <div className="flex-col flex-wrap m-3 grow">
          <Outlet />
        </div>
      </div>
    );
  } else if (auth.role && auth.role === "STUDENT") {
    return <Navigate to="/dashboard" replace />;
  } else if (auth.role && auth.role === "TEACHER") {
    return <Navigate to="/teacher/dashboard" replace />;
  } else if (auth.role && auth.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (auth.role && auth.role === "TOP_LEVEL") {
    return <Navigate to="/top-level/dashboard" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoutesCs;
