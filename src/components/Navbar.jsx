import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar, { SidebarItem } from "./Sidebar";
import { LayoutDashboard } from "lucide-react";
import {
  FaBook,
  FaBitbucket,
  FaFlag,
  FaStickyNote,
  FaSellsy,
  FaList,
  FaHeadset,
  FaUser,
  FaStar,
} from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { TbAlignBoxRightTopFilled } from "react-icons/tb";
import { MdDiscount, MdQuiz } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

import { IoIosArrowDown } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsFillGrid1X2Fill } from "react-icons/bs";

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const { menuExpanded } = useSelector((state) => state.books);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const getRoute = (path) => (role ? `/${role}${path}` : path);

  return (
    <div className="flex h-screen sticky top-0">
      <Sidebar>
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
          icon={<FaBitbucket size={20} />}
          text="Orders"
          to={getRoute("/orders")}
        />

        {/* Custom Website Settings Dropdown */}
        <div className="w-full">
          <button
            onClick={() => setShowSettingsDropdown((prev) => !prev)}
            className="flex items-center w-full  dark:hover:bg-gray-700 text-left relative"
          >
            <span className="absolute right-7">
              {showSettingsDropdown ? (
                <>{menuExpanded ? <IoIosArrowDown color="white" /> : null}</>
              ) : (
                <>{menuExpanded ? <IoIosArrowUp color="black" /> : null}</>
              )}
            </span>
            <div
              className={`${
                showSettingsDropdown
                  ? "primary-gradient !text-white rounded-md"
                  : ""
              }`}
            >
              <div className="flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group  hover:bg-[#1f437f0d] ">
                <IoSettings size={20} />
                {menuExpanded ? (
                  <>
                    <span
                      className={`overflow-hidden transition-all w-52 ml-3`}
                    >
                      Website Settings
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </button>

          {showSettingsDropdown && (
            <div className="bg-gray-200 py-2">
              <div className="ml-4 w-[90%]  mx-auto">
                <SidebarItem text="About Page" to={getRoute("/about")} />
                <SidebarItem text="Popups" to={getRoute("/popups")} />
                <SidebarItem text="Quiz" to={getRoute("/quiz")} />
                {/* <SidebarItem text="Combo Offers" to={getRoute("/combos")} /> */}
                <SidebarItem text="Coupons" to={getRoute("/coupons")} />
                <SidebarItem
                  text="Abandoned Cart"
                  to={getRoute("/abandonedcart")}
                />
                <SidebarItem
                  text="Promotions / Affiliate"
                  to={getRoute("/promotions")}
                />
                <SidebarItem
                  text="Team Members"
                  to={getRoute("/teamMembers")}
                />
                <SidebarItem
                  // icon={<FaBitbucket size={20} />}
                  text="Old Website Books"
                  to={getRoute("/oldbooks")}
                />
                {/* <SidebarItem text="Banners" to={getRoute("/banners")} /> */}
                <SidebarItem
                  text="Testimonials"
                  to={getRoute("/testimonials")}
                />
                <SidebarItem
                  text="All Bulk Orders"
                  to={getRoute("/allbulkOrders")}
                />
                {/* <SidebarItem
                  text="Bulk Orders"
                  to={getRoute("/addbulkOrders")}
                /> */}
                <SidebarItem
                  text="Bulk Orders Client"
                  to={getRoute("/bulk-orders-client")}
                />
                {/* <SidebarItem text="Best Seller" to={getRoute("/bestseller")} /> */}
                {/* <SidebarItem
                  text="Reviews & Rating"
                  to={getRoute("/reviews-rating")}
                /> */}

                {/* <SidebarItem text="User" to={getRoute("/user")} /> */}
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

        <hr className="my-3" />
      </Sidebar>
    </div>
  );
};

export default Navbar;
