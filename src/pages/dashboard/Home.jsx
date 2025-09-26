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
import { RiResetLeftFill } from "react-icons/ri";

import {
  FaBox,
  FaMoneyBillAlt,
  FaTruck,
  FaUndoAlt,
  FaBan,
  FaUserPlus,
  FaUsers,
  FaBook,
  FaFileAlt,
  FaShippingFast,
  FaRegMoneyBillAlt,
  FaCashRegister,
} from "react-icons/fa";
import { MdOutlineAssignment, MdOutlineCancel } from "react-icons/md";
import { BsCartCheck, BsCartX } from "react-icons/bs";
import ShipmentPdf from "../pdf/ShipmentPdf";

import orderImg from "../../assets/icons/order.png";
import codImg from "../../assets/icons/cod.png";
import prepaidImg from "../../assets/icons/prepaid.png";
import bulkImg from "../../assets/icons/bulk.png";
import pendingImg from "../../assets/icons/pending.png";
import transitImg from "../../assets/icons/transit.png";
import returnImg from "../../assets/icons/return.png";
import cancelImg from "../../assets/icons/cancel.png";
import teamImg from "../../assets/icons/team.png";
import purchaseImg from "../../assets/icons/purchase.png";
import booksImg from "../../assets/icons/books.png";
import searchImg from "../../assets/icons/search.png";
import qaImg from "../../assets/icons/qa.png";
import sampleImg from "../../assets/icons/sample.png";
import buyerImg from "../../assets/icons/programmer.png";
import rupee from "../../assets/icons/rupee.png";
import refundImg from "../../assets/icons/commercial.png";

