import React from "react";
import Button from "../button/Button";
import img from "../../assets/partnerJambrotron.png";

const Jumbotron = () => {
  const handleClick = () => {
    const formElement = document.getElementById("form");
    formElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="rounded-3xl p-20 text-left text-white"
      style={{
        backgroundImage: `url(${img})`, // Menetapkan gambar latar belakang
        backgroundSize: "cover", // Menyesuaikan ukuran gambar agar sesuai dengan div
      }}
    >
      <div className="md:w-1/2">
        <h1 className="lg:text-5xl md:text-3xl text-xl font-semibold lg:mb-8 mb-4">
          Kembangkan Individu Organisasi bersama Unimate
        </h1>
        <p className="lg:text-xl md:text-base text-xs lg:mb-6 mb-2">
          Unimate membuka partnership untuk institusi pendidikan dan perusahaan
          yang ingin mengembangkan skill individu di sebuah organisasi
        </p>
        <div className="w-2/3">
          <Button
            style="secondary"
            label="Konsultasi Sekarang"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
