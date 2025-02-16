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
  useLayoutEffect,
} from "react";
import type { AuthContextType } from "../types/types";
import {
  checkAuthStatus,
  loginService,
  logoutService,
} from "../service/loginAuthService";
import { useNavigate } from "react-router";
import ToastService from "~/common/utils/toastService";

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
  const navigate = useNavigate();
  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const status = await checkAuthStatus();
        setIsAuthenticated(status);
        if (status) {
          const email = localStorage.getItem("userEmail");
          setUserEmail(email);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Function to log the user in
  const authlogin = async (email: string, password: string) => {
    try {
      const result = await loginService(email, password);
      if (result === "Login successful") {
        ToastService.success("Login success");
        localStorage.setItem("userEmail", email); // Save email in localStorage
        setUserEmail(email); // Store the user's email
        setIsAuthenticated(true); // Mark user as authenticated
        window.location.reload();
      } else if (result === "Invalid password") {
        // setError(result); // If login fails, display error message
        ToastService.warning("Invalid password");
      } else {
        ToastService.warning("Company not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to log the user out
  const logout = async () => {
    try {
      await logoutService();
      localStorage.removeItem("userEmail"); // Remove email from localStorage
      setUserEmail(null); // Clear the stored email
      setIsAuthenticated(false);
      navigate("/login");
      // Mark user as not authenticated
    } catch (error) {
      console.log(error);
    }
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
