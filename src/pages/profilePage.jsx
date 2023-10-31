import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { firestore } from "../firebase";
import { updateEmail } from "firebase/auth";
import requireAuth from "../requireAuth";
import { getUser } from "../auth";
import { HiOutlineUser } from "react-icons/hi";
import { loginUser } from "../auth";
import { auth } from "../firebase";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function profilePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const user = getUser();

  // const changeEmail = () => {
  //   const currUser = auth.currentUser; // Get the current user
  //   // Update the email in Firebase Authentication
  //   updateEmail(currUser, email)
  //     .then(() => {
  //       console.log("Email updated successfully in Firebase Authentication");
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       console.error(error);
  //     });
  // };

  const handleProfileUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!user) {
      console.log("User not found. Please log in.");
      return;
    }

    const userDocRef = doc(firestore, "users", user.userId);
    const updatedUserData = {};

    if (name) {
      updatedUserData.name = name;
    }

    if (userName) {
      updatedUserData.userName = userName;
    }

    if (phone) {
      updatedUserData.phone = phone;
    }

    // Check if a new profile picture is selected
    if (profilePicture) {
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${user.userId}`);

      // Upload the new profile picture
      await uploadBytes(storageRef, profilePicture);

      // Get the download URL of the uploaded profile picture
      const downloadURL = await getDownloadURL(storageRef);

      // Add the profile picture URL to the updated user data
      updatedUserData.profilePicture = downloadURL;
    }

    try {
      // Update the user data in Firestore
      await setDoc(userDocRef, updatedUserData, { merge: true });
      loginUser(updatedUserData, user.userId, user.userAuth);
      console.log("Updated");
      setLoading(false);
      // Clear the form fields
      setName("");
      setPhone("");
      setUserName("");
      setProfilePicture(null);
      // Redirect to the user's profile page or a success page
      setOpen(true);
    } catch (error) {
      console.log("Error updating the user profile. Please try again.");
      console.log("Error updating profile:", error);
    }
  };

  return (
    <DashboardLayout>
      <NavLink className="float-right my-5" to="/dashboard">
        <FaArrowLeft />
      </NavLink>
      {open ? (
        <section className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-semibold text-primary text-center mb-4">
            User Details
          </h1>
          <div className="space-y-4">
            {user ? (
              <div>
                <img
                  src={user.user.profilePicture}
                  alt="Profile"
                  className="w-[60%] h-[25vh] mx-auto rounded-[100%]"
                />
              </div>
            ) : (
              <NavLink to="/profile" className="text-[#FB7E13]">
                <HiOutlineUser size={30} />
              </NavLink>
            )}
            <div>
              <p className="w-full px-4 py-2  rounded-lg bg-gray-100">
                {user ? user.user.name : "........."}
              </p>
            </div>
            <div>
              <p className="w-full px-4 py-2  rounded-lg bg-gray-100">
                {user ? user.user.userName : "........."}
              </p>
            </div>
            <div>
              <p className="w-full px-4 py-2  rounded-lg bg-gray-100">
                {user ? user.user.phone : "........."}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="bg-primary text-center text-white hover:bg-[#FB7E13]  transition-all hover:bg-[#FB7E13] transition-transform transform hover:scale-105  flex justify-center gap-[2px] rounded-xl w-full py-4 my-5"
          >
            Update profile
          </button>
        </section>
      ) : (
        <section className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-semibold text-secondary text-center mb-4">
            Profile Update
          </h1>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-legend">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-legend">UserName</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-legend">Phone</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* <div>
              <label className="block text-legend">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
            <div>
              <label className="block text-legend">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
            <button
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-[#FB7E13] transition-all"
              type="submit"
            >
              {loading ? "Updating" : " Update Profile"}
            </button>
          </form>
        </section>
      )}
    </DashboardLayout>
  );
}

export default requireAuth(profilePage);
