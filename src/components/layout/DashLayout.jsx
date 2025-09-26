import React from "react";

// import TopNavbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
// import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const DashLayout = () => {
  return (
    <>
      <div className="flex">
        <div className="test border-r ">
          <Sidebar />
        </div>
        <div className="w-full overflow-auto ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashLayout;
