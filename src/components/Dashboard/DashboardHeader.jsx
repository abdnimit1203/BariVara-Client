import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaBuilding, FaDownload, FaSyncAlt, FaCalculator } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";

const DashboardHeader = ({ selectedDate, handleDateChange, totalRooms, totalPaidCount, isLoading, onRefresh }) => {
  const user = JSON.parse(localStorage.getItem("loginInfo")) || { name: "Admin" };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 md:p-10 shadow-2xl border border-blue-500/30 mb-8">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Welcome Content */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>লাইভ অ্যানালিটিক্স হাব (Analytics Hub)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            স্বাগতম, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">{user.name || "প্রোপার্টি ম্যানেজার"}</span>! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
            <FaBuilding className="text-cyan-400 shrink-0" />
            <span>প্রোপার্টি: <strong className="text-white">নুরেজা ভিলা (Holding: 31, Syed Ali Munsi Road)</strong></span>
          </p>
        </div>

        {/* Right Action & Month Selector Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Month/Year DatePicker Pill */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-2xl flex items-center justify-between sm:justify-start gap-3 shadow-lg">
            <div className="flex items-center gap-2 text-cyan-300 text-sm font-bold">
              <FaCalendarAlt className="text-base" />
              <span>বিলিং মাস:</span>
            </div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="bg-slate-900/80 text-white font-bold text-sm px-3 py-1.5 rounded-xl border border-cyan-500/40 focus:outline-none cursor-pointer w-36 text-center hover:bg-slate-900 transition"
            />
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            title="রিফ্রেশ করুন"
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/15 transition flex items-center justify-center gap-2 text-sm font-bold active:scale-95 shadow"
          >
            <FaSyncAlt className={`${isLoading ? "animate-spin text-cyan-400" : ""}`} />
            <span className="sm:hidden">ডাটা রিফ্রেশ</span>
          </button>
        </div>
      </div>

      {/* Mini Progress Status Bar inside Header */}
      <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center justify-between bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5">
          <span className="text-slate-400">মোট রুম সংখ্যা:</span>
          <span className="font-bold text-white text-sm">{totalRooms}টি</span>
        </div>
        <div className="flex items-center justify-between bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5">
          <span className="text-slate-400">ভাড়া পরিশোধিত:</span>
          <span className="font-bold text-emerald-400 text-sm">{totalPaidCount} / {totalRooms} রুম</span>
        </div>
        <div className="flex items-center justify-between bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5">
          <span className="text-slate-400">পরিশোধের হার:</span>
          <span className="font-bold text-cyan-300 text-sm">
            {totalRooms > 0 ? Math.round((totalPaidCount / totalRooms) * 100) : 0}%
          </span>
        </div>
        <div className="flex items-center justify-between bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5">
          <span className="text-slate-400">স্ট্যাটাস:</span>
          <span className="font-bold text-amber-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            সক্রিয় হিসাব
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
