import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBolt, FaTint, FaTrashAlt, FaSave } from "react-icons/fa";
import { fetchUtilitySettings, saveUtilitySettings } from "../../API/api";

const FIELD_DEFS = [
  {
    key: "electricityPerUnitCost",
    label: "বিদ্যুৎ ইউনিট রেট (Electricity Rate)",
    suffix: "টাকা/ইউনিট",
    icon: <FaBolt className="text-amber-500" />,
  },
  {
    key: "waterSharingDivisor",
    label: "পানির মোটর শেয়ারিং ভাজক (Water Sharing Divisor)",
    suffix: "রুম/পরিবার",
    icon: <FaTint className="text-cyan-500" />,
  },
  {
    key: "defaultWasteCost",
    label: "মাসিক ময়লা বিল (Default Waste Bill)",
    suffix: "টাকা",
    icon: <FaTrashAlt className="text-emerald-500" />,
  },
];

const UtilitySettings = () => {
  const [values, setValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchUtilitySettings();
        setValues(data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "সেটিংস লোড করা যায়নি।");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleChange = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        electricityPerUnitCost: Number(values.electricityPerUnitCost),
        waterSharingDivisor: Number(values.waterSharingDivisor),
        defaultWasteCost: Number(values.defaultWasteCost),
      };
      const { data } = await saveUtilitySettings(payload);
      setValues(data.data);
      toast.success("ইউটিলিটি সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!");
    } catch (err) {
      toast.error(err.response?.data?.message || "সংরক্ষণ ব্যর্থ হয়েছে।");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !values) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-bars text-primary w-16"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="border-b border-base-300 pb-4">
        <span className="text-[11px] font-black uppercase tracking-wider text-primary">
          Super Admin
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-base-content flex items-center gap-2">
          ⚙️ ইউটিলিটি সেটিংস (Utility Settings)
        </h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          এখানে রেট পরিবর্তন করলে শুধুমাত্র ভবিষ্যতে তৈরি হওয়া নতুন বিলে প্রযোজ্য হবে। অতীতের কোনো বিল পরিবর্তিত হবে না।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 border border-base-300 rounded-3xl shadow-xl p-5 sm:p-8 space-y-6"
      >
        {FIELD_DEFS.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-bold text-base-content/80 flex items-center gap-2">
              {field.icon}
              <span>{field.label}</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                required
                value={values[field.key] ?? ""}
                onChange={handleChange(field.key)}
                className="input input-bordered w-full rounded-xl pr-24 focus:border-primary focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                {field.suffix}
              </span>
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={isSaving}
          className="btn btn-primary w-full rounded-xl font-bold gap-2 disabled:opacity-60"
        >
          <FaSave />
          {isSaving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন (Save)"}
        </button>

        {values.updatedBy && (
          <p className="text-[11px] text-base-content/50 text-center">
            সর্বশেষ পরিবর্তন করেছেন: {values.updatedBy}
            {values.updatedAt ? ` — ${new Date(values.updatedAt).toLocaleString()}` : ""}
          </p>
        )}
      </form>
    </div>
  );
};

export default UtilitySettings;
