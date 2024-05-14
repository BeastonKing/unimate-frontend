import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

const SalesGraph = ({ tipe, data }) => {
  const [labels, setLabels] = useState([]);
  const [graphData, setGraphData] = useState([]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const graph = {
    labels,
    datasets: [
      {
        label: "Penjualan",
        data: graphData,
        borderColor: "rgb(91,37,217)",
        backgroundColor: "rgb(91,37,217)",
      },
    ],
  };

  const countSiswa = () => {
    const uniqueStudents = new Set(data.map((entry) => entry.siswa.id));
    const numberOfStudents = uniqueStudents.size;

    return numberOfStudents;
  };
  useEffect(() => {
    if (Array.isArray(data)) {
      const newLabels = [];
      const newData = [];

      data
        .sort((a, b) => new Date(a.payat) - new Date(b.payat))
        .forEach((payment) => {
          const date = new Date(payment.payat);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");

          newLabels.push(`${year}-${month}-${day} ${hours}:${minutes}`);
          newData.push(payment.price);
        });
      setLabels(newLabels);
      setGraphData(newData);
    }
  }, [data]);
  return (
    <div className="bg-white mt-5 p-6 rounded-[16px]">
      <div>
        <h1 className="text-lg font-semibold ">
          Grafik Penjualan & Pendapatan
        </h1>
        <h1 className="text-md font-medium text-[#8B909A]">{tipe}</h1>
      </div>
      <div className="w-full mt-6">
        <div className="w-1/2 flex justify-center">
          <div className="w-1/3 flex flex-col  justify-center">
            <h1 className="font-bold text-2xl">{countSiswa()}</h1>
            <h1 className="text-md font-medium text-[#8B909A]">Pelanggan</h1>
          </div>
          <div className="w-1/3 flex flex-col  justify-center">
            <h1 className="font-bold text-2xl">{data.length}</h1>
            <h1 className="text-md font-medium text-[#8B909A]">
              Produk Terjual
            </h1>
          </div>
          <div className="w-1/3 flex flex-col  justify-center">
            <h1 className="font-bold text-2xl">
              {data.reduce((total, item) => total + item.price, 0) / 1000}k
            </h1>
            <h1 className="text-md font-medium text-[#8B909A]">Pendapatan</h1>
          </div>
        </div>
      </div>
      <div className="mt-[46px]">
        <Line options={options} data={graph} />;
      </div>
    </div>
  );
};
SalesGraph.propTypes = {
  tipe: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
export default SalesGraph;
