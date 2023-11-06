import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";
import icon from "../assests/icons/location.svg";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
function LostItems() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const lostItemsCollection = collection(firestore, "lostItems");
        const q = query(lostItemsCollection, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setLostItems(items);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching lost items:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchLostItems();
  }, []);

  return (
    <>
      <NavLink className="float-right my-10" to="/dashboard">
        <FaArrowLeft />
      </NavLink>
      <div className="mt-10  mx-auto ">
        <h1 className="text-2xl font-semibold mb-10  text-secondary">
          Lost Items
        </h1>

        {loading ? (
          <p className="loader">Loading...</p>
        ) : (
          <div
            className="grid grid-cols-2
           gap-2 md:grid-cols-3 lg:gap-4 lg:grid-cols-3 w-[100%] xl:grid-cols-4"
          >
            {lostItems.map((item) => (
              <NavLink
                to={`/details/${item.id}`} // Pass the item's ID as a URL parameter
                key={item.id}
                className="text-black no-underline"
              >
                <div
                  key={item.id}
                  className="h-[32vh] truncate line-clamp-2  bg-[#FCA31126] rounded-xl shadow-md"
                >
                  <img
                    className="w-full rounded-tl-xl rounded-tr-xl h-[20vh]"
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="px-1 text-[#1C1C1CF7]">
                    <h2 className="text-capitalize text-lg my-2 font-semibold">
                      {item.name}
                    </h2>
                    <div className="flex gap-1">
                      <img src={icon} alt="location icon" />
                      <p className="text-gray-600 ">{item.location}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LostItems;
