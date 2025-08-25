import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

const StatsCard = ({
  profile,
  firstTitle,
  firstAmount,
  secondTitle,
  secondAmount,
  icon: Icon,
  image,
}) => {
  const { dashboardLoader } = useSelector((state) => state.dashboard);
  // console.log(typeof secondAmount, parseFloat(secondAmount), secondAmount);

  return (
    <div className=" border-l-[5px] shadow-lg rounded-lg border-[#2b4063] p-4 py-5 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 min-h-max w-full">
      {/* Image/Icon Section */}
      {image && (
        <img
          src={image}
          alt="stats"
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain "
        />
      )}

      {/* Text Content */}
      <div className="flex flex-col justify-start items-start w-full">
        {firstTitle && (
          <p className="m-0 text-sm sm:text-base font-semibold  gap-2 text-black">
            {firstTitle}
            {dashboardLoader ? (
              <Skeleton.Input active size="small" style={{ width: 30 }} />
            ) : (
              <span>- {firstAmount}</span>
            )}
          </p>
        )}

        {secondTitle && profile != "staff" && (
          <p className="m-0 text-sm sm:text-base  font-semibold   gap-2 text-black">
            {secondTitle}
            {dashboardLoader ? (
              <Skeleton.Input active size="small" style={{ width: 30 }} />
            ) : (
              <span>
                -<span className="px-1">₹</span>
                {Math.round(
                  parseFloat(secondAmount.replace(/[^0-9.-]/g, ""))
                ).toLocaleString("en-IN")}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
