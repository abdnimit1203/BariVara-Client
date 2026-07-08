/* eslint-disable react/prop-types */
const UniversalModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999] p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl shadow-2xl z-[100000] w-full max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-cyan-500/30 transition-all transform scale-100">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-white/10 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-cyan-300 uppercase">
            {title}
          </h3>
          <button
            onClick={onClose}
            title="বন্ধ করুন (Close)"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-200 hover:bg-rose-500 hover:text-white dark:bg-slate-800 dark:hover:bg-rose-600 text-slate-800 dark:text-slate-200 transition font-bold shadow-sm"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 text-slate-800 dark:text-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UniversalModal;
