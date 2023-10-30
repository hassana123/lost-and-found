import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import requireAuth from "../requireAuth";
const claimedItems = () => {
  return (
    <DashboardLayout>
      <h1>Claimed Items</h1>
    </DashboardLayout>
  );
};

export default requireAuth(claimedItems);
