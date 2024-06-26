import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./bar-style.css";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const SideNavTeacherResp = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="fixed w-15 top-1/2 left-0 transform -translate-y-1/2 bg-main-10 z-50 rounded-e-2xl lg:hidden">
      {/* Dashboard menu item */}
      <NavLink
        reloadDocument
        to="dashboard"
        className={({ isActive }) =>
          `${
            isActive ? "text-white bg-main-200 active" : ""
          } barside flex items-center justify-center flex-grow p-3 cursor-pointer rounded-se-2xl transition-transform transform hover:scale-105 hover:-translate-y-1 hover:text-white`
        }
      >
        <span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white-hover"
          >
            <path
              opacity="0.4"
              d="M21.434 2.66699H25.9486C27.8183 2.66699 29.3333 4.19479 29.3333 6.08028V10.633C29.3333 12.5185 27.8183 14.0463 25.9486 14.0463H21.434C19.5643 14.0463 18.0493 12.5185 18.0493 10.633V6.08028C18.0493 4.19479 19.5643 2.66699 21.434 2.66699Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.0512 2.66699H10.5658C12.4355 2.66699 13.9505 4.19479 13.9505 6.08028V10.633C13.9505 12.5185 12.4355 14.0463 10.5658 14.0463H6.0512C4.18151 14.0463 2.6665 12.5185 2.6665 10.633V6.08028C2.6665 4.19479 4.18151 2.66699 6.0512 2.66699ZM6.0512 17.9543H10.5658C12.4355 17.9543 13.9505 19.4821 13.9505 21.3676V25.9204C13.9505 27.8046 12.4355 29.3337 10.5658 29.3337H6.0512C4.18151 29.3337 2.6665 27.8046 2.6665 25.9204V21.3676C2.6665 19.4821 4.18151 17.9543 6.0512 17.9543ZM25.9485 17.9543H21.4339C19.5642 17.9543 18.0492 19.4821 18.0492 21.3676V25.9204C18.0492 27.8046 19.5642 29.3337 21.4339 29.3337H25.9485C27.8182 29.3337 29.3332 27.8046 29.3332 25.9204V21.3676C29.3332 19.4821 27.8182 17.9543 25.9485 17.9543Z"
              fill="#5B25D9"
            />
          </svg>
        </span>
      </NavLink>

      <NavLink
        reloadDocument
        to="profile"
        className={({ isActive }) =>
          `${
            isActive ? "text-white bg-main-200 active" : ""
          } barside flex items-center justify-center flex-grow p-3 cursor-pointer transition-transform transform hover:scale-105 hover:-translate-y-1 hover:text-white`
        }
      >
        <span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white-hover"
          >
            <path
              d="M15.9957 20.2324C10.245 20.2324 5.33301 21.1391 5.33301 24.7658C5.33301 28.3294 11.241 30.456 15.9957 30.456C20.7497 30.456 26.657 28.3294 26.657 24.7658C26.657 21.1391 21.745 20.2324 15.9957 20.2324Z"
              fill="#5B25D9"
            />
            <path
              d="M15.9956 11.2637C18.8815 11.2637 21.2515 8.88771 21.2515 6.13185C21.2515 3.376 18.8815 1 15.9956 1C13.1098 1 10.7398 3.376 10.7398 6.13185C10.7398 8.88771 13.1098 11.2637 15.9956 11.2637Z"
              fill="#5B25D9"
            />
          </svg>
        </span>
      </NavLink>

      {/* Profile menu item */}
      <NavLink
        reloadDocument
        to="class-management"
        className={({ isActive }) =>
          `${
            isActive ? "text-white bg-main-200 active" : ""
          } barside flex items-center justify-center flex-grow p-3 cursor-pointer transition-transform transform hover:scale-105 hover:-translate-y-1 hover:text-white`
        }
      >
        <span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white-hover"
          >
            <path
              opacity="0.4"
              d="M21.588 2.66699H10.4133C6.36 2.66699 4 5.04033 4 9.10699V22.8803C4 27.0137 6.36 29.3337 10.4133 29.3337H21.588C25.7067 29.3337 28 27.0137 28 22.8803V9.10699C28 5.04033 25.7067 2.66699 21.588 2.66699Z"
              fill="#5B25D9"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.7733 8.86719V8.88052C10.1986 8.88052 9.73328 9.34719 9.73328 9.92052C9.73328 10.4939 10.1986 10.9605 10.7733 10.9605H14.7586C15.3333 10.9605 15.7999 10.4939 15.7999 9.90585C15.7999 9.33385 15.3333 8.86719 14.7586 8.86719H10.7733ZM21.2266 16.9872H10.7733C10.1986 16.9872 9.73328 16.5205 9.73328 15.9472C9.73328 15.3739 10.1986 14.9059 10.7733 14.9059H21.2266C21.7999 14.9059 22.2666 15.3739 22.2666 15.9472C22.2666 16.5205 21.7999 16.9872 21.2266 16.9872ZM21.2266 23.0805H10.7733C10.3733 23.1339 9.98661 22.9339 9.77328 22.6005C9.55995 22.2539 9.55995 21.8139 9.77328 21.4805C9.98661 21.1339 10.3733 20.9472 10.7733 20.9872H21.2266C21.7586 21.0405 22.1599 21.4939 22.1599 22.0405C22.1599 22.5725 21.7586 23.0272 21.2266 23.0805Z"
              fill="#5B25D9"
            />
          </svg>
        </span>
      </NavLink>

      {/* Profile menu item */}
      <NavLink
        reloadDocument
        to="examination"
        className={({ isActive }) =>
          `${
            isActive ? "text-white bg-main-200 active" : ""
          } barside flex items-center justify-center flex-grow p-3 cursor-pointer transition-transform transform hover:scale-105 hover:-translate-y-1 hover:text-white`
        }
      >
        <span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white-hover"
          >
            <path
              opacity="0.4"
              d="M26.6563 25.271H19.0639C18.3232 25.271 17.7207 25.883 17.7207 26.6355C17.7207 27.3894 18.3232 28 19.0639 28H26.6563C27.3971 28 27.9995 27.3894 27.9995 26.6355C27.9995 25.883 27.3971 25.271 26.6563 25.271"
              fill="#5B25D9"
            />
            <path
              d="M13.7454 9.20514L20.9398 15.0186C21.1134 15.1576 21.143 15.4127 21.0076 15.5905L12.4783 26.7043C11.9422 27.3908 11.152 27.7792 10.3054 27.7936L5.64928 27.8509C5.40095 27.8538 5.18366 27.6818 5.12723 27.4352L4.06901 22.8344C3.88558 21.9887 4.06901 21.1144 4.60517 20.4408L13.1767 9.27393C13.315 9.09477 13.5704 9.06324 13.7454 9.20514"
              fill="#5B25D9"
            />
            <path
              opacity="0.4"
              d="M24.1617 11.5539L22.7747 13.2853C22.635 13.4616 22.3839 13.4903 22.2103 13.3498C20.5242 11.9853 16.2067 8.4838 15.0088 7.51345C14.8338 7.37012 14.8099 7.115 14.951 6.93727L16.2885 5.27608C17.502 3.71378 19.6184 3.57045 21.3257 4.93208L23.2869 6.49438C24.0911 7.12503 24.6273 7.95634 24.8107 8.83065C25.0224 9.7924 24.7966 10.7369 24.1617 11.5539"
              fill="#5B25D9"
            />
          </svg>
        </span>
      </NavLink>

      <NavLink
        reloadDocument
        to="settings"
        className={({ isActive }) =>
          `${
            isActive ? "text-white bg-main-200 active" : ""
          } barside flex items-center justify-center flex-grow p-3 cursor-pointer transition-transform transform hover:scale-105 hover:-translate-y-1 hover:text-white`
        }
      >
        <span>
          <svg
            width="34"
            height="38"
            viewBox="0 0 34 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white-hover"
          >
            <g filter="url(#filter0_d_231_16103)">
              <path
                d="M17.0158 19.7736C14.8765 19.7736 13.146 18.1069 13.146 16.0136C13.146 13.9202 14.8765 12.2402 17.0158 12.2402C19.1551 12.2402 20.8447 13.9202 20.8447 16.0136C20.8447 18.1069 19.1551 19.7736 17.0158 19.7736Z"
                fill="#5B25D9"
              />
              <path
                opacity="0.4"
                d="M29.3065 19.1603C29.0476 18.7603 28.6797 18.3603 28.2028 18.107C27.8213 17.9203 27.576 17.6137 27.358 17.2537C26.6631 16.107 27.0718 14.6003 28.2301 13.9203C29.5927 13.1603 30.0287 11.467 29.2384 10.147L28.3254 8.57366C27.5487 7.25366 25.8455 6.78699 24.4965 7.56033C23.2974 8.20033 21.7577 7.77366 21.0627 6.64033C20.8447 6.26699 20.7221 5.86699 20.7493 5.46699C20.7902 4.94699 20.6267 4.45366 20.3814 4.05366C19.8773 3.22699 18.9643 2.66699 17.956 2.66699H16.0347C15.04 2.69366 14.127 3.22699 13.6229 4.05366C13.364 4.45366 13.2141 4.94699 13.2413 5.46699C13.2686 5.86699 13.146 6.26699 12.9279 6.64033C12.233 7.77366 10.6933 8.20033 9.50779 7.56033C8.14518 6.78699 6.45555 7.25366 5.66523 8.57366L4.75229 10.147C3.9756 11.467 4.41163 13.1603 5.76062 13.9203C6.91884 14.6003 7.32762 16.107 6.64631 17.2537C6.41467 17.6137 6.1694 17.9203 5.78787 18.107C5.32458 18.3603 4.9158 18.7603 4.69778 19.1603C4.19362 19.987 4.22087 21.027 4.72503 21.8937L5.66523 23.4937C6.1694 24.347 7.1096 24.8803 8.09068 24.8803C8.55397 24.8803 9.09901 24.747 9.53505 24.4803C9.8757 24.2537 10.2845 24.1737 10.7341 24.1737C12.0831 24.1737 13.2141 25.2803 13.2413 26.6003C13.2413 28.1337 14.4949 29.3337 16.0756 29.3337H17.9287C19.4957 29.3337 20.7493 28.1337 20.7493 26.6003C20.7902 25.2803 21.9212 24.1737 23.2702 24.1737C23.7062 24.1737 24.115 24.2537 24.4692 24.4803C24.9053 24.747 25.4367 24.8803 25.9136 24.8803C26.8811 24.8803 27.8213 24.347 28.3254 23.4937L29.2793 21.8937C29.7698 21.0003 29.8107 19.987 29.3065 19.1603Z"
                fill="#5B25D9"
              />
            </g>
          </svg>
        </span>
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center flex-grow p-3 cursor-pointer transition-transform transform hover:scale-105 hover:translate-y-1 hover:bg-red-300 rounded-ee-2xl"
      >
        <span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white-hover"
          >
            <path
              opacity="0.4"
              d="M2.6665 8.59633C2.6665 5.32833 5.37349 2.66699 8.69921 2.66699H15.314C18.633 2.66699 21.3332 5.32033 21.3332 8.58299V23.4043C21.3332 26.6737 18.6262 29.3337 15.2991 29.3337H8.687C5.36671 29.3337 2.6665 26.6803 2.6665 23.4177V22.1643V8.59633Z"
              fill="#FA0000"
            />
            <path
              d="M29.0386 15.2731L25.2442 11.3944C24.8521 10.9944 24.221 10.9944 23.8301 11.3971C23.4405 11.7997 23.4418 12.4491 23.8327 12.8491L25.9117 14.9731H23.9184H12.7313C12.1794 14.9731 11.7314 15.4331 11.7314 15.9997C11.7314 16.5677 12.1794 17.0264 12.7313 17.0264H25.9117L23.8327 19.1504C23.4418 19.5504 23.4405 20.1997 23.8301 20.6024C24.0262 20.8037 24.282 20.9051 24.5391 20.9051C24.7936 20.9051 25.0495 20.8037 25.2442 20.6051L29.0386 16.7277C29.2269 16.5344 29.3334 16.2731 29.3334 15.9997C29.3334 15.7277 29.2269 15.4664 29.0386 15.2731Z"
              fill="#FA0000"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default SideNavTeacherResp;
