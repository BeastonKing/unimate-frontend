import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import HeadProgam from "../../components/program/HeadProgram";
import BodyProgram from "../../components/program/BodyProgram";

import axios from "axios";

const Program = () => {
  const { type } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [programName, setProgramName] = useState("");

  const setUrl = () => {
    if (type === "scholarship") {
      setProgramName("Program Scholarship");
    } else if (type === "webinar") {
      setProgramName("Webinar");
    } else if (type === "test-preparation") {
      setProgramName("Test Preparation");
    } else {
      setProgramName("Program");
    }
  };

  const getData = async () => {
    if (type === "scholarship") {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/kelas/get-bimbinganbeasiswa`
        );
        console.log("Response Data:", response.data);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (type === "webinar") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/get-webinar`
        );
        console.log("Response Data:", response.data);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (type === "test-preparation") {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/kelas/get-persiapantes`
        );
        console.log("Response Data:", response.data);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/get-all`
        );
        console.log("Response Data:", response.data);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    setUrl();
    setData([]);
    getData();
  }, [location.pathname]);
  return (
    <div className="">
      <div className="flex flex-col items-center mt-20">
        <HeadProgam programName={programName} />
        <BodyProgram programName={programName} data={data} />
      </div>
      <div className="relative flex justify-center"></div>
    </div>
  );
};

export default Program;
