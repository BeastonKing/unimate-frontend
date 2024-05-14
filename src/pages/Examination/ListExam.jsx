import React from "react";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { convertDurationToHHMM } from "../../utils/convertDuration";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useState } from "react";
const ListExam = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();
  const [searchQuery, setSearchQuery] = useState("");
  const getStatus = (startDate, endDate) => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const currentDateTime = new Date();

    if (currentDateTime < startDateTime) {
      return "Akan Datang";
    } else if (currentDateTime > endDateTime) {
      return "Selesai";
    } else {
      return "Sedang Berlangsung";
    }
  };

  const {
    isPending,
    error,
    data: ujianData,
  } = useQuery({
    queryKey: ["index"],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/ujian/get-all/by-teacher/${auth.id_user}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      console.log(ujianData);

      return response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleDetailClick = (id) => {
    const selectedUjian = ujianData?.find((ujian) => ujian.id === id);
    if (selectedUjian) {
      navigate("detail-exam", { state: selectedUjian });
    } else {
      console.log("Ujian not found with id:", id);
    }
  };

  const handleTrackScoreClick = (id) => {
    const selectedUjian = ujianData?.find((ujian) => ujian.id === id);
    if (selectedUjian) {
      navigate("tracking-score/" + id);
    } else {
      console.log("Ujian not found with id:", id);
    }
  };

  const columns = [
    {
      name: "Judul",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <button
          className="text-main-200"
          onClick={() => handleDetailClick(row.id)}
        >
          {row.title}
        </button>
      ),
      width: "20%",
    },
    {
      name: "Durasi",
      selector: (row) => convertDurationToHHMM(row.duration),
      width: "15%",
    },
    {
      name: "Tautan",
      cell: (row) => {
        const handleClick = () => {
          const link = `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/examination/${row.id}`;
          navigator.clipboard
            .writeText(link)
            .then(() => alert(`Tautan berhasil disalin: ${link}`))
            .catch((error) => console.error("Gagal menyalin tautan:", error));
        };

        return (
          <button
            className="text-[#1B0947] hover:bg-[#5b25d9] hover:bg-opacity-20 bg-[#EFE9FB] rounded-3xl font-medium py-[0.5rem] px-[1rem]"
            onClick={handleClick}
          >
            Salin
          </button>
        );
      },
      width: "20%",
    },

    {
      name: "peserta",
      selector: (row) => row.kelas.peserta,
      width: "14%",
    },

    {
      name: "Status",
      cell: (row) => {
        const status = getStatus(row.startDate, row.endDate);
        let colorClass = "";
        if (status === "Selesai") {
          colorClass = "text-green-500";
        } else if (status === "Sedang Berlangsung") {
          colorClass = "text-main-200";
        } else {
          colorClass = "text-orange-500";
        }
        return <div className={colorClass}>{status}</div>;
      },
      width: "16%",
    },

    {
    name: "Action",
      cell: (row) => {
        return (
          <>
            <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleTrackScoreClick(row.id)}
                  className="text-[#1B0947] hover:bg-[#5b25d9] hover:bg-opacity-20 bg-[#EFE9FB] rounded-3xl font-medium py-[0.5rem] px-[1rem]"
                  // px-[1rem] py-[0.5rem]
                >
                  Scores
                </button>
            </div>
          </>
        );
      },
    width: "15%"
    },
  ];

  const addExam = () => {
    navigate("/teacher/examination/add-exam");
  };

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#DED3F7",
      },
    },
    cell: {
      style: {
        textAlign: "left",
      },
    },
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData =
    searchQuery.trim() === ""
      ? ujianData
      : ujianData.filter((ujian) => {
          return ujian.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

  return (
    <>
      <div className="text-2xl font-semibold">Daftar Ujian</div>
      <div className="flex justify-between mt-5">
        <div className="flex items-center rounded-3xl px-4 py-1 bg-[#efe9fb] gap-20 h-10">
          <input
            type="text"
            placeholder="Cari ujian di sini..."
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

        <div className="w-1/4">
          <Button
            type="click"
            style="primary"
            onClick={addExam}
            label="Tambah Ujian"
          />
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
    </>
  );
};

export default ListExam;
