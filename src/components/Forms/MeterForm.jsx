/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { createMonthlyBill, fetchMonthlyData } from "../../API/api";
import { getPreviousMonthAndYear } from "../../utils/getPreviousMonthYear";

const MeterForm = ({ roomData, month, year, refetch, refetch2, prevReading = null }) => {
  const { previousMonth, previousYear } = getPreviousMonthAndYear(month, year);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (month === "") {
      toast.error("Please Select a valid Month!");
      return;
    }

    // If no previous reading found → warn before saving
    if (prevReading === null) {
      const result = await Swal.fire({
        title: "⚠️ Previous Month Data Missing!",
        html: `<p>No meter reading found for <strong>Room ${roomData.roomNo}</strong> in <strong>${previousMonth} ${previousYear}</strong>.</p>
               <p class="mt-2 text-sm text-gray-500">Without it, <strong>monthly bill calculation will fail</strong> for this room. Still want to save this entry?</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Save Anyway",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#f59e0b",
        cancelButtonColor: "#6b7280",
      });
      if (!result.isConfirmed) return;
    }

    // Proceed with saving
    const formData = {
      ...data,
      meterNumber: parseFloat(parseFloat(data.meterNumber).toFixed(2)),
      roomNo: roomData.roomNo,
      month: month,
      year: year,
    };
    const formData2 = {
      paid: "false",
      roomNo: roomData.roomNo,
      month: month,
      year: year,
    };

    try {
      const { data: meterRes } = await fetchMonthlyData(formData);
      console.log(meterRes);
      toast.success("Meter data submitted!");
      try {
        const { data: billRes } = await createMonthlyBill(formData2);
        console.log(billRes);
        toast.success("Monthly bill created!");
      } catch (err2) {
        toast.error(err2.response?.data?.error || "Bill creation failed.");
      }
      reset();
      refetch2();
    } catch (err) {
      toast.error(err.response?.data?.message || "Monthly Database error!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex px-2 justify-center items-center gap-4"
    >
      <div>
        <input
          id="meterNumber"
          name="meterNumber"
          type="number"
          required
          {...register("meterNumber", {
            required: "meterNumber is required",
          })}
          className="rounded-lg p-2 w-full text-sm shadow-sm border-2 border-secondary focus:outline-secondary"
          placeholder="Enter meterNumber"
        />
        {/* Previous month reading hint — tiny faded, no line break */}
        {prevReading !== null && (
          <p className="text-[10px] opacity-40 mt-0.5 truncate leading-tight">
            prev: {prevReading}
          </p>
        )}
        {errors.meterNumber && (
          <p style={{ color: "red" }}>{errors.meterNumber.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-xs btn-secondary text-white">
        Submit
      </button>
    </form>
  );
};

export default MeterForm;
