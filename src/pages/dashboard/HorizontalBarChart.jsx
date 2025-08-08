import React from "react";
import ReactApexChart from "react-apexcharts";

const HorizontalBarChart = ({
  data,
  categories,
  title = "Horizontal Bar Chart",
  barColor = "#f99a00",
}) => {
  // Dynamically calculate height: ~40px per bar + padding
  const dynamicHeight = data?.length * 40 + 50;

  const chartOptions = {
    chart: {
      type: "bar",
      height: dynamicHeight,
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
    colors: [barColor],
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
        height={dynamicHeight} // ✅ Now height changes based on number of bars
      />
    </div>
  );
};

export default HorizontalBarChart;
