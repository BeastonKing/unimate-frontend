import React from "react";
import advantagesimg from "../../assets/partnership-advantages.png";

const Advantages = () => {
  return (
    <>
      <div className="flex justify-center lg:flex-nowrap flex-wrap gap-10">
        <div className="flex justify-center items-center">
          <img src={advantagesimg} alt="advantages" />
        </div>

        <div>
          <h1 className="lg:text-5xl md:text-3xl text-2xl text-main-400 font-semibold mb-10">
            Keuntungan Unimate Partnership
          </h1>

          <div className="flex gap-4 mb-5">
            <div className="flex items-center justify-center h-[80px] w-[80px] bg-main-200 rounded-ss-unimate rounded-ee-unimate">
              <svg
                width="48"
                height="39"
                viewBox="0 0 48 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20L18 36L46 2"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h4 className="text-xl font-semibold">
                Program dengan Kurikulum Intensif
              </h4>
              <p className="text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-5">
            <div className="flex items-center justify-center h-[80px] w-[80px] bg-main-200 rounded-ss-unimate rounded-ee-unimate">
              <svg
                width="48"
                height="39"
                viewBox="0 0 48 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20L18 36L46 2"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h4 className="text-xl font-semibold">
                Program dengan Kurikulum Intensif
              </h4>
              <p className="text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-5">
            <div className="flex items-center justify-center h-[80px] w-[80px] bg-main-200 rounded-ss-unimate rounded-ee-unimate">
              <svg
                width="48"
                height="39"
                viewBox="0 0 48 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20L18 36L46 2"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h4 className="text-xl font-semibold">
                Program dengan Kurikulum Intensif
              </h4>
              <p className="text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Advantages;
