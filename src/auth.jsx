// Function to check if the user is authenticated (valid auth token in local storage)
export const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  return !!userId; // Returns true if userId exists in local storage
};

// Function to log the user in and store user data in local storage
export const loginUser = (userData, userId, userAuth) => {
  localStorage.setItem("userId", userId);
  localStorage.setItem("userAuth", JSON.stringify(userAuth));
  localStorage.setItem("user", JSON.stringify(userData));
};
// Function to get the user data from local storage
export const getUser = () => {
  const userId = localStorage.getItem("userId");
  const userData = localStorage.getItem("user");
  const userAuth = localStorage.getItem("userAuth");
  if (userId && userData && userAuth) {
    return {
      userId: userId,
      user: JSON.parse(userData),
      userAuth: JSON.parse(userAuth),
    };
  }
  return null; // Return null if either the userId or userData is not found
};

// Function to log the user out and clear local storage
export const logoutUser = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("user");
};
