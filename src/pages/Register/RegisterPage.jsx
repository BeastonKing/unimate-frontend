import React from "react";
import img1 from "../../assets/register.png";
import logo from "../../assets/logo.png";
import PasswordInput from "../../components/input/PasswordInputField";
import { useState } from "react";
import InputField from "../../components/input/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../../components/alert/Alert";

const Register = () => {
  const navigate = useNavigate();
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleClose = () => {
    setError(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Registrasi berhasil!");
          navigate("/login", {
            state: {
              message: "Registrasi Berhasil, silahkan verifikasi email Anda",
            },
          });
        } else {
          console.log("Gagal melakukan pendaftaran.");
          setError("Gagal melakukan pendaftaran.");
        }
      })
      .catch((error) => {
        console.log("Terjadi kesalahan:", error.response.data.title);
        setError(error.response.data.title);
      });
  };

  const handleRulesAccepted = () => {
    setRulesAccepted(!rulesAccepted);
  };

  return (
    <>
      <div className="flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full">
            <img className="mb-4" src={logo} alt="Logo Unimate" />
            <h1 className="text-5xl font-bold mb-1 text-black">
              Selamat Datang!
            </h1>
            <h1 className="text-xl font-thin mb-6 text-black">
              Silakan isi form di bawah ini dengan data yang valid ya!
            </h1>

            {error && (
              <Alert
                type="error"
                message="Gagal membuat akun"
                description={error}
                onClose={handleClose}
              />
            )}

            <form
              onSubmit={handleSubmit}
              method="POST"
              className="space-y-4 mt-5"
            >
              <div>
                <InputField
                  required
                  onChange={(e) =>
                    setFormData((prevData) => ({ ...prevData, name: e }))
                  }
                  placeholder="Masukan nama lengkap di sini"
                  fieldName="name"
                  label="Nama Lengkap"
                />
              </div>

              <div>
                <InputField
                  required
                  onChange={(e) =>
                    setFormData((prevData) => ({ ...prevData, email: e }))
                  }
                  placeholder="Masukkan e-mail di sini"
                  fieldName="email"
                  label="E-mail"
                  type="email"
                />
              </div>

              <div>
                <PasswordInput
                  onChange={(e) =>
                    setFormData((prevData) => ({ ...prevData, password: e }))
                  }
                  placeholder="Masukkan password di sini"
                  fieldName="Password"
                  label="Password"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rule-accepted"
                  checked={rulesAccepted}
                  onChange={handleRulesAccepted}
                  className="w-4 mb-6 accent-main-200 rounded focus:ring-main-200"
                />
                <label
                  htmlFor="rule-accepted"
                  className="ml-3 text-sm text-[#1B0947]"
                >
                  <span className="block tx-[16px]">
                    Dengan mendaftar, Anda menyetujui Syarat dan Ketentuan yang
                    berlaku di Unimate
                  </span>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="font-semibold w-full bg-main-200 text-white p-2 rounded-md hover:bg-main-300 focus:outline-none focus:bg-[#501EAE] focus:shadow-lg transition-colors duration-300"
                >
                  Daftar Sekarang
                </button>
              </div>
            </form>

            <hr className="my-6 border-gray-300" />
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Sudah punya akun?{" "}
                <Link to="/login" className="text-[#5B25D9] hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-start max-w-xl mx-auto p-16">
          <div className="min-w-full p-8 ml-5">
            <img src={img1} alt="Login" className="w-full " />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
