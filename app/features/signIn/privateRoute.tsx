// features/signIn/privateRoute.tsx
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
