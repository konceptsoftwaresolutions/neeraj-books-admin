import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";


const HorizontalBarChart = ({
  data,
  categories,
  title = "Horizontal Bar Chart",
  barColor = "#f99a00",
  initialVisible = 14, // Number of bars to show before expanding
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine which data to show
  const displayedData = isExpanded ? data : data?.slice(0, initialVisible);
  const displayedCategories = isExpanded
    ? categories
    : categories?.slice(0, initialVisible);

  // Dynamically calculate height
  const dynamicHeight = displayedData?.length * 40 + 20;

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
      categories: displayedCategories,
    },
    colors: [barColor],
  };

  const chartSeries = [
    {
      data: displayedData,
    },
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md relative">
      {/* Top row with expand button */}
      {data?.length > initialVisible && (
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-black  text-sm"
          >
            {isExpanded ? <span className="flex items-center">Collapse <IoIosArrowUp size={20}/> </span> : <span className="flex items-center">Expand <MdOutlineKeyboardArrowDown size={20}/> </span> }
          </button>
        </div>
      )}

      {/* Chart */}
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={dynamicHeight}
      />
    </div>
  );
};

export default HorizontalBarChart;
