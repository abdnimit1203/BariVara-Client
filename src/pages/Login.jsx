import { useEffect, useState } from "react";
import { FaRegUser, FaUnlockAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../API/api";
import toast from "react-hot-toast";
import { GrFacebookOption } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa6";
import { BiSolidErrorAlt } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loginInfo"));
  // for animation
  const [isLoaded, setIsLoaded] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Trigger the transition once the component is mounted
  useEffect(() => {
    // After the page loads, set the state to trigger the transition
    setIsLoaded(true);
  }, []);

  if (user) {
    return <Navigate to="/" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      localStorage.setItem("token", data.token);
      toast.success("Login Successful!");
      localStorage.setItem("loginInfo", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      const targetRoute = location?.state ? location.state : "/";
      navigate(targetRoute);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="bg-center bg-cover min-h-screen sm:flex-center sm:flex    relative ">
      <div className="bg-black z-10 w-full bg-cover sm:flex-1">
        <img
          src="/aerial.jpg"
          
          alt="Background image ..."
          className="h-screen object-cover sm:opacity-80 w-screen"
        />
      </div>
      <div
        className={` flex flex-col gap-2  text-black bg-white shadow-xl items-center justify-center pt-8 w-full mx-auto sm:w-fit xs:rounded-r-xl rounded-se-[60px] absolute bottom-0 -left-36  sm:static transition-all transform sm:flex-1 ${
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
          className="   rounded px-8 pt-6 pb-8 w-[22rem] md:w-96 space-y-6"
        >
          {error && (
            <p className="text-red-500 flex gap-5 pb-4 ">
              <BiSolidErrorAlt className="text-xl -mx-4" />
              {error}
            </p>
          )}
          <div className="mb-4 relative">
            <label
              htmlFor="userName"
              className="block  mb-2 text-sm sm:text-lg"
            >
              Username
            </label>
            <FaRegUser className="opacity-50 absolute bottom-3 -left-2 sm:bottom-5" />

            <input
              type="text"
              className="w-full p-1.5 sm:p-3 mt-1  rounded border-b-2 appearance-none px-3 bg-transparent   focus:border-b-primary focus:outline-none"
              id="userName"
              placeholder="Type your usename"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
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
        <section className="flex  gap-6 flex-center ">
          <span className="p-2  border-2 rounded-xl text-base sm:text-2xl text-blue-600  ">
            <GrFacebookOption />
          </span>
          <span className="p-2  border-2 rounded-xl text-base sm:text-2xl  ">
            <FcGoogle />
          </span>
          <span className="p-2  border-2 rounded-xl text-base sm:text-2xl text-cyan-700  ">
            <FaLinkedinIn />
          </span>
        </section>
        <p className="text-center leading-10 pb-5 sm:pb-2 text-gray-600">
          Or create a new account <br />
          <Link
            to={"/register"}
            className="font-semibold text-primary uppercase hover:text-lg transition-all duration-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
