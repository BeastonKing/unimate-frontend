import React from "react";
import OptionDropdown from "../../components/dropdown/OptionDropdown";
import PropTypes from "prop-types";
import { useState } from "react";
const ChangeStatus = ({ partnership, onSubmit }) => {
  const statusOptions = [
    { value: "NEW", label: "NEW" },
    { value: "RUNNING", label: "RUNNING" },
    { value: "CANCELED", label: "CANCELED" },
    { value: "CONFIRMED", label: "CONFIRMED" },
    { value: "COMPLETED", label: "COMPLETED" },
  ];
  const [newStatus, setNewStatus] = useState(partnership.status);
  const [data, setData] = useState(partnership);

  const handleStatusChange = (status) => {
    setNewStatus(status);
    const updatedPartnership = { ...data, status: status }; // Perbarui status partnership
    setData(updatedPartnership); // Tetapkan kembali partnership yang diperbarui ke data
    let statusInteger;
    switch (status) {
      case "NEW":
        statusInteger = 1;
        break;
      case "RUNNING":
        statusInteger = 2;
        break;
      case "CANCELED":
        statusInteger = 3;
        break;
      case "CONFIRMED":
        statusInteger = 4;
        break;
      case "COMPLETED":
        statusInteger = 5;
        break;
      default:
        statusInteger = 0; // Nilai default jika status tidak dikenali
        break;
    }
    onSubmit({ ...data, status: statusInteger });
    // updateStatus.mutate({ ...data, status: statusInteger });
  };
  return (
    <>
      <div className="relative">
        <OptionDropdown
          options={statusOptions}
          value={newStatus} // Ubah properti value ke newStatus
          onChange={handleStatusChange}
        />
      </div>
    </>
  );
};

ChangeStatus.propTypes = {
  partnership: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    companyEmail: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func,
};

export default ChangeStatus;
