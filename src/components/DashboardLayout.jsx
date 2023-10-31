import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../auth";
import vector from "../assests/icons/vector.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { getUser } from "../auth";
import { HiOutlineUser, HiOutlineMenu } from "react-icons/hi";
const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = getUser();
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const logout = (e) => {
    e.preventDefault();
    navigate("/logout");
    logoutUser();
  };
  return (
    <main className="relative">
      <div className="bg-white p-4 flex items-center  justify-between">
        <div className="flex items-center">
          <h1>Logo</h1>

          {/* Hamburger menu button for small screens */}
          <button
            className="ml-4 text-[#FB7E13] md:hidden"
            onClick={toggleSidebar}
          >
            <HiOutlineMenu size={24} />
          </button>
        </div>

        {/* Search bar (visible on medium and larger screens) */}
        <div className="hidden md:flex items-center flex-1">
          <div className="relative w-[50%] m-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#FB7E13]"
            />
            <button className="absolute right-0 top-0 m-2 ">
              <AiOutlineSearch color="#FB7E13" size={24} />
            </button>
          </div>
        </div>

        {user.user.profilePicture ? (
          <NavLink to="/profile">
            <img
              className="w-[60px]  mx-auto h-[55px] border border-[2px] rounded-[100%]"
              src={user.user.profilePicture}
              alt=""
            />
          </NavLink>
        ) : (
          <NavLink to="/profile" className="text-[#FB7E13]">
            <HiOutlineUser size={30} />
          </NavLink>
        )}
      </div>
      <hr />

      {/* mobile Side Navigation */}
      <div className="flex">
        <div
          className={`${
            isSidebarOpen ? "left-0 md:left-0 " : "left-[-80%] md:left-0"
          } block md:hidden my-2 mx-2 bg-white w-[65%] h-[60vh] rounded-xl  font-400 text-[16px] absolute transition-transform ease-in-out duration-300`}
        >
          <ul>
            <li className="mb-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2  border-l-[#FB7E13] border-l-2 bg-[#FFF5E5] text-[#FB7E13] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" /> Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/items"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2  border-l-[#FB7E13] border-l-2 bg-[#FFF5E5] text-[#FB7E13] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" />
                Items Found
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2  border-l-[#FB7E13] border-l-2 bg-[#FFF5E5] text-[#FB7E13] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" /> Report Lost Item
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/claimed"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2  border-l-[#FB7E13] border-l-2 bg-[#FFF5E5] text-[#FB7E13] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" />
                Claimed Items
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                onClick={logout}
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2  border-l-[#FB7E13] border-l-2 bg-[#FFF5E5] text-[#FB7E13] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" />
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        {/*desktop view side navigation*/}
        <div
          className={`mt-5 mb-10 hidden md:block bg-white md:w-[30%] font-400 text-[16px] text-[#5F5F5FC2] h-screen absolute md:relative transition-transform ease-in-out duration-300`}
        >
          <ul className="mt-10">
            <li className="mb-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2 bg-[#50898926] text-[#1C1C1CF7] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" /> Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/items"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2 bg-[#50898926] text-[#1C1C1CF7] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" />
                Items Found
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2 bg-[#50898926] text-[#1C1C1CF7] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" /> Report Lost Item
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/claimed"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2 bg-[#50898926] text-[#1C1C1CF7] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" /> Claimed Items
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                onClick={logout}
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 w-full p-2  bg-[#50898926] text-[#1C1C1CF7] font-bold my-5"
                    : "flex gap-3 w-full my-5 p-2"
                }
              >
                <img src={vector} alt="" />
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Main Content */}
        <div className="bg-[#FFFFFF] p-3  w-[100%]">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
