import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const MonthChart = ({ dashboardData }) => {
  // Get dashboard data from redux store
  //   const { dashboardData } = useSelector((state) => state.dashboard);

  // All months for X axis
  const months = [
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
  ];

  // Prepare chart series data using useMemo for optimization
  const series = useMemo(() => {
    if (
      !dashboardData?.monthlyGraph ||
      dashboardData.monthlyGraph.length === 0
    ) {
      // No data: return 0-filled arrays
      return [
        { name: "Total Sale", data: new Array(months.length).fill(0) },
        { name: "COD Sale", data: new Array(months.length).fill(0) },
        { name: "Prepaid Sale", data: new Array(months.length).fill(0) },
      ];
    }

    // Create a map for quick lookup by month
    const dataMap = new Map();
    dashboardData.monthlyGraph.forEach(
      ({ month, totalSale, codSale, prepaidSale }) => {
        dataMap.set(month, { totalSale, codSale, prepaidSale });
      }
    );

    // Map months to sales, or 0 if no data
    return [
      {
        name: "Total Sale",
        data: months.map((m) => dataMap.get(m)?.totalSale ?? 0),
      },
      {
        name: "COD Sale",
        data: months.map((m) => dataMap.get(m)?.codSale ?? 0),
      },
      {
        name: "Prepaid Sale",
        data: months.map((m) => dataMap.get(m)?.prepaidSale ?? 0),
      },
    ];
  }, [dashboardData, months]);

  // Chart configuration options
  const options = {
    chart: {
      type: "line",
      toolbar: { show: true },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth", width: 2 },
    markers: { size: 4 },
    xaxis: {
      categories: months,
      title: { text: "Months" },
    },
    yaxis: {
      title: { text: "Sales Amount" },
      min: 0,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    noData: {
      text: "Loading chart data...",
      align: "center",
      verticalAlign: "middle",
      style: { fontSize: "14px", color: "#999" },
    },
  };

  // Loading state if no data yet
  if (!dashboardData?.monthlyGraph) {
    return <div></div>;
  }

  return (
    <div>
      <Chart options={options} series={series} type="line" height={400} />
    </div>
  );
};

export default MonthChart;
