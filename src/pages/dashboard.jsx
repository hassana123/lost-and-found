import React from "react";
import LostItems from "../components/LostItems";
import requireAuth from "../requireAuth";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import DashboardLayout from "../components/DashboardLayout";
import Stats from "../components/Stats";
const dashboard = () => {
  return (
    <DashboardLayout>
      <div className="w-[15%] mx-auto float-right">
        <NavLink
          className="bg-primary text-center text-white hover:bg-[#FB7E13]  transition-all hover:bg-[#FB7E13] transition-transform transform hover:scale-105  flex justify-center gap-[2px] rounded-xl w-full py-4 my-5"
          to="/report"
        >
          <IoMdAdd size={22} color="white" /> Report
        </NavLink>
      </div>
      <LostItems />
      <Stats />
    </DashboardLayout>
  );
};
export default requireAuth(dashboard);
