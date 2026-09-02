import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

// Backend still enforces the same check independently (see requireRole.js)
// — this only avoids flashing a page the user can't actually use.
const RoleRoute = ({ allow, children }) => {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center text-center">
        <span className="w-40 loading loading-bars text-primary"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allow.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

RoleRoute.propTypes = {
  allow: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default RoleRoute;
