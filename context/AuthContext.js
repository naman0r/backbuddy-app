import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase"; // Adjust path if firebase.js is elsewhere
import { onAuthStateChanged } from "firebase/auth";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial auth state check

  useEffect(() => {
    // Firebase listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set user to null if logged out
      setLoading(false); // Finished loading auth state
      console.log("Auth State Changed:", user ? user.email : "No User");
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    // Add other auth functions if needed (e.g., login, logout, signup)
  };

  // Render children immediately, the consumer will decide what to do while loading
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
