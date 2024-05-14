import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/Icons/logo.svg";
import logosmall from "../../assets/Icons/small-logo.svg";

import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import ProgramMenu from "../dropdown/ProgramMenu";
import UserMenu from "../dropdown/UserMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full h-20 fixed top-0 left-0 right-0 z-50">
      <nav className="md:px-12 px-4 bg-white shadow-md sticky top-0 right-0 left-0 ">
        <div className="flex items-center justify-between">
          <button onClick={toggleMenu} className="lg:hidden text-body text-3xl">
            <FontAwesomeIcon icon={faBars} size="sm" className="mr-3" />
          </button>
          <div className="text-white lg:block font-bold text-lg cursor-pointer">
            <Link to="/">
              <img src={logo} alt="" className="h-15 m-5 hidden lg:block" />
            </Link>

            <Link to="/">
              <img
                src={logosmall}
                alt=""
                className="h-15 lg:hidden sm:block m-5"
              />
            </Link>
          </div>

          {/* for larger device */}
          <div className="lg:flex hidden items-center gap-3 text-body">
            <ProgramMenu />

            <NavLink
              reloadDocument
              offset={-100}
              to="calendar"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-main-200" : "text-main-300"
                } block hover:text-main-100 py-2 px-4 cursor-pointer`;
              }}
            >
              Beasiswa
            </NavLink>
            <NavLink
              reloadDocument
              offset={-100}
              to="blog"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-main-200" : "text-main-300"
                } block text-primary hover:text-main-100 py-2 px-4 cursor-pointer`;
              }}
            >
              Blog
            </NavLink>
            <NavLink
              reloadDocument
              offset={-100}
              to="partnership"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-main-200" : "text-main-300"
                } block text-primary hover:text-main-100 py-2 px-4 cursor-pointer`;
              }}
            >
              Partnership
            </NavLink>
          </div>

          {/* Tombol untuk perangkat besar */}
          <div className="lg:block">
            {/* Tampilkan tombol Sign Up dan Login jika pengguna tidak terotentikasi */}
            {!isLoggedIn && (
              <>
                <NavLink
                  reloadDocument
                  to="/signup"
                  className="mr-3 px-4 py-2 bg-transparent border font-semibold border-main-200 text-main-200 rounded-lg  transition-all duration-300"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  reloadDocument
                  to="/login"
                  className="px-4 py-2 font-semibold text-white bg-main-200 rounded-lg hover:bg-main-300 hover:text-white transition-all duration-300"
                >
                  Login
                </NavLink>
              </>
            )}
            {isLoggedIn && <UserMenu />}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-4 bg-body p-4 rounded-lg text-[#1B0947] lg:hidden">
            <NavLink
              reloadDocument
              offset={-100}
              to="calander"
              className={({ isActive }) => {
                return `block hover:text-main-100 py-2 ${
                  isActive ? "text-main-200" : "text-main-300"
                }`;
              }}
            >
              Beasiswa
            </NavLink>
            <NavLink
              reloadDocument
              offset={-100}
              to="blog"
              className={({ isActive }) => {
                return `block hover:text-main-100 py-2 ${
                  isActive ? "text-main-200" : "text-main-300"
                }`;
              }}
            >
              Blog
            </NavLink>
            <NavLink
              reloadDocument
              offset={-100}
              to="partnership"
              className={({ isActive }) => {
                return `block hover:text-main-100 py-2 ${
                  isActive ? "text-main-200" : "text-main-300"
                }`;
              }}
            >
              Partnership
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
