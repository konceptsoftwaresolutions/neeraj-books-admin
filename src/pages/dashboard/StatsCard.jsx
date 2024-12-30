import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import SkeletonLayout from "../../components/layout/SkeletonLayout";

// import cap from "../../assets/cap.png";

const StatsCard = ({ title, value, growth, icon }) => {
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(true);
  }, 2000);


  return (
    <div className=" bg-PrimaryGradient  rounded-xl shadow-lg  relative space-y-1 overflow-hidden bg-gradient-to-r gap-6 bg-[#FFD700]">
      {loading ? (
        <div className="p-3 flex items-center justify-between">
          <Typography
            textGradient={true}
            variant="h6"
            className=" text-black poppins-font"
          >
            {title}
          </Typography>
          <Typography
            textGradient={true}
            variant="h6"
            className=" text-black poppins-font"
          >
            {icon}
            {/* {value || 0} */}
          </Typography>
          <Typography
            textGradient={true}
            variant="h6"
            className=" text-white poppins-font flex items-center gap-2"
          >
          </Typography>

          {/* <div className=" w-[10rem] h-[10rem] bg-opacity-20 rounded-full absolute right-0">
            <img src={cap} />
          </div> */}
        </div>
      ) : (
        <SkeletonLayout height={4} />
      )}
    </div>
  );
};

export default StatsCard;
