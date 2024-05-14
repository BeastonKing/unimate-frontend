import React from "react";
import { useState } from "react";
import PasswordInput from "../../components/input/PasswordInputField";
import Button from "../../components/button/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Alert from "../../components/alert/Alert";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const EditPassword = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmationPassword: "",
  });
  const [error, setError] = useState(false);
  const [massage, setMassage] = useState(location.state || "");

  const resetPasswordMutation = useMutation({
    mutationFn: (formData) =>
      axios.put(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/account/change-password`,
        formData,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),

    onSuccess: () => {
      navigate(
        ".",
        { state: "Password berhasil diperbarui" },
        { replace: true }
      );
      setError(false);
      window.location.reload();
    },
    onError: (error) => {
      console.error("Gagal mereset password:", error);
      setError(true);
      setMassage("Password Anda salah, tolong periksa kembali password Anda ");
    },
  });

  const handleCloseMassage = () => {
    setMassage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.newPassword === formData.confirmationPassword &&
      formData.newPassword.length >= 8
    ) {
      resetPasswordMutation.mutate(formData);
    } else if (formData.newPassword.length < 8) {
      setError(true);
      setMassage("Password harus lebih dari 8 karakter ");
    } else {
      setError(true);
      console.log(formData.newPassword.length);
      setMassage("Password baru dan password konfirmasi tidak sesuai ");
    }
    console.log("Form Data:", formData);
  };

  return (
    <>
      {massage && (
        <Alert
          type={error ? "error" : "success"}
          message={
            error
              ? "Gagal memperbarui password"
              : "Berhasil memperbarui password"
          }
          description={massage}
          onClose={handleCloseMassage}
        />
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:w-2/3">
        <PasswordInput
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, currentPassword: e }))
          }
          placeholder="Enter the old password here"
          fieldName="Password"
          label="Old Password"
        />
        <PasswordInput
          value={formData.newPassword}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, newPassword: e }))
          }
          placeholder="Enter the new password here"
          fieldName="new-password"
          label="New Password"
        />

        <PasswordInput
          value={formData.confirmationPassword}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              confirmationPassword: e,
            }))
          }
          placeholder="Re-enter the new password here"
          fieldName="confirmation-password"
          label="Confirmation new password"
        />

        <Button type="submit" label="Update Password" style="primary" />
      </form>
    </>
  );
};

export default EditPassword;
