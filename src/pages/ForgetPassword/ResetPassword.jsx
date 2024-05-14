import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Alert from "../../components/alert/Alert";
import img1 from "../../assets/security.png";
import logo from "../../assets/logo.png";
import PasswordInput from "../../components/input/PasswordInputField";
import Button from "../../components/button/Button";

const ResetPassword = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmationPassword: "",
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (formData) =>
      axios.post(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/verify/forgot-password`,
        {
          token,
          password: formData.newPassword,
        }
      ),

    onSuccess: () => {
      console.log("Password berhasil direset");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Gagal mereset password:", error);
      setError(error.response.data.title);
      // Handle jika gagal mereset password, bisa menampilkan pesan error
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Lakukan validasi
    if (formData.newPassword.length < 8) {
      setError("Password harus memiliki minimal 8 karakter");
      console.error("Password harus memiliki minimal 8 karakter");
    } else if (formData.newPassword !== formData.confirmationPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      console.error("Password dan konfirmasi password tidak cocok");
    } else {
      resetPasswordMutation.mutate(formData);
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <>
      <div className="flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <img className="mb-4" src={logo} alt="Logo Unimate" />
            <h1 className="text-5xl font-bold mb-1 text-black">
              Password Baru
            </h1>
            <h1 className="text-xl font-thin mb-1 text-black">
              Silakan buat password baru dengan minimal 8 karakter
            </h1>
            {error && (
              <Alert
                type="error"
                message="Gagal Mereset Password"
                description={error}
                onClose={handleCloseError}
              />
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <PasswordInput
                onChange={(e) =>
                  setFormData((prevData) => ({ ...prevData, newPassword: e }))
                }
                placeholder="Masukkan password baru di sini"
                fieldName="newPassword"
                label="Password Baru"
              />
              <PasswordInput
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    confirmationPassword: e,
                  }))
                }
                placeholder="Masukkan kembali password baru di sini"
                fieldName="confirmationPassword"
                label="Konfirmasi Password Baru"
              />

              <Button
                type="submit"
                label="Perbarui Password"
                className="primary"
                style="primary"
              />
            </form>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-start max-w-xl mx-auto">
          <div className="min-w-full object-cover text-center">
            <img src={img1} alt="Login" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
