import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import Chart from "chart.js/auto";

function StatisticsChart() {
  const [totalItems, setTotalItems] = useState(null);
  const [claimedItems, setClaimedItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch total number of items from "lostItems" collection
    const lostItemsCollection = collection(firestore, "lostItems");
    const lostItemsQuery = query(lostItemsCollection);

    getDocs(lostItemsQuery).then((querySnapshot) => {
      setTotalItems(querySnapshot.size);
    });

    // Fetch total number of claimed items from "claimedItems" collection
    const claimedItemsCollection = collection(firestore, "claimedItems");
    const claimedItemsQuery = query(claimedItemsCollection);

    getDocs(claimedItemsQuery).then((querySnapshot) => {
      setClaimedItems(querySnapshot.size);
      setLoading(false); // Data fetching is complete
    });
  }, []);

  useEffect(() => {
    if (!totalItems || !claimedItems) {
      return;
    }

    // Create a chart once the data is loaded
    const ctx = document.getElementById("statisticsChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total Items", "Claimed Items"],
        datasets: [
          {
            label: "Number of Items",
            data: [totalItems, claimedItems],
            backgroundColor: ["blue", "green"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [totalItems, claimedItems]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Statistics</h2>
      {loading ? (
        <div className="text-center p-4">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <canvas id="statisticsChart" width="400" height="200"></canvas>
      )}
    </div>
  );
}

export default StatisticsChart;
