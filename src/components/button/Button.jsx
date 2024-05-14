import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, label, style, type }) => {
  let buttonClassName =
    "px-4 py-2  text-xs lg:text-base md:text-sm font-semibold w-full h-full rounded-lg transition-all duration-300";

  if (style === "primary") {
    buttonClassName += " text-white bg-main-200 hover:bg-main-300";
  } else if (style === "secondary") {
    buttonClassName +=
      " text-main-200 bg-white border border-main-200 hover:border-[#DED3F7] hover:bg-[#DED3F7]";
  } else if (style === "danger") {
    buttonClassName +=
      " text-red-600 bg-red-300 border border-red-200 hover:text-red-200 hover:bg-red-600";
  } else if (style === "third") {
    buttonClassName +=
      " text-main-200 bg-main-10 border border-main-10 hover:text-main-200 hover:bg-white";
  }

  return (
    <button onClick={onClick} type={type} className={buttonClassName}>
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  style: PropTypes.oneOf(["primary", "secondary", "danger"]).isRequired,
  type: PropTypes.string,
};

export default Button;
