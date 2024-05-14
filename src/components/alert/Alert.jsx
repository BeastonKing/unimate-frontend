import React from "react";
import PropTypes from "prop-types";
import SuccessAlert from "./SuccessAlert";
import InformationAlert from "./InformationAlert";
import ErrorAlert from "./ErrorAlert";
import WarningAlert from "./WarningAlert";

const Alert = ({ type, message, description, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  // Menentukan komponen alert berdasarkan jenis alert
  const renderAlert = () => {
    switch (type) {
      case "success":
        return (
          <SuccessAlert
            message={message}
            description={description}
            onClose={handleClose}
          />
        );
      case "information":
        return (
          <InformationAlert
            message={message}
            description={description}
            onClose={handleClose}
          />
        );
      case "error":
        return (
          <ErrorAlert
            message={message}
            description={description}
            onClose={handleClose}
          />
        );
      case "warning":
        return (
          <WarningAlert
            message={message}
            description={description}
            onClose={handleClose}
          />
        );
      default:
        return null; // Mengembalikan null jika tipe alert tidak valid
    }
  };

  return renderAlert();
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Alert;
