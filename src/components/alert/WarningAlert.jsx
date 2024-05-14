import React from "react";
import PropTypes from "prop-types";

const WarningAlert = ({ message, description, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="p-4 text-yellow-900 bg-yellow-100 border border-yellow-200 rounded-md mb-3">
      <div className="flex justify-between flex-wrap">
        <div className="w-0 flex-1 flex">
          <div className="mr-3 pt-1">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z"></path>
            </svg>
          </div>
          <div>
            <h4 className="text-md leading-6 font-medium">{message}</h4>
            <p className="text-sm">{description}</p>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onClick={handleClose}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M17.6555 6.3331a.9.9 0 0 1 .001 1.2728l-4.1032 4.1085a.4.4 0 0 0 0 .5653l4.1031 4.1088a.9002.9002 0 0 1 .0797 1.1807l-.0806.092a.9.9 0 0 1-1.2728-.0009l-4.1006-4.1068a.4.4 0 0 0-.5662 0l-4.099 4.1068a.9.9 0 1 1-1.2738-1.2718l4.1027-4.1089a.4.4 0 0 0 0-.5652L6.343 7.6059a.9002.9002 0 0 1-.0796-1.1807l.0806-.092a.9.9 0 0 1 1.2728.0009l4.099 4.1055a.4.4 0 0 0 .5662 0l4.1006-4.1055a.9.9 0 0 1 1.2728-.001z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

WarningAlert.propTypes = {
  message: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WarningAlert;