const Home = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    period: "today",
    category: "IGNOU",
    fromDate: null,
    toDate: null,
  });
  const [tempFromDate, setTempFromDate] = useState(null);
  const [tempToDate, setTempToDate] = useState(null);

  const { dashboardData } = useSelector((state) => state.dashboard);
  const { allCategory } = useSelector((state) => state.category);
  const { userData } = useSelector((state) => state.user);

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

  const handleResetFilters = () => {
    setFilters({
      period: "today",
      category: "IGNOU",
      fromDate: null,
      toDate: null,
    });
    setTempFromDate(null);
    setTempToDate(null);
  };

  const handleApplyDates = () => {
    setFilters((prev) => ({
      ...prev,
      fromDate: tempFromDate,
      toDate: tempToDate,
    }));
  };

  return (
    <PageCont>
      <div className="grid grid-cols-1 gap-y-3">
        <div className="flex justify-start items-center gap-3 flex-wrap">
          <Heading text="Admin Dashboard" />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 flex-wrap">
          <button
            onClick={handleResetFilters}
            className="bg-black text-white px-3 flex items-center gap-1"
          >
            Reset <RiResetLeftFill />
          </button>

          <div className="flex flex-wrap gap-1">
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

          <div className="flex flex-wrap gap-2 items-center">
            <DatePicker
              className="border px-2 py-1 rounded-none border-black"
              onChange={(date, dateString) => setTempFromDate(dateString)}
              allowClear
              format="DD-MM-YYYY"
              placeholder="From Date"
              value={tempFromDate ? dayjs(tempFromDate, "DD-MM-YYYY") : null}
            />
            <DatePicker
              className="border px-2 py-1 rounded-none border-black"
              onChange={(date, dateString) => setTempToDate(dateString)}
              allowClear
              format="DD-MM-YYYY"
              placeholder="To Date"
              value={tempToDate ? dayjs(tempToDate, "DD-MM-YYYY") : null}
            />
            <button
              onClick={handleApplyDates}
              className="bg-black text-white px-3 py-1"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 my-10">
        <StatsCard
          icon={FaBox}
          profile={userData?.profile}
          firstTitle="Total orders"
          firstAmount={dashboardData?.totalOrders}
          secondTitle="Total Orders Sale"
          secondAmount={`₹ ${dashboardData?.totalOrderSales}`}
          image={orderImg}
        />
        <StatsCard
          icon={FaMoneyBillAlt}
          profile={userData?.profile}
          firstTitle="COD Orders"
          firstAmount={dashboardData?.codOrders}
          secondTitle="COD Sale"
          secondAmount={`₹ ${dashboardData?.codOrdersSales}`}
          image={codImg}
        />
        <StatsCard
          icon={FaRegMoneyBillAlt}
          profile={userData?.profile}
          firstTitle="Prepaid Orders"
          firstAmount={dashboardData?.prepaidOrders}
          secondTitle="Prepaid Sale"
          secondAmount={`₹ ${dashboardData?.prepaidOrdersSales}`}
          image={prepaidImg}
        />
        <StatsCard
          icon={BsCartCheck}
          profile={userData?.profile}
          firstTitle="Bulk Orders"
          firstAmount={dashboardData?.bulkOrders}
          secondTitle="Bulk Sale"
          secondAmount={`₹ ${dashboardData?.bulkOrdersSales}`}
          image={bulkImg}
        />
        <StatsCard
          icon={BsCartX}
          profile={userData?.profile}
          firstTitle="Pending Orders"
          firstAmount={dashboardData?.pendingOrders}
          secondTitle="Pending Sale"
          secondAmount={`₹ ${dashboardData?.pendingOrdersSales}`}
          image={pendingImg}
        />
        <StatsCard
          icon={FaTruck}
          profile={userData?.profile}
          firstTitle="In Transit Orders"
          firstAmount={dashboardData?.inTransitOrders}
          secondTitle="In Transit Sale"
          secondAmount={`₹ ${dashboardData?.inTransitOrdersSales}`}
          image={transitImg}
        />
        <StatsCard
          icon={FaUndoAlt}
          profile={userData?.profile}
          firstTitle="Returned Orders"
          firstAmount={dashboardData?.returnedOrders}
          secondTitle="Returned Sale"
          secondAmount={`₹ ${dashboardData?.returnedOrdersSales}`}
          image={returnImg}
        />
        <StatsCard
          icon={MdOutlineCancel}
          profile={userData?.profile}
          firstTitle="Refund Orders"
          firstAmount={dashboardData?.refundOrders}
          secondTitle="Refund Sale"
          secondAmount={`₹ ${dashboardData?.refundOrdersSales}`}
          image={refundImg}
        />
        <StatsCard
          icon={FaBan}
          profile={userData?.profile}
          firstTitle="Cancel Orders"
          firstAmount={dashboardData?.cancelOrders}
          secondTitle="Cancel Sale"
          secondAmount={`₹ ${dashboardData?.cancelOrdersSales}`}
          image={cancelImg}
        />
        <StatsCard
          icon={FaUserPlus}
          profile={userData?.profile}
          firstTitle="Total Registered"
          firstAmount={dashboardData?.totalRegistered}
          image={teamImg}
        />
        <StatsCard
          icon={FaUsers}
          profile={userData?.profile}
          firstTitle="Total Purchasers"
          firstAmount={dashboardData?.totalPurchasers}
          image={orderImg}
        />
        <StatsCard
          icon={FaBook}
          profile={userData?.profile}
          firstTitle="Total Products"
          firstAmount={dashboardData?.totalProducts}
          image={booksImg}
        />
        <StatsCard
          icon={FaFileAlt}
          profile={userData?.profile}
          firstTitle="Ebook Orders"
          firstAmount={dashboardData?.eBookOrders}
          secondTitle="Ebook Sale"
          secondAmount={`₹ ${dashboardData?.eBookSales}`}
          image={searchImg}
        />
        <StatsCard
          icon={MdOutlineAssignment}
          profile={userData?.profile}
          firstTitle="Assignment Orders"
          firstAmount="0"
          secondTitle="Assignment Sale"
          secondAmount="₹ 0"
          image={qaImg}
        />
        <StatsCard
          icon={FaFileAlt}
          profile={userData?.profile}
          firstTitle="Sample Paper Orders"
          firstAmount="0"
          secondTitle="Sample Paper Sale"
          secondAmount="₹ 0"
          image={sampleImg}
        />
        <StatsCard
          icon={FaUsers}
          profile={userData?.profile}
          firstTitle="Bulk Buyers"
          firstAmount="0"
          image={purchaseImg}
        />
        <StatsCard
          icon={FaShippingFast}
          profile={userData?.profile}
          firstTitle="Shipping Paid"
          firstAmount={`₹ ${Math.round(
            dashboardData?.shippingPaid || 0
          ).toLocaleString("en-IN")}`}
          image={rupee}
        />
      </div>
      {userData?.profile === "superAdmin" && (
        <>
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
        </>
      )}
    </PageCont>
  );
};

export default Home;
