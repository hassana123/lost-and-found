import React, { useState, useEffect } from "react";
import requireAuth from "../requireAuth";
import DashboardLayout from "../components/DashboardLayout";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function ClaimedItems() {
  const [claimedItems, setClaimedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaimedItems = async () => {
      try {
        const claimedItemsCollection = collection(firestore, "claimedItems");
        const q = query(
          claimedItemsCollection,
          // Filter items where claimed is true
          orderBy("claimedAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        const claimedItems = items.filter((item) => item.claimed === true);
        setClaimedItems(claimedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching claimed items:", error);
        setLoading(false);
      }
    };

    fetchClaimedItems();
  }, [claimedItems]);
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp.toDate()); // Convert the Firestore timestamp to a JavaScript Date object
    return date.toLocaleString(); // You can adjust the format as needed
  }

  return (
    <DashboardLayout>
      <NavLink className="float-right my-5" to="/dashboard">
        <FaArrowLeft />
      </NavLink>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-secondary mb-4">
          Claimed Items
        </h1>

        {loading ? (
          <p className="loader">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {claimedItems.map((item) => (
              <div key={item.id} className="w-[100%] rounded-xl shadow-md">
                <img
                  className="w-[100%] rounded-tl-xl rounded-tr-xl h-[25vh]"
                  src={item.image}
                  alt={item.name}
                />

                <div className="p-3  bg-[#FCA31126] text-[#1C1C1CF7]">
                  <div>
                    <h2 className="text-xl my-2 font-semibold">{item.name}</h2>
                  </div>
                  <div className="flex gap-[3px]">
                    <p>Claimed By:</p>
                    <small className="text-[16px]">{item.claimedBy}</small>
                  </div>
                  <div className="flex gap-[3px]">
                    <p>Claimed At:</p>
                    <small className="text-[16px]">
                      {formatTimestamp(item.claimedAt)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default requireAuth(ClaimedItems);
