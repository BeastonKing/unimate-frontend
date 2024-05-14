import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
const SettingAccount = () => {
  const auth = useAuthUser();

  let URL_SETTINGS = "";
  if (auth.role && auth.role === "ADMIN") {
    URL_SETTINGS = "/admin/settings";
  } else if (auth.role && auth.role === "STUDENT") {
    URL_SETTINGS = "/settings";
  } else if (auth.role && auth.role === "TEACHER") {
    URL_SETTINGS = "/teacher/settings";
  }
  return (
    <>
      <div className="w-full max-w-full mx-auto text-left lg:p-5">
        <header>
          <h3 className="text-2xl">Pengaturan Akun</h3>
        </header>
        <div className="border-b border flex flex-wrap gap-1 border-main-200 opacity-10 px-3 my-7 "></div>
        <NavLink
          to={URL_SETTINGS}
          className={({ isActive }) => {
            return `${
              isActive ? "text-white bg-main-200" : ""
            } px-4 py-3 font-semibold  text-main-200 rounded-lg  transition-all duration-300 shadow-md`;
          }}
          end
        >
          Ubah Profil
        </NavLink>
        <NavLink
          to="password"
          className={({ isActive }) => {
            return `${
              isActive ? "text-white bg-main-200" : ""
            } px-4 py-3 font-semibold  text-main-200 rounded-lg  transition-all duration-300 shadow-md`;
          }}
        >
          Ubah Password
        </NavLink>

        <div className="mt-12">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SettingAccount;
