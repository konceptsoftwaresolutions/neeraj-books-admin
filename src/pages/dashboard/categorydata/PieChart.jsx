import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({
  data = [],
  labels = [],
  title = "Pie Chart",
  colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
}) => {
  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: labels,
    colors: colors,
    title: {
      text: title,
      align: "left",
    },
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <ReactApexChart
        options={chartOptions}
        series={data}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default PieChart;
