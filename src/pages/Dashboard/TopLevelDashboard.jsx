import React from "react";
import { useState, useEffect } from "react";

import SalesSummary from "../../components/purchase/SalesSummary";
import SalesGraph from "../../components/purchase/SalesGraph";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import CsvDownloadButton from "react-json-to-csv";
const TopLevelDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("7 Hari Terakhir");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sumData, setSumData] = useState({});
  const [sumData2, setSumData2] = useState({});
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("Terlama");
  const TABLE_HEAD = [
    "ID",
    "Nama Kursus",
    "Jumlah",
    "Tanggal Order",
    "Tanggal Bayar",
    "Metode bayar",
    "Status",
  ];
  const authHeader = useAuthHeader();
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  const handleOptionSelect2 = (option) => {
    setSort(option);
    setDropdownOpen2(false);
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
        const filteredData = response.data.filter(
          (entry) => entry.payat !== null || entry.status === "Completed"
        );
        setFilteredData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchStatus = async () => {
    try {
      let response2, response3;
      switch (selectedOption) {
        case "Hari Ini":
          response2 = await axios.get(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/g-today`,
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
          response3 = await axios.get(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/g2-today`,
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
          break;
        case "7 Hari Terakhir":
          response2 = await axios.get(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/g-7days`,
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
          response3 = await axios.get(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/g2-7days`,
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
          break;
        case "30 Hari Terakhir":
          response2 = await axios.get(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/g-30days`,
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
          response3 = await axios.get(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/g2-30days`,
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
          break;
        default:
          // Handle default case if needed
          break;
      }
      console.log(response2);
      setSumData(response2.data);
      setSumData2(response3.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStatus();
  }, [selectedOption]);

  useEffect(() => {
    setData();
    const sortedData = [...data];
    sortedData.forEach((item) => {
      item.date = new Date(item.date);
    });

    if (sort === "Terlama") {
      sortedData.sort((a, b) => a.date - b.date);
    } else {
      sortedData.sort((a, b) => b.date - a.date);
    }

    setData(sortedData);
  }, [sort]);
  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-1/2">
          {" "}
          <h1 className="font-semibold text-[32px]">Dashboard Keuangan</h1>
        </div>

        <div className="w-1/2 flex justify-end">
          <div className="w-1/2">
            <button
              type="button"
              className="flex justify-center w-full bg-main-200 py-3 px-4 rounded-[24px] items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-100 focus:ring-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span className="w-2/3 text-center mr-1">{selectedOption}</span>
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
              <div className="origin-top-right absolute   mt-2 w-1/6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
      <div className="flex mt-6">
        <div className="w-1/2 mr-8">
          <SalesSummary
            judul={"Total Penjualan"}
            tipe={selectedOption}
            data={filteredData}
            sumData={sumData}
          />
        </div>
        <div className="w-1/2 ">
          <SalesSummary
            judul={"Total Pendapatan"}
            tipe={selectedOption}
            data={filteredData}
            sumData={sumData2}
          />
        </div>
      </div>
      <div>
        <SalesGraph tipe={selectedOption} data={filteredData} />
      </div>
      <div className="overflow-x-auto">
        <div className="flex mt-8 justify-center items-center">
          <div className="w-1/2 flex items-center">
            <h1 className=" font-semibold text-lg">Transaksi Baru-Baru Ini</h1>
          </div>
          <div className="w-1/2 flex items-center">
            <div className="w-1/2 flex justify-end"></div>
            <div className="w-1/2 flex justify-end">
              <div className="relative inline-block text-left w-full ">
                <div className="flex justify-end w-full">
                  <button
                    type="button"
                    className="flex justify-center w-1/2 bg-main-200 py-3 px-4 rounded-[24px] items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-100 focus:ring-white"
                    onClick={() => setDropdownOpen2(!dropdownOpen2)}
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <span className="w-2/3 text-center mr-1">{sort}</span>
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
                <div className="flex justify-end mr-4">
                  {dropdownOpen2 && (
                    <div className="origin-top-right absolute  ml-4 mt-2 w-1/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={() => handleOptionSelect2("Terlama")}
                          className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                          role="menuitem"
                        >
                          Terlama
                        </button>
                        <button
                          onClick={() => handleOptionSelect2("Terbaru")}
                          className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                          role="menuitem"
                        >
                          Terbaru
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="font-medium text-md text-[#8B909A]">{selectedOption}</h1>
        <table className="w-full min-w-max table-auto text-left rounded-2xl mt-4 ">
          {" "}
          <thead className="">
            <tr className="border border-[#D5E2FF]  ">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={`bg-main-200/25 p-4  ${
                    head === "ID" ? "rounded-tl-2xl" : ""
                  }  ${head === "Status" ? "rounded-tr-2xl" : ""}`}
                >
                  <h6
                    className={`font-medium text-xs text-center text-main-200  `}
                  >
                    {head}
                  </h6>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, course, price, date, payat, status, method }) => {
              const classes =
                "rounded-[16px] p-4 border-b border-[#D5E2FF]  bg-white ";

              const getFormat = (date) => {
                if (date === null) {
                  return "Belum Bayar";
                }
                const date2 = new Date(date);

                const months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "Mei",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];

                const day = date2.getDate();
                const month = months[date2.getMonth()];
                const year = date2.getFullYear();
                const hour = date2.getHours();
                const minute = date2.getMinutes();
                const formattedDate = `${day} ${month} ${year} ${
                  hour < 9 ? `0${hour}` : hour
                }:${minute < 9 ? `0${minute}` : minute}`;
                return formattedDate;
              };

              return (
                <tr key={id} className={`border-l  border-r border-[#D5E2FF] `}>
                  <td className={`${classes} w-8`}>
                    <h6> {id}</h6>
                  </td>

                  <td className={classes + "w-8"}>
                    <h6> {course.name}</h6>
                  </td>
                  <td className={classes + "w-8"}>
                    {" "}
                    <h6> {price}</h6>
                  </td>
                  <td className={classes + "w-8"}>
                    {" "}
                    <h6> {getFormat(date)}</h6>
                  </td>
                  <td className={classes + "w-8"}>
                    {" "}
                    <h6> {getFormat(payat)}</h6>
                  </td>
                  <td className={classes + "w-8"}>
                    {" "}
                    <h6> {method}</h6>
                  </td>
                  <td className={classes + "w-8"}>
                    {" "}
                    {status === "Completed" ? (
                      <div className=" flex items-center justify-center rounded-2xl bg-[#62C21C]/15 py-2 px-4 m-4">
                        <input className="bg-[#62C21C] size-3 rounded-full  mr-2" />
                        <h6 className="text-[#62C21C]">{status}</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {status === "Pending" ? (
                      <div className=" flex items-center justify-center rounded-2xl bg-[#FFA500]/15 py-2 px-4 m-4">
                        <input className="bg-[#FFA500] size-3 rounded-full  mr-2" />
                        <h6 className="text-[#FFA500]">{status}</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {status === "Failed" ? (
                      <div className=" flex items-center justify-center rounded-2xl bg-[#FF0000]/15 py-2 px-4 m-4">
                        <input className="bg-[#FF0000] size-3 rounded-full  mr-2" />
                        <h6 className="text-[#FF0000]">{status}</h6>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default TopLevelDashboard;
