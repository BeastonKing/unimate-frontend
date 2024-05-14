import React from "react";
import LandingPage1 from "../../assets/image/landingpage_1.png";
import HappyStudents from "../../assets/image/Happy Students.png";
import OnlineCourse from "../../assets/image/Online Course.png";
import Reviews from "../../assets/image/Reviews.png";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-b from-main-10 to-[#f8f9fb]">
        <div className=" w-full">
          <div className="lg:mx-28 md:mx-20 mx-10 flex items-center justify-center mt-32 relative">
            <div className="lg:w-1/2 flex flex-col justify-start items-start">
              <h1 className="font-semibold text-main-400 text-5xl">
                Raih Mimpi Kuliah Ke Luar Negeri-mu Bersama Unimate!
              </h1>
              <p className="text-[20px] mt-8">
                Kami siap menjadi teman terbaikmu untuk meraih beasiswa kuliah
                di kampus luar negeri incaranmu
              </p>
              <div className="my-12 flex flex-wrap justify-center items-center">
                <img src={HappyStudents} />
                <img src={OnlineCourse} />
                <img src={Reviews} />
              </div>
              <div className="flex justify-center items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.53988 0H5.91988C7.32988 0 8.45988 1.15 8.45988 2.561V5.97C8.45988 7.39 7.32988 8.53 5.91988 8.53H2.53988C1.13988 8.53 -0.00012207 7.39 -0.00012207 5.97V2.561C-0.00012207 1.15 1.13988 0 2.53988 0ZM2.53988 11.4697H5.91988C7.32988 11.4697 8.45988 12.6107 8.45988 14.0307V17.4397C8.45988 18.8497 7.32988 19.9997 5.91988 19.9997H2.53988C1.13988 19.9997 -0.00012207 18.8497 -0.00012207 17.4397V14.0307C-0.00012207 12.6107 1.13988 11.4697 2.53988 11.4697ZM17.46 0H14.08C12.67 0 11.54 1.15 11.54 2.561V5.97C11.54 7.39 12.67 8.53 14.08 8.53H17.46C18.86 8.53 20 7.39 20 5.97V2.561C20 1.15 18.86 0 17.46 0ZM14.08 11.4697H17.46C18.86 11.4697 20 12.6107 20 14.0307V17.4397C20 18.8497 18.86 19.9997 17.46 19.9997H14.08C12.67 19.9997 11.54 18.8497 11.54 17.4397V14.0307C11.54 12.6107 12.67 11.4697 14.08 11.4697Z"
                    fill="#1B0947"
                  />
                </svg>
                <h1 className="ml-4 font-semibold text-xl">
                  Cari program yang sesuai untukmu
                </h1>
              </div>
              <div className="border h-[140px] mt-3 rounded-unimate flex justify-center items-center bg-white">
                <div className="grid lg:grid-cols-2 lg:divide-x-2 grid-cols-1 md:gap-1 gap-3">
                  <div className="flex justify-center items-center">
                    <div className="flex flex-col items-start">
                      <span className="text-base font-semibold flex justify-center items-center text-main-200">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9009 21.8533H19.0825C19.6237 21.8533 20.0726 21.4 20.0726 20.8533C20.0726 20.3066 19.6237 19.8666 19.0825 19.8666H11.9009C11.3597 19.8666 10.9109 20.3066 10.9109 20.8533C10.9109 21.4 11.3597 21.8533 11.9009 21.8533ZM16.363 13.2H11.9009C11.3597 13.2 10.9109 13.6533 10.9109 14.2C10.9109 14.7466 11.3597 15.1866 11.9009 15.1866H16.363C16.9043 15.1866 17.3531 14.7466 17.3531 14.2C17.3531 13.6533 16.9043 13.2 16.363 13.2ZM25.784 12.0341C26.0944 12.0305 26.4322 12.0266 26.7392 12.0266C27.0693 12.0266 27.3333 12.2933 27.3333 12.6266V23.3466C27.3333 26.6533 24.6798 29.3333 21.4059 29.3333H10.8976C7.46531 29.3333 4.66663 26.52 4.66663 23.0533V8.67996C4.66663 5.37329 7.33329 2.66663 10.6204 2.66663H17.6699C18.0132 2.66663 18.2772 2.94663 18.2772 3.27996V7.57329C18.2772 10.0133 20.2706 12.0133 22.6864 12.0266C23.2507 12.0266 23.7482 12.0308 24.1835 12.0345C24.5222 12.0374 24.8234 12.04 25.0891 12.04C25.277 12.04 25.5206 12.0371 25.784 12.0341ZM26.1481 10.088C25.0629 10.092 23.7837 10.088 22.8636 10.0786C21.4035 10.0786 20.2009 8.86396 20.2009 7.38929V3.87463C20.2009 3.29996 20.8913 3.01463 21.286 3.42929C22.0012 4.18031 22.9842 5.21291 23.9624 6.24052C24.9363 7.26354 25.9054 8.2816 26.6009 9.01196C26.9864 9.41596 26.7039 10.0866 26.1481 10.088Z"
                            fill="#5B25D9"
                          />
                        </svg>
                        Jenis Program
                      </span>
                      <h1 className="font-semibold text-base mt-3 text-center text-main-200">
                        Pilih Jenis Program
                      </h1>
                    </div>
                  </div>

                  <div className="flex justify-center items-center ">
                    <NavLink
                      to="program"
                      className="w-full h-full hover:bg-main-300 bg-main-200 flex justify-center items-center mx-8 rounded-lg"
                    >
                      <a className="text-white font-semibold text-base p-3">
                        Cari Program
                      </a>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-start max-w-xl mx-auto">
              {/* Konten di sini */}
              <img
                src={LandingPage1}
                alt="hallo user"
                className="cover h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
