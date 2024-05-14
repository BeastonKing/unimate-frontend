import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import dashboard from "../../assets/image/purchase.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/card/Card.jsx";
import nullenrol from "../../assets/image/Null Enroll.png";

const EnrolledProgram = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Semua Kelas");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fetchData = async () => {
    console.log(auth);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/kelas/classes-enrolled`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log("Response Data:", response.data);
      setData(response.data);
      setRawData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === "Semua Kelas") {
      setData(rawData);
    } else if (option === "Completed") {
      const newData = rawData.filter((x) => x.isFinished === true);
      setData(newData);
    } else if (option === "Active") {
      const newData = rawData.filter((x) => x.isFinished === false);
      setData(newData);
    }
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-full ">
        <div className="flex w-full">
          <div className="w-full">
            {" "}
            <div className=" w-full  bg-gradient-to-r to-[#686EFB] from-main-200 rounded-[16px] flex">
              <div className="absolute w-full">
                <h1 className="font-semibold text-2xl text-white mx-8 mt-8 mb-2">
                  Program Saya
                </h1>
                <p className="mx-8 mt-2 w-5/12 text-white text-base">
                  Akses semua program yang kamu daftarkan di sini!
                </p>
              </div>
              <div className="w-full flex justify-end">
                <img src={dashboard} />
              </div>
            </div>
            <div className="w-1/2 mt-8">
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
                <div className="origin-top-right absolute  ml-4 mt-2 w-1/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={() => handleOptionSelect("Semua Kelas")}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      role="menuitem"
                    >
                      Semua Kelas
                    </button>
                    <button
                      onClick={() => handleOptionSelect("Active")}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      role="menuitem"
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleOptionSelect("Completed")}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      role="menuitem"
                    >
                      Completed
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-start w-full h-1/3 gap-y-16">
              {data.map((data, i) => (
                <Card data={data} key={i} />
              ))}
              {rawData.length == 0 && (
                <div className="flex flex-col justify-center items-center w-full">
                  <img src={nullenrol} />
                  <h1 className=" mt-8 text-base w-1/2 flex text-center">
                    Wah, sepertinya kamu belum mendaftar program apapun, yuk
                    cari program yang sesuai untukmu!
                  </h1>
                  <button className="mt-16 text-white bg-main-200 w-full py-4 font-semibold text-xl rounded-[8px]">
                    Cari Program
                  </button>
                </div>
              )}
              {data.length === 0 && selectedOption == "Active" ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <img src={nullenrol} />
                  <h1 className=" mt-8 text-base w-1/2 flex text-center">
                    Wah, sepertinya kamu belum memiliki kelas aktif, yuk cari
                    program yang sesuai untukmu!
                  </h1>
                  <button className="mt-16 text-white bg-main-200 w-full py-4 font-semibold text-xl rounded-[8px]">
                    Cari Program
                  </button>
                </div>
              ) : (
                data.length === 0 && (
                  <div className="flex flex-col justify-center items-center w-full">
                    <img src={nullenrol} />
                    <h1 className=" mt-8 text-base w-1/2 flex text-center">
                      Wah, sepertinya kamu belum menyelesaikan program apapun,
                      yuk semangat untuk menyelesaikan kelasnya
                    </h1>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledProgram;
