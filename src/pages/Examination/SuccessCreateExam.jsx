import React from "react";

import ujianimg from "../../assets/image/ujian.png";
import { useLocation } from "react-router-dom";
import InputField from "../../components/input/InputField";
import Button from "../../components/button/Button";

const SuccessCreateExam = () => {
  const location = useLocation();

  const tautan = `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/examination/${
    location.state?.id
  }`;

  // Fungsi untuk menyalin tautan ke clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(tautan)
      .then(() => {
        alert("Tautan berhasil disalin ke clipboard!");
      })
      .catch((error) => {
        console.error("Gagal menyalin tautan:", error);
        alert("Gagal menyalin tautan. Silakan coba lagi.");
      });
  };

  return (
    <>
      <div className="text-2xl font-semibold">Ujian Baru Selesai Dibuat</div>
      <div className="flex justify-center items-center flex-col mt-10">
        <img src={ujianimg} alt="berhasil buat ujian" />
        <p>
          {`Tes barumu ${location.state?.title} berhasil dibuat! Bagikan tautan
          ujian di bawah kepada peserta ya!`}
        </p>

        <div className="flex w-4/5 gap-4 mt-4 justify-center items-end">
          <div className="w-1/2 h-full">
            {/* Input field yang menampilkan tautan */}
            <InputField value={tautan} readOnly />
          </div>
          <div className="w-1/4">
            {/* Tombol untuk menyalin tautan */}
            <Button
              label="Salin tautan"
              style="primary"
              onClick={copyToClipboard}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessCreateExam;
