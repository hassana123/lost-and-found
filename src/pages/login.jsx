import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth";
import { firestore } from "../firebase";
import HomeLayout from "../components/HomeLayout";

function Login() {
  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    // Basic form validation
    if (!email || !password) {
      setLoading(false);
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
      const userDoc = userCredential.user;
      const userId = userDoc.uid;
      // Store user data in local storage
      const userRef = doc(firestore, "users", userId);
      const user = await getDoc(userRef);
      if (user.exists()) {
        const userData = user.data();
        // Store user data in local storage
        loginUser(userData, userId, userDoc); // Pass user data to the loginUser function
      } else {
        console.error("User document not found in Firestore.");
      }
      // redirect the user
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Error signing in:", error);
      setLoading (false)
    }

    // Clear the email and password fields after login
    setEmail("");
    setPassword("");
  };

  return (
    <HomeLayout>
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

            <fieldset className="border border-border p-1 my-4 rounded-lg">
              <legend className="block text-legend p-2">Email</legend>

              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="w-full px-2 border-none outline-none"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </fieldset>

            {/* Password Input */}
            <fieldset className="border border-border p-1 my-4 rounded-lg">
              <legend className="block text-legend p-2">Password</legend>

              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="w-full px-2 border-none outline-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 mt-5 bg-primary text-white rounded-md "
            >
              {loading ? "Loging in please wait..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4 text-secondary">
            <small>
              Haven't registered or signed up yet?
              <a
                onClick={() => navigate("/register")}
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

export default Login;
