import { useEffect, useState } from "react";
import { FaRegUser, FaUnlockAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmail, signInWithGoogle } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BiSolidErrorAlt } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const firebaseErrorMessage = (err) => {
  switch (err.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password!";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Login failed. Please try again.";
  }
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // for animation
  const [isLoaded, setIsLoaded] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Trigger the transition once the component is mounted
  useEffect(() => {
    // After the page loads, set the state to trigger the transition
    setIsLoaded(true);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmail(formData.email, formData.password);
      toast.success("Login Successful!");
      const targetRoute = location?.state ? location.state : "/";
      navigate(targetRoute);
    } catch (err) {
      setError(firebaseErrorMessage(err));
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
      toast.success("Login Successful!");
      const targetRoute = location?.state ? location.state : "/";
      navigate(targetRoute);
    } catch (err) {
      setError(firebaseErrorMessage(err));
    }
  };

  return (
    <div className="bg-center bg-cover min-h-screen sm:flex-center sm:flex relative overflow-x-hidden">
      <div className="bg-black z-10 w-full bg-cover sm:flex-1">
        <img
          src="/aerial.jpg"

          alt="Background image ..."
          className="h-screen object-cover sm:opacity-80 w-screen"
        />
      </div>
      <div
        className={`flex flex-col gap-2 text-base-content bg-base-100 dark:bg-slate-900 shadow-xl items-center justify-center pt-8 pb-10 sm:pb-8 w-full mx-auto sm:w-fit xs:rounded-r-xl rounded-se-[60px] absolute bottom-0 -left-36 sm:static transition-all transform sm:flex-1 ${
          isLoaded ? "translate-x-36 sm:translate-x-0" : ""
        } duration-[1000ms] ease-in-out`}
      >
        {/* Form Headings */}
        <div className="glass bg-neutral px-6 sm:px-10 rounded-t-full ">
          <Link to={"/"}>
            <img
              src="/logo.png"
              alt="logo"
              className="w-20 sm:w-24 drop-shadow-lg animate-wave"
            />
          </Link>
        </div>
        <h2 className="text-3xl font-bold mt-6">Login</h2>

        {/* FORM STARTS */}
        <form
          onSubmit={handleSubmit}
          className="rounded px-6 sm:px-8 pt-6 pb-4 sm:pb-8 w-full max-w-[22rem] md:max-w-96 space-y-5 sm:space-y-6"
        >
          {error && (
            <p className="text-red-500 flex gap-5 pb-4 ">
              <BiSolidErrorAlt className="text-xl -mx-4" />
              {error}
            </p>
          )}
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block  mb-2 text-sm sm:text-lg"
            >
              Email
            </label>
            <FaRegUser className="opacity-50 absolute bottom-3 -left-2 sm:bottom-5" />

            <input
              type="email"
              className="w-full p-1.5 sm:p-3 mt-1  rounded border-b-2 appearance-none px-3 bg-transparent   focus:border-b-primary focus:outline-none"
              id="email"
              placeholder="Type your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block  mb-2 text-base sm:text-lg"
            >
              Password
            </label>
            <FaUnlockAlt className="opacity-50 absolute bottom-3 -left-2 sm:bottom-5" />

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-1.5 sm:p-3 mt-1  rounded border-b-2 appearance-none px-3 bg-transparent   focus:border-b-primary focus:outline-none"
              placeholder="Type your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
            }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
          </div>
          <button className="bg-gradient-to-r from-cyan-500 via-primary to-cyan-500 hover:from-cyan-400 hover:to-cyan-400 text-white transition-all duration-500  font-bold py-2  px-4 rounded-full w-full ">
            Login
          </button>
        </form>
        <div className="flex items-center gap-3 w-full max-w-[22rem] md:max-w-96 px-6 sm:px-0 text-xs sm:text-sm text-gray-400">
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          OR
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        </div>
        <section className="flex flex-col gap-2 flex-center w-full max-w-[22rem] md:max-w-96 px-6 sm:px-0">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 p-2.5 sm:p-3 border-2 rounded-full text-sm sm:text-base font-semibold hover:bg-base-200 transition"
          >
            <FcGoogle className="text-xl sm:text-2xl" />
            Continue with Google
          </button>
        </section>
      </div>
    </div>
  );
};

export default Login;
