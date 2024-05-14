import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideNavTopLevel from "../components/navbar/SideNavTopLevel";
const ProtectedRoutesTopLevel = () => {
  const auth = useAuthUser();

  if (auth.role && auth.role === "TOP_LEVEL") {
    return (
      <div className="flex item-center w-full mt-8">
        <div>
          <SideNavTopLevel />
        </div>

        <div className="flex-col flex-wrap m-3 grow">
          <Outlet />
        </div>
      </div>
    );
  } else if (auth.role && auth.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (auth.role && auth.role === "TEACHER") {
    return <Navigate to="/teacher/dashboard" replace />;
  } else if (auth.role && auth.role === "STUDENT") {
    return <Navigate to="/dashboard" replace />;
  } else if (auth.role && auth.role === "CUSTOMER_SERVICE") {
    return <Navigate to="/customer-service/dashboard" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoutesTopLevel;
