import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/Button";

const Detail = ({ partnership, onClose, deleteReq }) => {
  const formattedDate = format(
    new Date(partnership.createdAt),
    "dd MMM, yyyy , HH:mm:ss"
  );

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    console.log("Deleting partnership:", partnership.id);
    deleteReq.mutate(partnership);
    // Lakukan penghapusan di sini
    setShowDeleteConfirmation(false);
  };

  let statusColor = "";
  switch (partnership.status) {
    case "NEW":
      statusColor = "#DED3F7";
      break;
    case "RUNNING":
      statusColor = "#F7E26C"; // Kuning
      break;
    case "CANCELED":
      statusColor = "#F58484"; // Merah
      break;
    case "CONFIRMED":
      statusColor = "#3DAA3D"; // Hijau
      break;
    default:
      statusColor = "#8869D0";
      break;
  }

  return (
    <div className="mt-3 p-3 bg-main-10 bg-opacity-50 rounded-xl shadow-lg">
      <div className="flex justify-between">
        <div className="text-lg text-main-300 font-semibold px-5 py-2 border border-main-100 rounded-unimate">
          ID: {partnership.id}
        </div>
        <button
          className="bg-red-700 w-8 h-8 text-white rounded-full"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="my-8">
        <strong className="text-xl font-semibold">{partnership.company}</strong>
        <div className="text-base text-main-200">
          {partnership.companyEmail}
        </div>
        <div className="text-base text-main-200">{partnership.phoneNumber}</div>
        <div className="border opacity-70 border-white"></div>
      </div>

      <div>{partnership.description}</div>

      <div className="flex justify-between items-center mt-14">
        <div className="flex">
          <div
            className="flex justify-center items-center gap-2 bg-opacity-20 rounded-3xl px-[1rem] py-[0.5rem]"
            style={{ backgroundColor: statusColor }}
          >
            <div className="text-white font-extralight">
              {partnership.status}
            </div>
          </div>
          <div className="flex justify-center gap-2 px-4">
            <Button
              label={
                <FontAwesomeIcon icon={faTrash} style={{ color: "#800f0f" }} />
              }
              style="danger"
              onClick={handleDeleteConfirmation}
            />
          </div>
        </div>
        <div>{formattedDate}</div>
      </div>

      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-xl">
          <div className="bg-white rounded-xl p-10 w-1/3">
            <div className="text-center mb-4">
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  color: "#800f0f",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              />{" "}
              <br />
              <div className="text-base mt-4">
                Are you sure you want to delete the request from the company{" "}
                <strong>{partnership.company}</strong>?{" "}
              </div>
            </div>
            <div className="flex justify-center gap-2 px-4">
              <Button
                label="Cancel"
                style="secondary"
                onClick={closeDeleteConfirmation}
              />
              <Button label="Delete" style="danger" onClick={handleDelete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Detail.propTypes = {
  partnership: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    companyEmail: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  deleteReq: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Detail;
