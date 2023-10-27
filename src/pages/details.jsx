import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import requireAuth from "../requireAuth";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
function LostItemDetails(props) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemDocRef = doc(firestore, "lostItems", id);
        const itemDoc = await getDoc(itemDocRef);
        if (itemDoc.exists()) {
          setItem(itemDoc.data());
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Item Details</h1>

        {loading ? (
          <p>Loading...</p>
        ) : item ? (
          <div>
            <img src={item.image} alt={item.name} />
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">Location: {item.location}</p>
            <p className="text-gray-600 mb-4">
              Date: {item.date}, Time: {item.time}
            </p>
            <p className="text-gray-600">Description: {item.desc}</p>
            {/* Display other item details as needed */}
          </div>
        ) : (
          <p>Item not found</p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default requireAuth(LostItemDetails);
