import { FaCalculator, FaChartLine, FaMobileAlt, FaCloudUploadAlt } from "react-icons/fa";

const LandlordBenefitsSection = () => {
  const benefits = [
    {
      icon: <FaCalculator className="text-3xl text-cyan-500" />,
      title: "স্বয়ংক্রিয় মিটার ও বিল ক্যালকুলেটর",
      desc: "প্রতিটি রুম বা ফ্ল্যাটের বর্তমান ও পূর্ববর্তী রিডিং দিয়ে ১ ক্লিকেই বিদ্যুৎ ও পানি বিল স্বয়ংক্রিয়ভাবে হিসাব করুন। ভুল হওয়ার কোনো সুযোগ নেই।"
    },
    {
      icon: <FaChartLine className="text-3xl text-green-500" />,
      title: "ডিজিটাল ভাড়া ও বকেয়া ট্র্যাকার",
      desc: "কোন রুমের ভাড়া পরিশোধ হয়েছে আর কার কত টাকা বকেয়া (Due) আছে তা ড্যাশবোর্ডে লাইভ চার্ট ও রঙিন কার্ডের মাধ্যমে সাথে সাথে দেখুন।"
    },
    {
      icon: <FaMobileAlt className="text-3xl text-amber-500" />,
      title: "ইন্টারেক্টিভ ডিজিটাল রুম ম্যাপ",
      desc: "আপনার বাড়ির টিনশেড, ফ্ল্যাট, বা ফ্লোর অনুযায়ী রুমগুলোর অবস্থান ডিজিটাল ম্যাপে সাজিয়ে রাখুন। মোবাইল বা কম্পিউটার যেকোনো স্থান থেকে নিয়ন্ত্রণ করুন।"
    },
    {
      icon: <FaCloudUploadAlt className="text-3xl text-purple-500" />,
      title: "১০০% নিরাপদ ক্লাউড ব্যাকআপ",
      desc: "ভাড়াটিয়ার অ্যাডভান্স জামানত, চুক্তির মেয়াদ, এবং মাসিক লেনদেনের সব ডাটা ক্লাউডে সুরক্ষিত থাকবে। কাগজ হারানোর বা হিসাব নষ্ট হওয়ার ভয় নেই।"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 md:p-12 mb-14 border border-blue-500/20 shadow-2xl">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20">
          বাড়িওয়ালাদের জন্য বিশেষ সুবিধা
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
          কেন বাংলাদেশের বাড়িওয়ালারা <span className="text-cyan-400">BariVara</span> ব্যবহার করবেন?
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          সনাতন পদ্ধতির কাগজের খাতা বা জটিল এক্সেল শিট ভুলে যান। এখন আপনার ১টি বা ১০টি বাড়ি—সব কিছুর নিয়ন্ত্রণ হাতের মুঠোয়!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
              {item.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandlordBenefitsSection;
