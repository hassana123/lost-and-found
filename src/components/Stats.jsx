/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import Chart from "chart.js/auto";

function Stats() {
  const [totalItems, setTotalItems] = useState(null);
  const [claimedItems, setClaimedItems] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define a variable to keep track of the Chart instance
  let chartInstance = null;

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

    // Cleanup the previous Chart instance when the component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (totalItems === null || claimedItems === null) {
      return;
    }

    // Calculate the number of unclaimed items
    const unclaimedItems = totalItems - claimedItems;

    // Create a doughnut chart once the data is loaded
    const ctx = document.getElementById("statisticsChart");

    if (ctx) {
      // Cleanup the previous Chart instance before creating a new one
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "doughnut", // Use "doughnut" chart type
        data: {
          labels: ["Total Items", "Claimed Items", "Unclaimed Items"], // Add the "Unclaimed Items" label
          datasets: [
            {
              data: [totalItems, claimedItems, unclaimedItems], // Include the unclaimedItems count
              backgroundColor: ["#4C8787FA", "#0A032AFA", "#FCA311"], // Customize colors
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: "60%",
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }
  }, [totalItems, claimedItems]);
  const unclaimedItems = totalItems - claimedItems;

  const claimedPercentage = (claimedItems / totalItems) * 100;
  const unclaimedPercentage = (unclaimedItems / totalItems) * 100;
  const totalItemsPercentage = 100;

  return (
    <div className="bg-white shadow-lg shadow-slate-300 w-[90%] md:w-[60%] text-center mx-auto ">
      {loading ? (
        <div className="text-center p-4 text-black">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="py-1 px- 2 border-2 border-[#14213D33] rounded-xl">
          <h5 className="text-xl font-semibold my-5">
            Claimed Item Statistics
          </h5>
          <p className="bg-[#EBEBEB] w-[40%] mx-auto p-2 rounded-lg">
            Last 30 Days
          </p>
          {/* graph for items */}
          <div className="w-[60%] md:w-[35%] mx-auto">
            <canvas height={200} id="statisticsChart"></canvas>
          </div>
          {/* Adjusted the height */}
          <h3 className="my-5">Very Good</h3>
          {/* Claimed Items Progress Bar */}
          <div className="w-[80%] md:w-[90%] mx-auto grid gap-4  mb-5 text-left">
            <div className="">
              <span className="bar-label">Claimed Items</span>
              <div className=" rounded-xl w-[100%] bg-[#75757533]  text-white">
                <div
                  className="rounded-xl bg-[#0A032AFA] px-3"
                  style={{ width: `${claimedPercentage}%` }}
                >
                  {claimedPercentage.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="">
              <span className="bar-label">Unclaimed Items</span>
              <div className=" rounded-xl w-[100%] text-white bg-[#75757533]">
                <div
                  className="bg-[#FCA311] rounded-xl px-3"
                  style={{ width: `${unclaimedPercentage}%` }}
                >
                  {unclaimedPercentage.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="">
              <span className="bar-label">Total Items</span>
              <div className="rounded-xl w-[100%] text-white bg-[#75757533]">
                <div
                  className="rounded-xl px-3 bg-[#4C8787FA]"
                  style={{ width: `${totalItemsPercentage}%` }}
                >
                  {totalItemsPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;
