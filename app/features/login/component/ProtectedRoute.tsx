/**
 * ProtectedRoute.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : A higher-order component that protects routes by checking authentication status.
 * Redirects unauthenticated users to the login page and shows a spinner while verifying authentication.
 */

import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "./authContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // Access authentication state from context
  const navigate = useNavigate(); // For navigation
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // State to track if authentication is being checked

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem("userEmail")) {
      // Redirect to login if not authenticated
      navigate("/login", { replace: true });
    } else {
      // Simulate delay while checking authentication
      setTimeout(() => {
        setIsCheckingAuth(false);
      }, 1000);
    }
  }, [isAuthenticated, navigate]);

  // Show a spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Spinner for loading state */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render child components once authentication is verified
  return <Outlet />;
};

export default ProtectedRoute;
