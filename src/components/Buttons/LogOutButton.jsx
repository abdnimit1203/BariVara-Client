import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../firebase/auth";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutUser();
    navigate("/");
    toast.error("User Logged out!");
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
