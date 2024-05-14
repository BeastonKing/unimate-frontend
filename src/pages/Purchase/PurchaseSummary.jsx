import React from "react";
import axios from "axios";
import SalesGraph from "../../components/purchase/SalesGraph";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import DataTable from "react-data-table-component";
import { format } from "date-fns";

const PurchaseSummary = () => {
  const authHeader = useAuthHeader();
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Semua Transaksi");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

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
      width: "22%",
    },
  ];

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
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/7days`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      const filteredData = response.data.filter(
        (entry) => entry.payat !== null || entry.status === "Completed"
      );
      setFilteredData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleOptionSelect = (option) => {
    console.log(option);
    if (option === "Semua Transaksi") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );

      newData = newData.filter((x) => x.status === "Completed");
      setFilteredData(newData);
    } else if (option === "Persiapan Tes") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter(
        (x) => x.status === "Completed" && x.course.category == "Persiapan Tes"
      );
      setFilteredData(newData);
    } else if (option === "Bimbingan Beasiswa") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter(
        (x) =>
          x.status === "Completed" && x.course.category == "Bimbingan Beasiswa"
      );
      setFilteredData(newData);
    } else if (option === "Webinar") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter(
        (x) => x.status === "Completed" && x.course.category == "Webinar"
      );
      setFilteredData(newData);
    }
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    const option = selectedOption;
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (option === "Semua Transaksi") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter((x) => x.status === "Completed");
      setFilteredData(newData);
    } else if (option === "Persiapan Tes") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter(
        (x) => x.status === "Completed" && x.course.category == "Persiapan Tes"
      );
      setFilteredData(newData);
    } else if (option === "Bimbingan Beasiswa") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter(
        (x) =>
          x.status === "Completed" && x.course.category == "Bimbingan Beasiswa"
      );
      setFilteredData(newData);
    } else if (option === "Webinar") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter(
        (x) => x.status === "Completed" && x.course.category == "Webinar"
      );
      setFilteredData(newData);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <h1 className="font-semibold text-2xl">
          Ringkasan Pendapatan - Persiapan TOEFL/IELTS
        </h1>
        <div className="w-full mt-4 flex items-center">
          <div className="w-1/2  flex items-center">
            <div className="w-full flex">
              <div className="relative w-2/3 flex text-left">
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
                  </button>
                </div>

                {dropdownOpen && (
                  <div
                    className="origin-top-right absolute  mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    style={{ zIndex: 999 }}
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        onClick={() => handleOptionSelect("Semua Transaksi")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        Semua Transaksi
                      </button>
                      <button
                        onClick={() => handleOptionSelect("Webinar")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        Webinar
                      </button>
                      <button
                        onClick={() => handleOptionSelect("Persiapan Tes")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        Persiapan Tes
                      </button>
                      <button
                        onClick={() => handleOptionSelect("Bimbingan Beasiswa")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        Bimbingan Beasiswa
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full border-2 border-main-200/50 rounded-[24px] py-3 px-4 flex">
              <div className="w-4/5">
                <input
                  placeholder="Cari Transaksi "
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
        </div>
      </div>
      <SalesGraph tipe="7 Hari Terakhir" data={filteredData} />
      <div className="mt-4">
        <div className="w-1/2 flex items-center">
          <h1 className=" font-semibold text-lg">Transaksi Baru-Baru Ini</h1>
        </div>
        <div className="w-1/2 flex">
          <div className="w-1/2">
            <h6 className="font-medium text-md text-[#8B909A]">Tipe </h6>
            <h6 className="font-medium mt-1  mb-2 text-md text-[#8B909A]">
              {searchItem && `Query  `}
            </h6>
          </div>
          <div className="w-1/2">
            <h6 className="font-medium text-md text-[#8B909A]">
              : {selectedOption}
            </h6>
            <h6 className="font-medium mt-1  mb-2 text-md text-[#8B909A]">
              {searchItem && `: ${searchItem}`}
            </h6>
          </div>
        </div>

        <DataTable
          customStyles={tableHeaderStyle}
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          highlightOnHover
          paginationRowsPerPageOptions={[2, 5, 10]}
          emptyDataMessage={() => (
            <p>No Payment found matching your search criteria.</p>
          )}
        />
      </div>
    </div>
  );
};

export default PurchaseSummary;
