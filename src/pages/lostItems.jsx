import LostItems from "../components/LostItems";
import requireAuth from "../requireAuth";
import DashboardLayout from "../components/DashboardLayout";
import React from "react";

const lostItems = () => {
  return (
    <DashboardLayout>
      <LostItems />
    </DashboardLayout>
  );
};

export default requireAuth(lostItems);
