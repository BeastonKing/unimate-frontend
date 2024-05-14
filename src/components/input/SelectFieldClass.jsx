/* eslint-disable react/prop-types */
import { useState } from "react";
import React from "react";

const SelectFieldClass = ({
  value,
  onChange,
  options,
  fieldName,
  label,
  placeholder,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

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
        <option key="" value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// SelectFieldClass.propTypes = {
//   value: PropTypes.oneOfType(), // Menjadikan properti value opsional
//   onChange: PropTypes.func,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       value: PropTypes.string.isRequired,
//     })
//   ),
//   fieldName: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
// };

export default SelectFieldClass;
