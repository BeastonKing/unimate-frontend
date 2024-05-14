import React from "react";
import { useRef, useState, useEffect } from "react";
import ScholarshipCard from "../../components/scholarship/ScholarshipCard";
import Alert from "../../components/alert/Alert";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import picture from "../../assets/image/gambar-scholarship.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faSearch,
  faWallet,
  faUserGraduate,
  faAngleDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const CalendarPage = () => {
  const calendar = useRef(null);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [monthlyScholarship, setMonthlyScholarship] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 6;
  const authHeader = useAuthHeader();
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January (1st month)
  const [jenjang, setJenjang] = useState("");
  const [fund, setFUnd] = useState("");
  const [startFilter, setStartFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  useEffect(() => {
    const fetchScholarships = async () => {
      await getScholarshipByMonth(setMonthlyScholarship);
    };

    fetchScholarships();
    console.log("Monthly scholarships:", monthlyScholarship);

    // Check screen size on mount and resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold as needed
    };
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for resize events
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, [selectedMonth, setMonthlyScholarship]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
    console.log(event.target.value);
  };

  const getScholarshipByMonth = async (setter) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/scholarship/get-all-by-month?month=${selectedMonth}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setter(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching Scholarships:`, error);
    }
  };

  const handleSubmitFIlter = async () => {
    try {
      if (!jenjang && !fund && !keyword && !startFilter) {
        setFilteredScholarships([]);
        return;
      }

      const response = await axios.get(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/scholarship/get-by-filters?degreeFilter=${jenjang}&fundFilter=${fund}&keyword=${keyword}&sortByOpeningDate=${startFilter}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setFilteredScholarships(response.data);
      console.log(response.data);
      if (response.data.length === 0) {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error searching articles:", error);
    }
  };

  const handleSearch = async (e) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
    // If Enter key is pressed, submit filter immediately
    if (e.key === "Enter") {
      handleSubmitFIlter();
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

  const handleMenuButtonClick = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate indexes of scholarships to display on the current page
  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="sm:mx-0">
      <div className="pt-10 mb-28 grid sm:grid-cols-2">
        <div className="sm:col-span-1">
          <div className="rounded-xl border border-[#5B25D9] inline-block mb-5 mx-4 sm:mx-0">
            <p className="text-sm text-[#5B25D9] my-1 mx-3">
              Kalender Beasiswa Unimate
            </p>
          </div>

          <p className="text-3xl sm:text-5xl font-bold mb-2 mx-4 sm:mx-0">
            Dapatkan info jadwal beasiswa terkini di Kalender Beasiswa Unimate
          </p>
          <p className="text-md sm:text-xl my-4 mx-4 sm:mx-0">
            Selalu up-to-date dengan jadwal beasiswa luar negeri tanpa harus
            takut ketinggalan deadline!
          </p>
          <button
            className="mt-8 bg-[#5B25D9] text-white text-center p-2 w-full sm:w-full mx-4 sm:mx-0"
            onClick={() => handleMenuButtonClick(calendar)}
          >
            Cek Kalender Beasiswa di Bawah
          </button>
        </div>
        <img
          className="hidden sm:flex sm:ml-5"
          src={picture}
          alt="Logo Unimate"
        />
      </div>

      <div ref={calendar} className="grid sm:grid-cols-2 gap-4 mb-4 sm:mb-10">
        <div className="px-2 py-2 sm:p-4 text-3xl sm:text-5xl font-black text-left">
          Kalender Beasiswa 2024
        </div>
        <div className="px-2 py-2 sm:p-4 text-xl sm:text-3xl text-justify">
          Banyak pilihan program beasiswa yang bisa kamu pilih dan daftar di
          tahun ini
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between w-full mb-10 mx-3 sm:mx-0">
        <div className="search-container bg-violet-200 rounded-3xl p-2 mb-4 sm:mb-0 w-full sm:w-2/6 flex justify-between">
          <input
            type="text"
            placeholder="Cari beasiswa disini..."
            className="search-bar outline-none bg-transparent placeholder:text-main-300 w-full pr-3"
            id="searchInput"
            onChange={handleSearch}
            onKeyDown={handleSearch} // Handle Enter key press
          />
          <div className="mr-2">
            <FontAwesomeIcon icon={faSearch} className="text-main-300" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="rounded-lg border border-main-100 pr-3 mx-1 mb-4 sm:mb-0">
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

          {/* Additional filter elements */}
          <div className="rounded-lg border border-main-100 pr-3 mx-1 mb-4 sm:mb-0">
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

          <div className="rounded-lg border border-main-100 pr-3 mx-1 mb-4 sm:mb-0">
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
          onClick={handleSubmitFIlter}
          className={`text-sm mx-1 sm:ml-2 bg-main-200 text-white px-4 py-2 rounded-xl self-center ${
            isSmallScreen ? "w-full" : ""
          }`}
        >
          Submit filter
        </button>
      </div>

      <div>
        {filteredScholarships && filteredScholarships.length > 0 && (
          <>
            <h2 className="text-3xl font-semibold mb-4 mt-12">
              Searched Scholarships
            </h2>
            <div className="card-container grid grid-cols-2 gap-4 mt-4">
              {filteredScholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  id={scholarship.id}
                  startDate={scholarship.startedAt}
                  endDate={scholarship.endedAt}
                  title={scholarship.title}
                  location={scholarship.university}
                  type={scholarship.scholarshipType}
                  degrees={scholarship.scholarshipDegrees}
                  status={scholarship.scholarshipStatus}
                />
              ))}
              <div className="col-span-2">
                <div className="h-1 bg-gray-300 rounded-full my-10"></div>
              </div>
            </div>
          </>
        )}
        {showAlert && (
          <Alert
            type="information" // or any other type you prefer
            message="No Scholarship with that criteria found"
            description="Please try again with different criteria."
            onClose={() => setShowAlert(false)} // Close the alert when onClose is triggered
          />
        )}
      </div>

      <div className="rounded-lg p-5 shadow-md bg-white border border-black ml-3 sm:m-5">
        <div className="row-span-1 flex flex-row justify-center mb-5 mt-5 items-center relative">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="text-2xl sm:text-4xl mr-4"
          />
          <div className="relative">
            <select
              className="rounded-lg text-gray-800 mr-2 text-xl sm:text-4xl font-bold bg-transparent outline-none appearance-none text-center pr-8"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
              <FontAwesomeIcon
                icon={faAngleDown}
                className="text-gray-600 pr-"
              />
            </div>
          </div>
        </div>

        <div className="w-full mb-7 border-b border-gray-400"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          {/* Rendering scholarships for the current page */}
          {monthlyScholarship.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500">
              There is no scholarship listed in this month.
            </div>
          ) : (
            // Rendering scholarships for the current page
            monthlyScholarship
              .slice(indexOfFirstScholarship, indexOfLastScholarship)
              .map((scholarship, index) => (
                <ScholarshipCard
                  key={index}
                  id={scholarship.scholarshipId}
                  startDate={scholarship.startedAt}
                  endDate={scholarship.endedAt}
                  title={scholarship.title}
                  location={scholarship.university}
                  type={scholarship.scholarshipType}
                  degrees={scholarship.scholarshipDegrees}
                  status={scholarship.scholarshipStatus}
                />
              ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-5">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-3 px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastScholarship >= monthlyScholarship.length}
            className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
