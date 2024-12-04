import LogoutButton from "../components/Buttons/LogOutButton";
import Clock from "./Clock";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("loginInfo"));
  console.log("USER = ", user);
  return (
    <div>
      <div className=" border-4 shadow-xl shadow-black flex p-4 justify-center text-center flex-col space-y-4 rounded-xl lg:flex-row lg:p-1 lg:">
        <img
        //   src="https://i.ibb.co.com/dPW8Fzv/agent-dp.jpg"
          src="https://i.ibb.co.com/k0VWcKz/agent3.jpg"
          alt="admin-abd"
          className="w-20 aspect-square lg:hidden  mx-auto rounded-full"
        />

        <p className="lg:hidden ">Hello, {user.name}</p>
        <Clock />
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserProfile;
