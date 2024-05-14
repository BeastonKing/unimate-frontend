import React from "react";
import InputField from "../../components/input/InputField";
import PasswordInput from "../../components/input/PasswordInputField";
import Dropdown from "../../components/dropdown/FormDropdown";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCreate = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const options = [
    { value: "STUDENT", label: "Siswa" },
    { value: "TEACHER", label: "Guru" },
    { value: "ADMIN", label: "Admin" },
    { value: "TOP_LEVEL", label: "Top Level" },
    { value: "CUSTOMER_SERVICE", label: "Customer Service" },
  ];

  const handleRoleChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      role: selectedOption.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/account/create`,
        formData,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log(response.data);

      navigate("../user-management", {
        state: { message: "User created successfully." },
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <div className="w-[46.625rem]">
        <div className="mb-5">
          <h3 className="text-3xl font-semibold">Manajemen User</h3>
        </div>
        <div className="flex gap-0">
          <div className="-mr-2 bg-[#5b29d9] text-base text-white py-2 px-4 rounded-md relative z-10">
            Tambah User
          </div>
          <div className="text-base text-[#5b25d9] bg-white font-semibold py-2 px-4 rounded-md relative z-0">
            Edit User
          </div>
        </div>
        <form onSubmit={handleSubmit} method="POST" className="mt-4">
          <div className="lg:gap-10">
            <div className="space-y-4 mb-4">
              <div>
                <InputField
                  required
                  onChange={(e) =>
                    setFormData((prevData) => ({ ...prevData, name: e }))
                  }
                  placeholder="Masukan nama lengkap di sini"
                  fieldName="name"
                  label="Nama Lengkap"
                  type="text"
                />
              </div>
              <div>
                <InputField
                  required
                  onChange={(e) =>
                    setFormData((prevData) => ({ ...prevData, email: e }))
                  }
                  placeholder="Masukan email di sini"
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
              <div>
                <Dropdown
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

export default UserCreate;
