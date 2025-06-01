// components/MultiLineChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const MultiLineChart = ({
  seriesData = [],
  categories = [],
  title = "Multi-Line Chart",
}) => {
  const options = {
    chart: {
      type: "line",
      height: 350,
      zoom: { enabled: false },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: title,
      align: "left",
    },
    xaxis: {
      categories,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="line"
        height={350}
      />
    </div>
  );
};

export default MultiLineChart;
