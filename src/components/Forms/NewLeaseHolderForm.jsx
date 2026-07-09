/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosConfig";
import DatePicker from "react-datepicker";
import { FaUser, FaPhone, FaMoneyBillWave, FaCalendarCheck, FaCheckCircle } from "react-icons/fa";

const NewLeaseHolderForm = ({ id, onSuccess }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      advance: parseFloat(data.advance) || 0,
    };

    try {
      const res = await axiosInstance.post(`/rooms/${id}/leaseholder`, formData);
      console.log("New Bharatia Data : ", res.data);
      toast.success("নতুন ভাড়াটিয়া সফলভাবে যোগ করা হয়েছে! (New Tenant Added)");
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error?.response?.data || error);
      toast.error(error?.response?.data || "Oops! Something went wrong.");
    }
  };

  return (
    <div className="bg-base-100 border border-base-300 shadow-xl rounded-3xl p-5 sm:p-8 space-y-6 text-left">
      {/* Form Header */}
      <div className="border-b border-base-200 pb-4 text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-black text-base-content flex items-center justify-center sm:justify-start gap-2">
          <FaUser className="text-primary" />
          <span>নতুন ভাড়াটিয়া অ্যাড করুন (Add New Tenant)</span>
        </h3>
        <p className="text-xs text-base-content/60 mt-1">
          অনুগ্রহ করে নতুন ভাড়াটিয়ার সঠিক নাম, ফোন নম্বর, অগ্রিম টাকা এবং শুরুর তারিখ পূরণ করুন।
        </p>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Tenant Name */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
              <FaUser className="text-xs text-primary" />
              <span>নাম (Tenant Name)</span>
              <span className="text-error">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="যেমন: মো: রহিম উদ্দিন"
              {...register("name", { required: "নাম প্রদান করা আবশ্যক (Name is required)" })}
              className={`input input-bordered w-full rounded-xl text-sm transition-all focus:border-primary focus:outline-none ${
                errors.name ? "input-error border-error" : "border-base-300"
              }`}
            />
            {errors.name && (
              <p className="text-error text-xs font-medium pt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Tenant Phone Number */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
              <FaPhone className="text-xs text-secondary" />
              <span>ফোন নম্বর (Phone Number)</span>
            </label>
            <input
              id="phoneNumber"
              type="number"
              placeholder="যেমন: 017xxxxxxxx"
              {...register("phoneNumber")}
              className="input input-bordered w-full rounded-xl text-sm transition-all border-base-300 focus:border-secondary focus:outline-none"
            />
            {errors.phoneNumber && (
              <p className="text-error text-xs font-medium pt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Advance Money */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
              <FaMoneyBillWave className="text-xs text-accent" />
              <span>অগ্রিম (Advance Amount)</span>
              <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                id="advance"
                type="number"
                placeholder="যেমন: 5000"
                {...register("advance", { required: "অগ্রিম টাকার পরিমাণ আবশ্যক (Advance required)" })}
                className={`input input-bordered w-full rounded-xl text-sm transition-all focus:border-accent focus:outline-none pr-12 ${
                  errors.advance ? "input-error border-error" : "border-base-300"
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/60">
                টাকা
              </span>
            </div>
            {errors.advance && (
              <p className="text-error text-xs font-medium pt-1">{errors.advance.message}</p>
            )}
          </div>

          {/* Rent From Date */}
          <div className="space-y-2 flex flex-col">
            <label className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
              <FaCalendarCheck className="text-xs text-info" />
              <span>ভাড়া শুরুর তারিখ (Rent From)</span>
              <span className="text-error">*</span>
            </label>
            <Controller
              control={control}
              name="rentFrom"
              rules={{ required: "তারিখ নির্বাচন করুন (Date is required)" }}
              render={({ field }) => (
                <DatePicker
                  showIcon
                  isClearable
                  placeholderText="তারিখ নির্বাচন করুন"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  className={`input input-bordered w-full rounded-xl text-sm transition-all border-base-300 focus:border-info focus:outline-none ${
                    errors.rentFrom ? "input-error border-error" : ""
                  }`}
                  wrapperClassName="w-full"
                />
              )}
            />
            {errors.rentFrom && (
              <p className="text-error text-xs font-medium pt-1">{errors.rentFrom?.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full sm:w-auto sm:min-w-[220px] rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 py-3 h-auto"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                <span>যুক্ত করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <FaCheckCircle className="text-base" />
                <span>ভাড়াটিয়া যুক্ত করুন (Submit)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewLeaseHolderForm;

