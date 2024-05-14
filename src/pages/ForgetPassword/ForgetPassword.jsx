import React from "react";
import img1 from "../../assets/security.png";
import logo from "../../assets/logo.png";
import { useState } from "react";
import InputField from "../../components/input/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Alert from "../../components/alert/Alert";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState(false);
  const [massage, setMassage] = useState("");

  const resetPasswordMutation = useMutation({
    mutationFn: (formData) =>
      axios.post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/auth/forgot-password`,
        formData
      ),

    onSuccess: () => {
      console.log("Password berhasil direset");
      setMassage("Perikasa email anda untuk melanjutkan proses reset password");
      setError(false);
    },
    onError: (error) => {
      console.error("Gagal mereset password:", error);
      setError(true);
      setMassage(
        "Tolong periksa kembali kredensial Anda " +
          "Email belum terdaftar. Silahkan untuk register akun."
      );
    },
  });

  const handleCloseMassage = () => {
    setMassage(null);
  };

  // Handler untuk mengirimkan data login
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Email:", formData.email);
    resetPasswordMutation.mutate(formData);
  };

  return (
    <>
      <div className="flex">
        {/* Bagian Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full">
            <img className="mb-4" src={logo} alt="Logo Unimate" />
            <h1 className="text-5xl font-bold mb-1 text-black">
              Lupa Password?
            </h1>
            <h1 className="text-xl font-thin mb-1 text-black">
              Jangan cemas, masukkan e-mail yang terdaftar untuk validasi ya!
            </h1>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full mb-2 lg:mb-0"></div>
            </div>

            {massage && (
              <Alert
                type={error ? "error" : "success"}
                message={error ? "Terjadi kesalahan" : "Berhasil"}
                description={massage}
                onClose={handleCloseMassage}
              />
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} method="POST" className="space-y-4">
              {/* Form Input Email */}
              <div>
                <InputField
                  onChange={(e) =>
                    setFormData((prevData) => ({ ...prevData, email: e }))
                  }
                  placeholder="Masukkan e-mail yang terdaftar"
                  fieldName="email"
                  label="E-mail Terdaftar"
                  type="email"
                />
              </div>

              {/* Form Submit Button */}
              <div>
                <button
                  type="submit"
                  className="font-semibold w-full bg-main-200 text-white p-2 rounded-md hover:bg-[#501EAE] focus:outline-none focus:bg-[#501EAE] focus:shadow-lg transition-colors duration-300"
                >
                  Reset Password
                </button>
              </div>
            </form>
            {/* Akhir Form */}

            <hr className="my-5 border-gray-300" />
            <div className="text-left">
              <Link
                to="/login"
                className="text-[#5B25D9] hover:underline text-sm"
              >
                <FontAwesomeIcon
                  icon={faArrowLeftLong}
                  size="sm"
                  className="mr-3"
                />{" "}
                Kembali ke halaman login
              </Link>
            </div>
          </div>
        </div>
        {/* Akhir Bagian Form */}

        {/* Bagian Gambar */}
        <div className="hidden lg:flex items-center justify-center max-w-xl mx-auto">
          <div className="min-w-full justify-center">
            {/* Konten di sini */}
            <img src={img1} alt="Login" className="w-full h-auto" />
          </div>
        </div>
        {/* Akhir Bagian Gambar */}
      </div>
    </>
  );
};

export default ForgetPassword;
