import dashboard from "../../assets/image/Group 286.png";
import document from "../../assets/image/Frame 304.svg";
import nullenrol from "../../assets/image/Null Enroll.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/card/Card.jsx";

export default function DashboardStudent() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [data, setData] = useState([]);
  const fetchData = async () => {
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
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-full ">
        <div className="flex w-full">
          <div className="w-full  ">
            <div className=" w-full  bg-gradient-to-r to-[#686EFB] from-main-200 rounded-[16px] flex">
              <div className="absolute w-full">
                <h1 className="font-semibold text-2xl text-white mx-8 mt-8 mb-2">
                  Selamat datang kembali, {auth.name}!
                </h1>
                <p className="mx-8 mt-2 w-5/12 text-white text-base">
                  Semangat untuk mempersiapkan diri dalam mencapai masa depan
                  yang lebih baik!
                </p>
              </div>
              <div className="w-full flex justify-end">
                <img src={dashboard} />
              </div>
            </div>
            <div className=" mt-12">
              <h1 className="font-medium text-2xl">Dashboard Saya</h1>
              <div className="flex w-full ">
                <div className="w-1/3 h-full border-main-200 border rounded-[8px] mt-6 mr-6 p-4">
                  <img src={document} className="size-12 mb-6" />
                  <h1 className="font-semibold text-2xl text-main-200">
                    Enrolled Class
                  </h1>
                  <p className="text-base mt-2 mb-4">{data.length} Kelas</p>
                </div>
                <div className="w-1/3 h-full border-main-200 border rounded-[8px] mt-6 mr-6 p-4">
                  <img src={document} className="size-12 mb-6" />
                  <h1 className="font-semibold text-2xl text-main-200">
                    Active Class
                  </h1>
                  <p className="text-base mt-2 mb-4">
                    {data.filter((item) => item.isFinished === false).length}{" "}
                    Kelas
                  </p>
                </div>
                <div className="w-1/3 h-full border-main-200 border rounded-[8px] mt-6 mr-6 p-4">
                  <img src={document} className="size-12 mb-6" />
                  <h1 className="font-semibold text-2xl text-main-200">
                    Completed Class
                  </h1>
                  <p className="text-base mt-2 mb-4">
                    {" "}
                    {
                      data.filter((item) => item.isFinished === true).length
                    }{" "}
                    Kelas
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mt-[62px]">
              <div className="w-1/2">
                <h1 className="font-medium text-2xl">Enrolled Program</h1>
              </div>
              <div className="w-1/2">
                {data.length != 0 && (
                  <a
                    className="font-semibold text-xl underline flex justify-end underline-offset-1 text-main-200 mr-6"
                    href="enrolled-program"
                  >
                    Cek Selengkapnya
                  </a>
                )}
              </div>
            </div>
            <div className="flex justify-start w-full h-1/3">
              {data
                .filter((item) => item.isFinished === false)
                .filter((_, i) => i <= 1)
                .map((data) => (
                  <Card data={data} key={data.id} />
                ))}
              {data.length == 0 && (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
