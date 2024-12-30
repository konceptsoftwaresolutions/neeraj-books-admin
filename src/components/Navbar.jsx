import React from "react";
import { useSelector } from "react-redux";
import Sidebar, { SidebarItem } from "./Sidebar";
import { LayoutDashboard, User, Bed } from "lucide-react";
import { FaBook, FaBitbucket, FaFlag , FaStickyNote, FaSellsy, FaList , FaHeadset , FaUser , FaStar } from "react-icons/fa";
import { MdDiscount } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';



const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // Helper function to generate routes based on the role
  const getRoute = (path) => (role ? `/${role}${path}` : path);

  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          to={getRoute("/dashboard")}
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
        <SidebarItem
          icon={<MdDiscount size={20} />}
          text="Promotions / Affiliate"
          to={getRoute("/promotions")}
        />
        <SidebarItem
          icon={<RiTeamFill size={20} />}
          text="Team Members"
          to={getRoute("/teamMembers")}
        />
        <SidebarItem
          icon={<Bed size={20} />}
          text="Discount Management"
          to={getRoute("/discountmanagement")}
        />
        <SidebarItem
          icon={<FaFlag  size={20} />}
          text="Banners"
          to={getRoute("/banners")}
        />
        <SidebarItem
          icon={<FaStickyNote size={20} />}
          text="Testimonials"
          to={getRoute("/testimonials")}
        />
        <SidebarItem
          icon={<FaSellsy size={20} />}
          text="Best Seller"
          to={getRoute("/bestseller")}
        />
        <SidebarItem
          icon={<FaStar  size={20} />}
          text="Reviews & Rating"
          to={getRoute("/reviews-rating")}
        />
        <SidebarItem
          icon={<Bed size={20} />}
          text="Catelogue Management"
          to={getRoute("/cateloguemanagement")}
        />
        <SidebarItem
          icon={<FaList size={20} />}
          text="Categori"
          to={getRoute("/categori")}
        />
        <SidebarItem
          icon={<FaHeadset size={20} />}
          text="Customer"
          to={getRoute("/customer")}
        />
        <SidebarItem
          icon={<FaUser size={20} />}
          text="User"
          to={getRoute("/user")}
        />
        <hr className="my-3" />
      </Sidebar>
    </div>
  );
};

export default Navbar;
