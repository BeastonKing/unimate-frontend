import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const DashboardCs = () => {
  return (
    <>
      <div className="w-full max-w-full mx-auto text-left">
        <header>
          <h3 className="text-3xl">Dashboard</h3>
        </header>
        <div className="border-b border flex flex-wrap gap-1 border-main-200 opacity-10 px-3 my-7 "></div>
        <NavLink
          to="/customer-service/dashboard"
          className={({ isActive }) => {
            return `${
              isActive ? "text-white bg-main-200" : ""
            } px-4 py-3 font-semibold  text-main-200 rounded-lg  transition-all duration-300 shadow-md`;
          }}
          end
        >
          Harian
        </NavLink>

        <NavLink
          to="status-partnership-graph"
          className={({ isActive }) => {
            return `${
              isActive ? "text-white bg-main-200" : ""
            } px-4 py-3 font-semibold  text-main-200 rounded-lg  transition-all duration-300 shadow-md`;
          }}
        >
          Status Kemitraan
        </NavLink>

        <div className="mt-12">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardCs;
