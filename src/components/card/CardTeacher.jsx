import React from "react";
import PropTypes from "prop-types";
import img1 from "../../assets/image/Program Image.png";
import { Link, useNavigate } from "react-router-dom";

export default function CardTeacher({ data }) {
  const navigate = useNavigate();
  const handleUpdate = async () => {
    navigate(`/teacher/class-management/announcements/${data.id}`);
  };

  return (
    <div className="w-full  border-b border-[#DED3F7] py-10">
      <div className="flex flex-row w-full">
        <div className="w-3/5">
          <div className="flex flex-col justify-between mt-6 h-full">
            <div className="h-2/3 mb-4">
              <div className="rounded-[24px] bg-main-200 w-full  md:w-5/6 lg:w-2/3  xl:w-1/2  2xl:w-5/12 flex justify-center px-4 py-2 ">
                <h6 className="font-medium text-base text-white">
                  {data.category}
                </h6>
              </div>
              <h1 className="mt-2 text-first font-semibold text-2xl ">
                {data.name}
              </h1>
            </div>
            <div className="h-1/3 w-full flex">
              <div className="w-1/2 px-1 ">
                <Link to={`/course/${data.id}`}>
                  <button className="bg-main-200 w-full text-white font-semibold text-base rounded-[8px] py-3 px-6">
                    Lihat Detail Kelas
                  </button>
                </Link>
              </div>
              <div className="w-1/2 px-1">
                {" "}
                <button
                  className="bg-[#EFE9FB] w-full text-main-200 font-semibold text-base rounded-[8px] py-3 px-6"
                  onClick={handleUpdate}
                >
                  Buat Pengumuman Kelas
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 pl-4 ">
          <img
            src={data.cover ? data.cover : img1}
            className="w-full h-full object-cover rounded-[16px]"
          />
        </div>
      </div>
    </div>
  );
}

CardTeacher.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
};
