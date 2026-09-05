/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaExclamationCircle,
  FaFilter,
  FaDoorOpen,
  FaEdit,
  FaSave,
  FaMoneyBillWave,
  FaBolt,
  FaTint,
  FaFire,
  FaTrashAlt,
} from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";
import UniversalModal from "../Modals/UniversalModal";
import { updatePaymentById } from "../../API/api";
import toast from "react-hot-toast";

const RoomStatusTable = ({ bills = [], refetch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'paid' | 'due'

  // Edit Modal State
  const [selectedBill, setSelectedBill] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    rent: "",
    currentBill: "",
    waterBill: "",
    gasBill: "",
    wasteBill: "",
    due: "",
  });

  const handleOpenEditModal = (bill) => {
    setSelectedBill(bill);
    setFormData({
      rent: bill.rent !== undefined && bill.rent !== null ? bill.rent : 0,
      currentBill:
        bill.currentBill !== undefined && bill.currentBill !== null
          ? bill.currentBill
          : 0,
      waterBill:
        bill.waterBill !== undefined && bill.waterBill !== null
          ? bill.waterBill
          : 0,
      gasBill:
        bill.gasBill !== undefined && bill.gasBill !== null ? bill.gasBill : 0,
      wasteBill:
        bill.wasteBill !== undefined && bill.wasteBill !== null
          ? bill.wasteBill
          : 0,
      due: bill.due !== undefined && bill.due !== null ? bill.due : 0,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBill(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Live-typing preview only — the backend is the source of truth and
  // recomputes independently on save via calculateBillTotal in
  // ABD_BariVara_Be/src/modules/billing.js. This is a deliberate, small
  // duplication (separate repo/runtime, no shared package): keep the two
  // formulas identical by hand if either one changes.
  const liveCalculatedTotal =
    (Number(formData.rent) || 0) +
    (Number(formData.due) || 0) +
    (Number(formData.waterBill) || 0) +
    (Number(formData.gasBill) || 0) +
    (Number(formData.wasteBill) || 0) +
    (Number(formData.currentBill) || 0);

  const handleSaveEditBill = async (e) => {
    e.preventDefault();
    if (!selectedBill?._id) return;

    setIsSubmitting(true);
    const toastId = toast.loading("মাসিক বিল আপডেট করা হচ্ছে...");
    try {
      const payload = {
        rent: Number(formData.rent) || 0,
        currentBill: Number(formData.currentBill) || 0,
        waterBill: Number(formData.waterBill) || 0,
        gasBill: Number(formData.gasBill) || 0,
        wasteBill: Number(formData.wasteBill) || 0,
        due: Number(formData.due) || 0,
      };

      await updatePaymentById(selectedBill._id, payload);
      toast.success(
        `রুম ${selectedBill.roomNo}-এর মাসিক বিল সফলভাবে আপডেট করা হয়েছে!`,
        { id: toastId }
      );
      setIsEditModalOpen(false);
      setSelectedBill(null);

      if (typeof refetch === "function") {
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "বিল আপডেট করতে সমস্যা হয়েছে!",
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBills = bills.filter((bill) => {
    const isPaid = bill.paid !== "false";
    const matchesFilter =
      statusFilter === "all" ||
      (statusFilter === "paid" && isPaid) ||
      (statusFilter === "due" && !isPaid);

    const matchesSearch =
      !searchTerm ||
      String(bill.roomNo).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(bill.category || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const paidCount = bills.filter((b) => b.paid !== "false").length;
  const dueCount = bills.length - paidCount;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-black flex items-center gap-2">
            <FaDoorOpen className="text-cyan-400" />
            <span>রুম ও ভাড়াটিয়া স্ট্যাটাস তালিকা</span>
            <span className="bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {bills.length}টি রুম
            </span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            প্রতিটি রুমের মূল ভাড়া, বিদ্যুৎ বিল এবং পরিশোধ বা বকেয়া অবস্থার বিবরণ
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by room no (e.g. 101)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 dark:bg-slate-800 text-white placeholder-slate-400 text-xs font-semibold pl-9 pr-4 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 px-6 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <FaFilter className="text-slate-400 text-xs mr-1 shrink-0" />
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${statusFilter === "all"
            ? "bg-slate-900 text-white shadow-md"
            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            }`}
        >
          <span>All Rooms</span>
          <span className="bg-slate-700 text-white px-1.5 py-0.5 rounded text-[10px]">
            {bills.length}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter("paid")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${statusFilter === "paid"
            ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700"
            }`}
        >
          <FaCheckCircle className="text-emerald-400" />
          <span>Paid</span>
          <span className="bg-emerald-700 text-white px-1.5 py-0.5 rounded text-[10px]">
            {paidCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter("due")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${statusFilter === "due"
            ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-700"
            }`}
        >
          <FaExclamationCircle className="text-rose-400" />
          <span>Due Only</span>
          <span className="bg-rose-700 text-white px-1.5 py-0.5 rounded text-[10px]">
            {dueCount}
          </span>
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="py-4 px-6">রুম নং (Room)</th>
              <th className="py-4 px-6">ক্যাটাগরি</th>
              <th className="py-4 px-6 text-center">মূল ভাড়া (Rent)</th>
              <th className="py-4 px-6 text-center">বিদ্যুৎ বিল (Electric)</th>
              <th className="py-4 px-6 text-center">সর্বমোট (Total)</th>
              <th className="py-4 px-6 text-center">আদায় হয়েছে</th>
              <th className="py-4 px-6 text-center">বকেয়া (Due)</th>
              <th className="py-4 px-6 text-center">স্ট্যাটাস</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {filteredBills.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-12 text-center text-slate-500 font-bold"
                >
                  কোনো রুমের তথ্য পাওয়া যায়নি!
                </td>
              </tr>
            ) : (
              filteredBills.map((bill, index) => {
                const isPaid = bill.paid !== "false";
                const totalAmount = bill.total || 0;
                const paidAmount = bill.paidAmount || 0;
                const dueAmount = totalAmount - paidAmount;

                return (
                  <tr
                    key={index}
                    className="hover:bg-blue-50/50 dark:hover:bg-slate-800/60 transition duration-150"
                  >
                    <td className="py-4 px-6 font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>
                        Room
                      </span>
                      <span className=" p-1 rounded-xl bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 flex items-center font-bold justify-center text-xs shrink-0 border border-blue-200 dark:border-slate-700">
                        {bill.roomNo}
                      </span>

                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 text-xs">
                      {bill.category || "সাধারণ রুম"}
                    </td>
                    <td className="py-4 px-2 text-center font-bold text-slate-700 dark:text-slate-300">
                      ৳ {(bill.rent || 0).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-amber-600 dark:text-amber-400">
                      <span className="inline-flex items-center gap-1">
                        <MdOutlineElectricBolt className="text-xs" />
                        <span>৳ {(bill.currentBill || 0).toLocaleString()}</span>
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center font-black text-slate-900 dark:text-white">
                      ৳ {totalAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-center font-bold text-emerald-600 dark:text-emerald-400">
                      ৳ {paidAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-center font-semibold">
                      {dueAmount > 0 ? (
                        <span className="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded-md">
                          ৳ {dueAmount.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">৳ 0</span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-center">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                          <FaCheckCircle />
                          <span>Paid</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border border-rose-300 dark:border-rose-700 animate-pulse">
                          <FaExclamationCircle />
                          <span>Due</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(bill)}
                        title="Edit monthly bill charges"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition active:scale-95 mx-auto"
                      >
                        <FaEdit className="text-xs shrink-0" />
                        <span className="leading-none">Edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Monthly Bill Modal */}
      <UniversalModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title={`✏️ মাসিক বিল এডিট (Room: ${selectedBill?.roomNo || ""})`}
      >
        {selectedBill && (
          <form onSubmit={handleSaveEditBill} className="space-y-4">
            {/* Header info badge */}
            <div className="p-3 bg-slate-100 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  রুম: {selectedBill.roomNo}
                </span>
                <span className="opacity-60 ml-2">
                  ({selectedBill.category || "সাধারণ"})
                </span>
              </div>
              <div>
                {selectedBill.paid !== "false" ? (
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-300">
                    PAID
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border border-rose-300">
                    DUE
                  </span>
                )}
              </div>
            </div>

            {/* Editable Charges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Rent */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <FaMoneyBillWave className="text-emerald-500" />
                  <span>মূল ভাড়া (Rent ৳):</span>
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.rent}
                  onChange={(e) => handleInputChange("rent", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Electric / Current Bill */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <FaBolt className="text-amber-500" />
                  <span>বিদ্যুৎ বিল (Electric ৳):</span>
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.currentBill}
                  onChange={(e) =>
                    handleInputChange("currentBill", e.target.value)
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Water Bill */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <FaTint className="text-cyan-500" />
                  <span>পানি বিল (Water ৳):</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.waterBill}
                  onChange={(e) => handleInputChange("waterBill", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Gas Bill */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <FaFire className="text-orange-500" />
                  <span>গ্যাস বিল (Gas ৳):</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.gasBill}
                  onChange={(e) => handleInputChange("gasBill", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Waste Bill */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <FaTrashAlt className="text-teal-500" />
                  <span>ময়লা বিল (Waste ৳):</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.wasteBill}
                  onChange={(e) => handleInputChange("wasteBill", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Previous Due */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <FaExclamationCircle className="text-rose-500" />
                  <span>পূর্ববর্তী বকেয়া (Due ৳):</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.due}
                  onChange={(e) => handleInputChange("due", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Read-only components summary & Live calculated total */}
            <div className="bg-slate-100 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>আদায়কৃত অর্থ (Paid Amount):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ৳ {(selectedBill.paidAmount || 0).toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                  নতুন সর্বমোট  (Recomputed Total):
                </span>
                <span className="text-base sm:text-lg font-black text-indigo-600 dark:text-cyan-400">
                  ৳ {liveCalculatedTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit / Cancel Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleCloseEditModal}
                disabled={isSubmitting}
                className="btn btn-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-none rounded-xl px-4"
              >
                বাতিল (Cancel)
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-5 flex items-center gap-1.5 shadow-md font-bold"
              >
                <FaSave />
                <span>{isSubmitting ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}</span>
              </button>
            </div>
          </form>
        )}
      </UniversalModal>
    </div>
  );
};

export default RoomStatusTable;
