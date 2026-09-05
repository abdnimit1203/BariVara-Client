import { useState } from "react";
import { FaChartBar, FaTable, FaBolt } from "react-icons/fa";
import BarChartMonthly from "../../utils/BarChartMonthly";
import RoomStatusTable from "./RoomStatusTable";
import UtilitySummaryCard from "./UtilitySummaryCard";

const DashboardTabs = ({ bills = [], waterMeterBill, refetch }) => {
  const [activeTab, setActiveTab] = useState("table"); // 'charts' | 'table' | 'utility'

  return (
    <div className="space-y-6">
      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab("charts")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-sm ${activeTab === "charts"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105"
            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
            }`}
        >
          <FaChartBar className={activeTab === "charts" ? "text-cyan-300" : "text-blue-500"} />
          <span>📊 রাজস্ব ও চার্ট বিশ্লেষণ</span>
        </button>

        <button
          onClick={() => setActiveTab("table")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-sm ${activeTab === "table"
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-105"
            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
            }`}
        >
          <FaTable className={activeTab === "table" ? "text-emerald-200" : "text-emerald-500"} />
          <span>📋 রুম ও স্ট্যাটাস তালিকা</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-black ${activeTab === "table" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}>
            {bills.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("utility")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-sm ${activeTab === "utility"
            ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 scale-105"
            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
            }`}
        >
          <FaBolt className={activeTab === "utility" ? "text-yellow-200" : "text-amber-500"} />
          <span>⚡ ইউটিলিটি ও মিটার সারাংশ</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="transition-opacity duration-300">
        {activeTab === "charts" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl -mx-4 sm:mx-0 overflow-hidden">
              <div className="mb-4 px-1 sm:px-0">
                <h3 className="text-lg font-black text-slate-800 dark:text-white">
                  রুমভিত্তিক মাসিক ভাড়ার চার্ট তুলনা
                </h3>
                <p className="text-xs text-slate-500">
                  নিচের চার্টে প্রতিটি রুমের মোট ভাড়া ও বিদ্যুৎ বিলের গ্রাফিকাল প্রতিচ্ছবি দেখানো হয়েছে। সবুজ রং পরিশোধিত এবং লাল রং বকেয়া নির্দেশ করে।
                </p>
              </div>
              <BarChartMonthly bills={bills} />
            </div>
          </div>
        )}

        {activeTab === "table" && (
          <div className="animate-fade-in">
            <RoomStatusTable bills={bills} refetch={refetch} />
          </div>
        )}

        {activeTab === "utility" && (
          <div className="animate-fade-in">
            <UtilitySummaryCard bills={bills} waterMeterBill={waterMeterBill} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTabs;
