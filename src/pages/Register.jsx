import { useEffect, useState } from "react";
import { FaRegUser, FaUnlockAlt, FaUserAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiSolidErrorAlt } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// This page is intentionally not linked from any public navigation yet
// (kept implemented for future activation — see AUTH_IMPLEMENTATION_PLAN.md).
// It never sends or implies a role: the backend always assigns `tenant` on
// first login; only Super Admin can change a role afterwards.
const firebaseErrorMessage = (err) => {
  switch (err.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak — use at least 6 characters.";
    default:
      return "Registration failed. Try again.";
  }
};

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (isAuthenticated) return <Navigate to="/" />;

  const validate = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return "Please enter a valid email address.";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsLoading(true);
    try {
      await signUpWithEmail(formData.email, formData.password);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      setError(firebaseErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };


  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  return (
    <div className="bg-center bg-cover min-h-screen sm:flex-center sm:flex relative">
      {/* Left side image */}
      <div className="bg-black z-10 w-full bg-cover sm:flex-1">
        <img
          src="/loginbg.jpeg"
          alt="Background"
          className="h-screen object-cover sm:opacity-80 w-screen"
        />
      </div>

      {/* Right side form */}
      <div
        className={`flex flex-col gap-2 text-base-content bg-base-100 dark:bg-slate-900 shadow-xl items-center justify-center pt-8 w-full mx-auto sm:w-fit xs:rounded-r-xl rounded-se-[60px] absolute bottom-0 -left-36 sm:static transition-all transform sm:flex-1 ${
          isLoaded ? "translate-x-36 sm:translate-x-0" : ""
        } duration-[1000ms] ease-in-out`}
      >
        {/* Logo */}
        <div className="glass bg-neutral px-6 sm:px-10 rounded-t-full">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="w-20 sm:w-24 drop-shadow-lg animate-wave"
            />
          </Link>
        </div>

        <h2 className="text-3xl font-bold mt-4">Create Account</h2>
        <p className="text-sm text-gray-500 -mt-1">Join BariVara today</p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded px-8 pt-4 pb-4 w-[22rem] md:w-96 space-y-5"
        >
          {error && (
            <p className="text-red-500 flex items-center gap-2 text-sm bg-red-50 border border-red-200 rounded-lg p-2">
              <BiSolidErrorAlt className="text-lg shrink-0" />
              {error}
            </p>
          )}

          {/* Full Name */}
          <div className="relative">
            <label htmlFor="name" className="block mb-2 text-sm sm:text-base font-medium">
              Full Name
            </label>
            <FaUserAlt className="opacity-40 absolute bottom-3 -left-2 sm:bottom-3.5" />
            <input
              id="name"
              type="text"
              className="w-full p-1.5 sm:p-2.5 mt-1 rounded border-b-2 appearance-none px-3 bg-transparent focus:border-b-primary focus:outline-none"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange("name")}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block mb-2 text-sm sm:text-base font-medium">
              Email
            </label>
            <FaRegUser className="opacity-40 absolute bottom-3 -left-2 sm:bottom-3.5" />
            <input
              id="email"
              type="email"
              className="w-full p-1.5 sm:p-2.5 mt-1 rounded border-b-2 appearance-none px-3 bg-transparent focus:border-b-primary focus:outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm sm:text-base font-medium">
              Password
            </label>
            <FaUnlockAlt className="opacity-40 absolute bottom-3 -left-2 sm:bottom-3.5" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-1.5 sm:p-2.5 mt-1 rounded border-b-2 appearance-none px-3 bg-transparent focus:border-b-primary focus:outline-none pr-10"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-2.5 text-gray-400 hover:text-primary"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm sm:text-base font-medium">
              Confirm Password
            </label>
            <FaUnlockAlt className="opacity-40 absolute bottom-3 -left-2 sm:bottom-3.5" />
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              className="w-full p-1.5 sm:p-2.5 mt-1 rounded border-b-2 appearance-none px-3 bg-transparent focus:border-b-primary focus:outline-none pr-10"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 bottom-2.5 text-gray-400 hover:text-primary"
            >
              {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-500 via-primary to-cyan-500 hover:from-cyan-400 hover:to-cyan-400 text-white transition-all duration-500 font-bold py-2 px-4 rounded-full w-full disabled:opacity-60"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center leading-10 pb-5 sm:pb-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary uppercase hover:text-lg transition-all duration-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
