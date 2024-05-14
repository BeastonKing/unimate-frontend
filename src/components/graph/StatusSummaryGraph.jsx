import React from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useState, useEffect } from "react";
import OptionDropdown from "../dropdown/OptionDropdown";

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const StatusSummaryGraph = () => {
  const authHeader = useAuthHeader();

  const [queryFilter, setqueryFilter] = useState({
    year: null,
    month: null,
  });

  const handleDateFilterChangeStatus = (key, value) => {
    setqueryFilter({ ...queryFilter, [key]: value });
  };

  const {
    isFetching: fetchingStatus,
    isError: errorFetchingStatus,
    data: responseDataStatus,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: ["index"],
    queryFn: async () => {
      let url = `${
        import.meta.env.VITE_UNIMATE_BE_SERVICES
      }/api/partnership/status`;

      if (queryFilter.year !== null && queryFilter.month !== null) {
        url += `?year=${queryFilter.year}&month=${queryFilter.month}`;
      } else if (queryFilter.year !== null) {
        url += `?year=${queryFilter.year}`;
      } else if (queryFilter.month !== null) {
        url += `?month=${queryFilter.month}`;
      }

      const response = await fetch(url, {
        headers: { Authorization: authHeader },
      });
      return response.json();
    },
    enabled: queryFilter.year !== null || queryFilter.month !== null,
  });
  useEffect(() => {
    refetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFilter.year, queryFilter.month]);

  if (fetchingStatus) return <div>Loading...</div>;

  if (errorFetchingStatus)
    return <div>An error has occurred: {errorFetchingStatus.message}</div>;

  if (!responseDataStatus) return <div>No data available</div>;

  const labelStatus = responseDataStatus?.map((data) => data.status);
  const dataStatus = responseDataStatus?.map((data) => data.count);

  const totalStatus = dataStatus.reduce((acc, curr) => acc + curr, 0);

  const data = {
    responsive: true,
    maintainAspectRatio: false,
    labels: labelStatus,
    datasets: [
      {
        label: "Jumlah Status",
        data: dataStatus,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Jumlah",
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
          text: "Status",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-between mb-3">
        <div className="text-xl mb-5 to-main-400">
          <span className="font-semibold"> Grafik Ringkasan Status</span>

          <div className="flex gap-4 my-5">
            <OptionDropdown
              label="Pilih Tahun"
              options={[
                { value: null, label: "All" },
                { value: "2023", label: "2023" },
                { value: "2024", label: "2024" },
                { value: "2025", label: "2025" },
                { value: "2026", label: "2026" },
              ]}
              value={queryFilter.year}
              onChange={(value) => handleDateFilterChangeStatus("year", value)}
            />

            <OptionDropdown
              label="Pilih Bulan"
              options={[
                { value: null, label: "All" },
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
              value={queryFilter.month}
              onChange={(value) => handleDateFilterChangeStatus("month", value)}
            />
          </div>
        </div>

        <div className="font-semibold text-sm mt-3 text-main-400 shadow-lg lg:w-36 w-28 h-28 rounded-md p-4">
          Total Permintaan
          <div className="lg:text-5xl md:text-3xl text-main-100 mt-2">
            {totalStatus}
          </div>
        </div>
      </div>

      <Bar
        className="lg:w-80 lg:h-80"
        height="100px"
        width="200px"
        data={data}
        options={options}
      />
    </>
  );
};

export default StatusSummaryGraph;
