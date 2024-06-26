import React from "react";
import useSignOut from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { NavLink } from "react-router-dom";
import "./bar-style.css";
import SideNavCsResp from "./SideNavCsResp";

const SideNavCs = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();

  const navLinkStyles = ({ isActive }) => {
    return `${
      isActive ? "text-white bg-main-200 active" : ""
    } barside flex items-center flex-grow text-[1.15rem] px-2 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]`;
  };

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <>
      <aside
        className="mr-8 hidden lg:block rounded-xl shrink-0 overscroll-contain lg:w-[280px] transition-all duration-300 ease-in-out m-3 z-40 inset-y-0 left-0 border border-rsidenav shadow-md"
        id="sidenav-profil"
      >
        <div className="items-center px-3">
          <div className="flex items-center justify-between py-5 pr-3">
            <div className="flex items-center mr-5 flex-wrap ">
              <div className="mr-5 min-w-10">
                <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                  <img
                    className="w-[40px] h-[40px] shrink-0 inline-block rounded-[2rem]"
                    src={
                      auth?.profilePicture ||
                      "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg"
                    }
                    alt="avatar image"
                  />
                </div>
              </div>
              <div className="max-w-40">
                <div className="mr-2 max-w-40">
                  <div className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-base font-semibold">
                    {auth.name}
                  </div>
                  <span className="text-secondary-dark dark:text-stone-500 font-medium block text-xs text-wrap">
                    {auth.email}
                  </span>
                </div>
              </div>
            </div>
            <NavLink
              to="settings"
              className="inline-flex ml  items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0"
              href="javascript:void(0)"
            >
              <span className="leading-none transition-colors duration-200 ease-in-out peer shrink-0 group-hover:text-primary text-secondary-dark">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.8064 7.62386L20.184 6.54377C19.6574 5.62985 18.4905 5.31456 17.5753 5.83896V5.83896C17.1397 6.09559 16.6198 6.1684 16.1305 6.04133C15.6411 5.91427 15.2224 5.59776 14.9666 5.16162C14.8021 4.88439 14.7137 4.56864 14.7103 4.24628V4.24628C14.7251 3.72947 14.5302 3.22865 14.1698 2.85791C13.8094 2.48718 13.3143 2.27811 12.7973 2.27832H11.5433C11.0367 2.27831 10.5511 2.48016 10.1938 2.83919C9.83644 3.19822 9.63693 3.68484 9.63937 4.19136V4.19136C9.62435 5.23717 8.77224 6.07706 7.72632 6.07695C7.40397 6.0736 7.08821 5.98519 6.81099 5.82065V5.82065C5.89582 5.29626 4.72887 5.61154 4.20229 6.52546L3.5341 7.62386C3.00817 8.53664 3.31916 9.70285 4.22975 10.2326V10.2326C4.82166 10.5743 5.18629 11.2058 5.18629 11.8893C5.18629 12.5728 4.82166 13.2043 4.22975 13.5461V13.5461C3.32031 14.0722 3.00898 15.2356 3.5341 16.1456V16.1456L4.16568 17.2348C4.4124 17.68 4.82636 18.0085 5.31595 18.1477C5.80554 18.2868 6.3304 18.2251 6.77438 17.9763V17.9763C7.21084 17.7216 7.73094 17.6518 8.2191 17.7824C8.70725 17.9131 9.12299 18.2333 9.37392 18.6719C9.53845 18.9491 9.62686 19.2649 9.63021 19.5872V19.5872C9.63021 20.6438 10.4867 21.5003 11.5433 21.5003H12.7973C13.8502 21.5003 14.7053 20.6494 14.7103 19.5964V19.5964C14.7079 19.0883 14.9086 18.6003 15.2679 18.241C15.6272 17.8817 16.1152 17.6809 16.6233 17.6834C16.9449 17.692 17.2594 17.78 17.5387 17.9396V17.9396C18.4515 18.4656 19.6177 18.1546 20.1474 17.244V17.244L20.8064 16.1456C21.0615 15.7077 21.1315 15.1863 21.001 14.6966C20.8704 14.207 20.55 13.7896 20.1108 13.5369V13.5369C19.6715 13.2842 19.3511 12.8668 19.2206 12.3772C19.09 11.8875 19.16 11.3661 19.4151 10.9282C19.581 10.6386 19.8211 10.3984 20.1108 10.2326V10.2326C21.0159 9.70314 21.3262 8.54374 20.8064 7.63301V7.63301V7.62386Z"
                    stroke="#5B25D9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12.1747"
                    cy="11.8891"
                    r="2.63616"
                    stroke="#5B25D9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </NavLink>
          </div>
          <div className="border-b border border-main-200 opacity-10"></div>
        </div>
        <div className="relative px-3 my-5">
          <div className="flex flex-col w-full font-medium">
            {/* menu item */}

            <NavLink reloadDocument to="dashboard" className={navLinkStyles}>
              <span className="mr-3">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M21.434 2.66699H25.9486C27.8183 2.66699 29.3333 4.19479 29.3333 6.08028V10.633C29.3333 12.5185 27.8183 14.0463 25.9486 14.0463H21.434C19.5643 14.0463 18.0493 12.5185 18.0493 10.633V6.08028C18.0493 4.19479 19.5643 2.66699 21.434 2.66699"
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
              Dashboard
            </NavLink>

            <NavLink reloadDocument to="profile" className={navLinkStyles}>
              <span className="mr-3">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.9957 20.2324C10.245 20.2324 5.33301 21.1391 5.33301 24.7658C5.33301 28.3938 10.2143 29.3324 15.9957 29.3324C21.7463 29.3324 26.6583 28.4271 26.6583 24.7991C26.6583 21.1711 21.7783 20.2324 15.9957 20.2324"
                    fill="#5B25D9"
                  />
                  <path
                    opacity="0.4"
                    d="M15.9955 16.778C19.9128 16.778 23.0515 13.638 23.0515 9.72202C23.0515 5.80602 19.9128 2.66602 15.9955 2.66602C12.0795 2.66602 8.93945 5.80602 8.93945 9.72202C8.93945 13.638 12.0795 16.778 15.9955 16.778"
                    fill="#5B25D9"
                  />
                </svg>
              </span>
              Profil Saya
            </NavLink>

            <NavLink
              reloadDocument
              to="partnership-management"
              className={navLinkStyles}
            >
              <span className="mr-3">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
              Partnership
            </NavLink>

            <NavLink
              reloadDocument
              to="purchase-management"
              className={navLinkStyles}
            >
              <span className="mr-3">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.88037 27.4515C7.88037 26.3315 8.78704 25.4248 9.90704 25.4248C11.0137 25.4248 11.9204 26.3315 11.9204 27.4515C11.9204 28.5581 11.0137 29.4648 9.90704 29.4648C8.78704 29.4648 7.88037 28.5581 7.88037 27.4515ZM22.8804 27.4515C22.8804 26.3315 23.787 25.4248 24.907 25.4248C26.0137 25.4248 26.9204 26.3315 26.9204 27.4515C26.9204 28.5581 26.0137 29.4648 24.907 29.4648C23.787 29.4648 22.8804 28.5581 22.8804 27.4515Z"
                    fill="#5B25D9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26.9208 8.46545C27.7342 8.46545 28.2675 8.74545 28.8008 9.35878C29.3342 9.97212 29.4275 10.8521 29.3075 11.6508L28.0408 20.3974C27.8008 22.0788 26.3608 23.3174 24.6675 23.3174H10.1208C8.34749 23.3174 6.88083 21.9574 6.73416 20.1988L5.50749 5.66412L3.49416 5.31745C2.96083 5.22412 2.58749 4.70412 2.68083 4.17078C2.77416 3.62412 3.29416 3.26412 3.84083 3.34412L7.02083 3.82412C7.47416 3.90545 7.80749 4.27745 7.84749 4.73078L8.10083 7.71745C8.14083 8.14545 8.48749 8.46545 8.91416 8.46545H26.9208ZM18.8408 15.3974H22.5342C23.0942 15.3974 23.5342 14.9441 23.5342 14.3974C23.5342 13.8374 23.0942 13.3974 22.5342 13.3974H18.8408C18.2808 13.3974 17.8408 13.8374 17.8408 14.3974C17.8408 14.9441 18.2808 15.3974 18.8408 15.3974Z"
                    fill="#5B25D9"
                  />
                </svg>
              </span>
              Pembelian
            </NavLink>

            <div className="border-b border border-main-200 opacity-10 px-3 my-3"></div>
            {/* menu item */}

            <NavLink
              reloadDocument
              to="settings"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-white bg-main-200 active" : ""
                } barside flex items-center flex-grow text-[1.15rem] px-2 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]`;
              }}
            >
              <span className="mr-3">
                <svg
                  width="34"
                  height="38"
                  viewBox="0 0 34 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
              Pengaturan
            </NavLink>

            {/* menu item */}
            <div className="border border-[#FA0000] border-opacity-30 rounded-xl">
              <button
                onClick={handleLogout}
                href="#"
                className="flex items-center flex-grow text-[1.15rem]  px-2 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]"
              >
                <span className="mr-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                Log out
              </button>
            </div>
          </div>
        </div>
      </aside>
      <SideNavCsResp />
    </>
  );
};

export default SideNavCs;
