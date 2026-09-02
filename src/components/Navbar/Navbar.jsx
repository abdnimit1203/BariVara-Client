import { Link, NavLink } from "react-router-dom";
import { FaHouseChimneyUser, FaUserShield } from "react-icons/fa6";
import UserProfile from "../../utils/UserProfile";
import { FcCalculator } from "react-icons/fc";

import UniversalModal from "../Modals/UniversalModal";
import { useState } from "react";
import Calculator from "../../utils/Calculator";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const STAFF_ROLES = ["superadmin", "admin"];

const Navbar = () => {
  const { isAuthenticated, role } = useAuth();
  const isStaff = STAFF_ROLES.includes(role);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navlinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "active bg-primary px-3 py-2 text-neutral rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-neutral transition duration-200 rounded-xl"
        }
      >
        <FaHouseChimneyUser className="md:hidden inline text-xl mr-3" /> Home
      </NavLink>

      {isStaff ? (
        <>
          {/* Single entry point into the admin shell — everything else (Tenant
              Management, My Rooms, Meter, Bills, Users) lives inside that
              shell's own sidebar, not duplicated here. */}
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-3 py-2 rounded-xl transition duration-200 flex items-center gap-1.5 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/30"
                  : "bg-cyan-950/60 hover:bg-cyan-800 text-cyan-300 border border-cyan-500/40"
              }`
            }
          >
            <FaUserShield className="inline text-base text-cyan-300" />
            <span>Dashboard</span>
          </NavLink>

          <UserProfile />
        </>
      ) : isAuthenticated ? (
        <UserProfile />
      ) : (
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active bg-primary px-3 py-2 text-neutral rounded-xl"
              : "hover:bg-primary px-3 py-2 hover:text-neutral transition duration-200 rounded-xl"
          }
        >
          Login
        </NavLink>
      )}
    </>
  );

  return (
    <div className="drawer text-base-100 font-semibold z-[100]">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-b border-cyan-500/30 shadow-xl px-2 sm:px-6">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
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

          <div className="flex-1 xl:px-2 xl:mx-2 xl:ml-6 w-full lg:ml-0 flex items-center justify-between text-white">
            <Link to={"/"} className="mx-auto lg:mx-0">
              <img src="/logo.png" alt="BariVara logo" className="w-20 -ml-2 animate-wave" />
            </Link>

            <div className="flex items-center gap-3 absolute right-4 lg:hidden">
              <ThemeToggle />
              <button
                onClick={openModal}
                title="বিল ক্যালকুলেটর (Calculator)"
                className="p-1 hover:scale-110 transition active:scale-95"
              >
                <FcCalculator className="text-4xl sm:text-5xl animate-wave" />
              </button>
            </div>

            <UniversalModal
              isOpen={isModalOpen}
              onClose={closeModal}
              title="CALCULATOR"
            >
              <Calculator />
            </UniversalModal>
          </div>
          <div className="flex-none hidden lg:flex items-center space-x-4">
            <div className="menu menu-horizontal space-x-3 items-center">
              {navlinks}
            </div>
            <button
              onClick={openModal}
              title="বিল ক্যালকুলেটর (Calculator)"
              className="p-1 hover:scale-110 transition active:scale-95"
            >
              <FcCalculator className="text-4xl sm:text-5xl animate-wave" />
            </button>
            <div className="pl-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side z-[9999]">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 text-white space-y-4 xl:space-x-6 justify-center border-r border-cyan-500/30 shadow-2xl">
          <Link to={"/"} className="mx-auto">
            <img
              src="/logo.png"
              alt="BariVara logo"
              className="w-20 mx-auto mb-4 animate-wave border-b-2 border-cyan-500/30 pb-2"
            />
          </Link>
          <div className="flex justify-center mb-6 sm:hidden">
            <ThemeToggle />
          </div>
          {navlinks}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
