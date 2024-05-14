import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/input/InputField.jsx";
import SelectFieldClass from "../../components/input/SelectFieldClass.jsx";
import Button from "../../components/button/Button";
import { convertDurationToHHMM } from "../../utils/convertDuration.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const DetailExam = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const authHeader = useAuthHeader();
  const formData = location.state;

  console.log("state:", formData);

  const handleEdit = () => {
    navigate("../add-exam", { state: formData });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/ujian/${formData.id}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      navigate("/teacher/examination");
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const tautan = `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/examination/${
    location.state?.id
  }`;

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

  // Jika formData null, arahkan pengguna ke halaman add-exam
  if (!formData) {
    return null;
  }

  return (
    <>
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-xl">
          <div className="bg-white rounded-xl p-10">
            <div className="text-center mb-4">
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  color: "#800f0f",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              />{" "}
              <br />
              <div className="text-base mt-4">
                Apakah Anda yakin ingin menghapus ujian{" "}
                <strong>{formData.title}</strong>?
              </div>
            </div>
            <div className="flex justify-center gap-2 px-4">
              <Button
                label="Batal"
                style="secondary"
                onClick={closeDeleteConfirmation}
              />
              <Button label="Hapus" style="danger" onClick={handleDelete} />
            </div>
          </div>
        </div>
      )}
      <div className="flex m-5 justify-end">
        <div className="w-1/5 flex gap-2">
          <Button
            label={
              <FontAwesomeIcon icon={faTrash} style={{ color: "#800f0f" }} />
            }
            style="danger"
            onClick={openDeleteConfirmation}
          />
          <Button
            label={<FontAwesomeIcon icon={faPenToSquare} />}
            style="secondary"
            onClick={handleEdit}
          />
        </div>
      </div>
      <div className="my-10 text-2xl font-semibold">Informasi Detail Ujian</div>

      <div className="flex w-4/5 gap-4 mt-4 h-10 items-end">
        {/* Input field yang menampilkan tautan */}
        <div className="w-1/2">
          {" "}
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
      <form className="grid grid-cols-2 gap-4 mt-5">
        <InputField
          label="Judul Ujian"
          value={formData.title}
          type="text"
          readOnly
        />
        <InputField
          label="Durasi"
          value={convertDurationToHHMM(formData.duration)}
          type="time"
          readOnly
        />
        <InputField
          label="Mulai"
          value={formData.startDate}
          readOnly
          type="datetime-local"
        />
        <InputField
          label="Sampai"
          value={formData.endDate}
          readOnly
          type="datetime-local"
        />
        <SelectFieldClass
          label="Kelas"
          value={formData.kelas ? formData.kelas.id : formData.kelasId}
          options={[
            {
              label: formData.kelas ? formData.kelas.name : formData.namaKelas,
              value: formData.kelas ? formData.kelas.kelasId : "",
            },
          ]}
          fieldName="kelas"
          placeholder="Pilih Kelas"
          readOnly
        />
        <InputField
          label="Passing Grade"
          value={formData.passingGrade}
          readOnly
          type="number"
        />
      </form>
    </>
  );
};

export default DetailExam;
