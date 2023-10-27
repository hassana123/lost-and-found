// requireAuth.js
import React, { useEffect } from "react";
import { isAuthenticated } from "./auth"; // Import the isAuthenticated function
import { useNavigate } from "react-router-dom";

function requireAuth(Component) {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate(); // Move useNavigate inside the component
    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/login");
      }
    }, [navigate]); // Pass navigate as a dependency to useEffect

    return isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <div>Loading....</div>
    );
  };
}
export default requireAuth;
