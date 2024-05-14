import React from "react";
import checkbox from "../../assets/image/CheckBox.png";
import document from "../../assets/image/Document.svg";
import halfStar from "../../assets/image/Half Star.svg";
import { useState, useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import { useLocation } from "react-router-dom";
import FAQ from "./FAQ";

export default function Overview() {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split("/"); // Memisahkan string berdasarkan garis miring
  const courseId = pathSegments[2];
  const authHeader = useAuthHeader();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      console.log(courseId);
      const responseData = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/` + courseId,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      setData(responseData.data);
      console.log("ini" + data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div></div>;
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-center  w-full">
        <div className="w-full md:w-1/2 mr-8">
          <div className="mt-[74px]  w-full border-b border-[#5B25D9]  border-opacity-25 flex justify-center">
            <div className="w-full  border-b-4 border-first flex justify-center items-center">
              <img src={document} className="mb-[16px]  h-full mr-[8px]" />
              <h1 className="text-2xl mb-[16px]  font-semibold text-center text-first">
                Deskripsi Program
              </h1>
            </div>
          </div>
          <div className="mt-[40px] w-full">
            <p className="text-xl text-justify">{data.description}</p>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="mt-[74px] w-full border-b border-[#5B25D9]  border-opacity-25  flex justify-center">
            <div className="w-full border-b-4 border-first flex justify-center items-center">
              <img src={halfStar} className="mb-[16px]  h-full mr-[8px]" />
              <h1 className="text-2xl mb-[16px]  font-semibold text-center text-first">
                Benefit Program
              </h1>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mt-[40px]">
              {data.benefits.map((x, i) => (
                <div key={i} className="mb-[12px] flex py-[8px]">
                  <img src={checkbox} alt="" />
                  <h3 className="ml-2 font-semibold text-base">{x}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mt-8 border-b border-[#5B25D9]  border-opacity-25 flex justify-center">
          <div className="w-full border-b-4 border-first flex justify-center items-center">
            <img src={document} className="mb-[16px]  h-full mr-[8px]" />
            <h1 className="text-2xl mb-[16px]  font-semibold text-center text-first">
              Materi yang Diajarkan
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col flex-wrap mt-8 justify-center items-center">
          {data.syllabuses.map((x, i) => (
            <div key={i} className="w-full p-4 border-b mt-2 ">
              <h1 className="w-full font-semibold text-medium sm:text-[20px]">
                Course ke {i + 1} : {x}{" "}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 w-full">
        <FAQ />
      </div>
    </div>
  );
}
