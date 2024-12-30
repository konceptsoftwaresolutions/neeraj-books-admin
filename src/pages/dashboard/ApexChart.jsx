import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import SkeletonLayout from "../../components/layout/SkeletonLayout";
import { Card } from "@material-tailwind/react";

const ApexChart = ({ heading, chartData }) => {
  const [loading, setLoading] = useState(false);
  // console.log("chartData:",chartData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    colors: ["#359FF3", "#B2B2B2"], // Set colors for the series
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val ;
        },
      },
    },
  });

  return (
    <div>
      <Card className={`${!loading && "bgPrimaryGradient"} overflow-hidden `}>
        <div id="chart">
          {loading ? (
            <>
              <div className="text-black font-medium mb-5">{heading}</div>
              <ReactApexChart
                options={options}
                series={chartData}
                type="bar"
                height={350}
              />
            </>
          ) : (
            <SkeletonLayout height={20} />
          )}
        </div>
        <div id="html-dist"></div>
      </Card>
    </div>
  );
};

export default ApexChart;
