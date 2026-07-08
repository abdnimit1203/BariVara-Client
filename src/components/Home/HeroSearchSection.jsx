import { useState } from "react";
import { FaSearch, FaBuilding, FaMapMarkerAlt, FaHouseUser } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineElectricBolt } from "react-icons/md";

const HeroSearchSection = ({ onSearch, selectedDivision, setSelectedDivision, selectedCategory, setSelectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const categories = [
    { id: "all", label: "সকল প্রোপার্টি", icon: "🏠" },
    { id: "family", label: "ফ্যামিলি বাসা (Family)", icon: "👨‍👩‍👧‍👦" },
    { id: "bachelor", label: "ব্যাচেলর রুম (Bachelor)", icon: "🎒" },
    { id: "mess", label: "ছাত্র/চাকরিজীবী মেস", icon: "🛏️" },
    { id: "shop", label: "দোকান ও অফিস (Shop/Office)", icon: "🏬" },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-10 md:p-14 shadow-2xl border border-blue-500/20 mb-10">
      {/* Background Decorative Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-1 max-w-4xl mx-auto text-center space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-md animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
          বাংলাদেশের ১ নম্বর স্মার্ট বাড়িভাড়া ও প্রোপার্টি ম্যানেজমেন্ট প্ল্যাটফর্ম
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight">
          স্মার্ট বাড়িভাড়া ও প্রোপার্টি <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            ব্যবস্থাপনা — পুরো বাংলাদেশ জুড়ে!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          একাধিক বাড়ি, ফ্ল্যাট বা রুম সহজেই পরিচালনা করুন। ডিজিটাল ভাড়া ট্র্যাকার, স্বয়ংক্রিয় বিদ্যুৎ ও পানি বিল হিসাব রাখুন একদম নির্ভুল ও আধুনিক উপায়ে।
        </p>

        {/* Search Bar Container */}
        <form onSubmit={handleSearchSubmit} className="bg-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/15 shadow-2xl space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
          {/* Division Select */}
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 sm:px-4 py-3 rounded-xl border border-white/10 text-sm flex-1">
            <FaMapMarkerAlt className="text-cyan-400 shrink-0 text-base" />
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="bg-transparent text-white w-full focus:outline-none cursor-pointer font-medium"
            >
              <option value="all" className="bg-slate-900 text-white">📍 সকল বিভাগ (All Bangladesh)</option>
              <option value="Dhaka" className="bg-slate-900 text-white">📍 ঢাকা (Dhaka)</option>
              <option value="Chittagong" className="bg-slate-900 text-white">📍 চট্টগ্রাম (Chittagong)</option>
              <option value="Sylhet" className="bg-slate-900 text-white">📍 সিলেট (Sylhet)</option>
              <option value="Rajshahi" className="bg-slate-900 text-white">📍 রাজশাহী (Rajshahi)</option>
              <option value="Khulna" className="bg-slate-900 text-white">📍 খুলনা (Khulna)</option>
              <option value="Barishal" className="bg-slate-900 text-white">📍 বরিশাল (Barishal)</option>
              <option value="Rangpur" className="bg-slate-900 text-white">📍 রংপুর (Rangpur)</option>
            </select>
          </div>

          {/* District/Area Search Input */}
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 sm:px-4 py-3 rounded-xl border border-white/10 text-sm flex-[1.5]">
            <FaBuilding className="text-sky-400 shrink-0 text-base" />
            <input
              type="text"
              placeholder="এলাকা বা বাড়ির নাম লিখুন (যেমন: Mirpur, নুরেজা ভিলা...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-slate-400 w-full focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95"
          >
            <FaSearch className="text-sm" />
            <span>খুঁজুন</span>
          </button>
        </form>

        {/* Quick Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition duration-200 flex items-center gap-1.5 border ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20 scale-105"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <FaHouseUser className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-bold">একাধিক বাড়ি</p>
              <p className="text-xs text-slate-400">সহজ প্রোপার্টি ম্যানেজমেন্ট</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <MdOutlineElectricBolt className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-bold">স্বয়ংক্রিয় বিল</p>
              <p className="text-xs text-slate-400">বিদ্যুৎ ও পানি মিটার হিসাব</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
              <span className="font-black">৳</span>
            </div>
            <div>
              <p className="text-sm font-bold">ডিজিটাল ভাড়া</p>
              <p className="text-xs text-slate-400">বকেয়া ও পেমেন্ট ট্র্যাকিং</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <MdOutlineSecurity className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-bold">১০০% নিরাপদ</p>
              <p className="text-xs text-slate-400">ক্লাউড ডাটা ও প্রাইভেসি</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchSection;
