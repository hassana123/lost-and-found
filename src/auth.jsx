// Function to check if the user is authenticated (valid auth token in local storage)
export const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  return !!userId; // Returns true if userId exists in local storage
};

// Function to log the user in and store user data in local storage
export const loginUser = (user, userId) => {
  localStorage.setItem("userId", userId);
  // localStorage.setItem("userName", user.name);
};

// Function to log the user out and clear local storage
export const logoutUser = () => {
  localStorage.removeItem("userId");
  //localStorage.removeItem("userName");
};
