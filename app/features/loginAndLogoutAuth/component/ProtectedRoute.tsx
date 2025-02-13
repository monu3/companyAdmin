/**
 * ProtectedRoute.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : A higher-order component that protects routes by checking authentication status.
 * Redirects unauthenticated users to the login page and shows a spinner while verifying authentication.
 */

import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/authContext";
import Spinner from "~/common/utils/Spinner";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // Access authentication state from context
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // State to track if authentication is being checked

  useEffect(() => {
    setTimeout(() => {
      setIsCheckingAuth(false);
    }, 1000);
  }, []);

  // Show a spinner while checking authentication
  if (isCheckingAuth) {
    return <Spinner />;
  }

  // If not authenticated and no userEmail in localStorage, navigate to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
