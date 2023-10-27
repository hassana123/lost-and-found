import React from "react";
import LostItems from "../components/LostItems";
import requireAuth from "../requireAuth";
import DashboardLayout from "../components/DashboardLayout";
const dashboard = () => {
  return (
    <DashboardLayout>
      <LostItems />
      <div>DASHBOARD</div>
    </DashboardLayout>
  );
};
export default requireAuth(dashboard);
