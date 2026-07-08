import { Link } from "react-router-dom";
import { FaUserPlus, FaArrowRight } from "react-icons/fa";

const CallToActionBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white p-8 sm:p-12 mb-16 shadow-2xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-black/10 blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-3">
          <span className="bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            হাজারো বাড়িওয়ালার বিশ্বস্ত সঙ্গী
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
            আপনার বাড়ি বা মেস আজই <br className="hidden sm:inline" />
            <span className="underline decoration-white/40">BariVara</span>-তে যুক্ত করুন!
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl">
            ফ্রিতে অ্যাকাউন্ট খুলুন এবং মাত্র ২ মিনিটে আপনার প্রোপার্টি ও রুমগুলোর ডিজিটাল হিসাব রাখা শুরু করুন।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <Link
            to="/register"
            className="w-full sm:w-auto px-7 py-4 bg-slate-950 hover:bg-black text-white font-black rounded-2xl transition duration-300 flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95"
          >
            <FaUserPlus />
            <span>ফ্রি রেজিস্ট্রেশন করুন</span>
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-7 py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl transition duration-300 flex items-center justify-center gap-2 border border-white/30 backdrop-blur-md"
          >
            <span>ড্যাশবোর্ড দেখুন</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToActionBanner;
