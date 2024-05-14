import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/imageCrop/Modal";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import InputField from "../../components/input/InputField";
import TextAreaField from "../../components/input/TextAreaField";
import SelectField from "../../components/input/SelectField";
import Button from "../../components/button/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Alert from "../../components/alert/Alert";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import Loader from "../../components/loader/Loader";
const EditProfile = () => {
  const signIn = useSignIn();
  const [modalOpen, setModalOpen] = useState(false);
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const updateAuthUser = (userData) => {
    const jwtToken = authHeader.split(" ")[1];

    signIn({
      auth: {
        token: jwtToken,
        type: "Bearer",
        expiresIn: 900,
      },
      userState: {
        id_user: userData.data.id,
        email: userData.data.email,
        name: userData.data.name,
        role: userData.data.role.name,
        status: userData.data.status,
        job: userData.data.job ?? null,
        birthday: userData.data.birthday ?? null,
        bio: userData.data.bio ?? null,
        phone: userData.data.phoneNumber ?? null,
        address: userData.data.address ?? null,
        profilePicture: userData.data.profilePicture ?? null,
      },
    });
  };

  const [formData, setFormData] = useState({
    name: auth.name || "",
    bio: auth.bio || "",
    birthday: auth.birthday || "",
    phoneNumber: auth.phone || null,
    job: auth.job || "",
    address: auth.address || "",
    profilePicture: auth.profilePicture || null,
  });

  // Handler untuk perubahan input pada setiap field
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const updateAvatarMutation = useMutation({
    mutationFn: (avatarData) =>
      axios.put(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/account/change-profile-picture`,
        { file: avatarData },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "multipart/form-data",
          },
        }
      ),
    onSuccess: (response) => {
      setMessage("Berhasil memperbaharui avatar");
      setError(false);

      const jwtToken = authHeader.split(" ")[1];

      signIn({
        auth: {
          token: jwtToken,
          type: "Bearer",
          expiresIn: 900,
        },
        userState: {
          id_user: auth.id,
          email: auth.email,
          name: auth.name,
          role: auth.role,
          status: auth.status,
          job: auth.job ?? null,
          birthday: auth.birthday ?? null,
          bio: auth.bio ?? null,
          phone: auth.phoneNumber ?? null,
          address: auth.address ?? null,
          profilePicture: response.data.url ?? null,
        },
      });
      setModalOpen(false);
      setLoading(false);

      window.location.reload();
    },
    onError: (error) => {
      setError(true);
      console.log(error);
      setMessage(
        "Gagal memperbaharui Poto, Ukuran File tidak boleh lebih besar dari 1 Mb",
        error
      );
    },
  });

  const updateAvatar = (imgSrc) => {
    setLoading(true);
    const base64Image = imgSrc.split(";base64,").pop();
    const mimeType = imgSrc.split(";")[0].split(":")[1];
    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType }); // Buat objek Blob
    const file = new File([blob], "cropped_image.png", { type: mimeType }); // Buat objek File

    console.log(file);

    updateAvatarMutation.mutate(file);
  };

  const editProfile = useMutation({
    mutationFn: (formData) =>
      axios.put(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/account/edit`,
        formData,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),

    onSuccess: (response) => {
      setMessage("Berhasil memperbaharui data");
      setError(false);

      updateAuthUser(response);

      location.state = response;
    },
    onError: (error) => {
      setError(true);
      console.log(error);
      setMessage("Gagal memperbaharui data ", error);
    },
  });

  const handleCloseMessage = () => {
    setMessage(null);
  };

  // Handler untuk mengirimkan data login
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Data", formData);
    console.log(location);
    editProfile.mutate(formData);
    navigate(location.pathname, { state: { message } });
  };

  // Daftar kategori
  const categoryOptions = [
    { label: "Mahasiswa", value: "MAHASISWA" },
    { label: "Pegawai Negeri (ASN)", value: "PEGAWAI NEGERI (ASN)" },
    { label: "Wiraswasta", value: "WIRASWASTA" },
    { label: "Buruh", value: "BURUH" },
    { label: "Others", value: "OTHERS" },
  ];

  const handleCategoryChange = (value) => {
    handleInputChange("job", value);
  };

  return (
    <>
      {(editProfile.isLoading || updateAvatarMutation.isLoading || loading) && (
        <Loader loading={true} />
      )}
      {location.state && message && (
        <div className="mt-20 mb-4">
          <Alert
            type="success"
            message="Berhasil memperbarui data profil"
            onClose={handleCloseMessage}
          />
        </div>
      )}

      <div className="flex justify-start">
        <div className="mr-5">
          <img
            className="w-[60px] h-[60px] mr-4 shrink-0 inline-block rounded-[2rem]"
            src={
              auth?.profilePicture ||
              "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg"
            }
            alt="avatar image"
          />
        </div>
        <div className="flex-col justify-items-start mr-2">
          <h3 className="text-2xl font-semibold text-left mb-2">{auth.name}</h3>
          <NavLink
            onClick={() => setModalOpen(true)}
            className="text-main-200 dark:text-main-200 text-base text-left"
          >
            Ganti Photo
          </NavLink>
        </div>
      </div>

      {error && message && (
        <div className="mt-10">
          <Alert
            type="error"
            message="Gagal memperbarui data profil"
            description={message}
            onClose={handleCloseMessage}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2  gap-4 mt-10"
      >
        <InputField
          value={formData.name}
          type="text"
          label="Name"
          fieldName="name"
          placeholder="Write name here"
          onChange={(value) => handleInputChange("name", value)}
        />

        <InputField
          value={formData.phoneNumber}
          type="tel"
          label="Phone number"
          placeholder="+62895xxxxxxx"
          onChange={(value) => handleInputChange("phoneNumber", value)}
        />

        <div className="lg:col-span-2">
          <TextAreaField
            value={formData.bio}
            label="Bio"
            fieldName="bio"
            placeholder="Write a short biography about yourself"
            onChange={(value) => handleInputChange("bio", value)}
          />
        </div>

        <InputField
          value={formData.birthday}
          type="date"
          label="Date of birth"
          onChange={(value) => handleInputChange("birthday", value)}
        />

        <SelectField
          value={formData.job}
          onChange={handleCategoryChange}
          options={categoryOptions}
          fieldName="job"
          label="Current Job"
          placeholder="Select a job"
        />

        <div className="lg:col-span-2">
          <InputField
            value={formData.address}
            type="text"
            label="Address"
            placeholder="Fill in your address here"
            onChange={(value) => handleInputChange("address", value)}
          />
        </div>

        <div className="lg:col-span-2">
          <Button style="primary" label="Update Profile" type="submit" />
        </div>
      </form>

      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default EditProfile;
