import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Monthly Revenue Statistics",
      backgroundColor: "rgb(251 191 36)",
      borderColor: "rgb(251 191 36)",
      data: [
        0, 200000, 5, 2, 20, 30000, 45, 1, 120000, 70000, 80000, 320000, 16,
      ],
    },
  ],
};

const RevenueStats = () => {
  <Chart />;
  return (
    <div className='bg-white p-2 mx-2'>
      <Line data={data} className='chart-item' />
    </div>
  );
};

export default RevenueStats;
