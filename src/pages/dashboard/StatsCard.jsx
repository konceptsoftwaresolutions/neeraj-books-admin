import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

const StatsCard = ({ firstTitle, firstAmount, secondTitle, secondAmount }) => {
  const { dashboardLoader } = useSelector((state) => state.dashboard);

  return (
    <div className="rounded-xl shadow-lg bg-gradient-to-r bg-[#FFD700] p-3 flex flex-col gap-2">
      {firstTitle && (
        <p className="m-0 text-base font-semibold flex items-center gap-2">
          {firstTitle} -{" "}
          {dashboardLoader ? (
            <Skeleton.Input active size="small" style={{ width: 30 }} />
          ) : (
            <span>{firstAmount}</span>
          )}
        </p>
      )}
      {secondTitle && (
        <p className="m-0 text-base font-semibold flex items-center gap-2">
          {secondTitle} -{" "}
          {dashboardLoader ? (
            <Skeleton.Input active size="small" style={{ width: 30 }} />
          ) : (
            <span>{secondAmount}</span>
          )}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
