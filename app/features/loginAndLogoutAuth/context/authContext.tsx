/**
 * authContext.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : Provides authentication context and utilities for managing user login state.
 * This includes checking authentication status, handling login and logout actions,
 * and storing user information.
 */
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import type { AuthContextType } from "../types/types";

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  authlogin: () => {},
  logout: () => {},
});

// AuthProvider component to wrap around the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if the user is authenticated
  const [userEmail, setUserEmail] = useState<string | null>(null); // Stores the user's email

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = () => {
      const email = localStorage.getItem("userEmail"); // Retrieve email from localStorage
      setIsAuthenticated(!!email); // Set authentication status
      setUserEmail(email); // Set the user's email
    };
    checkAuth();
  }, []);

  // Function to log the user in
  const authlogin = (email: string) => {
    console.log("authlogin called with email: ", email);
    localStorage.setItem("userEmail", email); // Save email in localStorage
    setUserEmail(email); // Store the user's email
    setIsAuthenticated(true); // Mark user as authenticated
    window.location.reload();
  };

  // Function to log the user out
  const logout = () => {
    localStorage.removeItem("userEmail"); // Remove email from localStorage
    setUserEmail(null); // Clear the stored email
    setIsAuthenticated(false); // Mark user as not authenticated
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userEmail, authlogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to consume authentication context
export const useAuth = () => useContext(AuthContext);
