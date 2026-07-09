import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import NewLeaseHolderForm from "../Forms/NewLeaseHolderForm";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { BsSpeedometer2 } from "react-icons/bs";
import { FaUserPlus, FaTimes, FaPhoneAlt, FaCalendarAlt, FaArrowLeft, FaHome } from "react-icons/fa";
import CompoWrapper from "../Wrapper/CompoWrapper";
import monthYearFormat from "./../../utils/monthYearFormat";

const SingleRoom = () => {
  const roomData = useLoaderData();
  const { _id, category, position, hasMeter, leaseholder = [], rent, roomNo } = roomData || {};
  const [isFormOpen, setIsFormOpen] = useState(false);

  const currentTenant = leaseholder.length > 0 ? leaseholder[0] : null;

  return (
    <CompoWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 text-left">
        {/* Navigation & Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
          <div className="flex items-center gap-3">
            <Link
              to="/my-rooms"
              className="btn btn-sm btn-circle btn-ghost border border-base-300 hover:bg-base-200 transition-all"
              title="Back to Rooms"
            >
              <FaArrowLeft className="text-base-content/70" />
            </Link>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Room Management</span>
              <h1 className="text-2xl sm:text-3xl font-black text-base-content flex items-center gap-2">
                <FaHome className="text-primary inline text-xl" />
                Room : {roomNo}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="badge badge-primary badge-outline px-3 py-3 text-xs font-semibold">
              অবস্থান: {category}
            </span>
            <span className="badge badge-secondary badge-outline px-3 py-3 text-xs font-semibold">
              সাইড: {position}
            </span>
          </div>
        </div>

        {/* Room Financial & Status Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Rent */}
          <div className="bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between gap-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-base-content/60">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">মাসিক ভাড়া</span>
              <GiMoneyStack className="text-2xl text-primary" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-base-content">{rent || 0}</span>
              <span className="text-xs text-base-content/60 font-bold ml-1">টাকা</span>
            </div>
          </div>

          {/* Meter Status */}
          <div className="bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between gap-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-base-content/60">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">বিদ্যুৎ মিটার</span>
              <BsSpeedometer2 className="text-2xl text-secondary" />
            </div>
            <div>
              <span className={`badge ${hasMeter ? "badge-success" : "badge-error"} text-white font-bold px-3 py-3 text-xs sm:text-sm`}>
                {hasMeter ? "আছে (Yes)" : "নেই (No)"}
              </span>
            </div>
          </div>

          {/* Advance */}
          <div className="bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between gap-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-base-content/60">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">অগ্রিম (Advance)</span>
              <GrMoney className="text-2xl text-accent" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-base-content">
                {currentTenant?.advance || 0}
              </span>
              <span className="text-xs text-base-content/60 font-bold ml-1">টাকা</span>
            </div>
          </div>

          {/* Due */}
          <div className="bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between gap-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-base-content/60">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">বকেয়া (Due)</span>
              <GrMoney className="text-2xl text-error" />
            </div>
            <div>
              <span className={`text-xl sm:text-2xl font-black ${currentTenant?.due > 0 ? "text-error" : "text-base-content"}`}>
                {currentTenant?.due || 0}
              </span>
              <span className="text-xs text-base-content/60 font-bold ml-1">টাকা</span>
            </div>
          </div>
        </div>

        {/* Current Tenant Detailed Section */}
        <div className="bg-base-100 border border-base-300 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-base-200 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                বর্তমান ভাড়াটিয়া (Current Tenant)
              </h2>
              <p className="text-xs text-base-content/60 mt-0.5">
                Active leaseholder information and contact details
              </p>
            </div>
            {currentTenant && (
              <span className="badge badge-success text-white font-semibold self-start sm:self-auto px-3 py-3">
                Active Occupant
              </span>
            )}
          </div>

          {currentTenant ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 bg-base-200/50 p-4 sm:p-6 rounded-2xl border border-base-200">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">নাম (Name)</span>
                <p className="text-lg sm:text-xl font-black text-primary">{currentTenant?.name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider flex items-center gap-1.5">
                  <FaPhoneAlt className="text-xs text-secondary" /> ফোন (Phone)
                </span>
                <p className="text-base sm:text-lg font-mono font-bold text-base-content">
                  {currentTenant?.phoneNumber || "N/A"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider flex items-center gap-1.5">
                  <FaCalendarAlt className="text-xs text-accent" /> ভাড়া শুরু (Rent From)
                </span>
                <p className="text-base sm:text-lg font-semibold text-base-content">
                  {currentTenant?.rentFrom ? monthYearFormat(currentTenant.rentFrom) : "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-base-200/30 border-2 border-dashed border-base-300 rounded-2xl p-8 text-center space-y-2">
              <p className="text-base sm:text-lg font-bold text-base-content/70">
                বর্তমানে কোনো ভাড়াটিয়া নেই (No Active Tenant)
              </p>
              <p className="text-xs sm:text-sm text-base-content/50 max-w-md mx-auto">
                এই রুমটি বর্তমানে ফাঁকা। নিচের বাটনটি ক্লিক করে নতুন ভাড়াটিয়ার তথ্য যুক্ত করুন।
              </p>
            </div>
          )}
        </div>

        {/* Add New Tenant Action & Form Area */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={`btn ${isFormOpen ? "btn-error text-white" : "btn-primary"} sm:btn-md btn-sm rounded-xl font-bold px-6 shadow-md hover:shadow-lg transition-all flex items-center gap-2`}
            >
              {isFormOpen ? (
                <>
                  <FaTimes />
                  <span>ফর্ম বন্ধ করুন (Close Form)</span>
                </>
              ) : (
                <>
                  <FaUserPlus />
                  <span>নতুন ভাড়াটিয়া অ্যাড করুন (Add Tenant)</span>
                </>
              )}
            </button>
          </div>

          {/* Form Container with animation transition */}
          {isFormOpen && (
            <div className="transition-all duration-300 ease-in-out pt-2">
              <NewLeaseHolderForm id={_id} onSuccess={() => setIsFormOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </CompoWrapper>
  );
};

export default SingleRoom;

