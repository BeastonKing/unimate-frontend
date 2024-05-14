import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="m-20">
      <Outlet />
    </main>
  );
};

export default Main;
