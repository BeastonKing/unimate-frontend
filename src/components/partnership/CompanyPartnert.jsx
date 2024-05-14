import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const CompanyPartnert = () => {
  const [offset, setOffset] = useState(0);
  const itemWidth = 48; // Lebar satu item (w-48)
  const numItems = 8; // Jumlah total item

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOffset((prevOffset) => {
        // Hitung offset selanjutnya
        const nextOffset = prevOffset - 1;
        // Atur ulang offset ke awal jika mencapai batas tertentu
        if (Math.abs(nextOffset) >= itemWidth * numItems) {
          return 0;
        }
        return nextOffset;
      });
    }, 25);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full font-semibold mt-10 overflow-x-hidden">
      <div>
        <h3 className="lg:text-3xl md:text-xl text-lg">
          Partner Terpercaya Kami
        </h3>
      </div>

      <div className="flex gap-5 mt-6 overflow-hidden">
        {Array.from({ length: numItems * 2 }, (_, index) => (
          <NavLink
            key={index}
            className="border border-main-10 lg:p-3 p-2 rounded-lg lg:w-48 md:w-32 w-28"
            style={{ transform: `translateX(${offset}px)` }}
          >
            <div
              id="logo-partner"
              className="lg:text-lg md:text-base text-xs flex justify-center items-center text-main-300 text-center"
            >
              |T-Rex Gruop| Fasilkom UI
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CompanyPartnert;
