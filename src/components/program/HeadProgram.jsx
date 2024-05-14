import React from "react";
import BgProgamAll from "../../assets/image/bg-program-all.png";
import BgProgamTest from "../../assets/image/bg-program-test.png";
import BgProgramBimbingan from "../../assets/image/bg-program-bimbingan.png";
import BgProgramWebinar from "../../assets/image/bg-program-webinar.png";
import PropTypes from "prop-types";
const HeadProgam = ({ programName }) => {
  return (
    <div className="bg-program w-full bg-cover h-full pt-10">
      <div className="flex justify-center">
        <h6 className="mt-20 bg-white px-4 py-2 rounded-[24px] font-semibold text-base text-main-200">
          {programName == "Program" && "PROGRAM UNIMATE"}
          {programName == "Program Scholarship" &&
            "BIMBINGAN BEASISWA LUAR NEGERI"}
          {programName == "Test Preparation" && "PERSIAPAN TES"}
          {programName == "Webinar" && "PROGRAM WEBINAR UNIMATE"}
        </h6>
      </div>
      <div className="mt-4 flex justify-center">
        {" "}
        <h1 className="w-9/12 font-semibold text-5xl text-center text-white">
          {programName == "Program" &&
            "Program Bimbingan hingga Kelas Persiapan Beasiswa Tersedia!"}
          {programName == "Program Scholarship" &&
            "Masih bingung soal beasiswa kuliah luar negeri? Di Unimate aja!"}
          {programName == "Test Preparation" &&
            "Kelas Persiapan Tes Untukmu Dari TOEFL, IELTS, dan Lainnya!"}
          {programName == "Webinar" &&
            "Pengen Tahu Banyak soal Beasiswa Luar Negeri? Yuk, Ikuti Webinarnya!"}
        </h1>
      </div>
      <div className="mt-8 flex justify-center">
        <h6 className="w-3/4 text-2xl text-white text-center font-normal">
          {programName == "Program" &&
            "Kami meyediakan 4 program unggulan, seperti konsultasi beasiswa, kelas persiapan tes, kelas intensif bahasa, dan konsultasi kerja di luar negeri."}
          {programName == "Program Scholarship" &&
            "Kami menyediakan program bimbingan beasiswa untuk membantumu mempersiapkan impian kuliah ke luar negeri jadi lebih mudah"}
          {programName == "Test Preparation" &&
            "Kami menyediakan persiapan tes untuk membantumu mempersiapkan impian kuliah ke luar negeri jadi lebih mudah"}
          {programName == "Webinar" &&
            "Kami menyediakan berbagai program webinar khusus untukmu yang mau tahu banyak soal seluk-beluk persiapan beasiswa kuliah ke luar negeri!"}
        </h6>
      </div>
      <div className="flex justify-center mt-8">
        {programName == "Program" && (
          <img className="lg:h-[436px]" src={BgProgamAll} />
        )}
        {programName == "Program Scholarship" && (
          <img className="lg:h-[436px]" src={BgProgramBimbingan} />
        )}
        {programName == "Test Preparation" && (
          <img className="lg:h-[436px]" src={BgProgamTest} />
        )}
        {programName == "Webinar" && (
          <img className="lg:h-[436px]" src={BgProgramWebinar} />
        )}
      </div>
    </div>
  );
};

HeadProgam.propTypes = {
  programName: PropTypes.string.isRequired,
};

export default HeadProgam;
