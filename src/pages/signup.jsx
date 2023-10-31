import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import HomeLayout from "../components/HomeLayout";
import { useNavigate } from "react-router-dom";

function Signup() {
  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  const phoneRegex = /^[0-9]{11}$/; // 11-digit phone number
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Email format
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // State variables for form fields, error messages, and field validity
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateName = (input) => nameRegex.test(input);
  const validatePhone = (input) => phoneRegex.test(input);
  const validateEmail = (input) => emailRegex.test(input);
  const validatePassword = (input) => passwordRegex.test(input);

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    // Reset all error messages
    setNameError("");
    setPhoneError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setError("");

    // Basic form validation checks
    if (!name) {
      setNameError("Name is required.");
      nameRef.current.focus();
    } else if (!validateName(name)) {
      setNameError("Name is not valid.");
      nameRef.current.focus();
    }

    if (!phone) {
      setPhoneError("Phone number is required.");
      phoneRef.current.focus();
    } else if (!validatePhone(phone)) {
      setPhoneError("Phone number is not valid.");
      phoneRef.current.focus();
    }

    if (!email) {
      setEmailError("Email is required.");
      emailRef.current.focus();
    } else if (!validateEmail(email)) {
      setEmailError("Email is not valid.");
      emailRef.current.focus();
    }

    if (!password) {
      setPasswordError("Password is required.");
      passwordRef.current.focus();
    } else if (!validatePassword(password)) {
      setPasswordError("Password is not valid.");
      passwordRef.current.focus();
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirmation is required.");
      confirmPasswordRef.current.focus();
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      confirmPasswordRef.current.focus();
    }

    // Check if any field has an error
    if (
      nameError ||
      phoneError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      setError("Please correct the errors in the form.");
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
      setLoading(false);
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
      setLoading(false);
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
      setError("Error saving user data to Firestore.");
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
              <div className="mb-2 text-red-600 text-center">{error}</div>
            )}

            {/* Name Input */}
            <fieldset className="border border-border px-1 h-[15vh] my-5 rounded-lg">
              <legend className="block text-legend p-5">Name</legend>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  className={`w-full px-5 border-none outline-none ${
                    nameError ? "border-red-500" : ""
                  }`}
                  placeholder="eg: John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  ref={nameRef}
                />
                {nameError && (
                  <div className="text-red-600 my-5 font-bold">{nameError}</div>
                )}
              </div>
            </fieldset>

            {/* Phone Input */}
            <fieldset className="border border-border px-1 h-[15vh] my-2 rounded-lg">
              <legend className="block text-legend p-5">Phone Number</legend>
              <div className="mb-4">
                <input
                  type="tel"
                  id="phone"
                  className={`w-full px-5 border-none outline-none ${
                    phoneError ? "border-red-500" : ""
                  }`}
                  placeholder="eg: 08122990011"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  ref={phoneRef}
                />
                {phoneError && (
                  <div className="text-red-600  my-5 font-bold">
                    {phoneError}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Email Input */}
            <fieldset className="border border-border px-1 h-[15vh] my-2 rounded-lg">
              <legend className="block text-legend p-5">Email</legend>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className={`w-full px-5 border-none outline-none ${
                    emailError ? "border-red-500" : ""
                  }`}
                  placeholder="eg: JohnDoe12@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  ref={emailRef}
                />
                {emailError && (
                  <div className="text-red-600 my-5  font-bold">
                    {emailError}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Password Input */}
            <fieldset className="border border-border px-1 h-[15vh] my-5 rounded-lg">
              <legend className="block text-legend p-5">Password</legend>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className={`w-full px-5 border-none outline-none ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  ref={passwordRef}
                />
                {passwordError && (
                  <div className="text-red-600 my-5  font-bold">
                    {passwordError}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Confirm Password Input */}
            <fieldset className="border border-border px-1 h-[15vh] my-5 rounded-lg">
              <legend className="block text-legend p-5">
                Confirm Password
              </legend>
              <div className="mb-4">
                <input
                  type="password"
                  id="confirmPassword"
                  className={`w-full px-5 border-none outline-none ${
                    confirmPasswordError ? "border-red-500" : ""
                  }`}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError("");
                  }}
                  ref={confirmPasswordRef}
                />
                {confirmPasswordError && (
                  <div className="text-red-600 my-5  font-bold">
                    {confirmPasswordError}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-4 my-5 bg-primary text-white rounded-md"
            >
              {loading ? "signing up" : "sign up"}
            </button>
          </form>
          <div className="text-center mt-4 text-secondary">
            <small>
              Already have an Account
              <a
                onClick={() => navigate("/login")}
                className="text-primary font-bold"
              >
                &nbsp;Click here
              </a>
            </small>
            <br />
            <small>
              Forgot your password?
              <a
                onClick={() => navigate("/")}
                className="text-primary font-bold"
              >
                &nbsp;Click here
              </a>
            </small>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Signup;
