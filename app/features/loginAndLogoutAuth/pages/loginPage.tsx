import { useEffect } from "react";
import LoginForm from "../component/login-form";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? null : <LoginForm />;
};

export default LoginPage;
