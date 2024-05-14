import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import CardProgram from "./CardProgram";
import CTA from "./CTA";
const BodyProgram = ({ programName, data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [rawData, setRawData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
    setRawData(data);
  }, [data]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    let newData = rawData.filter((x) =>
      x.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(newData);
  };

  return (
    <div className="mt-12 mx-20">
      <div className="w-1/2 sm:w-1/3">
        <div className="rounded-[24px] bg-main-200 w-full  md:w-5/6 lg:w-2/3  xl:w-1/2  2xl:w-5/12 flex justify-center px-4 py-2 ">
          <h6 className="font-medium text-base text-white">CARI PROGRAM</h6>
        </div>
      </div>
      <div className="w-full">
        <div className="md:flex">
          <div className="md:w-1/2">
            <h1 className="font-semibold text-5xl mt-8 w-full md:w-11/12">
              Pilih Program yang Kamu Mau!
            </h1>
          </div>

          <div className="md:w-1/2">
            {" "}
            <h5 className="mt-8 text-2xl">
              Kami menyediakan banyak opsi program konsultasi dan kelas yang
              bisa kamu akses hanya di Unimate
            </h5>
          </div>
        </div>
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="w-full md:w-11/12 border-2 mt-12 bg-[#EEE6FF] rounded-[24px] py-3 px-4  flex justify-center items-center">
              <div className="w-4/5 md:3/5">
                <input
                  placeholder="Cari kelas atau program di sini...."
                  type="text"
                  className="bg-transparent placeholder:text-main-200/50 w-full text-main-200 focus:outline-none"
                  value={searchItem}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/5 flex justify-end">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9.76639"
                    cy="9.76663"
                    r="8.98856"
                    stroke="#5B25D9"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.0181 16.4851L19.5421 20"
                    stroke="#5B25D9"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative inline-block text-left w-full md:w-1/2 mt-12">
            <div>
              <button
                type="button"
                className="flex justify-center w-full sm:w-1/2 md:w-2/3 xl:w-1/2 2xl:w-1/2  bg-[#EEE6FF] py-3 px-4 rounded-[24px] items-center text-base font-medium text-main-200   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-100 focus:ring-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded="true"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="#5B25D9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M21.434 2.66699H25.9486C27.8183 2.66699 29.3333 4.19479 29.3333 6.08028V10.633C29.3333 12.5185 27.8183 14.0463 25.9486 14.0463H21.434C19.5643 14.0463 18.0493 12.5185 18.0493 10.633V6.08028C18.0493 4.19479 19.5643 2.66699 21.434 2.66699"
                    fill="#5B25D9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.0512 2.66699H10.5658C12.4355 2.66699 13.9505 4.19479 13.9505 6.08028V10.633C13.9505 12.5185 12.4355 14.0463 10.5658 14.0463H6.0512C4.18151 14.0463 2.6665 12.5185 2.6665 10.633V6.08028C2.6665 4.19479 4.18151 2.66699 6.0512 2.66699ZM6.0512 17.9543H10.5658C12.4355 17.9543 13.9505 19.4821 13.9505 21.3676V25.9204C13.9505 27.8046 12.4355 29.3337 10.5658 29.3337H6.0512C4.18151 29.3337 2.6665 27.8046 2.6665 25.9204V21.3676C2.6665 19.4821 4.18151 17.9543 6.0512 17.9543ZM25.9485 17.9543H21.4339C19.5642 17.9543 18.0492 19.4821 18.0492 21.3676V25.9204C18.0492 27.8046 19.5642 29.3337 21.4339 29.3337H25.9485C27.8182 29.3337 29.3332 27.8046 29.3332 25.9204V21.3676C29.3332 19.4821 27.8182 17.9543 25.9485 17.9543Z"
                    fill="#5B25D9"
                  />
                </svg>
                <span className="w-full  text-center mr-1">
                  {" "}
                  {programName == "Program" && "Semua Program"}
                  {programName == "Program Scholarship" && "Bimbingan Beasiswa"}
                  {programName == "Test Preparation" && "Persiapan Tes"}
                  {programName == "Webinar" && "Program Webinar"}
                </span>
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {dropdownOpen && (
              <div className="origin-top-right absolute   mt-2 w-full sm:w-1/2 md:w-2/3 xl:w-1/2 2xl:w-1/2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <NavLink
                    to={`${
                      programName === "Program" ? "/program" : "/program"
                    }`}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                  >
                    Semua Program
                  </NavLink>
                  <NavLink
                    to="/program/scholarship"
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                    role="menuitem"
                  >
                    Bimbingan Beasiswa
                  </NavLink>
                  <NavLink
                    to="/program/test-preparation"
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                    role="menuitem"
                  >
                    Persiapan Tes
                  </NavLink>
                  <NavLink
                    to="/program/webinar"
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                    role="menuitem"
                  >
                    Program Webinar
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:flex md:flex-wrap">
        {filteredData.map((item) => (
          <CardProgram data={item} key={item.id} />
        ))}
      </div>
      <div
        className="flex justify-center mt-12 w-full "
        href="wa.me/+6285259217500"
      >
        <a
          href="https://wa.me/+6285259217500?text=Saya%20tertarik%20join%20ke%20Unimate"
          className="w-full"
        >
          {" "}
          <CTA />{" "}
        </a>
      </div>
    </div>
  );
};

BodyProgram.propTypes = {
  programName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default BodyProgram;
