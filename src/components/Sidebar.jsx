import { ChevronFirst, ChevronLast, LogOut, Menu } from "lucide-react";
import logo from "../assets/logo.png";
import { createContext, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunkMiddleware } from "../redux/features/user";
import { persistor } from "../redux/store";
import LogoModal from "./LogoModal";
import { Tooltip } from "antd";
import { setBook } from "../redux/features/books";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  const [expanded, setExpanded] = useState(true);
  const [mobileBtnClicked, setMobileBtnClicked] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutThunkMiddleware(persistor, navigate));
  };

  return (
    <>
      <aside className="z-10 h-[100%]">
        <nav
          className={` flex flex-col justify-between bg-white border-r  mobile-nav md:relative md:left-0 absolute left-[-100%] ease-in-out duration-300 h-[100%] ${
            mobileBtnClicked ? "absolute !left-0" : ""
          }`}
        >
          <div className="sticky top-0">
            <div className="p-4 pb-2 flex justify-between items-center">
              <img
                onClick={() => setShowLogoModal(!showLogoModal)}
                src={logo}
                className={`overflow-hidden transition-all cursor-pointer ${
                  expanded ? "w-12" : "w-0"
                }`}
              />
              <button
                onClick={() => {
                  setExpanded((curr) => !curr);
                  dispatch(setBook({ menuExpanded: !expanded }));
                }}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 md:block hidden"
              >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            </div>

            <SidebarContext.Provider value={{ expanded }}>
              <ul className="flex-1 px-3 h-[66vh] overflow-y-scroll sideul">
                {children}
              </ul>
            </SidebarContext.Provider>
          </div>

          <div className="border-t flex p-3 fixed bottom-0">
            <img src={logo} className="w-10 h-10 rounded-md" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{userData?.name}</h4>
                <span className="text-xs text-gray-600">{userData?.email}</span>
              </div>
              <button
                className="p-2 rounded-md hover:bg-gray-100 flex items-center rotate-180"
                onClick={logoutHandler}
              >
                <Tooltip title="Logout">
                  <LogOut size={20} />
                </Tooltip>
              </button>
            </div>
          </div>
        </nav>
      </aside>
      <div className="w-[100vw] md:hidden flex justify-between items-center bg-white border-r shadow-sm px-3 fixed ">
        <img
          src={logo}
          className={`overflow-hidden transition-all w-[200px]`}
        />
        <button
          onClick={() => {
            console.log("Clicked");
            setMobileBtnClicked(!mobileBtnClicked);
          }}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          {/* <ChevronFirst /> */}
          <Menu />
        </button>
      </div>
      <LogoModal
        showLogoModal={showLogoModal}
        setShowLogoModal={setShowLogoModal}
      />
    </>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  to,
  dropdown,
  subItem = false,
}) {
  const { expanded } = useContext(SidebarContext);
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          dropdown
            ? "text-gray-900" // no background on hover or active if dropdown
            : isActive
            ? "primary-gradient text-white"
            : "hover:bg-[#1f437f0d] text-gray-900"
        }`
      }
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "hidden"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-gradient-to-r from-[#29A6E0] via-[#2E3494] to-[#076838] ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`z-[9] absolute left-full rounded-md px-2 py-1 ml-6 bg-gradient-to-r from-[#29A6E0] via-[#2E3494] to-[#076838] text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}
