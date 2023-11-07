import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc, // Change deleteDoc to setDoc
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
import { FaCheckCircle } from "react-icons/fa";
import rec from "../assests/icons/rec.svg";
import connect from "../assests/images/connect.png";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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

        // Check if the item is pending
        if (itemData.claimed === "pending") {
          // Item is already claimed, handle accordingly (e.g., show a message)
          console.log("Item is pending");
        } else {
          // Item is not claimed, proceed to claim it

          // Create a new document in "claimedItems" collection
          const claimedItemDocRef = doc(firestore, "claimedItems", id);
          const claimTimestamp = Timestamp.now();
          const claimData = {
            ...itemData,
            claimed: "pending",
            claimedByUserId: user.userId,
            claimedBy: user.user.name,
            claimedAt: claimTimestamp,
          };

          await setDoc(claimedItemDocRef, claimData);
          // Mark the item as pending by updating the "claimed" field
          await setDoc(itemDocRef, { claimed: "pending" }, { merge: true });

          // Update the local item data to reflect the claim
          setItem({ ...itemData, claimed: "pending" });

          setShowConnectingMessage(true);

          setTimeout(() => {
            let message = `Hello ${itemData.seekerName}`;
            let phone = itemData.seekerPhone;

            // Check if the phone number starts with '0' and remove it
            if (phone.charAt(0) === "0") {
              phone = phone.substring(1);
            }

            // Ensure the phone number has 10 digits
            if (phone.length === 10) {
              setShowConnectingMessage(false);

              const whatsappURL = `https://wa.me/234${phone}?text=${message}`;

              window.open(whatsappURL, "_blank");
            } else {
              // Handle invalid phone number (e.g., show an error message)
              console.log("Invalid phone number");
            }
          }, 6000);
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
        <NavLink className="float-right " to="/dashboard">
          <FaArrowLeft />
        </NavLink>
        {loading ? (
          <p>Loading...</p>
        ) : item ? (
          <div className=" md:w-[70%]  w-[90]">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="mb-4 flex gap-2">
              <img src={icon} alt="" /> {item.location}
            </p>
            <p>
              <img src="" alt="" />
              {item.claimed == "pending" ? (
                <small className="flex gap-2 ">
                  <img src={rec} alt="" /> pending
                </small>
              ) : item.claimed === true ? (
                <small className=" my-1 flex gap-2">
                  <FaCheckCircle size={15} color="#0a032a" />
                  Claimed
                </small>
              ) : (
                <small className="flex gap-2">
                  <img src={rec} alt="" /> unclaimed
                </small>
              )}
            </p>
            <img
              className="md:w-[60%] w-[100%] h-[30vh] my-5"
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
              disabled={item.claimed == "pending" || item.claimed === true} // Disable the button if the item is claimed
            >
              {item.claimed === "pending"
                ? "Pending Claim"
                : item.claimed === true
                ? "Item Claimed"
                : "Claim Item"}
            </button>
            {showConnectingMessage ? (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 py-10 px-5 bg-white rounded-lg shadow-xl md:w-[30%] w-[70%]">
                <div className="text-center">
                  <img className="mx-auto " src={connect} alt="" />
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
