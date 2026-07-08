import { MdOutlineElectricBolt, MdOutlineWaterDrop } from "react-icons/md";
import { FaBolt, FaInfoCircle } from "react-icons/fa";

const UtilitySummaryCard = ({ bills = [], waterMeterBill }) => {
  const totalElectricBill = bills.reduce((sum, b) => sum + (b.currentBill || 0), 0);

  return (
    <div className="space-y-6">
      {/* Utility Overview Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider block w-fit">
              বিদ্যুৎ মিটার সারাংশ
            </span>
            <p className="text-sm text-amber-100 font-medium">সকল রুমের সাব-মিটারের মোট বিদ্যুৎ বিল</p>
            <h3 className="text-3xl font-black mt-2">৳ {totalElectricBill.toLocaleString()}</h3>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0">
            <MdOutlineElectricBolt />
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider block w-fit">
              পানি মিটার (Water Meter)
            </span>
            <p className="text-sm text-cyan-100 font-medium">ওয়াসা / ডিপ-টিউবওয়েল পানির মাসিক বিল</p>
            <h3 className="text-3xl font-black mt-2">
              ৳ {(waterMeterBill?.total || 0).toLocaleString()}
            </h3>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0">
            <MdOutlineWaterDrop />
          </div>
        </div>
      </div>

      {/* Room-wise Electricity Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
            <FaBolt className="text-amber-500" />
            <span>রুমভিত্তিক বিদ্যুৎ বিলের তালিকা (Electric Meter Breakdown)</span>
          </h4>
          <span className="text-xs text-slate-500 font-medium">মিটার রিডিং ও বর্তমান বিল</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bills.map((bill, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-amber-400 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-slate-700 text-blue-800 dark:text-blue-300 text-xs font-bold">
                  {isNaN(bill.roomNo) ? bill.roomNo : `Room ${bill.roomNo}`}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{bill.category || "টিনশেড/ফ্ল্যাট"}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
                <span className="text-xs text-slate-500">বর্তমান বিল:</span>
                <span className="text-base font-black text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                  <MdOutlineElectricBolt className="text-sm" />
                  <span>৳ {(bill.currentBill || 0).toLocaleString()}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UtilitySummaryCard;
