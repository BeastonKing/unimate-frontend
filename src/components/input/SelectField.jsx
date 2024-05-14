import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SelectField = ({
  value,
  onChange,
  options,
  fieldName,
  label,
  placeholder,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  useEffect(() => {
    if (value && !options.some((option) => option.value === value)) {
      setShowOtherInput(true);
      setOtherValue(value);
      setSelectedValue("OTHERS");
    }
  }, [value, options]);

  function handleChange(event) {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (newValue === "OTHERS") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      onChange(newValue);
    }
  }

  function handleOtherInputChange(event) {
    const newValue = event.target.value;
    setOtherValue(newValue);
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
      <select
        value={selectedValue}
        onChange={handleChange}
        id={fieldName}
        name={fieldName}
        className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border-opacity-50 border border-[#5B25D9] rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {showOtherInput && <option value="OTHERS">Others</option>}
      </select>
      {showOtherInput && (
        <input
          type="text"
          value={otherValue}
          onChange={handleOtherInputChange}
          placeholder="Other Value"
          className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border-opacity-50 border border-[#5B25D9] rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
        />
      )}
    </div>
  );
};

SelectField.propTypes = {
  value: PropTypes.string, // Menjadikan properti value opsional
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default SelectField;
