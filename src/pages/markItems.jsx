import React, { useState, useEffect } from "react";
import requireAuth from "../requireAuth";
import DashboardLayout from "../components/DashboardLayout";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";
import { getUser } from "../auth";
import icon from "../assests/icons/location.svg";

const MarkItems = () => {
  const { userId } = getUser();
  const [pendingItems, setPendingItems] = useState([]);
  const [claimedItems, setClaimedItems] = useState([]);
  const [unclaimedItems, setUnclaimedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsRef = collection(firestore, "lostItems");
        const q = query(itemsRef, where("seekerId", "==", userId));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });

        // Separate items by claimed status
        const pending = items.filter((item) => item.claimed === "pending");
        const claimed = items.filter((item) => item.claimed === true);
        const unclaimed = items.filter(
          (item) => item.claimed !== "pending" && item.claimed !== true
        );

        setPendingItems(pending);
        setClaimedItems(claimed);
        setUnclaimedItems(unclaimed);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, [userId]);

  const handleMark = async (itemId) => {
    try {
      const lostItemDocRef = doc(firestore, "lostItems", itemId);
      const claimedItemDocRef = doc(firestore, "claimedItems", itemId);

      await updateDoc(lostItemDocRef, {
        claimed: true,
      });

      await updateDoc(claimedItemDocRef, {
        claimed: true,
      });

      // Set the local item data to reflect the changes
      setPendingItems(pendingItems.filter((item) => item.id !== itemId));

      // Add the item to claimed items
      setClaimedItems([
        ...claimedItems,
        pendingItems.find((item) => item.id === itemId),
      ]);
    } catch (error) {
      console.error("Error marking item as claimed:", error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-primary text-[1.2rem] font-bold my-5 mx-2">
        Items Reported by You
      </h1>
      <p>
        <small className="font-bold text-secondary mx-2 my-5 flex">
          If a user has contacted you and the item has been claimed, please
          ensure that you mark the item as claimed in a timely manner.
        </small>
      </p>
      <div>
        <h2 className="text-primary font-semibold my-5 mx-2">Pending Items</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="w-[70%] md:w-[50%] mx-auto my-5 bg-[#FCA31126] rounded-xl shadow-md"
              >
                <img
                  className="w-full rounded-tl-xl rounded-tr-xl h-[20vh]"
                  src={item.image}
                  alt={item.name}
                />

                <div className="px-3 text-[#1C1C1CF7] py-5">
                  <h2 className="text-capitalize text-lg my-2 font-semibold">
                    {item.name}
                  </h2>

                  <div className="flex gap-1">
                    <img src={icon} alt="location icon" />
                    <p className="text-gray-600 ">{item.location}</p>
                  </div>
                  <div className="flex gap-2 my-5">
                    <p>status:</p>
                    <small className="my-1">Pending</small>
                  </div>

                  <div className="flex justify-between m-5">
                    <label>
                      <input
                        className="m-2"
                        type="checkbox"
                        onChange={() => handleMark(item.id)}
                      />
                      Mark as Claimed
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div>
        <h2 className="text-primary font-semibold my-5 mx-2">Claimed Items</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {claimedItems.map((item) => (
              <div
                key={item.id}
                className="w-[80%] md:w-[50%] mx-auto my-5 bg-[#FCA31126] rounded-xl shadow-md"
              >
                <img
                  className="w-full rounded-tl-xl rounded-tr-xl h-[20vh]"
                  src={item.image}
                  alt={item.name}
                />

                <div className="px-3 text-[#1C1C1CF7] py-5">
                  <h2 className="text-capitalize text-lg my-2 font-semibold">
                    {item.name}
                  </h2>

                  <div className="flex gap-1">
                    <img src={icon} alt="location icon" />
                    <p className="text-gray-600 ">{item.location}</p>
                  </div>
                  <div className="flex gap-2 my-5">
                    <p>status:</p>
                    <small className=" my-1 flex gap-2">
                      Claimed <FaCheckCircle size={15} color="#0a032a" />
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div>
        <h2 className="text-primary font-semibold my-5 mx-2">
          Unclaimed Items
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {unclaimedItems.map((item) => (
              <div
                key={item.id}
                className="w-[70%] md:w-[50%] mx-auto my-5 bg-[#FCA31126] rounded-xl shadow-md"
              >
                <img
                  className="w-full rounded-tl-xl rounded-tr-xl h-[20vh]"
                  src={item.image}
                  alt={item.name}
                />

                <div className="px-3 text-[#1C1C1CF7] py-5">
                  <h2 className="text-capitalize text-lg my-2 font-semibold">
                    {item.name}
                  </h2>

                  <div className="flex gap-1">
                    <img src={icon} alt="location icon" />
                    <p className="text-gray-600 ">{item.location}</p>
                  </div>
                  <div className="flex gap-2 my-5">
                    <p>status:</p>
                    <small className="my-1 flex gap-2">UnClaimed</small>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default requireAuth(MarkItems);
