/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { updatePaymentById } from "../../API/api";
import toast from "react-hot-toast";

const PaymentForm = ({ billID, refetch4 }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    console.log(formData, billID)
    try {
      const { data: responseData } = await updatePaymentById(billID, formData);
      console.log(responseData);
      toast.success("Payment Done!");
      refetch4();
      reset();
    } catch (err) {
      console.log(err.response?.data?.message || "Invalid credentials!");
      toast.error(err.response?.data.message);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-base-200/80 rounded-xl border border-base-300"
    >
      <span className="text-xs font-bold text-base-content/90 shrink-0">
        পরিশোধ জমা দিন:
      </span>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input
          type="number"
          step="any"
          inputMode="numeric"
          {...register("paidAmount", { required: true })}
          className="bg-base-100 text-base-content border-2 border-base-300 focus:border-success focus:outline-none py-1 px-3 rounded-lg font-mono font-bold text-sm w-full sm:w-32 shadow-inner"
          placeholder="টাকার পরিমাণ"
        />

        <button
          type="submit"
          className="btn btn-sm btn-success text-white font-bold px-3 shrink-0 shadow-sm"
        >
          পরিশোধ (Pay)
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
