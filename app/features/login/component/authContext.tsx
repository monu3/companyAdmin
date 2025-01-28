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
import { useNavigate } from "react-router";

// Define the shape of the authentication context
type AuthContextType = {
  isAuthenticated: boolean; // Whether the user is authenticated
  userEmail: string | null; // The email of the authenticated user
  login: (email: string) => void; // Function to log the user in
  logout: () => void; // Function to log the user out
};

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

// AuthProvider component to wrap around the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if the user is authenticated
  const [userEmail, setUserEmail] = useState<string | null>(null); // Stores the user's email
  const navigate = useNavigate(); // For navigation after login/logout

  // Check authentication status on initial load
  useEffect(() => {
    const email = localStorage.getItem("userEmail"); // Retrieve email from localStorage
    setIsAuthenticated(!!email); // Set authentication status
    setUserEmail(email); // Set the user's email
  }, []);

  // Function to log the user in
  const login = (email: string) => {
    localStorage.setItem("userEmail", email); // Save email in localStorage
    setIsAuthenticated(true); // Mark user as authenticated
    setUserEmail(email); // Store the user's email
    navigate("/"); // Redirect to the home page
  };

  // Function to log the user out
  const logout = () => {
    localStorage.removeItem("userEmail"); // Remove email from localStorage
    setIsAuthenticated(false); // Mark user as not authenticated
    setUserEmail(null); // Clear the stored email
    navigate("/login"); // Redirect to the login page
  };

  return (
    // Provide authentication context to children components
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to consume authentication context
export const useAuth = () => useContext(AuthContext);
