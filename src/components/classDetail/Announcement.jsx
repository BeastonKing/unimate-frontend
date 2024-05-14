import React from "react";
import PropTypes from "prop-types";
import user from "../../assets/image/3 User.svg";

export default function Announcement({ announcement }) {
  const formatDate = (date) => {
    const timestamp = new Date(date);
    const day = timestamp.getDate().toString().padStart(2, "0");
    const month = (timestamp.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
    const year = timestamp.getFullYear().toString();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const formatJam = (date) => {
    const timestamp = new Date(date);
    const hours = timestamp.getHours().toString().padStart(2, "0");
    const minutes = timestamp.getMinutes().toString().padStart(2, "0");
    const seconds = timestamp.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  return (
    <div className="mb-[39px] border-b pb-[32px]">
      <div className="flex items-center ">
        <div className="w-[64px] h-[64px]  mr-[16px] border rounded-full flex justify-center items-center">
          <img src={user} />
        </div>
        <div>
          <div>
            <h1 className="text-2xl font-semibold">
              {announcement.account.name}
            </h1>
          </div>
          <div className="flex">
            <h1 className="text-base text-[#8A6FCE]">
              {formatDate(announcement.modifiedAt)}
            </h1>
            <div className="flex justify-center items-center mx-[10px] ">
              <div className="w-[4px] h-[4px]  bg-[#8A6FCE] rounded-full "></div>
            </div>
            <h1 className="text-base text-[#8A6FCE]">
              {" "}
              {formatJam(announcement.modifiedAt)}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <div className="my-[32px]">
          <h3 className="font-semibold text-5xl">
            {announcement.headerContent}
          </h3>
        </div>
        <div className="">
          <h1 className="text-[20px]">{announcement.content}</h1>
        </div>
      </div>
    </div>
  );
}

Announcement.propTypes = {
  announcement: PropTypes.shape({
    tanggal: PropTypes.string.isRequired,
    jam: PropTypes.string.isRequired,
    nama: PropTypes.string.isRequired,
    judul: PropTypes.string.isRequired,
    pengumuman: PropTypes.string.isRequired,
  }).isRequired,
};
