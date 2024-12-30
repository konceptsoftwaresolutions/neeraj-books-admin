import React from "react";

// import TopNavbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const DashLayout = () => {
  return (
    <>
      <div className="flex">
        <div className="test border-r "  >
          <Navbar />
        </div>
        <div className="w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashLayout;
