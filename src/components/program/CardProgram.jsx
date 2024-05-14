import React from "react";
import PropTypes from "prop-types";
import img1 from "../../assets/image/Program Image.png";
import { Link } from "react-router-dom";

const CardProgram = ({ data }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 px-1">
      <div
        className={` w-full flex flex-col bg-white rounded-[8px] mr-4 p-4 mt-4`}
      >
        <img
          src={data.cover ? data.cover : img1}
          className="w-full object-cover rounded-[8px] max-h-60 min-h-60"
        />
        <div className="flex flex-col justify-between mt-6">
          <p className="text-xs text-main-200 mb-2 h-1/12">{data.category}</p>
          <div className=" mb-4">
            <h1 className="font-semibold text-2xl h-16 overflow-hidden ">
              {data.name}
            </h1>
          </div>
          <div className="h-3/12 w-full flex items-center">
            <div className="w-1/2">
              <h4 className="font-semibold text-xl text-main-200">
                {" "}
                {formatter.format(data.price)}
              </h4>
            </div>
            <div className="w-1/2">
              <Link to={`/course/${data.id}`}>
                <button className="bg-main-200 w-full text-white font-semibold text-xs sm:text-xl md:text-xs rounded-[8px] py-4 px-6">
                  Lihat Detail Kelas
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardProgram.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }),
};

export default CardProgram;
