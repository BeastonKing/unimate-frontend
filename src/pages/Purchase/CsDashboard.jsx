import React from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import CsvDownloadButton from "react-json-to-csv";
import { format } from "date-fns";

const CsDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("7 Hari Terakhir");
  const authHeader = useAuthHeader();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [data, setData] = useState([]);

  const columns = [
    {
      name: "ID",
      sortable: true,
      wrap: true,
      selector: (row) => row.id,
      cell: (row) => (
        <button className="text-main-100 hover:text-main-300">{row.id}</button>
      ),
    },
    {
      name: "Nama Siswa",
      sortable: true,
      wrap: true,
      selector: (row) => row.siswa.name,
    },
    {
      name: "Nama Kelas",
      sortable: true,
      wrap: true,
      selector: (row) => row.course.name,
    },
    {
      name: "Jumlah",
      sortable: true,
      wrap: true,
      selector: (row) => row.price,
    },
    {
      name: "Order",
      sortable: true,
      headerWrap: false,
      wrap: true,
      selector: (row) => {
        const formattedDate = format(
          new Date(row.date),
          "dd MMM yyyy HH:mm:ss"
        );
        return formattedDate;
      },
    },
    {
      name: "Bayar",
      sortable: true,
      wrap: true,
      selector: (row) => {
        if (row.payat === null) {
          return "Belum Bayar";
        }
        const formattedDate = format(
          new Date(row.payat),
          "dd MMM yyyy HH:mm:ss"
        );
        return `${formattedDate} 
        ${row.method}`;
      },
    },

    {
      name: "No Hp",

      wrap: true,
      selector: (row) => row.siswa.phoneNumber,
      cell: (row) => (
        <div>
          {" "}
          {row.siswa.phoneNumber !== null && (
            <a
              href={"https://wa.me/" + formatPhoneNumber(row.siswa.phoneNumber)}
              target="_blank"
              className="flex justify-center items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              <div>
                <svg
                  fill="#ffffff"
                  height="30px"
                  width="30px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 308.00 308.00"
                  xmlSpace="preserve"
                  stroke="#ffffff"
                  strokeWidth="0.0030800000000000003"
                  transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="3.696"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="XMLID_468_">
                      {" "}
                      <path
                        id="XMLID_469_"
                        d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"
                      />{" "}
                      <path
                        id="XMLID_470_"
                        d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"
                      />{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
              <h6 className="ml-2">{row.siswa.phoneNumber}</h6>
            </a>
          )}{" "}
        </div>
      ),
      width: "20%",
    },
    {
      name: "Status",
      sortable: true,
      wrap: true,
      selector: (row) => row.status,
      cell: (row) => (
        <div>
          {row.status === "Completed" ? (
            <div className=" flex items-center justify-center rounded-2xl bg-[#62C21C]/15 py-2 px-4 m-4">
              <input className="bg-[#62C21C] size-3 rounded-full  mr-2" />
              <h6 className="text-[#62C21C]">{row.status}</h6>
            </div>
          ) : (
            ""
          )}
          {row.status === "Pending" ? (
            <div className=" flex items-center justify-center rounded-2xl bg-[#FFA500]/15 py-2 px-4 m-4">
              <input className="bg-[#FFA500] size-3 rounded-full  mr-2" />
              <h6 className="text-[#FFA500]">{row.status}</h6>
            </div>
          ) : (
            ""
          )}
          {row.status === "Failed" ? (
            <div className=" flex items-center justify-center rounded-2xl bg-[#FF0000]/15 py-2 px-4 m-4">
              <input className="bg-[#FF0000] size-3 rounded-full  mr-2" />
              <h6 className="text-[#FF0000]">{row.status}</h6>
            </div>
          ) : (
            ""
          )}
        </div>
      ),
      width: "20%",
    },
  ];
  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber === null) {
      return phoneNumber;
    }
    if (phoneNumber.startsWith("08")) {
      return "628" + phoneNumber.substring(2);
    }

    return phoneNumber;
  }
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const fetchData = async () => {
    try {
      let response;
      if (selectedOption === "Hari Ini") {
        response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/today`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
      } else if (selectedOption === "7 Hari Terakhir") {
        response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/7days`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
      } else if (selectedOption === "30 Hari Terakhir") {
        response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/30days`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
      }

      if (response && response.data) {
        const sortedData = [...response.data];
        sortedData.forEach((item) => {
          item.date = new Date(item.date);
        });
        sortedData.sort((a, b) => a.date - b.date);
        setData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "Bold",
        fontSize: "13px",
        color: "#2E136D",
        backgroundColor: "#DED3F7",
        display: "flex",
        alignItems: "center",
      },
    },
    rows: {
      style: {
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      },
    },
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex mt-8 justify-center items-center">
          <div className="w-1/2 flex items-center">
            <h1 className=" font-semibold text-lg">Transaksi Baru-Baru Ini</h1>
          </div>
          <div className="w-1/2 flex items-center">
            <div className="w-1/2 flex justify-end p-2">
              <div className="w-full relative inline-block text-left"></div>
            </div>
            <div className="w-1/2 flex justify-end">
              <div className="w-full">
                <button
                  type="button"
                  className="flex justify-center w-full bg-main-200 py-3 px-4 rounded-[24px] items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-100 focus:ring-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <span className="w-2/3 text-center mr-1">
                    {selectedOption}
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
                </button>{" "}
                {dropdownOpen && (
                  <div
                    className="origin-top-right absolute  mt-2 w-1/6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    style={{ zIndex: 999 }}
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        onClick={() => handleOptionSelect("Hari Ini")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        Hari Ini
                      </button>
                      <button
                        onClick={() => handleOptionSelect("7 Hari Terakhir")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        7 Hari Terakhir
                      </button>
                      <button
                        onClick={() => handleOptionSelect("30 Hari Terakhir")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        30 Hari Terakhir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <h1 className="font-medium text-md text-[#8B909A]">{selectedOption}</h1>
        <div className="mt-8 rounded-md">
          <DataTable
            customStyles={tableHeaderStyle}
            columns={columns}
            data={data}
            pagination
            fixedHeader
            highlightOnHover
            paginationRowsPerPageOptions={[2, 5, 10]}
            emptyDataMessage={() => (
              <p>No Payment found matching your search criteria.</p>
            )}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button className="flex justify-center  bg-main-200 py-3 px-4 rounded-[24px] items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-100 focus:ring-white">
            <CsvDownloadButton
              data={data}
              filename={`Data Sales ${selectedOption} dari ${new Date().getDate()}-${
                new Date().getMonth() + 1
              }-${new Date().getFullYear()}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CsDashboard;
