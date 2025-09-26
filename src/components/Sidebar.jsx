import React, { useState, createContext, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
  Package,
  ShoppingCart,
  BarChart3,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  List,
  Book,
  // UserGroup,
  Grid3X3,
  Truck,
  Boxes,
  UserCheck,
  FileQuestion,
  Percent,
  Gift,
  // ShoppingCartX,
  Share,
  BookOpen,
  MessageSquare,
  Layers,
  Star,
} from "lucide-react";
import logo from "../assets/logo.png";
import logo1 from "../assets/orders.png";
import logo2 from "../assets/incomplete.png";
import logo3 from "../assets/bulkorder.png";
import { logoutThunkMiddleware } from "../redux/features/user";
import { persistor } from "../redux/store";
import { Tooltip } from "antd";

const SidebarContext = createContext();

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed by default
  const [expandedMenus, setExpandedMenus] = useState({});

  const getRoute = (path) => (role ? `/${role}${path}` : path);

  const logoutHandler = () => {
    dispatch(logoutThunkMiddleware(persistor, navigate));
  };

  const toggleMenu = (menuKey) => {
    if (isCollapsed) return; // Don't expand menus when collapsed
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // Close all expanded menus when collapsing
    if (!isCollapsed) {
      setExpandedMenus({});
    }
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: getRoute("/dashboard"),
      show: role !== "user",
    },
    {
      key: "category",
      icon: <List size={20} />,
      label: "Category",
      path: getRoute("/categori"),
    },
    {
      key: "books",
      icon: <Book size={20} />,
      label: "Books",
      path: getRoute("/books"),
    },
    {
      key: "orders",
      icon: <img src={logo1} alt="Orders" className="w-5 h-6" />,
      label: "Orders",
      path: getRoute("/orders"),
    },
    {
      key: "incompleteOrders",
      icon: <img src={logo2} alt="Orders" className="w-5 h-5" />,
      label: "Incomplete Orders",
      path: getRoute("/incomplete-orders"),
    },
    {
      key: "bulkOrders",
      icon: <img src={logo3} alt="Orders" className="w-5 h-5" />,
      label: "Bulk Orders",
      children: [
        {
          label: "All Bulk Orders",
          path: getRoute("/allbulkOrders"),
          icon: <Package size={16} />,
        },
        { label: "Bulk Orders Client", path: getRoute("/bulk-orders-client") },
      ],
    },
    {
      key: "websiteSettings",
      icon: <Settings size={20} />,
      label: "Website Settings",
      children: [
        {
          label: "About Page",
          path: getRoute("/about"),
          icon: <FileText size={16} />,
        },
        {
          label: "Popups",
          path: getRoute("/popups"),
          icon: <Layers size={16} />,
        },
        {
          label: "Quiz",
          path: getRoute("/quiz"),
          icon: <FileQuestion size={16} />,
        },
        {
          label: "Coupons",
          path: getRoute("/coupons"),
          icon: <Gift size={16} />,
        },
        {
          label: "Abandoned Cart",
          path: getRoute("/abandonedcart"),
          icon: <ShoppingCart size={16} />,
        },
        {
          label: "Promotions / Affiliate",
          path: getRoute("/promotions"),
          icon: <Share size={16} />,
        },
        {
          label: "Team Members",
          path: getRoute("/teamMembers"),
          icon: <Users size={16} />,
        },
        {
          label: "Old Website Books",
          path: getRoute("/oldbooks"),
          icon: <BookOpen size={16} />,
        },
        {
          label: "Testimonials",
          path: getRoute("/testimonials"),
          icon: <MessageSquare size={16} />,
        },
      ],
    },
    {
      key: "customer",
      icon: <UserCheck size={20} />,
      label: "Customer",
      path: getRoute("/customer"),
    },
    {
      key: "manageSections",
      icon: <Grid3X3 size={20} />,
      label: "Manage Sections",
      path: getRoute("/sections"),
    },
    {
      key: "shippingCalculator",
      icon: <Truck size={20} />,
      label: "Shipping Calculator",
      path: getRoute("/shipping"),
    },
  ];

  const SidebarItem = ({ item, isChild = false }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus[item.key];

    if (hasChildren) {
      return (
        <div className="mb-1">
          {isCollapsed ? (
            <Tooltip title={item.label} placement="right">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-12 h-12 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 cursor-pointer">
                  {item.icon}
                </div>
              </div>
            </Tooltip>
          ) : (
            <button
              onClick={() => toggleMenu(item.key)}
              className={`w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 ${
                isChild ? "pl-12 text-sm" : ""
              }`}
            >
              <div className="flex items-center text-black">
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}

          {!isCollapsed && isExpanded && (
            <div className="mt-1 space-y-1 bg-gray-50 rounded-lg p-2">
              {item.children.map((child, index) => (
                <NavLink
                  key={index}
                  to={child.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center pl-8 pr-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? {
                          background:
                            "linear-gradient(90deg, #1f437f, #be2220)",
                          color: "white",
                        }
                      : {}
                  }
                >
                  {child.icon && <span className="mr-2">{child.icon}</span>}
                  <div className="w-2 h-2 rounded-full bg-current opacity-40 mr-3"></div>
                  {child.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mb-1">
        {isCollapsed && !isOpen ? ( // collapsed AND not mobile
          <Tooltip title={item.label} placement="right">
            <NavLink
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 mx-auto ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-black hover:bg-blue-50 hover:text-blue-600"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { background: "linear-gradient(90deg, #1f437f, #be2220)" }
                  : {}
              }
            >
              {item.icon}
            </NavLink>
          </Tooltip>
        ) : (
          <NavLink
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-white shadow-lg"
                  : "text-black hover:bg-blue-50 hover:text-blue-600"
              } ${isChild ? "pl-12 text-sm" : ""}`
            }
            style={({ isActive }) =>
              isActive
                ? { background: "linear-gradient(90deg, #1f437f, #be2220)" }
                : {}
            }
          >
            {item.icon}
            <span className="ml-3 font-medium">{item.label}</span>{" "}
            {/* label shows now */}
          </NavLink>
        )}
      </div>
    );
  };

  // const sidebarWidth = isCollapsed ? "w-20" : "w-72";
  const sidebarWidth = isCollapsed && !isOpen ? "w-20" : "w-72";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-30">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Logo" className="h-8" />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50
        ${sidebarWidth} bg-white border-r border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col
      `}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } px-6 py-5 border-b border-gray-200`}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-8 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
          )}

          {isCollapsed && <img src={logo} alt="Logo" className="h-8 w-8" />}

          {/* Desktop Collapse Toggle */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={toggleCollapse}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              if (item.show === false) return null;
              return <SidebarItem key={item.key} item={item} />;
            })}
          </div>

          {!isCollapsed && <hr className="my-6 border-gray-200" />}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          {isCollapsed && !isOpen ? (
            <div className="flex justify-center">
              <Tooltip
                title={`${userData?.name || "Admin User"} - Logout`}
                placement="right"
              >
                <button
                  onClick={logoutHandler}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold hover:opacity-80 transition-all duration-200"
                  style={{
                    background: "linear-gradient(90deg, #1f437f, #be2220)",
                  }}
                >
                  {userData?.name?.charAt(0)?.toUpperCase() || "A"}
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{
                    background: "linear-gradient(90deg, #1f437f, #be2220)",
                  }}
                >
                  {userData?.name?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userData?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData?.email || ""}
                  </p>
                </div>
              </div>
              <Tooltip title="Logout" placement="top">
                <button
                  onClick={logoutHandler}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <LogOut size={16} />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Spacer for Desktop */}
      <div className={`${sidebarWidth} flex-shrink-0 hidden lg:block`}></div>
    </>
  );
};

export default Sidebar;
