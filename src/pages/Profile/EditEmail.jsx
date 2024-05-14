import React from "react";
import { useState } from "react";
import InputField from "../../components/input/InputField";
import Button from "../../components/button/Button";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const EditEmail = () => {
  const auth = useAuthUser();
  const [email, setEmail] = useState(auth.email || "");

  // Handler untuk perubahan input email
  const handleInputChange = (fieldName, value) => {
    setEmail(value);
    console.log("Email change:", email);
  };

  // Handler untuk submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("New email:", email);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-5 lg:w-2/3">
        <InputField
          type="text"
          fieldName="email"
          label="E-mail"
          placeholder="Write e-mail here"
          value={auth.email}
          onChange={(value) => handleInputChange("email", value)}
        />

        <Button type="submit" style="primary" label="Update email" />
      </form>
    </>
  );
};

export default EditEmail;
