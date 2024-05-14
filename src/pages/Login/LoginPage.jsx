/* eslint-disable react/prop-types */
import React from "react";
import img1 from "../../assets/login.png";
import logo from "../../assets/logo.png";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import Alert from "../../components/alert/Alert";
import PasswordInput from "../../components/input/PasswordInputField";
import InputField from "../../components/input/InputField";

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();

  const handleClose = () => {
    setError(null);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const formDataWithRememberMe = { ...formData, rememberMe };
      console.log(formDataWithRememberMe);

      axios
        .post(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/auth/login`,
          formDataWithRememberMe
        )
        .then((res) => {
          if (res.status === 200) {
            const authToken = res.data.token;
            const jwtToken = authToken.split(" ")[1];
            axios
              .get(
                `${
                  import.meta.env.VITE_UNIMATE_BE_SERVICES
                }/api/account/get-logged-in-from-jwt`,
                {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
                }
              )
              .then((response) => {
                console.log("Informasi pengguna:", response.data);
                if (
                  signIn({
                    auth: {
                      token: jwtToken,
                      type: "Bearer",
                      expiresIn: 900,
                    },
                    refresh: res.data.refreshToken,
                    userState: {
                      id_user: response.data.id,
                      email: response.data.email,
                      name: response.data.name,
                      role: response.data.role.name,
                      status: response.data.status,
                      job: response.data.job ?? null,
                      birthday: response.data.birthday ?? null,
                      bio: response.data.bio ?? null,
                      phone: response.data.phoneNumber ?? null,
                      address: response.data.address ?? null,
                      profilePicture: response.data.profilePicture ?? null,
                    },
                  })
                ) {
                  navigate("/dashboard");
                  window.location.reload();
                }
              })
              .catch((error) => {
                console.log("Error fetching user info:", error.message);
                setError("Failed to sign in.");
              });
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.title === undefined) {
              setError(
                "Tolong periksa lagi alamat Email Anda. " +
                  "Email Belum terdaftar. Silahkan registrasi dahulu"
              );
            } else {
              setError(
                "Tolong perikasa lagi alamat akun Anda, " +
                  error.response.data.title
              );
            }
          } else if (error.request) {
            setError("Server sedang bermasalah");
            console.log("Request error:", error.request);
          } else {
            console.log("Other error:", error.message);
          }
        });
    } catch (error) {
      console.log("General error:", error.message);
      setError("Gagal masuk ke akun");
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  return (
    <>
      {location.state && (
        <Alert
          message={location.state.message}
          type={location.state.error ? "error" : "success"}
          onClose={() => navigate("/login")} // Close the alert by navigating to login page
        />
      )}
      <div className="flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full">
            <img className="mb-4" src={logo} alt="Logo Unimate" />
            <h1 className="text-5xl font-bold mb-1 text-black">
              Halo, Scholars!
            </h1>
            <h1 className="text-xl font-thin mb-1 text-black">
              Silakan masuk menggunakan email yang terdaftar ya!
            </h1>

            {error && (
              <Alert
                type="error"
                message="Terjadi kesalahan"
                description={error}
                onClose={handleClose}
              />
            )}

            <form onSubmit={onSubmit} method="POST" className="space-y-4 mt-5">
              {/* Form Input Email */}
              <div>
                <InputField
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
              {/* Form Checkbox and Link */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    className="h-4 w-4 accent-main-200 rounded focus:ring-main-200"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-[#1B0947]"
                  >
                    Ingatkan aku
                  </label>
                </div>
                <Link
                  to="/forget-password"
                  className="text-sm text-main-200 hover:underline"
                >
                  Lupa password?
                </Link>
              </div>

              {/* Form Submit Button */}
              <div>
                <button
                  type="submit"
                  className="font-semibold w-full bg-main-200 text-white p-2 rounded-md hover:bg-[#501EAE] focus:outline-none focus:bg-[#501EAE] focus:shadow-lg transition-colors duration-300"
                >
                  Masuk Sekarang
                </button>
              </div>
            </form>
            <hr className="my-6 border-gray-300" />
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Belum punya akun?{" "}
                <Link to="/signup" className="text-[#5B25D9] hover:underline">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-start max-w-xl mx-auto">
          <div className="min-w-full object-cover text-center">
            {/* Konten di sini */}
            <img src={img1} alt="Login" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
