import React from "react";
const Timer = () => {
  return (
    <>
      <div className="items-center justify-center bg-[#DED3F7] px-16 py-10 mb-3 rounded-lg">
        <div className="flex gap-3 justify-center items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M20 10C20 15.524 15.523 20 10 20C4.477 20 0 15.524 0 10C0 4.478 4.477 0 10 0C15.523 0 20 4.478 20 10Z"
              fill="#5B25D9"
            />
            <path
              d="M13.5734 13.8143C13.4424 13.8143 13.3104 13.7803 13.1894 13.7093L9.26344 11.3673C9.03744 11.2313 8.89844 10.9863 8.89844 10.7223V5.67529C8.89844 5.26129 9.23444 4.92529 9.64844 4.92529C10.0624 4.92529 10.3984 5.26129 10.3984 5.67529V10.2963L13.9584 12.4193C14.3134 12.6323 14.4304 13.0923 14.2184 13.4483C14.0774 13.6833 13.8284 13.8143 13.5734 13.8143Z"
              fill="#5B25D9"
            />
          </svg>
          <h1 className="font-thin text-xl text-main-200">Sisa waktu:</h1>
        </div>
        <div className="flex justify-center mt-3">
          <h1 className="font-semibold text-3xl text-main-200">02:15:13</h1>
        </div>
      </div>
    </>
  );
};

export default Timer;
