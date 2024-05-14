import React from "react";
import dashboard from "../../assets/image/purchase.png";
import { useState, useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import DataTable from "react-data-table-component";
import { format } from "date-fns";

const PurchaseHistory = () => {
  const authHeader = useAuthHeader();
  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Semua Transaksi");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/payment/history`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
  useEffect(() => {
    fetchData();
  }, []);

  const handleOptionSelect = (option) => {
    console.log(option);
    if (option === "Semua Transaksi") {
      const newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredData(newData);
    } else if (option === "Completed") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter((x) => x.status === "Completed");
      setFilteredData(newData);
    } else if (option === "Pending") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter((x) => x.status === "Pending");
      setFilteredData(newData);
    } else if (option === "Failed") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      newData = newData.filter((x) => x.status === "Failed");
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
      const newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(newData);
    } else if (option === "Completed") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      newData = newData.filter((x) => x.status === "Completed");
      setFilteredData(newData);
    } else if (option === "Pending") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      newData = newData.filter((x) => x.status === "Pending");
      setFilteredData(newData);
    } else if (option === "Failed") {
      let newData = data.filter((x) =>
        x.course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      newData = newData.filter((x) => x.status === "Failed");
      setFilteredData(newData);
    }
  };

  const checkout = async (id, price) => {
    const userConfirmed = confirm(
      "Apakah Anda yakin ingin melanjutkan ke pembayaran?"
    );

    if (!userConfirmed) {
      return;
    }

    const checkoutData = {
      course: id,
      price: price,
      token: authHeader,
    };

    axios
      .post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}` + "/api/payment/checkout",
        checkoutData,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((response) => {
        const resData = response.data;
        window.snap.pay(resData.token, {
          onSuccess: function (result) {
            console.log("success");
            console.log(result);
          },
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(
            "Maaf, anda masih memiliki pembayaran tertunda. Cek email anda"
          );
        } else {
          console.error("There was an error!", error, checkoutData);
        }
      });
  };
  const columns = [
    {
      name: "ID",
      sortable: true,
      wrap: true,
      selector: (row) => row.id,
      cell: (row) => (
        <button
          className="text-main-100 hover:text-main-300"
          onClick={
            row.status === "Pending"
              ? () => checkout(row.course.id, row.price)
              : () => alert("Anda sudah membayar kelas ini")
          }
        >
          {row.id}
        </button>
      ),
      width: "10%",
    },

    {
      name: "Nama Kelas",
      sortable: true,
      wrap: true,
      selector: (row) => row.course.name,
      width: "20%",
    },
    {
      name: "Jumlah",
      sortable: true,
      wrap: true,
      selector: (row) => row.price,
    },
    {
      name: "Waktu Order",
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
      width: "13%",
    },
    {
      name: "Waktu Bayar",
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
        return formattedDate;
      },
      width: "13%",
    },
    {
      name: "Metode Bayar",
      wrap: true,
      wrapHeader: true,
      selector: (row) => row.method,
      width: "13%",
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
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className=" w-full  bg-gradient-to-r to-[#686EFB] from-main-200 rounded-[16px] flex">
            <div className="absolute w-full">
              <h1 className="font-semibold text-2xl text-white mx-8 mt-8 mb-2">
                Riwayat Pembelian
              </h1>
              <p className="mx-8 mt-2 w-5/12 text-white text-base">
                Lihat seluruh transaksi program yang kamu lakukan di sini!
              </p>
            </div>
            <div className="w-full flex justify-end">
              <img src={dashboard} />
            </div>
          </div>
          <div className="mt-8 flex items-center">
            <div className="w-1/2 flex">
              <div className="relative inline-block text-left w-full">
                <div>
                  <button
                    type="button"
                    className="flex justify-center w-1/2 bg-main-200 py-3 px-4 rounded-[24px] items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-100 focus:ring-white"
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
                    className="origin-top-right absolute ml-4 mt-2 w-1/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
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
                        onClick={() => handleOptionSelect("Completed")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => handleOptionSelect("Pending")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleOptionSelect("Failed")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                        role="menuitem"
                      >
                        Failed
                      </button>
                    </div>
                  </div>
                )}
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
          <div className="mt-8 "></div>
        </div>
      )}
      <div className="mt-8">
        <DataTable
          customStyles={tableHeaderStyle}
          columns={columns}
          data={filteredData}
          pagination
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

export default PurchaseHistory;
