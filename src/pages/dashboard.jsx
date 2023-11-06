import React from "react";
import LostItems from "../components/LostItems";
import requireAuth from "../requireAuth";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { getUser } from "../auth";
import DashboardLayout from "../components/DashboardLayout";
import Stats from "../components/Stats";
const dashboard = () => {
  const user = getUser();
  return (
    <DashboardLayout>
      <div className="flex justify-between mt-8 ">
        <div className="mb-10 mx-5">
          <h1 className="my-2">
            Hey there, &nbsp;
            <span className="text-primary font-bold text-lg">
              {user.user.userName ? user.user.userName : user.user.name}
            </span>
          </h1>
          <p className="font-semibold text-gray-800">Welcome to Reclaim Hub,</p>
          <small>Your One-Stop Solution for Reuniting with Lost Items</small>
        </div>
        <div className="md:w-[15%] w-[25%]">
          <NavLink
            className="bg-primary text-center text-white  transition-all hover:bg-[#FB7E13]/80  transform hover:scale-105  flex justify-center gap-1 rounded-xl w-full py-4 my-5 p-5"
            to="/report"
          >
            <IoMdAdd size={20} color="white" /> Report
          </NavLink>
        </div>
      </div>
      <div className="md:w-[35%] w-[45%] m-5">
        <NavLink
          className="bg-primary text-center text-white  transition-all hover:bg-[#FB7E13]/80  transform hover:scale-105  flex justify-center gap-1 rounded-xl w-full py-4 my-5 p-5"
          to="/items"
        >
          View Lost Items
        </NavLink>
      </div>
      <Stats />
    </DashboardLayout>
  );
};
export default requireAuth(dashboard);
