import React from "react";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const signOut = useSignOut();
  const dropdownRef = useRef(null);
  const auth = useAuthUser();

  const urlProfil = (role) => {
    if (role === "TEACHER") return "/teacher/profile";
    if (role === "ADMIN") return "/admin/profile";
    if (role === "TOP_LEVEL") return "/top-level/profile";
    if (role === "CUSTOMER_SERVICE") return "/customer-service/profile";
    // Default jika peran tidak cocok
    return "/profile";
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut();
    // Lakukan tindakan lain yang diperlukan setelah logout
    navigate("..", { relative: "/" });
    window.location.reload();
  };

  return (
    <div className="inline-flex rounded-md" ref={dropdownRef}>
      <a
        href="#"
        onClick={toggleDropdown}
        className={`py-2 text-base rounded-l-md ${"text-main-300 hover:bg-gray-50"}`}
      >
        <img
          className="w-[32px] h-[32px] shrink-0 inline-block rounded-[2rem]"
          src={
            auth?.profilePicture ||
            "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg"
          }
          alt="avatar image"
        />
      </a>

      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center justify-center h-full border-l border-gray-100 rounded-r-md hover:bg-gray-50 text-main-300"
          style={{ transition: "transform 0.3s" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 pt-2 "text-main-300 *:${
              isOpen ? "transform rotate-180" : ""
            }}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{ transition: "transform 0.3s" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={!isOpen ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
            />
          </svg>
          <p className="text-sm hidden lg:block">Halo, {auth.name}</p>
        </button>

        {isOpen && (
          <div
            className="absolute text-main-300 right-0 z-10 w-30 bg-white border border-gray-100 rounded-md shadow-lg"
            style={{ animation: "fade-in-down 0.5s" }}
          >
            <div className="p-1 flex flex-col gap-1 px-4">
              <NavLink
                to={urlProfil(auth.role)}
                className="block py-1 text-sm rounded-lg hover:bg-gray-50 px-1"
              >
                Profil
              </NavLink>
              <NavLink
                to="/dashboard"
                className="block py-1 text-sm rounded-lg hover:bg-gray-50 px-1"
              >
                Dashboard
              </NavLink>

              <div className="border-b border border-red-400 opacity-10 px-3 my-1"></div>
              {/* menu item */}
              <NavLink
                onClick={handleLogout}
                className="py-1 text-sm rounded-lg text-red-800 hover:bg-red-600 hover:text-white px-1 w-full"
              >
                Logout
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
