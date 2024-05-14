import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import img1 from "../../assets/image/Program Image.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import PropTypes from "prop-types";

const Announcements = () => {
  const authHeader = useAuthHeader();
  const [Announcement, setAnnouncement] = useState([]);
  const [kelas, setKelas] = useState();
  const [pengumumanToDelete, setPengumumanToDelete] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const Pengumuman = ({ value }) => {
    const auth = useAuthUser();
    return (
      <>
        <div className="bg-white rounded-xl p-5 mb-4">
          <div className="flex gap-2 mb-1 font-bold tracking-widest text-[#5b25d9]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 22 28"
              fill="none"
            >
              <path
                d="M10.9957 18.2328C5.24501 18.2328 0.333008 19.1395 0.333008 22.7661C0.333008 26.3941 5.21434 27.3328 10.9957 27.3328C16.7463 27.3328 21.6583 26.4275 21.6583 22.7995C21.6583 19.1715 16.7783 18.2328 10.9957 18.2328"
                fill="#5B25D9"
              />
              <path
                opacity="0.4"
                d="M10.9955 14.7783C14.9128 14.7783 18.0515 11.6383 18.0515 7.72226C18.0515 3.80626 14.9128 0.66626 10.9955 0.66626C7.07945 0.66626 3.93945 3.80626 3.93945 7.72226C3.93945 11.6383 7.07945 14.7783 10.9955 14.7783"
                fill="#5B25D9"
              />
            </svg>
            <span>{value.account.name}</span>
          </div>
          <div className="text-sm text-[#987bdf] gap-2 mb-3">
            <span>
              {formattedDate(value.createdAt)} •{" "}
              {formattedTime(value.createdAt)} WIB
            </span>
            {value.modifiedAt != value.createdAt ? (
              <span>
                {" "}
                (edited {formattedDate(value.modifiedAt)},{" "}
                {formattedTime(value.modifiedAt)} WIB)
              </span>
            ) : null}
          </div>
          <div className="mb-2">
            <h3 className="text-2xl font-semibold mb-1">
              {value.headerContent}
            </h3>
          </div>
          <div>{value.content}</div>
          {auth.id_user === value.account.id ? (
            <div className="flex gap-2 mt-5 mr-3">
              <NavLink to={`edit/${value.id}`}>
                <button className="bg-[#5b25d9] rounded-md text-white py-2 px-4 text-sm">
                  Edit Pengumuman
                </button>
              </NavLink>
              <button
                onClick={() => handleDeleteClick(value.id)}
                className="bg-white rounded-md text-[#fa0000] py-2 px-4 text-sm border-[1.5px] border-[#fa0000]"
              >
                Hapus Pengumuman
              </button>
            </div>
          ) : null}
        </div>
      </>
    );
  };

  Pengumuman.propTypes = {
    value: PropTypes.shape({
      account: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
      modifiedAt: PropTypes.string,
      headerContent: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  };

  const handleDeleteClick = (idPengumuman) => {
    setPengumumanToDelete(idPengumuman);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pengumumanToDelete) return;

    try {
      // Perform deletion logic here, for example with axios.delete
      await axios.delete(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/pengumuman/${pengumumanToDelete}`,
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
      console.error("Error deleting announcement:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function formattedDate(timestamp) {
    const dateObject = new Date(timestamp);
    const day = String(dateObject.getDate()).padStart(2, "0");
    let month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const months = {
      "01": "Januari",
      "02": "Februari",
      "03": "Maret",
      "04": "April",
      "05": "Mei",
      "06": "Juni",
      "07": "Juli",
      "08": "Agustus",
      "09": "September",
      10: "Oktober",
      11: "November",
      12: "Desember",
    };
    month = months[month];
    const year = dateObject.getFullYear();
    return `${day} ${month} ${year}`;
  }

  function formattedTime(timestamp) {
    const dateObject = new Date(timestamp);
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    return `${hours}.${minutes}`;
  }

  useEffect(() => {
    getAllAnnouncement();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}` + `/api/kelas/${id}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      setKelas(responseData.data.name);
      console.log(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllAnnouncement = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/pengumuman/class-pengumuman/${id}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setAnnouncement(data);
      setKelas(data[0].kelas.name);
    } catch (error) {
      console.error("Error fetching all announcement:", error);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-5 mt-5">
          <h3 className="text-3xl font-semibold">
            Manajemen Kelas - Buat Pengumuman
          </h3>
        </div>
        <div>
          <img src={img1} className="h-[22.5rem]" />
        </div>
        <div className="mb-5 mt-8">
          <h3 className="text-2xl font-semibold">{kelas}</h3>
        </div>
        <NavLink to={`create`}>
          <button className="bg-[#5b25d9] rounded-md text-white py-2 px-4 text-sm w-full">
            Tambah Pengumuman Baru
          </button>
        </NavLink>

        <div className="border border-gray-300 col-span-5 mt-8 mb-5" />
        <div>
          {Announcement.map((data) => (
            <Pengumuman value={data} key={data.id} />
          ))}
        </div>
      </div>

      {/* Confirmation modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white py-8 rounded-3xl items-center">
            <p className="flex justify-center text-base font-medium mb-[20px]">
              Yakin hapus pengumuman?
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

export default Announcements;
