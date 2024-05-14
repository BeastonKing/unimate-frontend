import React from "react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function ProgramMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

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

  useEffect(() => {
    // Check if any of the links are active
    setIsLinkActive(
      location.pathname === "/program/scholarship" ||
        location.pathname === "/program/webinar" ||
        location.pathname === "/program/test-preparation" ||
        location.pathname === "/program"
    );
  }, [location.pathname]);

  return (
    <div className="inline-flex rounded-md" ref={dropdownRef}>
      <a
        onClick={toggleDropdown}
        className={`px-4 py-2 text-base rounded-l-md ${
          isLinkActive ? "text-main-200" : "text-main-300 hover:bg-gray-50"
        }`}
      >
        Program
      </a>

      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className={`inline-flex items-center justify-center h-full border-l rounded-r-md hover:bg-gray-50 ${
            isLinkActive ? "text-main-200" : "text-main-300"
          }`}
          style={{ transition: "transform 0.3s" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transform 0.5s ${
              isOpen ? "transform rotate-360" : ""
            } ${isLinkActive ? "text-main-200" : "text-main-300"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{ transition: "transform 0.5s" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={!isOpen ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className="absolute right-0 z-10 w-56 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg"
            style={{ animation: "fade-in-down 0.5s" }}
          >
            <div className="p-1">
              <NavLink
                to="program"
                className={({ isActive }) => {
                  return `block px-4 py-2 text-sm rounded-lg hover:bg-gray-50 hover:text-main-100 ${
                    isActive ? "text-main-200" : "text-main-300"
                  }`;
                }}
                end
              >
                Semua Program
              </NavLink>
              <NavLink
                to="program/scholarship"
                className={({ isActive }) => {
                  return `block px-4 py-2 text-sm rounded-lg hover:bg-gray-50 hover:text-main-100 ${
                    isActive ? "text-main-200" : "text-main-300"
                  }`;
                }}
              >
                Scholarship
              </NavLink>
              <NavLink
                to="program/webinar"
                className={({ isActive }) => {
                  return `block px-4 py-2 text-sm rounded-lg hover:bg-gray-50 hover:text-main-100 ${
                    isActive ? "text-main-200" : "text-main-300"
                  }`;
                }}
              >
                Webinar
              </NavLink>
              <NavLink
                to="program/test-preparation"
                className={({ isActive }) => {
                  return `block px-4 py-2 text-sm rounded-lg hover:bg-gray-50 hover:text-main-100 ${
                    isActive ? "text-main-200" : "text-main-300"
                  }`;
                }}
              >
                Test Preparation
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
