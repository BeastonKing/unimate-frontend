import PropTypes from "prop-types";
import React from "react";
const SalesSummary = ({ judul, tipe, data, sumData }) => {
  return (
    <div className="bg-white w-full h-full p-6 rounded-[16px]">
      <h1 className="font-semibold  text-lg">{judul}</h1>
      <h6 className="font-medium text-sm text-[#8B909A]">{tipe}</h6>
      <div className="flex">
        <div className="w-1/2 flex items-center">
          <h1 className="font-bold text-3xl">
            {judul == "Total Penjualan"
              ? data.reduce((total, item) => total + item.price, 0) / 1000
              : data.reduce((total, item) => total + item.net, 0) / 1000}
            k
          </h1>
        </div>
        <div className="">
          <svg
            width="155"
            height="106"
            viewBox="0 0 155 106"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M65.2262 42.2928C31.8099 14.1026 6.31222 44.3022 0 75.9515V106H155V0C148.337 14.1601 135.011 101.164 65.2262 42.2928Z"
              fill="url(#paint0_linear_1471_8779)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1471_8779"
                x1="77.5"
                y1="0"
                x2="77.5"
                y2="106"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1EB564" stopOpacity="0.08" />
                <stop offset="1" stopColor="#1EB564" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <span className="mt-4 flex items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform={sumData.status ? "" : "rotate(180)"}
        >
          <path
            d="M7.99974 2.95016C8.08863 2.95016 8.17196 2.96394 8.24974 2.9915C8.32752 3.01905 8.39974 3.06639 8.46641 3.1335L12.8664 7.5335C12.9997 7.66683 13.0664 7.82505 13.0664 8.00816C13.0664 8.19127 12.9997 8.34972 12.8664 8.4835C12.7331 8.61683 12.5775 8.6835 12.3997 8.6835C12.222 8.6835 12.0664 8.61683 11.9331 8.4835L8.66641 5.21683L8.66641 12.6835C8.66641 12.8724 8.60241 13.0279 8.47441 13.1502C8.34641 13.2724 8.18818 13.3335 7.99974 13.3335C7.81085 13.3335 7.65241 13.2695 7.52441 13.1415C7.39641 13.0135 7.33263 12.8553 7.33307 12.6668L7.33307 5.21683L4.06641 8.4835C3.93307 8.61683 3.77752 8.6835 3.59974 8.6835C3.42196 8.6835 3.26641 8.61683 3.13307 8.4835C2.99974 8.35016 2.93307 8.19172 2.93307 8.00816C2.93307 7.82461 2.99974 7.66638 3.13307 7.5335L7.53307 3.1335C7.59974 3.06683 7.67196 3.0195 7.74974 2.9915C7.82752 2.9635 7.91085 2.94972 7.99974 2.95016Z"
            fill={sumData.status ? "#1EB564" : "#991b1b"}
          />
        </svg>
        <h1
          className={`ml-1 ${
            sumData.status ? "text-[#1EB564]" : "text-red-800"
          }`}
        >
          {sumData.centage && parseFloat(sumData.centage.toFixed(2))}%
        </h1>

        <h1 className="ml-2 text-[#8B909A]">dibandingkan {tipe}</h1>
      </span>
    </div>
  );
};

export default SalesSummary;

SalesSummary.propTypes = {
  judul: PropTypes.string.isRequired,
  tipe: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  sumData: PropTypes.shape({
    centage: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
};
