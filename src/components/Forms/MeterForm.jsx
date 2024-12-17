/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
// import axiosInstance from "../../utils/axiosConfig";
import { createMonthlyBill, fetchMonthlyData } from "../../API/api";

import { getPreviousMonthAndYear } from "../../utils/getPreviousMonthYear";

const MeterForm = ({ roomData, month, year, refetch, refetch2 }) => {
  const { previousMonth, previousYear } = getPreviousMonthAndYear(month);
  console.log(previousMonth, previousYear);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // For Fetching Monthly  Data
    const formData = {
      ...data,
      meterNumber: parseFloat(parseFloat(data.meterNumber).toFixed(2)),
      roomNo: roomData.roomNo,
      month: month,
      year: year,
    };
    // for Creating MonthlyBill
    const formData2 = {
      paid: "false",
      roomNo: roomData.roomNo,
      month: month,
      year: year,
    };
    console.log("formData2 = ", formData2);
    if (month === "") {
      toast.error("Please Select a valid Month!");
    } else {
      console.log("Form Data:", formData);
      console.log("Form Data:", formData2);
      console.log(roomData);

      // axiosInstance
      //   .post("/monthlyData", formData)
      //   .then((res) => {
      //     console.log("New meter Data : ", res.data);
      //     toast.success("meter data submitted!");
      //     // setRefetch(!refetch)
      //     reset();
      //     refetch2()
      //   })
      //   .catch((error) => {
      //     // handle error
      //     console.log(error.response.data);
      //     // toast.error("Opps! something went wrong!");
      //     toast.error(error.response.data);
      //   });

      try {
        const { data } = await fetchMonthlyData(formData);
        console.log(data);
        toast.success("meter data submitted!");
        try {
          const { data2 } = await createMonthlyBill(formData2);
          console.log(data2);
          toast.success("Monthly  data created!");
        } catch (err) {
          console.log(err.response?.data?.message || "Invalid credentials!");
          toast.error(err.response?.data.message);
        }
        reset();
        refetch2();
      } catch (err) {
        console.log(err.response?.data?.message || "Invalid credentials!");
        toast.error(err.response?.data.message);
      }
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
          className=" rounded-lg p-2 w-full text-sm shadow-sm border-2 border-secondary focus:outline-secondary  "
          placeholder="Enter meterNumber"
        />

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
