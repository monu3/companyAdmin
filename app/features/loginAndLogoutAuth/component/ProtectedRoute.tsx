/**
 * ProtectedRoute.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : A higher-order component that protects routes by checking authentication status.
 * Redirects unauthenticated users to the login page and shows a spinner while verifying authentication.
 */

import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext";
import Spinner from "~/common/utils/Spinner";

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
    return <Spinner />;
  }

  // Render child components once authentication is verified
  return <Outlet />;
};

export default ProtectedRoute;
