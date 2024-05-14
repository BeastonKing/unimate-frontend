import React from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useState, useEffect } from "react";
import OptionDropdown from "../dropdown/OptionDropdown";

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const PartnershipDailyRatency = () => {
  const authHeader = useAuthHeader();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  const [queryParams, setQueryParams] = useState({
    year: currentYear,
    month: currentMonth,
  });

  const handleDateFilterChange = (key, value) => {
    setQueryParams({ ...queryParams, [key]: value });
  };

  const {
    isFetching,
    isError,
    data: responseData,
    refetch,
  } = useQuery({
    queryKey: ["index"],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/partnership/daily?year=${queryParams.year}&month=${
          queryParams.month
        }`,
        { headers: { Authorization: authHeader } }
      );
      return response.json();
    },
    enabled: !!queryParams.year && !!queryParams.month,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.year, queryParams.month]);

  if (isFetching) return <div>Loading...</div>;

  if (isError) return <div>An error has occurred: {isError.message}</div>;

  if (!responseData) return <div>No data available</div>;

  const labels = responseData?.map((data) => data.date);
  const dataValues = responseData?.map((data) => data.count);

  const totalRequests = dataValues.reduce((acc, curr) => acc + curr, 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Permintaan Kemitraan",
        data: dataValues,
        fill: false,
        borderColor: "#BAA0F6",
        tension: 0.5,
        backgroundColor: "#DED3F7",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Jumlah Permintaan",
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Tanggal",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="lg:text-xl text-base mb-5 to-main-400">
          <span className="font-semibold"> Grafik Permintaan Harian</span>

          <div className="flex gap-4 my-5">
            <OptionDropdown
              label="Pilih Tahun"
              options={[
                { value: "2022", label: "2022" },
                { value: "2023", label: "2023" },
                { value: "2024", label: "2024" },
                { value: "2025", label: "2025" },
                { value: "2026", label: "2026" },
              ]}
              value={queryParams.year}
              onChange={(value) => handleDateFilterChange("year", value)}
            />
            <OptionDropdown
              label="Pilih Bulan"
              options={[
                { value: "1", label: "Januari" },
                { value: "2", label: "Februari" },
                { value: "3", label: "Maret" },
                { value: "4", label: "April" },
                { value: "5", label: "Mei" },
                { value: "6", label: "Juni" },
                { value: "7", label: "Juli" },
                { value: "8", label: "Agustus" },
                { value: "9", label: "September" },
                { value: "10", label: "Oktober" },
                { value: "11", label: "November" },
                { value: "12", label: "Desember" },
              ]}
              value={queryParams.month}
              onChange={(value) => handleDateFilterChange("month", value)}
            />
          </div>
        </div>
        <div className="font-semibold text-sm mt-3 text-main-400 shadow-lg lg:w-36 w-28 h-28 rounded-md p-4">
          Total Permintaan
          <div className="lg:text-5xl md:text-3xl text-xl text-main-100 mt-2">
            {totalRequests}
          </div>
        </div>
      </div>

      <div>
        <Line
          className="lg:w-80 lg:h-80 h-auto w-auto"
          height="200px"
          width="200px"
          data={data}
          options={options}
        />
      </div>
    </>
  );
};

export default PartnershipDailyRatency;
