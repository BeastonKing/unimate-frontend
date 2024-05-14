import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";

function getRoleLabel(roleId) {
  switch (roleId) {
    case 1:
      return "SISWA";
    case 2:
      return "GURU";
    case 3:
      return "ADMIN";
    case 4:
      return "TOP LEVEL";
    case 5:
      return "CS";
  }
}

const ManagementUser = () => {
  const authHeader = useAuthHeader();
  const location = useLocation();
  const navigate = useNavigate();
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isPending,
    error,
    data: userData,
  } = useQuery({
    queryKey: ["index"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/account/get-all`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      console.log(userData);

      return response.json();
    },
  });

  const handleDeleteClick = (row) => {
    setUserToDelete(row);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      // Perform deletion logic here, for example with axios.delete
      await axios.delete(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/account/${
          userToDelete.id
        }`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),
        // Close the modal after successful deletion
        setIsModalOpen(false);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if (isPending) return "Loading...";

  if (error) return "An error has occured: " + error.message;

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "10%",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      widh: "20%",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "25%",
    },
    {
      name: "Role",
      selector: (row) => getRoleLabel(row.role.id),
      sortable: true,
      width: "15%",
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <div className="flex gap-1">
              <NavLink to={`/admin/user-edit/${row.id}`}>
                <button
                  type="button"
                  className="text-[#1B0947] hover:bg-[#5b25d9] hover:bg-opacity-20 bg-[#EFE9FB] rounded-3xl font-medium py-[0.5rem] px-[1rem]"
                  // px-[1rem] py-[0.5rem]
                >
                  Edit
                </button>
              </NavLink>
              <button
                onClick={() => handleDeleteClick(row)}
                type="button"
                className="text-[#FF0000] hover:bg-[#FF9999] bg-[#F9C2C2] rounded-3xl font-medium p-[0.5rem]"
              >
                Delete
              </button>
            </div>
          </>
        );
      },
      width: "30%",
    },
  ];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData =
    searchQuery.trim() === ""
      ? userData
      : userData.filter((user) => {
          return user.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

  const handleCloseSuccessModal = () => {
    navigate("", { replace: true });
  };

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#DED3F7",
      },
    },
  };

  return (
    <>
      {/* <div className="w-[46.625rem]"> */}
      <div className="w-full">
        <div className="mb-5 mt-5">
          <h3 className="text-3xl font-semibold">Manajemen User</h3>
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex items-center rounded-3xl px-4 py-1 bg-[#efe9fb] gap-20 h-10 mb-5">
            <input
              type="text"
              placeholder="Cari user di sini..."
              value={searchQuery}
              onChange={handleSearch}
              className="outline-none placeholder-[#5b25d9] text-sm bg-transparent text-[#5b25d9]"
            />

            <div>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="7.84394"
                  cy="8.34442"
                  r="5.99237"
                  stroke="#5B25D9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0117 12.8232L14.3611 15.1665"
                  stroke="#5B25D9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div>
            <NavLink to="/admin/user-create">
              <button
                type="button"
                className="bg-[#5b29d9] hover:bg-[#501EAE] text-base text-white px-3 py-1 rounded-md h-10"
              >
                Tambah User
              </button>
            </NavLink>
          </div>
        </div>
        <div style={{ borderRadius: "8px", overflow: "hidden" }}>
          <DataTable
            customStyles={tableHeaderStyle}
            columns={columns}
            data={filteredData}
            pagination
            fixedHeader
            highlightOnHover
            paginationRowsPerPageOptions={[2, 5, 10]}
            emptyDataMessage={() => <p>No users found</p>}
          />
        </div>
      </div>

      {location.state && location.state.message && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg font-semibold">Success!</p>
            <p className="text-gray-700">{location.state.message}</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleCloseSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white py-8 rounded-3xl items-center">
            <p className="flex justify-center text-base font-medium mb-[20px]">
              Confirm delete {userToDelete ? `\u00A0${userToDelete.name}` : ""}?
            </p>
            <div className="flex justify-between px-[90px] gap-[50px]">
              <button
                className="mt-4 bg-[#efe9fb] hover:bg-[#afa6c2] text-[#5b25d9] py-2 px-4 rounded-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="mt-4 bg-[#ed3a3a] hover:bg-[#cd3434] text-[#f3f3f3] py-2 px-4 rounded-lg"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagementUser;
