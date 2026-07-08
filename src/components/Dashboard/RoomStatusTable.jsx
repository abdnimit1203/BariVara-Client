import { useState } from "react";
import { FaSearch, FaCheckCircle, FaExclamationCircle, FaFilter, FaDoorOpen } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";

const RoomStatusTable = ({ bills = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'paid' | 'due'

  const filteredBills = bills.filter((bill) => {
    const isPaid = bill.paid !== "false";
    const matchesFilter =
      statusFilter === "all" ||
      (statusFilter === "paid" && isPaid) ||
      (statusFilter === "due" && !isPaid);

    const matchesSearch =
      !searchTerm ||
      String(bill.roomNo).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(bill.category || "").toLowerCase().includes(searchTerm.toLowerCase());

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
          <p className="text-xs text-slate-300 mt-1">প্রতিটি রুমের মূল ভাড়া, বিদ্যুৎ বিল এবং পরিশোধ বা বকেয়া অবস্থার বিবরণ</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="রুম নং দিয়ে খুঁজুন (যেমন: 101)..."
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
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            statusFilter === "all"
              ? "bg-slate-900 text-white shadow-md"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
          }`}
        >
          <span>সকল রুম</span>
          <span className="bg-slate-700 text-white px-1.5 py-0.5 rounded text-[10px]">{bills.length}</span>
        </button>

        <button
          onClick={() => setStatusFilter("paid")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            statusFilter === "paid"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700"
          }`}
        >
          <FaCheckCircle className="text-emerald-400" />
          <span>পরিশোধিত (Paid)</span>
          <span className="bg-emerald-700 text-white px-1.5 py-0.5 rounded text-[10px]">{paidCount}</span>
        </button>

        <button
          onClick={() => setStatusFilter("due")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            statusFilter === "due"
              ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-700"
          }`}
        >
          <FaExclamationCircle className="text-rose-400" />
          <span>বকেয়া (Due Only)</span>
          <span className="bg-rose-700 text-white px-1.5 py-0.5 rounded text-[10px]">{dueCount}</span>
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="py-4 px-6">রুম নং (Room)</th>
              <th className="py-4 px-6">ক্যাটাগরি</th>
              <th className="py-4 px-6 text-right">মূল ভাড়া (Rent)</th>
              <th className="py-4 px-6 text-right">বিদ্যুৎ বিল (Electric)</th>
              <th className="py-4 px-6 text-right">মোট দেয় (Total)</th>
              <th className="py-4 px-6 text-right">আদায় হয়েছে</th>
              <th className="py-4 px-6 text-right">বকেয়া (Due)</th>
              <th className="py-4 px-6 text-center">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {filteredBills.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500 font-bold">
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
                      <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200 dark:border-slate-700">
                        {bill.roomNo}
                      </span>
                      <span>{isNaN(bill.roomNo) ? bill.roomNo : `Room - ${bill.roomNo}`}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 text-xs">
                      {bill.category || "সাধারণ রুম"}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-slate-700 dark:text-slate-300">
                      ৳ {(bill.rent || 0).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-amber-600 dark:text-amber-400">
                      <span className="inline-flex items-center gap-1">
                        <MdOutlineElectricBolt className="text-xs" />
                        <span>৳ {(bill.currentBill || 0).toLocaleString()}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 dark:text-white">
                      ৳ {totalAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      ৳ {paidAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right font-black">
                      {dueAmount > 0 ? (
                        <span className="text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded-md">
                          ৳ {dueAmount.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">৳ 0</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                          <FaCheckCircle />
                          <span>পরিশোধিত (Paid)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border border-rose-300 dark:border-rose-700 animate-pulse">
                          <FaExclamationCircle />
                          <span>বকেয়া (Due)</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomStatusTable;
