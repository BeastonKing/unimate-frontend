import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  value,
  onChange,
  placeholder,
  fieldName,
  label,
  isRequired,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  }

  return (
    <div>
      <label
        htmlFor={fieldName}
        className="block mb-1 text-sm font-semibold text-[#1B0947]"
      >
        {label}
      </label>
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        id={fieldName}
        name={fieldName}
        required={isRequired}
        className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full min-h-32  border-opacity-50 border border-[#5B25D9] rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
      />
    </div>
  );
};

TextAreaField.propTypes = {
  value: PropTypes.string, // Menjadikan properti value opsional
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};

export default TextAreaField;
