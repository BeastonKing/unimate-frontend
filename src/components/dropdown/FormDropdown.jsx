import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const FormDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="flex flex-col relative">
      <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
        {label}
      </label>
      <div className="relativ">
        <div
          onClick={toggleDropdown}
          className="rounded-md px-3 py-2 bg-white flex justify-between items-center cursor-pointer placeholder-[#5B25D9] placeholder:text-sm text-first placeholder-opacity-50 mt-1 p-2 w-full border:opacity-50 border border-[#5B25D9] border-opacity-50 focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
        >
          <div className="flex gap-2">
            <div className="flex content-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.35714 8.125L1.875 10L5.35714 11.875M5.35714 8.125L10 10.625L14.6429 8.125M5.35714 8.125L1.875 6.25L10 1.875L18.125 6.25L14.6429 8.125M14.6429 8.125L18.125 10L14.6429 11.875M14.6429 11.875L18.125 13.75L10 18.125L1.875 13.75L5.35714 11.875M14.6429 11.875L10 14.375L5.35714 11.875"
                  stroke="#5b25d9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>
              {(value &&
                options.find((option) => option.value === value)?.label) ||
                "Select role here"}
            </span>
          </div>
          <svg
            className={`h-4 w-4 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L14 12"
              stroke="#5b25d9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className={`absolute top-full left-0 bg-white border border-gray-300 rounded-md mt-1 w-full ${
            isOpen ? "" : "hidden"
          }`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:text-[#5b25d9] flex items-center"
              onMouseEnter={() => setHoveredOption(option.value)}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={() => handleSelect(option)}
            >
              <svg
                className="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 10.625L9.375 12.5L12.5 8.125M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                  style={{
                    stroke:
                      hoveredOption === option.value ? "#5b25d9" : "#A3A3A3",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  }}
                />
              </svg>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

FormDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormDropdown;
