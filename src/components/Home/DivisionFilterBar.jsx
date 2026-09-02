import { FaMapMarkerAlt } from "react-icons/fa";

const DivisionFilterBar = ({ selectedDivision, setSelectedDivision }) => {
  const divisions = [
    { id: "all", name: "সকল বাংলাদেশ", badge: "৫০+ বাড়ি" },
    { id: "Dhaka", name: "ঢাকা (Dhaka)", badge: "২৮টি" },
    { id: "Chittagong", name: "চট্টগ্রাম (Chittagong)", badge: "১২টি" },
    { id: "Sylhet", name: "সিলেট (Sylhet)", badge: "৭টি" },
    { id: "Rajshahi", name: "রাজশাহী (Rajshahi)", badge: "৫টি" },
    { id: "Khulna", name: "খুলনা (Khulna)", badge: "৪টি" },
    { id: "Barishal", name: "বরিশাল (Barishal)", badge: "৩টি" },
    { id: "Rangpur", name: "রংপুর (Rangpur)", badge: "২টি" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500 animate-bounce" />
          <span>বিভাগ অনুযায়ী প্রোপার্টি ও বাসা খুঁজুন</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">Click to filter</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {divisions.map((div) => {
          const isActive = selectedDivision === div.id;
          return (
            <button
              key={div.id}
              onClick={() => setSelectedDivision(div.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 shrink-0 border shadow-sm ${
                isActive
                  ? "bg-gradient-to-r from-blue-900 to-sky-900 text-white border-blue-600 shadow-md scale-105"
                  : "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50"
              }`}
            >
              <span>📍 {div.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isActive ? "bg-cyan-400 text-slate-950" : "bg-slate-100 text-slate-600"
              }`}>
                {div.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DivisionFilterBar;
