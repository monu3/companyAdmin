/**
 * ProtectedRoute.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : A higher-order component that protects routes by checking authentication status.
 * Redirects unauthenticated users to the login page and shows a spinner while verifying authentication.
 */

import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useAuth } from "../context/authContext";
import Spinner from "~/common/utils/Spinner";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const hasStoredAuth = Boolean(localStorage.getItem("userEmail"));

        if (!hasStoredAuth) {
          window.location.href = "/login";
          return;
        }

        if (!isAuthenticated && hasStoredAuth) {
          // Keep checking auth state until it's initialized
          return;
        }

        // Only set checking to false when we have a definitive auth state
        if (isAuthenticated || !hasStoredAuth) {
          setIsCheckingAuth(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  if (isCheckingAuth) {
    return <Spinner />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
