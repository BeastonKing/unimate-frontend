import React from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import Detail from "./Detail";
import { useState } from "react";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChangeStatus from "./ChangeStatus";
import OptionDropdown from "../../components/dropdown/OptionDropdown";

const PartnershipManagement = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("ID");
  const deleteReq = useMutation({
    mutationFn: (formData) =>
      axios.delete(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/partnership/delete?id=` + formData.id,

        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),

    onSuccess: () => {
      console.log("Berhasil menghapus datanya");
      navigate(".", { replace: true });
      window.location.reload();
    },
    onError: (error) => {
      console.error("Gagal menghapus:", error);
    },
  });

  const convertStatusToString = (statusInt) => {
    switch (statusInt) {
      case 1:
        return "NEW";
      case 2:
        return "RUNNING";
      case 3:
        return "CANCELED";
      case 4:
        return "CONFIRMED";
      case 5:
        return "COMPLETED"; // Sesuaikan dengan status lainnya jika ada
      default:
        return "UNKNOWN_STATUS";
    }
  };

  const updateStatus = useMutation({
    mutationFn: (updatedPartnership) => {
      try {
        // Lakukan perubahan status partnership di backend
        axios.put(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/partnership/update`,
          updatedPartnership,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        return updatedPartnership;
      } catch (error) {
        throw new Error("Gagal memperbarui status partnership:", error);
      }
    },
    onSuccess: (response) => {
      // Mengonversi nilai status menjadi string
      const partnershipWithConvertedStatus = {
        ...response,
        status: convertStatusToString(response.status),
      };

      // Ganti selectedPartnership dengan partnership yang baru diubah

      setSelectedPartnership(partnershipWithConvertedStatus);
      console.log(selectedPartnership);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { isFetching, data: listPartnership } = useQuery({
    queryKey: ["index"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/partnership/get-all`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      return response.json();
    },
  });

  if (isFetching) return "Loading...";

  if (!listPartnership) return "Failed to fetch data";

  const handleDetailClick = (row) => {
    if (row === selectedPartnership) {
      handleCloseDetail();
    } else {
      setSelectedPartnership(row);
    }
  };

  const handleCloseDetail = () => {
    setSelectedPartnership(null);
  };

  const handleUpdateStatus = (updatedPartnership) => {
    try {
      updateStatus.mutateAsync(updatedPartnership);

      // Perbarui data partnership dengan memuat ulang menggunakan refetch
    } catch (error) {
      console.error("Gagal memperbarui status partnership:", error);
    }
  };

  const columns = [
    {
      name: "ID",
      sortable: true,
      selector: (row) => row.id,
      cell: (row) => (
        <button
          className="text-main-100 hover:text-main-300"
          onClick={() => handleDetailClick(row)}
        >
          #REQ{row.id}
        </button>
      ),
      width: "13%",
    },
    {
      name: "Perusahaan",
      sortable: true,
      selector: (row) => row.company,
      width: "20%",
    },
    {
      name: "Waktu permintaan",
      sortable: true,
      selector: (row) => {
        const formattedDate = format(
          new Date(row.createdAt),
          "dd MMM yyyy HH:mm:ss"
        );
        return formattedDate;
      },
    },
    {
      name: "Status Permintaan",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        return (
          <div className="flex relative">
            <ChangeStatus
              partnership={row}
              onSubmit={(updatedPartnership) =>
                handleUpdateStatus(updatedPartnership)
              }
            />
          </div>
        );
      },
    },
  ];

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "Bold",
        fontSize: "15px",
        color: "#2E136D",
        backgroundColor: "#DED3F7",
        display: "flex",
        alignItems: "center",
      },
    },
    rows: {
      style: {
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      },
    },
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleModeChange = (mode) => {
    setFilterMode(mode);
  };

  const filteredData =
    searchQuery.trim() === ""
      ? listPartnership
      : listPartnership.filter((partnership) => {
          if (filterMode === "ID") {
            return partnership.id
              .toString() // Mengonversi ke string terlebih dahulu
              .toLowerCase() // Mengonversi ke huruf kecil
              .includes(searchQuery.toLowerCase());
          } else if (filterMode === "Company") {
            return partnership.company
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }
        });

  return (
    <>
      <div className="flex justify-between mb-8 text-main-400">
        <div className="text-3xl font-semibold">
          Daftar Permintaan Kemitraan
        </div>
      </div>

      <div className="flex gap-4 justify-between items-end">
        <div className="w-80">
          <OptionDropdown
            label="Mode Pencarian berdasarkan"
            options={[
              { value: "ID", label: "ID" },
              { value: "Company", label: "Perusahaan" },
            ]}
            value={filterMode}
            onChange={handleModeChange}
          />
        </div>
        <div className="flex items-center rounded-3xl px-4 py-1 bg-[#efe9fb] gap-20 h-10 w-80">
          <input
            type="text"
            placeholder={
              filterMode !== "ID"
                ? "Cari Perusahaan . . ."
                : "Cari ID permintaan . . ."
            }
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
      </div>

      <div className="mt-5 rounded-md">
        <DataTable
          customStyles={tableHeaderStyle}
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          highlightOnHover
          paginationRowsPerPageOptions={[2, 5, 10]}
          emptyDataMessage={() => (
            <p>No exams found matching your search criteria.</p>
          )}
        />
      </div>
      {selectedPartnership && (
        <Detail
          partnership={selectedPartnership}
          onClose={handleCloseDetail}
          deleteReq={deleteReq}
          onSubmit={(updatedPartnership) =>
            handleUpdateStatus(updatedPartnership)
          }
        />
      )}
    </>
  );
};

export default PartnershipManagement;
