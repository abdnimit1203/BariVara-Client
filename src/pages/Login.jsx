import { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../API/api";
import toast from "react-hot-toast";
import { GrFacebookOption } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa6";
import { BiSolidErrorAlt } from "react-icons/bi";

const Login = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loginInfo"));

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
      navigate(location?.state ? location.state : "/");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="flex  flex-col gap-2 min-h-screen items-center justify-center ">
      {/* Form Headings */}
      <div className=" bg-neutral px-10 rounded-t-full  ">
        <Link to={"/"}>
          <img
            src="/logo.png"
            alt="logo"
            className="w-24 drop-shadow-lg animate-wave"
          />
        </Link>
      </div>
      <h2 className="text-3xl font-bold">LOG IN</h2>
      <h2 className="text-lg font-bold opacity-70">Lets Hop In</h2>
      <p>Login and start inserting data!</p>
      <section className="flex gap-6 flex-center">
        <span className="p-2 border rounded-xl text-2xl text-blue-600">
          <GrFacebookOption />
        </span>
        <span className="p-2 border rounded-xl text-2xl ">
          <FcGoogle />
        </span>
        <span className="p-2 border rounded-xl text-2xl text-cyan-700">
          <FaLinkedinIn />
        </span>
      </section>

      {/* FORM STARTS */}
      <form
        onSubmit={handleSubmit}
        className="bg-white  shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        {error && (
          <p className="text-red-500 flex gap-5 pb-4 ">
            <BiSolidErrorAlt  className="text-xl -mx-4"/>
            {error}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-lg">Username</label>
          <input
            type="text"
            className="w-full p-3 mt-1 border rounded shadow appearance-none px-3 text-gray-700 focus:outline-primary"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-lg">Password</label>
          <input
            type="password"
            className="w-full p-3 mt-1 border rounded shadow appearance-none px-3 text-gray-700 focus:outline-primary"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
