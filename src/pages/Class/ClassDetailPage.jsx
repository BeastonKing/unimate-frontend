import React from "react";
import img1 from "../../assets/image/Program Image.png";
import category from "../../assets/image/Category.svg";
import user from "../../assets/image/3 User.svg";
import Loader from "../../components/loader/Loader";
import ProgramPaid from "../../components/classDetail/ProgramPaid";
import ProgramUnpaid from "../../components/classDetail/ProgramUnpaid";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";

export default function DetailKelas() {
  const authHeader = useAuthHeader();
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split("/");
  const courseId = pathSegments[2];
  const [isPay, setIsPay] = useState(false);
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const fetchDataIsPay = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}` +
          "/api/kelas/is-enrolled?kelasId=" +
          courseId,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      setIsPay(response.data);
      console.log("kelas" + isPay + "inini");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}` +
          "/api/kelas/" +
          courseId,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      setData(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkout = async () => {
    const userConfirmed = confirm(
      "Apakah Anda yakin ingin melanjutkan ke pembayaran?"
    );

    if (!userConfirmed) {
      return;
    }
    setLoading(true);
    const checkoutData = {
      course: data.id,
      price: data.price,
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
        setLoading(false);
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

  useEffect(() => {
    fetchDataIsPay();
    fetchData();
  }, []);

  return (
    <>
      {" "}
      {loading && <Loader loading={true} />}
      <div className="bg-[#F8F9FB] w-full flex  mt-20 justify-center ">
        <div className="flex  2xl:w-11/12 justify-center items-center">
          <div className="w-11/12 flex flex-col justify-center items-center">
            <div
              id="image"
              className=" flex justify-center w-full items-center"
            >
              <img
                src={data.cover ? data.cover : img1}
                className="object-cover w-full  rounded-unimate "
              />
            </div>
            <div className="w-full flex  justify-center">
              <div className="w-full flex flex-col md:flex-row justify-center items-center mt-9">
                <div className="w-full md:w-4/5 flex justify-center items-center">
                  <h1 className="w-full font-semibold text-2xl md:text-5xl">
                    {data.name}
                  </h1>
                </div>
                <div className="w-full md:w-1/5 flex justify-end items-center">
                  {!isPay && (
                    <div className="flex  justify-start md:justify-end items-center w-full">
                      <h1 className="font-semibold text-main-200 text-xl md:text-4xl">
                        {formatter.format(data.price)}
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!isPay && (
              <div className="w-full flex mt-8">
                <div className="w-1/2  rounded-[8px] bg-white flex justify-center border border-main-200 items-center mr-4 py-4">
                  <button
                    className="w-full font-bold text-base md:text-xl text-main-200"
                    onClick={checkout}
                  >
                    Konsultasikan Program
                  </button>
                </div>
                <div
                  className="w-1/2  rounded-[8px] bg-main-200 flex justify-center items-center ml-4 py-4"
                  onClick={checkout}
                >
                  <button className="font-bold text-base md:text-xl text-white">
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center">
              <div className="w-full">
                <div
                  id="w-full"
                  className=" border h-full mt-[22px] p-4 md:p-8  xl:p-12 rounded-unimate  flex justify-center items-center  bg-white"
                >
                  <div className="w-full flex ">
                    <div className="flex  w-1/2 justify-center items-center border-r ">
                      <div className="">
                        <span className="text-sm md:text-lg xl:text-4xl flex justify-center items-center text-main-200">
                          <img src={user} className="m-2 " />
                          Peserta
                        </span>
                        <h1 className="font-semibold text-sm md:text-lg xl:text-4xl mt-3 text-center text-main-200">
                          {data.peserta} Orang
                        </h1>
                      </div>
                    </div>

                    <div className="flex w-1/2 justify-center items-center ">
                      <div className="w-full flex flex-wrap justify-center items-center">
                        <span className="w-full text-sm md:text-lg  xl:text-4xl flex justify-center items-center text-main-200">
                          <img src={category} className="m-2 text-main-200" />
                          Kategori Kelas
                        </span>
                        <h1 className="w-full flex justify-center items-center font-semibold text-sm md:text-base xl:text-4xl mt-3">
                          <span className="border-2 border-main-200 text-main-200 rounded-3xl p-1 sm:p-2 xl:px-4 xl:py-4">
                            {data.category}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center mt-10">
              <div className="w-full">
                {isPay ? (
                  <ProgramPaid
                    courseId={courseId}
                    category={data && data.category}
                  />
                ) : (
                  <ProgramUnpaid courseId={courseId} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
