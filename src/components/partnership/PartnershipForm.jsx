import React from "react";
import d3icon from "../../assets/image/Form-Partnership.png";
import TextAreaField from "../input/TextAreaField";
import InputField from "../input/InputField";
import Button from "../button/Button";
import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Alert from "../alert/Alert";
import axios from "axios";

const PartnershipForm = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [massage, setMassage] = useState(location.state || "");

  const [formData, setFormData] = useState({
    company: "",
    companyEmail: "",
    phoneNumber: "",
    description: "",
    user: auth?.id_user || null,
  });

  // Handler untuk perubahan input pada setiap field
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const sendRequestPartnership = useMutation({
    mutationFn: (formData) =>
      axios.post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/partnership/create`,
        formData,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),

    onSuccess: (response) => {
      console.log("response:", response);
      navigate(".", { state: response.data }, { replace: true });
      window.location.reload();
    },
    onError: (error) => {
      setError(true);
      setMassage(error.response.data);
    },
  });

  const handleCloseMassage = () => {
    setMassage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth && auth.role === "STUDENT") {
      sendRequestPartnership.mutate(formData);
    } else {
      setError(true);
      setMassage(
        "Anda Harus login terlebih dahulu sebagai pengguna umumnya, sebelum mengirim permintaan"
      );
    }
  };

  return (
    <>
      <div
        id="form"
        className="lg:text-5xl md:text-3xl text-xl text-main-400 font-semibold flex justify-center items-center mt-24 mb-10"
      >
        <h1 className="text-center">
          Ingin Bekerja sama dengan kami? Yuk, Konsultasikan bersama kami
        </h1>
      </div>

      <div className="flex lg:flex-nowrap p-10">
        <div className="hidden lg:block size-2/3 h-96 p-8 pr-32 border border-main-100 rounded-3xl relative">
          <h2 className="text-xl tracking-wide font-semibold">
            Masih bingung mau pilih program apa?
          </h2>
          <p className="text-base mt-6">
            Bicarakan kebutuhan organisasimu dengan kami dan dapatkan preferensi
            program yang cocok untuk Anda!
          </p>

          <div className="absolute top-28 mb-4 p-6">
            <img className="static" src={d3icon} alt="" />
          </div>
        </div>

        <div className="size-2/3 w-full lg:px-8">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {massage && (
              <Alert
                type={error ? "error" : "success"}
                message={
                  !error
                    ? "Berhasil Mengirimkan Perminataan"
                    : "Gagal Mengirimkan Permintaan"
                }
                description={massage}
                onClose={handleCloseMassage}
              />
            )}
            <div>
              <InputField
                label="Nama Perusahaan"
                placeholder="Contoh: PT ABC"
                fieldName="nama-perusahaan"
                onChange={(value) => handleInputChange("company", value)}
                isRequired={true}
              />
            </div>

            <div>
              <InputField
                label="Email Perusahaan"
                placeholder="Masukkan email perusahaan di sini"
                fieldName="email-perusahaan"
                type="email"
                onChange={(value) => handleInputChange("companyEmail", value)}
                isRequired={true}
              />
            </div>

            <div>
              <InputField
                label="Nomor Telepon"
                placeholder="Contoh: 08123029xxxx"
                fieldName="phoneNumber"
                type="tel"
                onChange={(value) => handleInputChange("phoneNumber", value)}
                isRequired={true}
              />
            </div>

            <div>
              <TextAreaField
                label="Kepentingan"
                placeholder="Masukkan informasi pendukung"
                fieldName="penjelasan"
                onChange={(value) => handleInputChange("description", value)}
                isRequired={true}
              />
            </div>

            <Button type="submit" label="Konsultasi Sekarang" style="primary" />
          </form>
        </div>
      </div>
    </>
  );
};

export default PartnershipForm;
