import React from "react";
import PropTypes from "prop-types";
import img1 from "../../assets/image/Program Image.png";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  return (
    <div className="w-1/2 ">
      <div
        className={` h-150  h-full w-full flex flex-col bg-white rounded-[8px] mr-4 pr-4 mt-4`}
      >
        <img
          src={data.classPicture ? data.classPicture : img1}
          className="w-full h-48 object-cover rounded-[8px]"
        />
        <div className="flex flex-col justify-between mt-6 h-full">
          <div className="h-2/3 mb-4">
            <p className="text-[12px] lg:text-xl mb-2">{data.category}</p>
            <h1 className="text-first font-semibold text-2xl truncate">
              {data.name}
            </h1>
          </div>
          <div className="h-1/3 w-full">
            <Link to={`/course/${data.id}`}>
              <button className="bg-main-200 w-full text-white font-semibold text-xl rounded-[8px] py-4 px-6">
                Detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    classPicture: PropTypes.string.isRequired,
  }).isRequired,
};
