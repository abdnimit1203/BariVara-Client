// import { Navigate, useLocation } from "react-router-dom";
// import PropTypes from "prop-types";
// import Swal from "sweetalert2";

// const PrivateRoutes = ({ children }) => {
//   const location = useLocation();
// console.log(location)
//   // Fetch user data from local storage
//   const user = JSON.parse(localStorage.getItem('loginInfo'));
//   const loading = false; // Set loading to false since we are not using a context or fetching data

//   if (loading) {
//     return (
//       <div className="flex min-h-screen justify-center items-center text-center">
//         <span className="w-40 loading loading-bars bg-secondary"></span>
//       </div>
//     );
//   }

//   if (user) {
//     return children;
//   } else {
//     Swal.fire({
//       title: "You have to login First",
//       width: 600,
//       timer: 4000,
//       timerProgressBar: true,
//       heightAuto: false,
//       padding: "3em",
//       color: "white",
//       background: "#0CC0DF",
      
//     });
//   }

//   return (
//     <Navigate state={location.pathname} to="/login" />
//   );
// };

// PrivateRoutes.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default PrivateRoutes;
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// Helper function to check token validity
const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode the token
    return payload.exp > Math.floor(Date.now() / 1000); // Check expiration
  } catch (error) {
    console.error("Invalid token format:", error);
    return false;
  }
};

const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  // Validate token and user session
  const isAuthenticated = isTokenValid();

  if (isAuthenticated) {
    return children; // Render the protected component
  } else {
    // Show alert if the user is not authenticated
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

    // Redirect to the login page
    return <Navigate state={location.pathname} to="/login" />;
  }
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
