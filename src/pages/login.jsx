import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth";
import Navbar from "../components/Navbar";

function Login() {
  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic form validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setError(null); // Clear any previous error
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully");
      const user = userCredential.user;
      const userId = user.uid;
      // Store user data in local storage
      loginUser(user, userId);
      // redirect the user
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Error signing in:", error);
    }

    // Clear the email and password fields after login
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-secondary">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            {/* Display error message if there's an error */}
            {error && (
              <div className="mb-4 text-red-600 text-center ">{error}</div>
            )}

            {/* Email Input */}
            <fieldset className="border border-border p-1 my-10 rounded-lg">
              <legend className="block text-legend p-5">Email</legend>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="w-full px-5 border-none outline-none"
                  placeholder="Email"
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-md py-2"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4 text-secondary">
            <small>
              Haven't registered or signed up yet?
              <a
                onClick={() => navigate("/register")}
                className="text-blue-500"
              >
                &nbsp;Click here
              </a>
            </small>
            <br />
            <small>
              Forgot your password?
              <a
                onClick={() => navigate("/forgotpassword")}
                className="text-blue-500"
              >
                &nbsp;Click here
              </a>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
