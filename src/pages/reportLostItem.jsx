import DashboardLayout from "../components/DashboardLayout";
import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase";
import requireAuth from "../requireAuth";
import { getUser } from "../auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
function ReportLostItem() {
  const [itemName, setItemName] = useState("");
  const [locationFound, setLocationFound] = useState("");
  const [foundDate, setFoundDate] = useState("");
  const [foundTime, setFoundTime] = useState("");
  const [loading, setLoading] = useState(false)
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
      seekerId: userId,
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
    setLoading(true);
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
        setLoading (false)
        console.log("Image uploaded and URL stored.");
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
      }
    } else {
      // If no image is selected, save the item data without an image URL
      saveItemToFirestore(userId, "", timestamp);
      setFormSubmitted(true);
      setLoading(false)
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
      <NavLink className="float-right my-5" to="/dashboard">
        <FaArrowLeft />
      </NavLink>
      {formSubmitted ? ( // Conditional rendering based on form submission status
        <section className="text-center mt-20">
          <p className="text-[#2F327D] text-2xl font-bold mb-5">
            Report Submitted Successfully
          </p>
          <p className="text-[#5F5F5FC2] text-lg mb-10">
            Thanks for reporting the lost item. Your item has been recorded.
          </p>
          <div className="flex items-center justify-center gap-5">
            <button
              className="bg-[#0A032A] text-white rounded-md py-2 px-4 hover:bg-[#508989] focus:outline-none"
              onClick={() => setFormSubmitted(false)} // Handle making another report
            >
              Make Another Report
            </button>
            <NavLink
              to="/dashboard"
              className="bg-[#0A032A] text-white rounded-md py-2 px-4 hover:bg-[#508989] focus:outline-none"
            >
              Go to Dashboard
            </NavLink>
          </div>
        </section>
      ) : (
        <div className="container mx-auto p-4 ">
          <form
            onSubmit={handleSubmit}
            className="w-[90%] md:w-[70%] text-[#333333]"
          >
            <h1 className="text-2xl font-semibold mb-4">Report Lost Item</h1>
            <div className="mb-4">
              <label className="block ">Item Name</label>
              <input
                type="text"
                className="w-full bg-[#E5EDED66] text-[#666666] my-2 border-none rounded-md px-3 py-2"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block">Location Found</label>
              <input
                type="text"
                className="w-full border-none bg-[#E5EDED66] my-2 text-[#666666] rounded-md px-3 py-2"
                value={locationFound}
                onChange={(e) => setLocationFound(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="border rounded-md p-1">
                  <legend className="block border-none outline-none">
                    Found Date
                  </legend>
                  <input
                    type="date"
                    className="w-full border-none rounded-md px-3 py-2"
                    value={foundDate}
                    onChange={(e) => setFoundDate(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="border rounded-md p-1">
                  <legend className="block text-legend">Found Time</legend>
                  <input
                    type="time"
                    className="w-full  border-none outline-none"
                    value={foundTime}
                    onChange={(e) => setFoundTime(e.target.value)}
                    required
                  />
                </fieldset>
              </div>
            </div>
            <div className="mb-4">
              <label className="block ">Description</label>
              <textarea
                className="w-full border  border-2 rounded-md px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4 ">
              <label className=" block  text-gray-600">Upload Image</label>
              <input
                className="w-[70%] my-2"
                type="file"
                accept="image/*"
                placeholder="Uplaod Image"
                onChange={handleImageUpload}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white rounded-md py-2 px-4 hover:bg-[#FB7E13]"
            >
              {loading ? "Reporting" : "Report"}
            </button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}
export default requireAuth(ReportLostItem);
