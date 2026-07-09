import { FaMoneyBillWave, FaHandHoldingUsd, FaExclamationTriangle, FaDoorOpen } from "react-icons/fa";
import { MdOutlineElectricBolt, MdOutlineWaterDrop } from "react-icons/md";
import InfoTooltip from "../../utils/InfoTooltip";

const KpiOverviewCards = ({ totalRent, totalCollected, totalDue, totalCurrentBill, waterMeterBill, totalRooms, totalPaidCount }) => {
  const collectionPercentage = totalRent > 0 ? Math.round((totalCollected / totalRent) * 100) : 0;
  const dueRoomsCount = totalRooms - totalPaidCount;

  const kpiData = [
    {
      id: "rent",
      title: "মোট প্রত্যাশিত ভাড়া",
      amount: `৳ ${totalRent.toLocaleString()}`,
      subtitle: "১৮০০ টাকা ছাড় বাদে",
      tooltip: "এই মাসের মোট হিসাবকৃত ঘর ভাড়া",
      icon: <FaMoneyBillWave className="text-base sm:text-2xl text-blue-500" />,
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
      textColor: "text-blue-700 dark:text-blue-400"
    },
    {
      id: "collected",
      title: "আদায়কৃত ভাড়া",
      amount: `৳ ${totalCollected.toLocaleString()}`,
      subtitle: `${collectionPercentage}% আদায় হয়েছে`,
      tooltip: "ভাড়াটিয়াদের থেকে এ পর্যন্ত প্রাপ্ত মোট টাকা",
      icon: <FaHandHoldingUsd className="text-base sm:text-2xl text-emerald-500" />,
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-500/10",
      textColor: "text-emerald-700 dark:text-emerald-400",
      progress: collectionPercentage
    },
    {
      id: "due",
      title: "অবশিষ্ট বকেয়া (Due)",
      amount: `৳ ${totalDue.toLocaleString()}`,
      subtitle: totalDue > 0 ? `⚠️ ${dueRoomsCount}টি রুম বকেয়া` : "🎉 কোনো বকেয়া নেই!",
      tooltip: "যে সকল রুম এখনও ভাড়া পরিশোধ করেনি তাদের মোট বকেয়া",
      icon: <FaExclamationTriangle className={`text-base sm:text-2xl ${totalDue > 0 ? "text-rose-500 animate-pulse" : "text-slate-400"}`} />,
      bgGradient: totalDue > 0 ? "from-rose-500/10 to-orange-500/10" : "from-slate-500/10 to-gray-500/10",
      borderColor: totalDue > 0 ? "border-rose-500/30" : "border-slate-200 dark:border-slate-800",
      iconBg: totalDue > 0 ? "bg-rose-500/10" : "bg-slate-100 dark:bg-slate-800",
      textColor: totalDue > 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-slate-300"
    },
    {
      id: "electric",
      title: "মোট বিদ্যুৎ বিল",
      amount: `৳ ${totalCurrentBill.toLocaleString()}`,
      subtitle: "সাব-মিটারের মোট খরচ",
      tooltip: "মিটার রিডিং অনুযায়ী এই মাসের মোট বিদ্যুৎ বিল",
      icon: <MdOutlineElectricBolt className="text-base sm:text-2xl text-amber-500" />,
      bgGradient: "from-amber-500/10 to-yellow-500/10",
      borderColor: "border-amber-500/20",
      iconBg: "bg-amber-500/10",
      textColor: "text-amber-700 dark:text-amber-400"
    },
    {
      id: "water",
      title: "পানি ও অন্যান্য বিল",
      amount: `৳ ${(waterMeterBill?.total || 0).toLocaleString()}`,
      subtitle: waterMeterBill ? "পানি মিটার হিসাব" : "প্রযোজ্য নয়",
      tooltip: "পানি মিটারের এই মাসের মোট বিল",
      icon: <MdOutlineWaterDrop className="text-base sm:text-2xl text-cyan-500" />,
      bgGradient: "from-cyan-500/10 to-sky-500/10",
      borderColor: "border-cyan-500/20",
      iconBg: "bg-cyan-500/10",
      textColor: "text-cyan-700 dark:text-cyan-400"
    },
    {
      id: "rooms",
      title: "পরিশোধ স্ট্যাটাস",
      amount: `${totalPaidCount}/${totalRooms} পরিশোধিত`,
      subtitle: `${dueRoomsCount}টি রুম বাকি`,
      tooltip: "মোট কতগুলো রুমের ভাড়া সম্পূর্ণ পরিশোধ হয়েছে",
      icon: <FaDoorOpen className="text-base sm:text-2xl text-purple-500" />,
      bgGradient: "from-purple-500/10 to-violet-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-500/10",
      textColor: "text-purple-700 dark:text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 mb-6">
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          className={`bg-gradient-to-br ${kpi.bgGradient} bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border ${kpi.borderColor} shadow-sm sm:shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
        >
          <div className="flex items-start justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-3">
            <div className="space-y-0.5 sm:space-y-1 overflow-hidden">
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="truncate">{kpi.title}</span>
                <div className="hidden sm:inline-block shrink-0">
                  <InfoTooltip tipTexts={kpi.tooltip} position="top" />
                </div>
              </div>
              <p className={`text-sm sm:text-2xl md:text-3xl font-black ${kpi.textColor} tracking-tight truncate`}>
                {kpi.amount}
              </p>
            </div>
            <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${kpi.iconBg} flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5 group-hover:scale-110 transition duration-300`}>
              {kpi.icon}
            </div>
          </div>

          <div>
            {/* Optional Progress Bar for Collection */}
            {typeof kpi.progress === "number" && (
              <div className="w-full h-1.5 sm:h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-1 sm:mb-2">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: `${kpi.progress}%` }}
                ></div>
              </div>
            )}
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-semibold truncate">
              {kpi.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KpiOverviewCards;
