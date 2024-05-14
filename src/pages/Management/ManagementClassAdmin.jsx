import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CardAdmin from "../../components/card/CardAdmin";

const ManagementClassAdmin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [programName, setProgramName] = useState("Semua Program");

  const getData = async () => {
    if (programName === "Bimbingan Beasiswa") {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/kelas/get-bimbinganbeasiswa`
        );

        setRawData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (programName === "Webinar") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/get-webinar`
        );

        setRawData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (programName === "Persiapan Tes") {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/kelas/get-persiapantes`
        );
        setRawData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/get-all`
        );
        setRawData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFilteredData(rawData);
  }, [rawData]);
  useEffect(() => {
    getData();
  }, [programName]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    let newData = rawData.filter((x) =>
      x.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(newData);
  };

  const handleCategory = (program) => {
    setProgramName(program);
    setDropdownOpen(false);
  };
  return (
    <div className="mx-20 ">
      <div className="w-full">
        <div className="w-full">
          <div className="md:flex mb-4">
            <div className="md:w-1/2">
              <h1 className="font-semibold text-3xl w-full md:w-11/12">
                Class Management
              </h1>
            </div>
          </div>
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="w-full md:w-11/12 border-2  bg-[#EEE6FF] rounded-[24px] py-3 px-4  flex justify-center items-center">
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

            <div className="relative inline-block text-left w-full md:w-1/2">
              <div>
                <button
                  type="button"
                  className="flex justify-center w-full sm:w-1/2 md:w-2/3 xl:w-1/2 2xl:w-2/3  bg-[#EEE6FF] py-3 px-4 rounded-[24px] items-center text-base font-medium text-main-200   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-100 focus:ring-white"
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
                  <span className="w-full  text-center mx-1">
                    {programName == "Semua Program" && "Semua Program"}
                    {programName == "Bimbingan Beasiswa" &&
                      "Bimbingan Beasiswa"}
                    {programName == "Persiapan Tes" && "Persiapan Tes"}
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
                <div className="origin-top-right absolute mt-2 w-full sm:w-1/2 md:w-2/3 xl:w-1/2 2xl:w-1/2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      onClick={() => handleCategory("Semua Program")}
                      role="menuitem"
                    >
                      Semua Program
                    </div>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      onClick={() => handleCategory("Bimbingan Beasiswa")}
                      role="menuitem"
                    >
                      Bimbingan Beasiswa
                    </div>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      onClick={() => handleCategory("Persiapan Tes")}
                      role="menuitem"
                    >
                      Persiapan Tes
                    </div>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      onClick={() => handleCategory("Webinar")}
                      role="menuitem"
                    >
                      Program Webinar
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center w-1/5 items-center">
              <NavLink
                to="/admin/class-management/add"
                className=" bg-main-200 text-white py-3 px-4 rounded-xl "
              >
                Tambah Kelas
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex md:flex-wrap w-full mt-4">
        {filteredData.map((item) => (
          <CardAdmin data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ManagementClassAdmin;
