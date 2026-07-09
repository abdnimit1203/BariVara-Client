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
      className="grid grid-cols-3 justify-between items-center gap-2 font_secondary py-5 border bg-blue-600 glass rounded-xl mt-2"
    >
      <p className="text-white">Submit Payment</p>

      <input
        type="number"
        {...register("paidAmount", { required: true })}
        className="bg-base-100 text-base-content border-2 outline-2 outline-success py-1 rounded-md border-base-300 px-2 font-bold"
        placeholder="amount"
      />

      <button type="submit" className="btn btn-sm w-fit btn-success text-white">
        Submit
      </button>
    </form>
  );
};

export default PaymentForm;
