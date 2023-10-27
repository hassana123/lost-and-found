import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      <div className="bg-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1>Logo</h1>
          {/* Hamburger menu button for small screens */}
          <button
            className="ml-4 text-blue-500 md:hidden"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>
        <NavLink to="/profile" className="text-blue-500">
          Profile
        </NavLink>
      </div>

      {/* Side Navigation */}
      <div className="flex">
        <div
          className={`${
            isSidebarOpen ? "left-0 md:left-0 " : "left-[-80%] md:left-0"
          } bg-gray-900 text-white p-4 h-screen absolute md:relative sm:w-[30%] transition-transform ease-in-out duration-300`}
        >
          <ul>
            <li className="mb-2">
              <NavLink
                to="/dashboard"
                className="block text-white hover:text-blue-500"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/items"
                className="block text-white hover:text-blue-500"
              >
                Items Found
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/report"
                className="block text-white hover:text-blue-500"
              >
                Report Lost Item
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/claimedItems"
                className="block text-white hover:text-blue-500"
              >
                Claimed Items
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="bg-gray-100 p-4 rounded-lg md:ml-1/6 w-[100%] md:w-[70%] ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
