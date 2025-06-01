import React, { useEffect, useMemo, useState } from "react";
import PageCont from "../../components/PageCont";
import StatsCard from "./StatsCard";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import Category from "./categorydata/Category";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../redux/features/dashboard";
import MonthChart from "./charts/MonthChart";
import { getAllCategories } from "../../redux/features/category";

const Home = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    period: "all",
    category: "IGNOU",
    fromDate: null,
    toDate: null,
  });

  const { dashboardData } = useSelector((state) => state.dashboard);
  const { allCategory } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDashboardData(filters));
  }, [dispatch, filters]);

  const { RangePicker } = DatePicker;
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
  };

  const handleTimeFilterChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      period: value,
    }));
  };

  const handleFromDateChange = (date, dateString) => {
    setFilters((prev) => ({
      ...prev,
      fromDate: dateString,
    }));
  };

  const handleToDateChange = (date, dateString) => {
    setFilters((prev) => ({
      ...prev,
      toDate: dateString,
    }));
  };

  return (
    <PageCont>
      <div className="flex justify-start items-center gap-3   ">
        <Heading text="Admin Dashboard" />
      </div>

      <div className="flex justify-end gap-3">
        <div className="flex">
          {["today", "weekly", "monthly", "yearly", "all"].map((time) => (
            <button
              key={time}
              className={`border-black border-[1px] px-2 py-1 border-r-0 last:border-r ${
                filters.period === time ? "bg-black text-white" : ""
              }`}
              onClick={() => handleTimeFilterChange(time)}
            >
              {time.charAt(0).toUpperCase() + time.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <DatePicker
            className="border px-2 py-1 rounded-none border-black"
            onChange={handleFromDateChange}
            allowClear
            format="DD-MM-YYYY"
            placeholder="From Date"
            value={
              filters.fromDate ? dayjs(filters.fromDate, "DD-MM-YYYY") : null
            }
          />
          <DatePicker
            className="border px-2 py-1 rounded-none border-black"
            onChange={handleToDateChange}
            allowClear
            format="DD-MM-YYYY"
            placeholder="To Date"
            value={filters.toDate ? dayjs(filters.toDate, "DD-MM-YYYY") : null}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 my-10">
        <StatsCard
          firstTitle="Total orders"
          firstAmount={dashboardData?.totalOrders}
          secondTitle="Total Orders Sale"
          secondAmount={dashboardData?.totalOrderSales}
        />
        <StatsCard
          firstTitle="COD Orders"
          firstAmount={dashboardData?.codOrders}
          secondTitle="COD Sale"
          secondAmount={dashboardData?.codOrdersSales}
        />
        <StatsCard
          firstTitle="Prepaid Orders"
          firstAmount={dashboardData?.prepaidOrders}
          secondTitle="Prepaid Sale"
          secondAmount={dashboardData?.prepaidOrdersSales}
        />
        <StatsCard
          firstTitle="Bulk Orders"
          firstAmount="456"
          secondTitle="Bulk Sale"
          secondAmount="45678"
        />
        <StatsCard
          firstTitle="Pending Orders"
          firstAmount={dashboardData?.pendingOrders}
          secondTitle="Pending Sale"
          secondAmount={dashboardData?.pendingOrdersSales}
        />
        <StatsCard
          firstTitle="In Transit Orders"
          firstAmount={dashboardData?.inTransitOrders}
          secondTitle="In Transit Sale"
          secondAmount={dashboardData?.inTransitOrdersSales}
        />
        <StatsCard
          firstTitle="Returned Orders"
          firstAmount={dashboardData?.returnedOrders}
          secondTitle="Returned Sale"
          secondAmount={dashboardData?.returnedOrdersSales}
        />
        <StatsCard
          firstTitle="Refund Orders"
          firstAmount={dashboardData?.refundOrders}
          secondTitle="Refund Sale"
          secondAmount={dashboardData?.refundOrdersSales}
        />
        <StatsCard
          firstTitle="Cancel Orders"
          firstAmount={dashboardData?.cancelOrders}
          secondTitle="Cancel Sale"
          secondAmount={dashboardData?.cancelOrdersSales}
        />
        <StatsCard
          firstTitle="Total Registered"
          firstAmount={dashboardData?.totalRegistered}
        />
        <StatsCard
          firstTitle="Total Purchasers"
          firstAmount={dashboardData?.totalPurchasers}
        />
        <StatsCard
          firstTitle="Total Products"
          firstAmount={dashboardData?.totalProducts}
        />
        <StatsCard
          firstTitle="Ebook Orders"
          firstAmount={dashboardData?.eBookOrders}
          secondTitle="Ebook Sale"
          secondAmount={dashboardData?.eBookSales}
        />
        <StatsCard
          firstTitle="Assignment Orders"
          firstAmount="0"
          secondTitle="Assignment Sale"
          secondAmount="0"
        />
        <StatsCard
          firstTitle="Sample Paper Orders"
          firstAmount="0"
          secondTitle="Sample Paper Sale"
          secondAmount="0"
        />
        <StatsCard firstTitle="Bulk Buyers" firstAmount="0" />
        <StatsCard
          firstTitle="Shipping Paid"
          firstAmount={dashboardData?.shippingPaid}
        />
      </div>
      <MonthChart dashboardData={dashboardData} />
      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          {allCategory?.map((item, index) => (
            <p
              key={index}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  category: item.name,
                }))
              }
              className={`px-3 py-1 border-[1px] border-black rounded-2xl cursor-pointer ${
                filters.category === item.name ? "bg-black text-white" : ""
              }`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
      <Category />
    </PageCont>
  );
};

export default Home;
