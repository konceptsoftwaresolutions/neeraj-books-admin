import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar, { SidebarItem } from "./Sidebar";

import { LayoutDashboard } from "lucide-react";
import { FaBook, FaList } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { FaPager } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { MdQuiz } from "react-icons/md";
import { BiSolidCoupon } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { RiStackshareLine } from "react-icons/ri";
import { RiTeamFill } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { VscCodeReview } from "react-icons/vsc";
import { FaShippingFast } from "react-icons/fa";

import orderImg from "../assets/orders.png";
import bulkImg from "../assets/bulkorder.png";
import incompleteImg from "../assets/incomplete.png";

const Navbar = () => {
  const { role } = useSelector((state) => state.auth);
  const { menuExpanded } = useSelector((state) => state.books);

  const [showWebsiteSettings, setShowWebsiteSettings] = useState(false);
  const [showBulkOrders, setShowBulkOrders] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getRoute = (path) => (role ? `/${role}${path}` : path);

  // Close mobile menu when clicking on sidebar items
  const handleSidebarItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex h-screen">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      >
        {role !== "user" && (
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            to={getRoute("/dashboard")}
          />
        )}

        <SidebarItem
          icon={<FaList size={20} />}
          text="Category"
          to={getRoute("/categori")}
        />
        <SidebarItem
          icon={<FaBook size={20} />}
          text="Books"
          to={getRoute("/books")}
        />
        <SidebarItem
          // icon={<FaBitbucket size={20} />}
          imgLink={orderImg}
          text="Orders"
          to={getRoute("/orders")}
        />
        <SidebarItem
          // icon={<FaBitbucket size={20} />}
          imgLink={incompleteImg}
          text="Incomplete Orders"
          to={getRoute("/incomplete-orders")}
        />

        {/* Bulk Orders Dropdown */}
        <div className="w-full">
          <button
            onClick={() => setShowBulkOrders((prev) => !prev)}
            className="flex items-center w-full text-left relative"
          >
            <span className="absolute right-7">
              {menuExpanded &&
                (showBulkOrders ? (
                  <IoIosArrowDown color="white" />
                ) : (
                  <IoIosArrowUp color="black" />
                ))}
            </span>
            <div
              className={
                showBulkOrders ? "primary-gradient !text-white rounded-md" : ""
              }
            >
              <div className="flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-[#1f437f0d]">
                {/* <FaBitbucket size={20} /> */}
                <img src={bulkImg} className="w-7" />
                {menuExpanded && (
                  <span className="overflow-hidden transition-all w-52 ml-3">
                    Bulk Order
                  </span>
                )}
              </div>
            </div>
          </button>

          {showBulkOrders && (
            <div className="bg-gray-200 py-2">
              <div className="ml-4 w-[90%] mx-auto">
                <SidebarItem
                  text="All Bulk Orders"
                  icon={<FaBoxesStacked size={20} />}
                  to={getRoute("/allbulkOrders")}
                />
                <SidebarItem
                  text="Bulk Orders Client"
                  icon={<FaUserFriends size={20} />}
                  to={getRoute("/bulk-orders-client")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Website Settings Dropdown */}
        <div className="w-full">
          <button
            onClick={() => setShowWebsiteSettings((prev) => !prev)}
            className="flex items-center w-full text-left relative"
          >
            <span className="absolute right-7">
              {menuExpanded &&
                (showWebsiteSettings ? (
                  <IoIosArrowDown color="white" />
                ) : (
                  <IoIosArrowUp color="black" />
                ))}
            </span>
            <div
              className={
                showWebsiteSettings
                  ? "primary-gradient !text-white rounded-md"
                  : ""
              }
            >
              <div className="flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-[#1f437f0d]">
                <IoSettings size={20} />
                {menuExpanded && (
                  <span className="overflow-hidden transition-all w-52 ml-3">
                    Website Settings
                  </span>
                )}
              </div>
            </div>
          </button>

          {showWebsiteSettings && (
            <div className="bg-gray-200 py-2 overflow-hidden">
              <div className="ml-4 w-[90%] mx-auto">
                <SidebarItem
                  text="About Page"
                  to={getRoute("/about")}
                  icon={<FaPager size={20} />}
                />
                <SidebarItem
                  text="Popups"
                  to={getRoute("/popups")}
                  icon={<BiSolidOffer size={20} />}
                />
                <SidebarItem
                  text="Quiz"
                  to={getRoute("/quiz")}
                  icon={<MdQuiz size={20} />}
                />
                <SidebarItem
                  text="Coupons"
                  to={getRoute("/coupons")}
                  icon={<BiSolidCoupon size={20} />}
                />
                <SidebarItem
                  text="Abandoned Cart"
                  to={getRoute("/abandonedcart")}
                  icon={<FaCartArrowDown size={20} />}
                />
                <SidebarItem
                  text="Promotions / Affiliate"
                  to={getRoute("/promotions")}
                  icon={<RiStackshareLine size={20} />}
                />
                <SidebarItem
                  text="Team Members"
                  to={getRoute("/teamMembers")}
                  icon={<RiTeamFill size={20} />}
                />
                <SidebarItem
                  text="Old Website Books"
                  to={getRoute("/oldbooks")}
                  icon={<ImBooks size={20} />}
                />
                <SidebarItem
                  text="Testimonials"
                  to={getRoute("/testimonials")}
                  icon={<VscCodeReview size={20} />}
                />
                {/* <SidebarItem text="All Bulk Orders" to={getRoute("/allbulkOrders")} />
                <SidebarItem text="Bulk Orders Client" to={getRoute("/bulk-orders-client")} /> */}
              </div>
            </div>
          )}
        </div>

        <SidebarItem
          icon={<HiMiniUserGroup size={20} />}
          text="Customer"
          to={getRoute("/customer")}
        />
        <SidebarItem
          icon={<BsFillGrid1X2Fill size={20} />}
          text="Manage Sections"
          to={getRoute("/sections")}
        />
        <SidebarItem
          icon={<FaShippingFast size={20} />}
          text="Shipping Calculator"
          to={getRoute("/shipping")}
        />

        <hr className="my-3" />
      </Sidebar>
    </div>
  );
};

export default Navbar;
