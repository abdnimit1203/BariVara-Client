import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaCheckCircle, FaPhoneAlt, FaArrowRight, FaBolt, FaTint } from "react-icons/fa";

const sampleProperties = [
  {
    id: "nureja-villa",
    name: "নুরেজা ভিলা (Nureja Villa)",
    holding: "Holding: 31, Syed Ali Munsi Road",
    division: "Dhaka",
    district: "Mirpur, Dhaka",
    category: "family",
    ownerName: "নুরেজা বেগম ও আব্দুল্লাহ",
    verified: true,
    image: "/house1.jpg",
    rentRange: "৳ ৩,৫০০ - ৳ ১৮,০০০ / মাস",
    availableRooms: "৪টি রুম ও টিনশেড ফাঁকা",
    totalRooms: 12,
    hasLiveMap: true,
    utilities: ["⚡ Separate Desco Meter", "💦 WASA Included", "🛡️ Secure Gate"],
    phone: "+880 1711-89XXXX",
    description: "টিনশেড, লাল গেইট ও কেচি গেইট সম্বলিত সম্পূর্ণ নিরাপদ ও পারিবারিক পরিবেশ। প্রতিটি রুমের জন্য আলাদা বিদ্যুৎ ও পানি মিটারের ডিজিটাল হিসাব।"
  },
  {
    id: "rahman-tower",
    name: "রহমান টাওয়ার ও মেস (Rahman Tower)",
    holding: "House #14, Road #6, Block-C",
    division: "Dhaka",
    district: "Mirpur-10, Dhaka",
    category: "bachelor",
    ownerName: "জনাব খলিলুর রহমান",
    verified: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80",
    rentRange: "৳ ৪,২০০ - ৳ ৭,৫০০ / মাস",
    availableRooms: "২টি সিট ও ১টি সিঙ্গেল রুম",
    totalRooms: 18,
    hasLiveMap: false,
    utilities: ["⚡ Prepaid Meter", "📶 High-Speed WiFi", "🍱 Meal System"],
    phone: "+880 1819-23XXXX",
    description: "ছাত্র ও চাকরিজীবীদের জন্য আধুনিক ও খোলামেলা মেস। সিসিটিভি ক্যামেরা ও ২৪ ঘণ্টা জেনারেটর সুবিধা।"
  },
  {
    id: "sunshine-heights",
    name: "সানশাইন হাইটস্ (Sunshine Heights)",
    holding: "Flat #4B, Agrabad Commercial Area",
    division: "Chittagong",
    district: "Agrabad, Chittagong",
    category: "family",
    ownerName: "ইঞ্জিনিয়ার এস. এম. শফি",
    verified: true,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80",
    rentRange: "৳ ১৬,০০০ - ৳ ২২,০০০ / মাস",
    availableRooms: "১টি ৩-বেডরুম ফ্ল্যাট ফাঁকা",
    totalRooms: 8,
    hasLiveMap: false,
    utilities: ["⚡ Nesco Meter", "💦 Deep Tube-well", "🚗 Car Parking"],
    phone: "+880 1715-45XXXX",
    description: "চট্টগ্রামের কেন্দ্রস্থলে বিলাসবহুল ফ্যামিলি অ্যাপার্টমেন্ট। দক্ষিণমুখী ও সার্বক্ষণিক লিফট এবং সিকিউরিটি গার্ড।"
  },
  {
    id: "greenview-villa",
    name: "গ্রিনভিউ রেসিডেন্সি (Greenview Residency)",
    holding: "Plot #22, Zindabazar Main Road",
    division: "Sylhet",
    district: "Zindabazar, Sylhet",
    category: "family",
    ownerName: "হাজী চৌধুরী কামরুল ইসলাম",
    verified: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    rentRange: "৳ ১২,৫০০ - ৳ ১৮,০০০ / মাস",
    availableRooms: "২টি ফ্ল্যাট ফাঁকা",
    totalRooms: 10,
    hasLiveMap: false,
    utilities: ["⚡ Solar & Grid", "💦 Filtered Water", "🌳 Rooftop Garden"],
    phone: "+880 1912-77XXXX",
    description: "সিলেটের জিন্দাবাজারে নিরিবিলি ও সবুজ ঘেরা পারিবারিক বাসা। ডিজিটাল ভাড়া প্রদান ও অনলাইন স্লিপ সুবিধা।"
  },
  {
    id: "padma-view",
    name: "পদ্মা ভিউ মেস ও হোস্টেল (Padma View Mess)",
    holding: "House #88, Motijheel C/A",
    division: "Dhaka",
    district: "Motijheel, Dhaka",
    category: "mess",
    ownerName: "আব্দুল কাদের মোল্লা",
    verified: false,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
    rentRange: "৳ ৩,০০০ - ৳ ৫,০০০ / সিট",
    availableRooms: "৫টি সিট ফাঁকা",
    totalRooms: 24,
    hasLiveMap: false,
    utilities: ["⚡ Sub-meter", "💦 24/7 Water", "🧹 Daily Cleaning"],
    phone: "+880 1611-33XXXX",
    description: "মতিঝিল ও পল্টনের কাছেই ব্যাংকার এবং চাকরিজীবীদের জন্য সাশ্রয়ী সিট ও সিঙ্গেল রুম ব্যবস্থা।"
  },
  {
    id: "khan-plaza",
    name: "খান প্লাজা (Khan Plaza Shop/Office)",
    holding: "Shop #12, Road #11, Banani",
    division: "Dhaka",
    district: "Banani, Dhaka",
    category: "shop",
    ownerName: "খান প্রোপার্টিজ লিমিটেড",
    verified: true,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
    rentRange: "৳ ২৫,০০০ - ৳ ৪৫,০০০ / মাস",
    availableRooms: "২টি অফিস স্পেস ফাঁকা",
    totalRooms: 6,
    hasLiveMap: false,
    utilities: ["⚡ 3-Phase Meter", "🛡️ Fire Safety", "🛗 Commercial Lift"],
    phone: "+880 1713-66XXXX",
    description: "বনানী প্রাইম লোকেশনে কমার্শিয়াল শোরুম ও আইটি অফিস স্পেস। ডিজিটাল এগ্রিমেন্ট ও রেন্টাল ইনভয়েস সিস্টেম।"
  }
];

