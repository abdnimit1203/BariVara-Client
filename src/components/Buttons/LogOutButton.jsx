import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginInfo");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    // Redirect to the home page
    navigate("/");
    window.location.reload();
    toast.error("User Logged out!")
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
