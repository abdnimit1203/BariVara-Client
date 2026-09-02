import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      Swal.fire({
        title: "You need to log in first",
        width: 600,
        timer: 4000,
        timerProgressBar: true,
        heightAuto: false,
        padding: "3em",
        color: "white",
        background: "#0CC0DF",
      });
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center text-center">
        <span className="w-40 loading loading-bars text-primary"></span>
      </div>
    );
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
