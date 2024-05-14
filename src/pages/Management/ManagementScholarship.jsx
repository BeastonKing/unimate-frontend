import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ManagementScholarshipCard from "../../components/scholarship/ManagementScholarshipCard";

import {
  faCalendarAlt,
  faSearch,
  faWallet,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const ManagementScholarship = () => {
  const authHeader = useAuthHeader();
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const navigate = useNavigate();
  const [jenjang, setJenjang] = useState("");
  const [fund, setFUnd] = useState("");
  const [startFilter, setStartFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const config = {
    headers: {
      Authorization: authHeader,
    },
  };

  useEffect(() => {
    getAllScholarship();
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold as needed
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);

  const getAllScholarship = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/scholarship/get-all`,
        config
      );
      setFilteredScholarships(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching all scholarship:", error);
    }
  };

  const handleSubmitFilter = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/scholarship/get-by-filters?degreeFilter=${jenjang}&fundFilter=${fund}&keyword=${keyword}&sortByOpeningDate=${startFilter}`,
        config
      );
      setFilteredScholarships(response.data);
    } catch (error) {
      console.error("Error searching articles:", error);
    }
  };

  const handleSearch = async (e) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
    // If Enter key is pressed, submit filter immediately
    if (e.key === "Enter") {
      handleSubmitFilter();
    }
  };

  const handleJenjang = async (value) => {
    setJenjang(value);
  };

  const handleFund = async (value) => {
    setFUnd(value);
  };

  const handleStartFilter = async (value) => {
    setStartFilter(value);
  };

  const handleCreateScholarship = () => {
    navigate("/admin/create-scholarship");
  };

  return (
    <div>
      <h1 className="mt-12 sm:mt-0 text-3xl font-black">
        Scholarship Management
      </h1>
      <div className="flex justify-between items-center mb-10">
        <div className="mt-7 search-container bg-violet-200 rounded-3xl p-2 mr-2 sm:mr-8 w-3/5 sm:w-1/2 flex justify-between">
          <input
            type="text"
            placeholder="Cari beasiswa disini..."
            className="search-bar outline-none bg-transparent placeholder:text-main-300 w-full text-sm sm:text-xl"
            id="searchInput"
            onChange={handleSearch}
            onKeyDown={handleSearch} // Handle Enter key
          />
          <div className="mr-2">
            <FontAwesomeIcon icon={faSearch} className="text-main-300" />
          </div>
        </div>
        <button
          className="text-sm sm:text-lg mt-7 bg-main-200 text-white px-4 py-2 rounded-xl"
          onClick={handleCreateScholarship}
        >
          Create Scholarship
        </button>
      </div>

      {/* Filter dan create Scholarship Button */}
      <div className="mt-5 relative flex items-center">
        <div className="flex flex-wrap justify-between w-full mb-10">
          <div className="flex flex-wrap">
            {/* Filter Jenjang Pendidikan */}
            <div
              className={`rounded-lg border border-main-100 pr-3 sm:mx-2 mb-2 ${
                isSmallScreen ? "w-full" : ""
              }`}
            >
              <div className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="text-main-200 ml-3 mr-3"
                />
                <select
                  className="py-1 bg-transparent text-main-200 w-full"
                  onChange={(e) => handleJenjang(e.target.value)}
                  value={jenjang}
                >
                  <option value="">Jenjang Pendidikan</option>
                  <option value="D3">D3</option>
                  <option value="D4">D4</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
              </div>
            </div>

            {/* Filter Pendanaan */}
            <div
              className={`rounded-lg border border-main-100 pr-3 sm:mx-2 mb-2 ${
                isSmallScreen ? "w-full" : ""
              }`}
            >
              <div className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faWallet}
                  className="text-main-200 ml-3 mr-3"
                />
                <select
                  className="py-1 bg-transparent text-main-200 w-full"
                  onChange={(e) => handleFund(e.target.value)}
                  value={fund}
                >
                  <option value="">Tipe Pendanaan</option>
                  <option value="FULLY_FUNDED">Fully Funded</option>
                  <option value="PARTIALLY_FUNDED">Partially Funded</option>
                  <option value="SELF_FUNDED">Self Funded</option>
                </select>
              </div>
            </div>

            {/* Filter Urutan Buka */}
            <div
              className={`rounded-lg border border-main-100 pr-3 sm:mx-2 mb-2 ${
                isSmallScreen ? "w-full" : ""
              }`}
            >
              <div className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-main-200 ml-3 mr-3"
                />
                <select
                  className="py-1 bg-transparent text-main-200 w-full"
                  onChange={(e) => handleStartFilter(e.target.value)}
                  value={startFilter}
                >
                  <option value="">Urutan Buka</option>
                  <option value="asc">Buka Terdekat</option>
                  <option value="desc">Buka Terjauh</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmitFilter}
            className={`text-lg sm:mr-2 bg-main-200 text-white px-5 py-1 rounded-xl ${
              isSmallScreen ? "w-full" : ""
            }`}
          >
            Submit filter
          </button>
        </div>
      </div>

      {/* Show All Scholarship */}
      <div className="mt-5">
        {filteredScholarships && filteredScholarships.length === 0 ? (
          <p>No Scholarship to display</p>
        ) : (
          filteredScholarships &&
          filteredScholarships.map((scholarship) => (
            <ManagementScholarshipCard
              startDate={scholarship.startedAt}
              endDate={scholarship.endedAt}
              id={scholarship.id}
              title={scholarship.title}
              location={scholarship.university}
              type={scholarship.scholarshipType}
              degrees={scholarship.scholarshipDegrees}
              status={scholarship.scholarshipStatus}
              key={scholarship.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ManagementScholarship;
