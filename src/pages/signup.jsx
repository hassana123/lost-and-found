import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import HomeLayout from "../components/HomeLayout";
import { useNavigate } from "react-router-dom";

function signup() {
  // State variables for form fields and error messages
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic form validation checks
    if (!name || !phone || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create a user with Firebase Authentication

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await saveUserDataToFirestore(user.uid);
      navigate("/login");
      // Clear the form fields
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      setError("Error creating the user. Please try again.");
      console.error("Error signing up:", error);
    }
  };

  const saveUserDataToFirestore = async (userId) => {
    const usersCollection = doc(firestore, "users", userId);
    const userData = {
      name: name,
      phone: phone,
      email: email,
    };

    // Add user data to Firestore
    try {
      await setDoc(usersCollection, userData);
      console.log("User data saved to Firestore");
    } catch (error) {
      console.error("Error saving user data to Firestore:", error);
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center my-10 min-h-screen">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-secondary text-center mb-4">
            Sign Up
          </h2>
          <form onSubmit={handleSignup}>
            {/* Display error message if there's an error */}
            {error && (
              <div className="mb-4 text-red-600 text-center">{error}</div>
            )}

            {/* Name Input */}
            <fieldset className="border border-border p-1 my-10 rounded-lg">
              <legend className="block text-legend p-5">Name</legend>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  className="w-full px-5 border-none outline-none"
                  placeholder="eg: John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </fieldset>

            {/* Phone Input */}
            <fieldset className="border border-border p-1 my-10 rounded-lg">
              <legend className="block text-legend p-5">Phone Number</legend>
              <div className="mb-4">
                <input
                  type="text"
                  id="phone"
                  className="w-full px-5 border-none outline-none"
                  placeholder="eg: 08122990011"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </fieldset>

            {/* Email Input */}
            <fieldset className="border border-border p-1 my-10 rounded-lg">
              <legend className="block text-legend p-5">Email</legend>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="w-full px-5 border-none outline-none"
                  placeholder="eg: JohnDoe12@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </fieldset>

            {/* Password Input */}
            <fieldset className="border border-border p-1 my-10 rounded-lg">
              <legend className="block text-legend p-5">Password</legend>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="w-full px-5 border-none outline-none"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>

            {/* Confirm Password Input */}
            <fieldset className="border border-border p-1 my-10 rounded-lg">
              <legend className="block text-legend p-5">
                Confirm Password
              </legend>
              <div className="mb-4">
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-5 border-none outline-none"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </fieldset>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full  py-4 bg-primary text-white rounded-md"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4 text-secondary">
            <small>
              Already have an Account
              <a onClick={() => navigate("/login")} className="text-primary">
                &nbsp;Click here
              </a>
            </small>
            <br />
            <small>
              Forgot your password?
              <a onClick={() => navigate("/")} className="text-primary">
                &nbsp;Click here
              </a>
            </small>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default signup;
