import React from "react";
import { useLocation } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";

const CreateExam = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link, { state: location.state });
  };

  return (
    <>
      <div className="text-2xl font-semibold">Buat Ujian Baru</div>

      <div className="border-b border flex flex-wrap gap-1 border-main-200 opacity-10 px-3 my-7 "></div>

      <button
        onClick={() => handleClick("/teacher/examination/add-exam")}
        className={`${
          location.pathname === "/teacher/examination/add-exam"
            ? "text-white bg-main-200"
            : ""
        } px-4 py-3 font-semibold  text-main-200 rounded-lg  transition-all duration-300 shadow-md`}
      >
        Detail Ujian
      </button>
      <button
        onClick={() => handleClick("/teacher/examination/detail-exam")}
        className={`${
          location.pathname === "/teacher/examination/detail-exam"
            ? "text-white bg-main-200"
            : ""
        } px-4 py-3 font-semibold  text-main-200 rounded-lg  transition-all duration-300 shadow-md`}
      >
        Soal Ujian
      </button>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default CreateExam;
