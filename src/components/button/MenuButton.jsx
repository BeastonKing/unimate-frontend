import React from "react";
import PropTypes from "prop-types";

const MenuButton = ({ onClick, label, style, type, className }) => {
  let buttonClassName = "px-3 py-1 rounded-lg transition-all duration-300";

  if (style === "primary") {
    buttonClassName += " text-white bg-main-200 hover:bg-main-300";
  } else if (style === "secondary") {
    buttonClassName +=
      " text-main-200 bg-transparent border border-main-200 hover:text-white hover:bg-main-200";
  }

  const mergedClassName = `${buttonClassName} ${className}`;

  return (
    <button onClick={onClick} className={mergedClassName} type={type}>
      {label}
    </button>
  );
};

MenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default MenuButton;
