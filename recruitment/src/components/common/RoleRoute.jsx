import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const allowed = allowedRoles.some((role) => hasRole(role));

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
