import DashboardLayout from "../components/DashboardLayout";
import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase";
import requireAuth from "../requireAuth";
import { getUser } from "../auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
function ReportLostItem() {
  const [itemName, setItemName] = useState("");
  const [locationFound, setLocationFound] = useState("");
  const [foundDate, setFoundDate] = useState("");
  const [foundTime, setFoundTime] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const user = getUser();
  const userId = user.userId;
  //console.log(userId);
  //console.log(user);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const saveItemToFirestore = async (id, imageURL, timestamp) => {
    const lostItemCollection = collection(firestore, "lostItems");
    const itemData = {
      name: itemName,
      location: locationFound,
      date: foundDate,
      time: foundTime,
      desc: description,
      image: imageURL,
      timestamp: timestamp,
      seekerName: user.user.name,
      seekerPhone: user.user.phone,
    };
    // Add form data to a new collection in Firestore
    try {
      await addDoc(lostItemCollection, itemData);
      console.log("User data saved to Firestore");
    } catch (error) {
      console.error("Error saving user data to Firestore:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if an image is selected
    if (selectedImage) {
      const storage = getStorage(); // Initialize Firebase Storage
      const storageRef = ref(storage, `images/${selectedImage.name}`);

      try {
        // Upload the image to Firebase Storage
        const snapshot = await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const timestamp = Timestamp.now();

        // Save the item data to Firestore with the image URL
        saveItemToFirestore(userId, downloadURL, timestamp);
        setFormSubmitted(true);
        console.log("Image uploaded and URL stored.");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // If no image is selected, save the item data without an image URL
      saveItemToFirestore(userId, "");
      setFormSubmitted(true);
    }
    setItemName("");
    setLocationFound("");
    setFoundDate("");
    setFoundTime("");
    setDescription("");
    setSelectedImage(null);
  };

  // Clears form fields after submission

  return (
    <DashboardLayout>
      {formSubmitted ? ( // Conditional rendering based on form submission status
        <div>
          <p>
            Thanks for reporting the lost item. Your item has been recorded.
          </p>
          <button
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
            onClick={() => setFormSubmitted(false)} // Handle making another report
          >
            Make Another Report
          </button>
          <button
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
            onClick={() => navigate("/dashboard")} // Handle going to the homepage
          >
            Go to Homepage
          </button>
        </div>
      ) : (
        <div className="container mx-auto p-4 flex">
          <form onSubmit={handleSubmit} className="max-w-md w-[70%]">
            <h1 className="text-2xl font-semibold mb-4">Report Lost Item</h1>
            <div className="mb-4">
              <label className="block text-gray-600">Item Name</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Location Found</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                value={locationFound}
                onChange={(e) => setLocationFound(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="border border-border rounded-md p-2">
                  <legend className="block text-legend border-none outline-none">
                    Found Date
                  </legend>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2"
                    value={foundDate}
                    onChange={(e) => setFoundDate(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="border border-border rounded-md p-2">
                  <legend className="block text-legend">Found Time</legend>
                  <input
                    type="time"
                    className="w-full border-none outline-none"
                    value={foundTime}
                    onChange={(e) => setFoundTime(e.target.value)}
                    required
                  />
                </fieldset>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Description</label>
              <textarea
                className="w-full border rounded-md px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
              Report
            </button>
          </form>
          <div>
            <img src="" alt="" />
            <p>Back</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
export default requireAuth(ReportLostItem);