const FeaturedHouseGrid = ({ selectedDivision, selectedCategory, searchTerm, onSelectHouse }) => {
  const filteredProperties = sampleProperties.filter((house) => {
    const matchesDivision = selectedDivision === "all" || house.division === selectedDivision;
    const matchesCategory = selectedCategory === "all" || house.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      house.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      house.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.holding.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDivision && matchesCategory && matchesSearch;
  });

  return (
    <div className="mb-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>🏠 ভাড়ার জন্য নিবন্ধিত বাড়ি ও রুমসমূহ</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {filteredProperties.length}টি প্রোপার্টি
            </span>
          </h2>
          <p className="text-sm text-slate-600">বাড়িওয়ালাদের সরাসরি ফোন করুন অথবা লাইভ ডিজিটাল ম্যাপ দেখে রুম নির্বাচন করুন</p>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center text-slate-600">
          <p className="text-lg font-bold">দুঃখিত! এই শর্তে কোনো প্রোপার্টি পাওয়া যায়নি।</p>
          <p className="text-sm mt-1">অন্য বিভাগ বা ক্যাটাগরি নির্বাচন করে আবার অনুসন্ধান করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((house) => (
            <div
              key={house.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col group relative"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                <img
                  src={house.image}
                  alt={house.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Division Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow">
                  <FaMapMarkerAlt className="text-red-400" />
                  <span>{house.district}</span>
                </div>

                {/* Verified Badge */}
                {house.verified && (
                  <div className="absolute top-3 right-3 bg-green-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                    <FaCheckCircle className="text-white" />
                    <span>Verified ✓</span>
                  </div>
                )}

                {/* Available Rooms Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs sm:text-sm font-bold bg-blue-600/90 px-3 py-1 rounded-lg border border-blue-400/30">
                    🛏️ {house.availableRooms}
                  </span>
                  <span className="text-xs bg-black/60 px-2 py-1 rounded">
                    মোট {house.totalRooms} রুম
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition duration-200">
                      {house.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{house.holding}</p>
                  
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {house.description}
                  </p>

                  {/* Utilities Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {house.utilities.map((util, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                        {util}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 mt-2">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">মাসিক ভাড়া</span>
                      <span className="text-base font-black text-blue-700">{house.rentRange}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">মালিক</span>
                      <span className="text-xs font-bold text-slate-700">{house.ownerName}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {house.hasLiveMap ? (
                      <Link
                        to="/my-rooms"
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-center"
                      >
                        <span>Live Rooms Map</span>
                        <FaArrowRight />
                      </Link>
                    ) : (
                      <button
                        onClick={() => onSelectHouse(house)}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                      >
                        <span>রুম ও ফ্ল্যাট দেখুন</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectHouse(house)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      <FaPhoneAlt className="text-[10px]" />
                      <span>যোগাযোগ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedHouseGrid;
