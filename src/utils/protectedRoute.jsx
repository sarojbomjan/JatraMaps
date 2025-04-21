import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  console.log({ loading, user, isAuthenticated, allowedRoles });

  if (loading) return <div>Loading....</div>;

  if (
    !isAuthenticated ||
    (allowedRoles && !allowedRoles.includes(user?.role))
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
