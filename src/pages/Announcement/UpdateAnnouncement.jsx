import InputField from "../../components/input/InputField";
import PasswordInput from "../../components/input/PasswordInputField";
import Dropdown from "../../components/dropdown/FormDropdown";
import axios from "axios";
import React from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useParams } from "react-router-dom";

const UpdateAnnouncement = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const { id, idPengumuman } = useParams();

  const [formData, setFormData] = useState({
    id: idPengumuman,
    headerContent: "",
    content: "",
  });

  useEffect(() => {
    getAnnouncement();
  }, []);

  const getAnnouncement = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/pengumuman/${idPengumuman}`,
        {
          method: "GET",
          headers: {
            Authorization: authHeader,
          },
        }
      );

      const data = await response.json();
      setFormData({
        ...data,
        headerContent: data.headerContent,
        content: data.content,
      });

      console.log(data);
    } catch (error) {
      console.error("Error fetching all classes:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/pengumuman/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response.data);

      window.alert("Berhasil mengubah pengumuman");

      navigate(`../class-management/announcements/${id}`, {
        state: { message: "announcement updated successfully." },
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="w-[46.625rem]">
        <div className="mb-5">
          <h3 className="text-3xl font-semibold">Ubah Pengumuman</h3>
        </div>
        <div className="border border-gray-300 col-span-5 mt-4"></div>
        <form onSubmit={handleSubmit} method="POST" className="mt-4">
          <div className="lg:gap-10">
            <div className="space-y-4 mb-4">
              <div>
                <input
                  value={formData.id}
                  type="hidden"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="Header Content"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Judul Pengumuman
                </label>
                <input
                  value={formData.headerContent}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      headerContent: e.target.value,
                    }))
                  }
                  placeholder="Ketik judul pengumuman di sini"
                  type="text"
                  id="header"
                  name="header"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Deskripsi Pengumuman
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Ketik detail pengumuman di sini"
                  type="text"
                  id="detailPengumuman"
                  name="detailPengumuman"
                  className="form-control h-48 placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 lg:w-full">
            <button
              className="bg-[#5b25d9] hover:bg-[#501EAE] text-base text-white px-3 py-1 rounded-md w-full"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAnnouncement;
