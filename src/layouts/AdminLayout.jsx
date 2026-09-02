import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaDoorOpen,
  FaBolt,
  FaMoneyBillWave,
  FaHome,
  FaBars,
  FaTimes,
  FaUserShield,
  FaUserCog,
  FaSlidersH,
} from "react-icons/fa";
import { FcCalculator } from "react-icons/fc";
import ThemeToggle from "../components/Navbar/ThemeToggle";
import LogoutButton from "../components/Buttons/LogOutButton";
import UniversalModal from "../components/Modals/UniversalModal";
import Calculator from "../utils/Calculator";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const { profile, firebaseUser } = useAuth();
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      to: "/admin/dashboard",
      label: "Main Dashboard",
      subLabel: "ফাইন্যান্সিয়াল ও রাজস্ব অ্যানালিটিক্স",
      icon: <FaChartPie className="text-lg text-cyan-400" />,
    },
    {
      to: "/admin/tenants",
      label: "Tenant Management",
      subLabel: "ভাড়াটিয়া তালিকা, এডিট ও বকেয়া",
      icon: <FaUsers className="text-lg text-emerald-400" />,
    },
    {
      to: "/admin/rooms",
      label: "My Rooms (Map)",
      subLabel: "হাউস ম্যাপ ও রুম ক্যাটাগরি",
      icon: <FaDoorOpen className="text-lg text-amber-400" />,
    },
    {
      to: "/admin/meter",
      label: "Meter Number",
      subLabel: "মাসিক মিটার রিডিং এন্ট্রি",
      icon: <FaBolt className="text-lg text-yellow-400" />,
    },
    {
      to: "/admin/bills",
      label: "Monthly Bills",
      subLabel: "বিল স্টেটমেন্ট, রসিদ ও পেমেন্ট",
      icon: <FaMoneyBillWave className="text-lg text-green-400" />,
    },
    ...(profile?.role === "superadmin"
      ? [
          {
            to: "/admin/users",
            label: "User Management",
            subLabel: "ইউজার তালিকা ও রোল নিয়ন্ত্রণ",
            icon: <FaUserCog className="text-lg text-purple-400" />,
          },
          {
            to: "/admin/utility-settings",
            label: "Utility Settings",
            subLabel: "রেট ও ইউটিলিটি সেটিংস",
            icon: <FaSlidersH className="text-lg text-rose-400" />,
          },
        ]
      : []),
  ];

  // Helper to get active page title
  const getPageTitle = () => {
    const activeItem = navItems.find((item) => location.pathname.startsWith(item.to));
    return activeItem ? activeItem.label : "Admin Control Center";
  };

  const navLinksContent = (
    <div className="flex flex-col justify-between h-full space-y-4">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-cyan-400/70 border-b border-white/10 mb-2">
          Management Sections
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
                isActive
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 font-bold translate-x-1"
                  : "text-slate-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
              }`
            }
          >
            <div className="p-1.5 rounded-lg bg-white/10 shrink-0">
              {item.icon}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs">{item.label}</span>
              <span className="text-[10px] opacity-60 font-normal leading-tight">
                {item.subLabel}
              </span>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Sidebar Bottom Utilities */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/10 hover:text-white transition"
        >
          <FaHome className="text-cyan-400" />
          <span>পাবলিক ওয়েবসাইটে যান (Public Site)</span>
        </Link>

        {/* User Card */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0 border border-cyan-400/30">
              <FaUserShield />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white truncate">
                {profile?.name || firebaseUser?.displayName || "Admin"}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">
                {profile?.role ? profile.role : firebaseUser?.email || ""}
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100 dark:bg-slate-950 text-base-content flex flex-col lg:flex-row">
      {/* 1. DESKTOP STICKY SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden lg:flex lg:flex-col w-64 xl:w-72 bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 text-white min-h-screen sticky top-0 border-r border-cyan-500/20 p-4 shadow-2xl z-40">
        {/* Brand Banner */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-3">
          <Link to="/" className="shrink-0">
            <img src="/logo.png" alt="BariVara logo" className="w-10 animate-wave" />
          </Link>
          <div className="flex flex-col text-left">
            <h2 className="text-sm font-black text-white tracking-wide">
              নুরেজা ভিলা
            </h2>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              Admin Control Shell
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="flex-1 overflow-y-auto pr-1">{navLinksContent}</div>
      </aside>

      {/* 2. MOBILE TOPBAR & DRAWER (Visible on Small Screens) */}
      <header className="lg:hidden sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-b border-cyan-500/30 px-3 py-2.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Admin Menu"
            className="btn btn-sm btn-ghost btn-square text-white hover:bg-white/10"
          >
            <FaBars className="text-lg" />
          </button>
          <div className="flex flex-col text-left">
            <h1 className="text-xs sm:text-sm font-black text-white truncate max-w-[170px] xs:max-w-[220px]">
              {getPageTitle()}
            </h1>
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">
              Admin Management
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCalcOpen(true)}
            title="Calculator"
            className="p-1 hover:scale-110 transition active:scale-95"
          >
            <FcCalculator className="text-2xl animate-wave" />
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[100000] lg:hidden transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] h-full bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 text-white p-4 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="w-8" />
                  <span className="text-xs font-black uppercase text-cyan-400">
                    Admin Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn btn-xs btn-circle btn-ghost text-white hover:bg-white/20"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {navLinksContent}
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN OUTLET AREA */}
      <main className="flex-1 w-full min-h-[calc(100vh-60px)] lg:min-h-screen overflow-x-hidden p-3 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Calculator Modal */}
      <UniversalModal
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
        title="CALCULATOR"
      >
        <Calculator />
      </UniversalModal>
    </div>
  );
};

export default AdminLayout;
