import React, { useEffect } from "react";
import { getAllCategories } from "../../../redux/features/category";
import { useDispatch, useSelector } from "react-redux";
import HorizontalBarChart from "../HorizontalBarChart";
import BookSalesTable from "./BookSalesTable";
import PieChart from "./PieChart";
import { Skeleton } from "antd";

const Category = () => {
  const dispatch = useDispatch();
  const { allCategory } = useSelector((state) => state.category);
  const { dashboardData, dashboardLoader } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const barChartCategories =
    dashboardData?.ordersByState?.map((item) => item._id) || [];

  const barChartData =
    dashboardData?.ordersByState?.map((item) => item.count) || [];

  const sourceLabels = dashboardData?.ordersBySource?.map(
    (item) => Object.keys(item)[0]
  );

  const sourceCountsData = dashboardData?.ordersBySource?.map(
    (item) => Object.values(item)[0]
  );

  const bookSalesData = [
    { name: "The Great Gatsby", unitsSold: 120 },
    { name: "1984", unitsSold: 90 },
    { name: "To Kill a Mockingbird", unitsSold: 150 },
    { name: "The Alchemist", unitsSold: 75 },
  ];

  const bookColors = ["#f39c12", "#2ecc71", "#e74c3c", "#8e44ad"];
  const bookLabels = Object.keys(dashboardData?.purchasePatterns || {});
  const booksSold = Object.values(dashboardData?.purchasePatterns || {});

  return (
    <div>
      {/* Summary metrics */}
      <div className="mt-5">
        <div className="grid grid-cols-4 max-w-[800px]">
          <p className="p-2 border border-gray-300 bg-light-blue-200">Sale</p>
          <p className="p-2 border border-gray-300 bg-light-blue-200">Orders</p>
          <p className="p-2 border border-gray-300 bg-light-blue-200">
            Registration
          </p>
          <p className="p-2 border border-gray-300 bg-light-blue-200">
            Purchases
          </p>
        </div>
        <div className="grid grid-cols-4 max-w-[800px]">
          {dashboardLoader ? (
            <>
              <Skeleton.Input active className="p-2 h-10" />
              <Skeleton.Input active className="p-2 h-10" />
              <Skeleton.Input active className="p-2 h-10" />
              <Skeleton.Input active className="p-2 h-10" />
            </>
          ) : (
            <>
              <p className="p-2 border border-gray-300">
                {dashboardData?.categoryMetrics?.sale}
              </p>
              <p className="p-2 border border-gray-300">
                {dashboardData?.categoryMetrics?.orders}
              </p>
              <p className="p-2 border border-gray-300">0</p>
              <p className="p-2 border border-gray-300">
                {dashboardData?.categoryMetrics?.purchasers}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Bar chart & book sales */}
      <div className="grid grid-cols-2 gap-5 mt-10">
        <div>
          {dashboardLoader ? (
           <div className="w-full h-[200px] rounded-lg bg-gray-200 animate-pulse" />
          ) : (
            <HorizontalBarChart
              title="Orders by state"
              data={barChartData}
              categories={barChartCategories}
              barColor="#3498db"
            />
          )}
        </div>
        <div>
          {dashboardLoader ? (
            <div className="w-full h-[200px] rounded-lg bg-gray-200 animate-pulse" />
          ) : (
            <BookSalesTable data={bookSalesData} />
          )}
        </div>
      </div>

      {/* Orders by source and pie chart */}
      <div className="grid grid-cols-2 gap-5 mt-10">
        <div>
          {dashboardLoader ? (
            <div className="w-full h-[200px] rounded-lg bg-gray-200 animate-pulse" />
          ) : (
            <HorizontalBarChart
              title="Orders by source"
              data={sourceCountsData}
              categories={sourceLabels}
              barColor="#f99a00"
            />
          )}
        </div>
        <div className="w-full">
          {dashboardLoader ? (
            <div className="w-full h-[200px] rounded-lg bg-gray-200 animate-pulse" />
          ) : (
            <PieChart
              data={booksSold}
              labels={bookLabels}
              title="Books Distribution"
              colors={bookColors}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
