import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaCheckCircle, FaTimes, FaUserAlt } from "react-icons/fa";

const ContactLandlordModal = ({ house, onClose }) => {
  if (!house) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative transform transition-all">
        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition duration-200"
          >
            <FaTimes />
          </button>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            প্রোপার্টি যোগাযোগের তথ্য
          </span>
          <h3 className="text-xl sm:text-2xl font-black mt-2">{house.name}</h3>
          <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
            <FaMapMarkerAlt className="text-red-400 shrink-0" />
            <span>{house.holding}, {house.district}</span>
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-slate-800">
          <div className="flex items-center justify-between bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
                <FaUserAlt />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">বাড়িওয়ালা / প্রোপার্টি মালিক</p>
                <p className="text-base font-black text-slate-900">{house.ownerName}</p>
              </div>
            </div>
            {house.verified && (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <FaCheckCircle className="text-green-600" />
                Verified
              </span>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">বিদ্যমান সুবিধা ও ইউটিলিটি</p>
            <div className="flex flex-wrap gap-2">
              {house.utilities.map((util, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200">
                  {util}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">মাসিক ভাড়া</span>
              <span className="text-sm sm:text-base font-black text-blue-700">{house.rentRange}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">অবস্থা</span>
              <span className="text-sm sm:text-base font-bold text-emerald-600">{house.availableRooms}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/50">
            {house.description}
          </p>

          {/* Contact Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${house.phone}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition duration-200 active:scale-95"
            >
              <FaPhoneAlt />
              <span>সরাসরি কল করুন ({house.phone})</span>
            </a>
            <a
              href={`https://wa.me/8801761609974?text=${encodeURIComponent(
                `Hello, আমি BariVara ওয়েবসাইট থেকে আপনার '${house.name}' প্রোপার্টি সম্পর্কে জানতে যোগাযোগ করছি।`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition duration-200 active:scale-95"
            >
              <FaWhatsapp className="text-lg" />
              <span>WhatsApp মেসেজ</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLandlordModal;
