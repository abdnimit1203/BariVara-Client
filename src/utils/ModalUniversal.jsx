/* eslint-disable react/prop-types */
import { FaEdit, FaTimes, FaPhoneAlt, FaCalendarAlt, FaHistory, FaMapMarkerAlt, FaCompass } from "react-icons/fa";
import ClipboardButton from "./ClipboardButton";
import { Link } from "react-router-dom";

const ModalUniversal = ({ roomData }) => {
  const { _id, roomNo, position, category, leaseholder = [], rent } = roomData || {};
  const currentTenant = leaseholder.length > 0 ? leaseholder[0] : null;

  return (
    <div className="text-black w-full">
      {/* Trigger Button */}
      <button
        className="btn btn-warning btn-xs mx-auto rounded-md w-full font-bold shadow-sm hover:brightness-105 transition-all text-gray-900"
        onClick={() => document.getElementById(roomNo)?.showModal()}
      >
        View Details
      </button>

      {/* Dialog Modal */}
      <dialog id={`${roomNo}`} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-2xl bg-base-100 border border-base-300 max-h-[90vh] overflow-y-auto space-y-6 text-left">
          {/* Close Header Bar */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-base-content/70 hover:bg-base-200">
              <FaTimes className="text-base" />
            </button>
          </form>

          {/* Modal Header & Room Title */}
          <div className="flex flex-col items-center gap-2 border-b border-base-200 pb-5 pt-1">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              Room No: {roomNo}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-base-content text-center">
              {category}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
              <span className="badge badge-lg badge-success font-bold text-white shadow-sm px-4 py-3.5 text-xs sm:text-sm">
                ভাড়া: {rent} টাকা
              </span>
              <span className="badge badge-lg badge-outline border-base-300 gap-1.5 px-3 py-3.5 text-xs font-semibold text-base-content/80">
                <FaCompass className="text-primary text-xs" /> সাইড: {position}
              </span>
              <span className="badge badge-lg badge-outline border-base-300 gap-1.5 px-3 py-3.5 text-xs font-semibold text-base-content/80">
                <FaMapMarkerAlt className="text-secondary text-xs" /> লোকেশন: {category}
              </span>
            </div>
          </div>

          {/* Quick Action Bar (Go To Edit Page) */}
          <div className="flex justify-center">
            <Link
              to={`/admin/rooms/${_id}`}
              onClick={() => {
                const modal = document.getElementById(roomNo);
                if (modal) modal.close();
              }}
              className="btn btn-error btn-sm sm:btn-md text-white font-bold w-full rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 py-3 h-auto"
            >
              <FaEdit className="text-base" />
              <span>রুম এডিট পেইজে যান (GO TO EDIT PAGE)</span>
            </Link>
          </div>

          {/* Current Tenant Information Section */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-2">
              <span>বর্তমান ভাড়াটিয়া (Current Tenant)</span>
            </h4>

            {currentTenant && currentTenant.name ? (
              <div className="bg-base-200/60 border border-base-300 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
                {/* Name & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-base-300 pb-3.5">
                  <div>
                    <span className="text-[11px] text-base-content/60 font-semibold uppercase tracking-wider">ভাড়াটিয়ার নাম</span>
                    <p className="text-lg sm:text-xl font-black text-primary mt-0.5">{currentTenant.name}</p>
                  </div>
                  <span className="badge badge-primary badge-sm sm:badge-md text-white font-bold self-start sm:self-auto px-3 py-2.5">
                    Active Tenant
                  </span>
                </div>

                {/* Phone Number with Copy Button */}
                <div className="flex items-center justify-between gap-3 bg-base-100 p-3.5 rounded-xl border border-base-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <FaPhoneAlt className="text-sm" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-base-content/60 font-semibold uppercase">ফোন নম্বর</span>
                      <span className="text-sm sm:text-base font-mono font-bold text-base-content">
                        {currentTenant.phoneNumber || "N/A"}
                      </span>
                    </div>
                  </div>
                  {currentTenant.phoneNumber && (
                    <ClipboardButton textToCopy={currentTenant.phoneNumber} />
                  )}
                </div>

                {/* Dates Grid */}
                <div className="grid grid-cols-2 gap-3 pt-0.5">
                  <div className="bg-base-100 p-3.5 rounded-xl border border-base-300 flex flex-col gap-1">
                    <span className="text-[11px] text-base-content/60 font-semibold uppercase flex items-center gap-1">
                      <FaCalendarAlt className="text-xs text-accent" /> আগমন (Rent From)
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-base-content">
                      {currentTenant.rentFrom
                        ? new Date(currentTenant.rentFrom).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </div>

                  <div className="bg-base-100 p-3.5 rounded-xl border border-base-300 flex flex-col gap-1">
                    <span className="text-[11px] text-base-content/60 font-semibold uppercase flex items-center gap-1">
                      <FaCalendarAlt className="text-xs text-success" /> বিদায় (Rent To)
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-success">
                      {currentTenant.rentTo
                        ? new Date(currentTenant.rentTo).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Present..."}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-base-200/40 border-2 border-dashed border-base-300 rounded-2xl p-6 text-center space-y-1">
                <p className="font-bold text-base-content/70">বর্তমানে কোনো ভাড়াটিয়া নেই (No Active Tenant)</p>
                <p className="text-xs text-base-content/50">রুম এডিট পেইজে গিয়ে নতুন ভাড়াটিয়া যুক্ত করুন</p>
              </div>
            )}
          </div>

          {/* Previous Tenants History Collapse */}
          {leaseholder && leaseholder.length > 1 && (
            <div className="collapse collapse-arrow bg-base-200/40 border border-base-300 rounded-2xl">
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-bold text-xs sm:text-sm text-base-content/80 flex items-center gap-2 py-3.5">
                <FaHistory className="text-secondary" />
                <span>পূর্ববর্তী ভাড়াটিয়া ইতিহাস (Previous Tenants: {leaseholder.length - 1})</span>
              </div>
              <div className="collapse-content space-y-3 pt-2 border-t border-base-200">
                {leaseholder.slice(1).map((item, index) => (
                  <div
                    key={index}
                    className="bg-base-100 p-3.5 rounded-xl border border-base-200 shadow-sm space-y-2 text-xs sm:text-sm mt-2"
                  >
                    <div className="flex justify-between items-center font-bold text-base-content border-b border-base-200 pb-2">
                      <span className="text-primary font-black">{item?.name || "Unknown"}</span>
                      <span className="badge badge-ghost badge-sm text-base-content/60 font-mono">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-base-content/70">
                        ফোন: <span className="font-mono text-base-content font-bold">{item?.phoneNumber || "N/A"}</span>
                      </span>
                      {item?.phoneNumber && <ClipboardButton textToCopy={item?.phoneNumber} />}
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-base-200/60 text-[11px] text-base-content/70">
                      <div>
                        <span className="font-semibold block text-base-content/50 uppercase">আগমন</span>
                        <span className="font-medium">
                          {item?.rentFrom
                            ? new Date(item.rentFrom).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                            : "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold block text-base-content/50 uppercase">বিদায়</span>
                        <span className="font-medium">
                          {item?.rentTo
                            ? new Date(item.rentTo).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ModalUniversal;

