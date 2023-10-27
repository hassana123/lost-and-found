import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Lost Items</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lostItems.map((item) => (
            <NavLink
              to={`/details/${item.id}`} // Pass the item's ID as a URL parameter
              key={item.id}
              className="text-black no-underline"
            >
              <div key={item.id} className="bg-white p-4 rounded-md shadow-md">
                <img src={item.image} alt={item.name} />
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">Location: {item.location}</p>
                {/* <p className="text-gray-600 mb-4">
                Date: {item.date}, Time: {item.time}
              </p> */}
                {/* <p className="text-gray-600">Description: {item.desc}</p> */}
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default LostItems;
