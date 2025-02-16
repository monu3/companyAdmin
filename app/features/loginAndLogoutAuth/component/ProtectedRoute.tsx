import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { checkAuthStatus } from "../service/loginAuthService";
import Spinner from "~/common/utils/Spinner";
import { Navigate, Outlet } from "react-router";
// ProtectedRoute.tsx
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (!isAuthenticated) {
          const status = await checkAuthStatus();
          if (!status) {
            window.location.href = "/login";
          }
        }
      } finally {
        setAuthChecked(true);
      }
    };

    verifyAuth();
  }, [isAuthenticated]);

  if (!authChecked) return <Spinner />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
