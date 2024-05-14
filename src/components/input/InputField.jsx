import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const InputField = ({
  onChange,
  value,
  placeholder,
  fieldName,
  label,
  type,
  isRequired, // Prop baru untuk menentukan apakah input wajib diisi atau tidak
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
    setInputValue(newValue);
  };

  return (
    <div>
      <label
        htmlFor={fieldName}
        className="block mb-1 text-sm font-semibold text-[#1B0947]"
      >
        {label}
        {isRequired && <span className="text-red-500">*</span>}{" "}
        {/* Tampilkan asterisk (*) jika input wajib diisi */}
      </label>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        id={fieldName}
        name={fieldName}
        className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
        required={isRequired} // Atur atribut required input field berdasarkan nilai prop isRequired
      />
    </div>
  );
};

InputField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  fieldName: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool, // Tambahkan prop untuk menentukan apakah input wajib diisi atau tidak
};

export default InputField;
