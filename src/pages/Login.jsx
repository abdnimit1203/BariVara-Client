import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import CompoWrapper from "../components/Wrapper/CompoWrapper";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
const userData = {
  username: "admin",
  username2: "akbar",
  password: "123456",
};
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loginInfo"));

  if (user) {
    return <Navigate to="/" />;
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const lowerUsername = data.username.toLowerCase();
    const updatedData = { ...data, username: lowerUsername };
    if (
      (data.username.toLowerCase() === userData.username &&
        data.password === userData.password) ||
      data.username.toLowerCase() === userData.username2
    ) {
      toast.success("Login Successful!");
      localStorage.setItem("loginInfo", JSON.stringify(updatedData));
      reset();
      navigate(location?.state ? location.state : "/");
    } else {
      toast.error("Username or password not matched");
    }
  };
  return (
    <CompoWrapper>
      <div className="flex  flex-col gap-2 min-h-screen items-center justify-center  ">
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
        {/* FORM */}
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                {...register("username", { required: true })}
                className={`w-full p-2 mt-1 border rounded ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="text-red-500">Username is required</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className={`w-full p-2 mt-1 border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </section>
      </div>
    </CompoWrapper>
  );
};

export default Login;
