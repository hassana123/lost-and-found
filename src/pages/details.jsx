import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc, // Change deleteDoc to setDoc
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../firebase";
import requireAuth from "../requireAuth";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getUser } from "../auth";
import icon from "../assests/icons/location.svg";
import calender from "../assests/icons/calender.svg";
import clock from "../assests/icons/clock.svg";

function LostItemDetails() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConnectingMessage, setShowConnectingMessage] = useState(false);

  const { id } = useParams();
  const user = getUser();

  const handleClaimItem = async () => {
    try {
      setShowConnectingMessage(true);

      const itemDocRef = doc(firestore, "lostItems", id);
      const itemDoc = await getDoc(itemDocRef);

      if (itemDoc.exists()) {
        const itemData = itemDoc.data();

        // Check if the item is already claimed
        if (itemData.claimed) {
          // Item is already claimed, handle accordingly (e.g., show a message)
          console.log("Item is already claimed");
        } else {
          // Item is not claimed, proceed to claim it

          // Create a new document in "claimedItems" collection
          const claimedItemsCollection = collection(firestore, "claimedItems");
          const claimTimestamp = Timestamp.now();

          const claimData = {
            ...itemData,
            claimedBy: user.user.name,
            claimedAt: claimTimestamp,
          };

          await addDoc(claimedItemsCollection, claimData);

          // Mark the item as claimed by updating the "claimed" field
          await setDoc(itemDocRef, { claimed: true }, { merge: true });

          // Update the local item data to reflect the claim
          setItem({ ...itemData, claimed: true });

          // Show the "Connecting to WhatsApp" message and schedule the redirect
          setShowConnectingMessage(true);
          setTimeout(() => {
            setShowConnectingMessage(false);
            window.location.href = `https://wa.me/${user.phone}`;
          }, 5000); // 5000 milliseconds (5 seconds)
        }
      }
    } catch (error) {
      console.error("Error claiming item:", error);
    }
  };

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
      <div className="container mx-auto text-[#1C1C1C] p-4">
        <h1 className="text-2xl font-semibold mb-4">Item Details</h1>

        {loading ? (
          <p>Loading...</p>
        ) : item ? (
          <div className=" w-[70%]">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="mb-4 flex gap-2">
              <img src={icon} alt="" /> {item.location}
            </p>
            <p>
              <img src="" alt="" />
              {item.claimed ? "claimed Item " : "unclaimed item"}
            </p>
            <img
              className="w-[50%] h-[30vh] my-5"
              src={item.image}
              alt={item.name}
            />
            <h5 className="font-semibold">Description</h5>
            <p className="">{item.desc}</p>
            <div className="my-10 flex items-center justify-between">
              <div>
                <h5 className="font-semibold">Found On</h5>
                <small className="flex gap-3 my-2">
                  <img src={calender} alt="" /> {item.date}
                </small>
              </div>
              <div>
                <h5 className="font-semibold">Found At</h5>
                <small className="flex gap-3 my-2">
                  <img src={clock} alt="" /> {item.time}
                </small>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-[1.2rem] text-center py-4 bg-primary text-white rounded-md py-2"
              onClick={handleClaimItem}
              disabled={item.claimed} // Disable the button if the item is claimed
            >
              {item.claimed ? "Item Claimed" : "Claim Item"}
            </button>
            {showConnectingMessage ? (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 p-4 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                  <img src="" alt="" />
                  <p className="py-2">Connecting to WhatsApp...</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <p>Item not found</p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default requireAuth(LostItemDetails);
