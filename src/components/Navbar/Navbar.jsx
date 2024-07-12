import { Link, NavLink } from "react-router-dom";
import { FcDisplay } from "react-icons/fc";
import { FaHouseChimneyUser,FaMoneyBill  } from 'react-icons/fa6';

const Navbar = () => {
  const navlinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2  text-neutral rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-neutral transition duration-200 rounded-xl"
        }
      >
      <FaHouseChimneyUser className="md:hidden inline text-xl mr-3"/>  Home
      </NavLink>
      <NavLink
        to="/meterNumber"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2  text-neutral rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-neutral transition duration-200 rounded-xl"
        }
      >
       <FcDisplay className="md:hidden inline text-xl mr-3"/>
       Meter Number
      </NavLink>
      <NavLink
        to="/monthlyBills"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2  text-neutral rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-neutral transition duration-200 rounded-xl"
        }
      >
       <FaMoneyBill  className="md:hidden inline text-xl mr-3 text-green-400 "/>
       Monthly Bills
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2  text-neutral rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-neutral transition duration-200 rounded-xl"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2  text-neutral rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-neutral transition duration-200 rounded-xl"
        }
      >
        Register
      </NavLink>
    </>
  );
  return (
    <div className="drawer text-base-100 font-semibold">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-neutral ">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          
          
          <div className="flex-1 xl:px-2 xl:mx-2 xl:ml-6  w-full -ml-10 lg:ml-0">
          <Link to={'/'} className="mx-auto">
          <img src="/logo.png" alt="BariVara logo" className="w-20 mx-auto" />
          </Link>
        </div>
          <div className="flex-none hidden lg:block space-x-6">
            <div className="menu menu-horizontal space-x-3">{navlinks}</div>
          </div>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-neutral space-y-4 xl:space-x-6 justify-center ">
        <Link to={'/'} className="mx-auto">
          <img src="/logo.png" alt="BariVara logo" className="w-20 mx-auto mb-10 animate-wave border-b-2" />
          </Link>
          {navlinks}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
