import React from "react";
import ReactApexChart from "react-apexcharts";

const HorizontalBarChart = ({
  data,
  categories,
  title = "Horizontal Bar Chart",
  barColor = "#f99a00", // Default color if no color is passed
}) => {
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: title,
      align: "left",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
    colors: [barColor], // ✅ Correct placement
  };

  const chartSeries = [
    {
      data: data,
    },
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default HorizontalBarChart;
