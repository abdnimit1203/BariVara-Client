/* eslint-disable react/prop-types */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosConfig";

const CostForm = ({refetch, setRefetch }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = {
      ...data,
      totalRoom: parseFloat(parseFloat(data.totalRoom).toFixed(2)),
    };

    console.log("Form Data:", formData);

    axiosInstance
      .post("/categories", formData)
      .then((res) => {
        console.log("New category Data : ", res.data);
        toast.success("Category data submitted!");
        // setRefetch(!refetch)
        reset();
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
        toast.error("Opps! something went wrong!");
      });
  };
  // const today = new Date();
  // const [startDate, setStartDate] = useState(today);

  return (
    <div className="bg-white pb-8">
      <h2 className="text-center pt-4">Insert the Category data in the form</h2>
      <h2 className="text-center pt-4">খরচের  তথ্য প্রবেশ করুন </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto border-[2.5px] rounded-md border-secondary mb-0 mt-8 max-w-lg space-y-4 p-10 w-full drop-shadow-md"
      >
        {/* <div className="flex flex-col gap-2">
          <label htmlFor="date">Select Date / তারিখ: </label>
          <Controller
            name="date"
            control={control}
            defaultValue={startDate}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setStartDate(date);
                }}
                showIcon
                icon={
                  <CiCalendarDate
                    className={`text-2xl bg-secondary text-white  rounded-md`}
                  />
                }
                className={`ml-6 rounded-md focus:outline-none border border-secondary w-[150px]  h-[40px]`}
              />
            )}
          />
        </div> */}
        <div>
          <label htmlFor="email" className="">
            Category Name 
          </label>

          <div className="">
            <input
              id="name"
              name="name"
              type="text"
              rows={4}
              required
              {...register("name", {
                required: "name is required",
              })}
              className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm border-2 border-secondary focus:outline-secondary mt-2"
              placeholder="Enter category name"
            />

            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="totalRoom" className="">
            Total Room / রুম সংখ্যা 
          </label>

          <div className="relative">
            <input
              id="totalRoom"
              name="totalRoom"
              type="number"
              step="any"
              required
              {...register("totalRoom", {
                required: "totalRoom is required",
              })}
              className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm border-2 border-secondary focus:outline-secondary  mt-2"
              placeholder="Enter totalRoom"
            />
          </div>
          {errors.totalRoom && (
            <p style={{ color: "red" }}>{errors.totalRoom.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-sm btn-secondary rounded-md text-sm font-medium text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CostForm;
