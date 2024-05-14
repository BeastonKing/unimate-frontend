import React from "react";
import FormDropdown from "../../components/dropdown/FormDropdown";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import "react-phone-number-input/style.css";

const UserEdit = () => {
  const authHeader = useAuthHeader();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    email: "",
    // profilePicture: '',
    // role: '',
    // address: '',
    // phoneNumber: '',
    // birthday: null,
    // job: '',
    bio: "",
  });
  const navigate = useNavigate();

  let formattedDate = null;
  if (formData.birthday) {
    const initialDate = new Date(formData.birthday);
    const year = initialDate.getFullYear();
    const month = String(initialDate.getMonth() + 1).padStart(2, "0");
    const day = String(initialDate.getDate()).padStart(2, "0");

    formattedDate = `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/account/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: authHeader,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log(userData);
        setFormData({
          ...userData,
          role: userData.role.name,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserById();
  }, [id, authHeader]);

  const options = [
    { value: "STUDENT", label: "Siswa" },
    { value: "TEACHER", label: "Guru" },
    { value: "ADMIN", label: "Admin" },
    { value: "TOP_LEVEL", label: "Top Level" },
    { value: "CUSTOMER_SERVICE", label: "Customer Service" },
  ];

  const handleRoleChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      role: selectedOption.value,
    }));
  };

  const handlePhoneInputChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/account/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      console.log(response.data);

      navigate("../user-management", {
        state: { message: "Akun berhasil diperbaharui" },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      console.error("Error details:", error.message);
      console.error("Error stack trace:", error.stack);
    }
  };

  return (
    <>
      <div className="w-[46.625rem]">
        <div className="mb-5">
          <h3 className="text-3xl font-semibold">Manajemen User</h3>
        </div>
        <div className="flex gap-0">
          <div className="text-base text-[#5b25d9] bg-white font-semibold py-2 px-4 rounded-md relative z-0">
            Tambah User
          </div>
          <div className="-ml-2 bg-[#5b29d9] text-base text-white py-2 px-4 rounded-md relative z-10">
            Edit User
          </div>
        </div>
        <form onSubmit={handleSubmit} method="PUT" className="mt-4">
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
                  htmlFor="Name"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Nama Lengkap
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Masukkan nama lengkap di sini"
                  type="text"
                  id="name"
                  name="name"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  E-mail
                </label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Masukkan email di sini"
                  type="email"
                  id="email"
                  name="email"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
              {/* <div>
                <label
                  htmlFor="profilePicture"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Profile Picture
                </label>
                <input
                  value={formData.profilePicture}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      profilePicture: e.target.value,
                    }))
                  }
                  placeholder="Masukkan profile picture di sini"
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Alamat
                </label>
                <input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      address: e.target.value,
                    }))
                  }
                  placeholder="Masukkan alamat di sini"
                  type="text"
                  id="address"
                  name="address"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Nomor Telepon
                </label>
                <PhoneInput
                  placeholder="Masukkan nomor telepon di sini"
                  value={formData.phoneNumber}
                  onChange={handlePhoneInputChange}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control bg-white placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                  style={{
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="birthday"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Tanggal Lahir
                </label>
                <input
                  value={formattedDate}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      birthday: e.target.value,
                    }))
                  }
                  placeholder="Masukkan tanggal lahir di sini"
                  type="date"
                  id="birthday"
                  name="birthday"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="job"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Pekerjaan
                </label>
                <input
                  value={formData.job}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      job: e.target.value,
                    }))
                  }
                  placeholder="Masukkan pekerjaan di sini"
                  type="text"
                  id="job"
                  name="job"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block mb-1 text-sm font-semibold text-[#1B0947]"
                >
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      bio: e.target.value,
                    }))
                  }
                  placeholder="Masukkan bio di sini"
                  type="text"
                  id="bio"
                  name="bio"
                  className="form-control placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                />
              </div> */}
              <div>
                <FormDropdown
                  value={formData.role}
                  onChange={handleRoleChange}
                  options={options}
                  label="Role"
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

export default UserEdit;
