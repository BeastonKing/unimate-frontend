import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import InputField from "../../components/input/InputField.jsx";
import SelectFieldClass from "../../components/input/SelectFieldClass.jsx";
import {
  convertHHMMToDuration,
  convertDurationToHHMM,
} from "../../utils/convertDuration.js";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import Alert from "../../components/alert/Alert.jsx";
const AddExamForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  const [alert, setAlert] = useState(null); // State untuk menampilkan alert

  const initialFormData = location.state
    ? {
        title: location.state.title || "",
        duration: location.state.duration || "",
        startDate: location.state.startDate || "",
        endDate: location.state.endDate || "",
        kelasId: location.state.kelas?.id || "",
        namaKelas: location.state.kelas?.name || "", // Tambahkan namaKelas
        id: location.state.id || "",
        passingGrade: location.state.passingGrade || 0,
      }
    : {
        title: "",
        duration: "",
        startDate: "",
        endDate: "",
        kelasId: "",
        namaKelas: "", // Tambahkan namaKelas
        passingGrade: 0,
      };

  const [formData, setFormData] = useState(initialFormData);

  const { data: kelasData, error } = useQuery({
    queryKey: ["kelas"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/classes-taught`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      return response.json();
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Cek apakah ada data yang tidak diisi atau invalid
    if (
      !formData.title ||
      !formData.duration ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.kelasId ||
      !formData.passingGrade
    ) {
      // Tampilkan alert error jika ada data yang tidak diisi
      setAlert({
        type: "error",
        message: "Error:",
        description: "Mohon isi semua kolom dengan benar.",
      });
      return; // Berhenti eksekusi fungsi handleSubmit
    }

    // Lakukan konversi durasi jika diperlukan
    let durationInSeconds;
    if (typeof formData.duration === "string") {
      durationInSeconds = convertHHMMToDuration(formData.duration);
    } else {
      durationInSeconds = formData.duration;
    }

    const updatedFormData = { ...formData, duration: durationInSeconds };

    const formDataToSend = {
      ...updatedFormData,
      kelasId: parseInt(updatedFormData.kelasId),
    };

    console.log("Data yang otw:", formDataToSend);

    try {
      let response;
      if (location.state) {
        response = await axios.put(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/ujian/update`,
          formDataToSend,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );

        navigate("../detail-exam", { state: response.data });
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/ujian/create`,
          formDataToSend,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        navigate("../success-create-exam", { state: response.data });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    if (fieldName === "kelasId") {
      // Jika fieldName adalah kelasId, perbarui juga nilai namaKelas
      console.log(kelasData);
      const selectedKelas = kelasData.find((kelas) => kelas.id == value);
      if (selectedKelas) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldName]: value,
          namaKelas: selectedKelas.name, // Perbarui namaKelas
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: value,
      }));
    }
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {/* Alert Component */}
      {alert && (
        <div className="mt-4 w-1/2">
          <Alert
            type={alert.type}
            message={alert.message}
            description={alert.description}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <form className="grid grid-cols-2 gap-4 mt-5" onSubmit={handleSubmit}>
        <InputField
          required
          label="Judul Ujian"
          type="text"
          fieldName="judul"
          value={formData.title}
          onChange={(value) => handleInputChange("title", value)}
        />

        <InputField
          required
          label="Durasi"
          type="time"
          fieldName="durasi"
          value={convertDurationToHHMM(formData.duration)}
          onChange={(value) => handleInputChange("duration", value)}
        />

        <InputField
          required
          label="Mulai"
          type="datetime-local"
          fieldName="mulai"
          value={formData.startDate}
          onChange={(value) => handleInputChange("startDate", value)}
        />

        <InputField
          required
          label="Sampai"
          type="datetime-local"
          fieldName="sampai"
          value={formData.endDate}
          onChange={(value) => handleInputChange("endDate", value)}
        />

        <SelectFieldClass
          required
          label="Kelas"
          value={formData.kelas?.id ? formData.kelas.id : formData.kelasId}
          onChange={(value) => handleInputChange("kelasId", value)}
          options={
            kelasData && Array.isArray(kelasData) && kelasData.length > 0
              ? kelasData.map((kelas) => ({
                  label: kelas.name,
                  value: kelas.id,
                }))
              : []
          }
          fieldName="kelasId"
          placeholder="Pilih Kelas"
        />

        <div>
          <label
            htmlFor="passingGrade"
            className="block mb-1 text-sm font-semibold text-[#1B0947]"
          >
            Passing Grade
          </label>
          <input
            type="number"
            id="passingGrade"
            name="passingGrade"
            min="0"
            max="100"
            value={formData.passingGrade}
            onChange={(e) =>
              handleInputChange("passingGrade", parseInt(e.target.value))
            }
            className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
            required
          />
        </div>

        <div className="col-span-2">
          <Button
            label={location.state ? "Edit Ujian" : "Buat Ujian"}
            type="submit"
            style="primary"
          />
        </div>
      </form>
    </>
  );
};

export default AddExamForm;
