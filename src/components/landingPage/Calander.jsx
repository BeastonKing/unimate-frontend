import React from "react";
import { useNavigate } from "react-router-dom";
import calander from "../../assets/Image_Calendar.png";
import Button from "../button/Button";

const Calander = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/calendar");
  };

  return (
    <div className="flex m-20 gap-6">
      <img src={calander} alt="kalender" />

      <div className="ml-5 text-main-400 flex flex-col gap-4 justify-center">
        <div>KALENDER BEASISWA UNIMATE</div>
        <div className="text-5xl font-semibold tracking-wide">
          Nggak Mau Ketinggalan Informasi Beasiswa?
        </div>
        <div>
          Kami menyediakan kalender beasiswa yang membantu Anda tetap
          up-to-date!
        </div>
        <div>
          <Button
            style="primary"
            label="Cek Kalender Beasiswa"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Calander;
