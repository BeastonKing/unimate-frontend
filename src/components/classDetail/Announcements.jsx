import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Impor useLocation
import React from "react";
import Announcement from "./Announcement";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";

export default function Announcements() {
  const authHeader = useAuthHeader();
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split("/");
  const courseId = pathSegments[2];
  const [announcement, setAnnouncement] = useState([]); // Pindahkan ke sini

  const getAllAnnouncement = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/pengumuman/class-pengumuman/${courseId}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      setAnnouncement(response.data);
    } catch (error) {
      console.error("Error fetching all announcement:", error);
    }
  };

  useEffect(() => {
    getAllAnnouncement();
  }, [courseId]); // Tambahkan courseId sebagai dependency useEffect

  return (
    <div className="min-h-80 mt-[58px]">
      {announcement.map((x, i) => (
        <Announcement announcement={x} key={i} />
      ))}
    </div>
  );
}
