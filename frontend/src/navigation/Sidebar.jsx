import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { closeSidebar, toggleSidebar } from "../redux/slices/navSlices";

const Sidebar = ({ links }) => {
  const { isCollapsed } = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const pathname = useLocation().pathname;

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (window.innerWidth < 526) {
      dispatch(closeSidebar());
    }
  }, [dispatch, pathname]);

  return (
    <aside
      className={`bg-amber-600 shadow ${
        isCollapsed ? "w-collapse" : "w-not-collapse"
      } ${
        isCollapsed ? "z-0" : "absolute z-40"
      } md:relative md:z-0 h-screen overflow-y-scroll scrollbar-hide left-0 top-0 transition-all duration-300 ease-in-out`}
      ref={ref}
    >
      <div className='sticky top-0 bg-slate-50 border-b-2 border-r-2 p-2 flex gap-4'>
        <div className='h-16 flex items-center justify-center text-xl'>
          {!isCollapsed && (
            <h6 className='text-yellow-400 font-semibold'>DASHBOARD</h6>
          )}
          <div
            className={`h-8 w-12 flex justify-center items-center cursor-pointer text-yellow-400 `}
            onClick={handleSidebar}
          >
            {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </div>
        </div>
      </div>
      {/* Sidebar Content */}
      <div className='px-1 pb-4 mb-8'>
        <ul className='mt-4'>
          {links.map((link) => {
            const { id, url, iconClass, title } = link;
            return (
              <li key={id}>
                <Link
                  to={`${url}`}
                  className={`text-white w-full p-3 capitalize ${
                    !isCollapsed &&
                    "hover:bg-slate-100 hover:text-gray-700 hover:rounded"
                  } flex gap-2 items-center ${
                    isCollapsed ? "text-xl" : "rounded-xl"
                  }`}
                >
                  {/* <i
                    className={`${iconClass} mr-2 my-auto ${
                      isCollapsed ? "py-2" : "mr-2 text-base"
                    }`}
                  ></i>{" "} */}
                  {iconClass}
                  {!isCollapsed && <h6 className='my-auto'>{title}</h6>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Collapse/Expand Button */}
      <div
        className={`fixed border-t-2 bottom-0 flex items-center justify-center cursor-pointer text-white bg-amber-600 py-2 transition-all duration-300 ease-in-out ${
          isCollapsed ? "text-xl w-collapse" : "hover:text-gray-800 w-48"
        }`}
        onClick={handleLogout}
      >
        <i
          className={`fas fa-sign-out-alt mr-2 ${
            isCollapsed ? "text-2xl" : "mr-2 text-base"
          }`}
        ></i>{" "}
        {/* Icon */}
        {!isCollapsed && "Logout"}
      </div>
    </aside>
  );
};

export default Sidebar;
