import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
// import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosConfig";

// eslint-disable-next-line react/prop-types
const PurchaseForm = ({refetch,setRefetch}) => {
  const [purchaseValue, setPurchaseValue] = useState(0);
  const [sellValue, setSellValue] = useState(0);
  let profit = parseFloat(sellValue - purchaseValue).toFixed(2);
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
      purchase: parseFloat(data.purchase),
      sell: parseFloat(data.sell),
      bank_transaction: parseFloat(data.bank_transaction),
      cash_in: parseFloat(data.cash_in),
      profit: parseFloat(parseFloat(data.sell - data.purchase).toFixed(2)),
    };

    console.log("Form Data:", formData);

    axiosInstance
      .post("purchase", formData)
      .then((res) => {
        console.log("New Purchase: ", res.data);
        toast.success("Purchase data submitted!");
        setSellValue(0)
        setPurchaseValue(0)
        setRefetch(!refetch)
        reset();
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
        toast.error("Opps! something went wrong!");
      });
  };
  // const [selectedOption, setSelectedOption] = useState(null);

  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  return (
    <div className="bg-white pb-8">
      <h2 className="text-center pt-4">Insert the Purchase data in the form</h2>
      <h2 className="text-center pt-4">ক্রয় বিক্রয়ের তথ্য প্রবেশ করুন </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto border-[2.5px] rounded-md border-blue-500 mb-0 mt-8 max-w-lg space-y-4 p-10 w-full drop-shadow-md"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="font-semibold">
            Select Date / তারিখ:{" "}
          </label>
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
                    className={`text-2xl bg-blue-500 text-white  rounded-md`}
                  />
                }
                className={`ml-6 rounded-md focus:outline-none border border-blue-500 w-[150px]  h-[40px]`}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="purchase" className="font-semibold ">
            Purchase / ক্রয় (SAR)
          </label>

          <div className="relative">
            <input
              id="purchase"
              name="purchase"
              type="number"
              step="any"
              required
              {...register("purchase", {
                required: "purchase is required",
                onChange: (e) => setPurchaseValue(e.target.value),
              })}
              className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm border border-blue-500 focus:outline-blue-500 mt-2"
              placeholder="Enter purchase"
            />
          </div>
          {errors.purchase && (
            <p style={{ color: "red" }}>{errors.purchase.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="sell" className="font-semibold">
            Sell / বিক্রয় (SAR)
          </label>

          <div className="relative">
            <input
              id="sell"
              name="sell"
              type="number"
              step="any"
              required
              {...register("sell", {
                required: "sell is required",

                onChange: (e) => setSellValue(e.target.value),
              })}
              className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm border border-blue-500 focus:outline-blue-500  mt-2"
              placeholder="Enter sell"
            />
          </div>
          {errors.sell && <p style={{ color: "red" }}>{errors.sell.message}</p>}
        </div>
        <div className="py-4 space-x-4">
          <span>Profit / লাভ (SAR):</span>
          <span className=" w-full rounded-lg  p-4 pe-12 text-sm shadow-sm border border-blue-500 focus:outline-blue-500 ">
            {profit}
          </span>
        </div>
        <div>
          <label htmlFor="bank_transaction" className="">
            Bank Transaction
          </label>

          <div className="relative">
            <input
              id="bank_transaction"
              name="bank_transaction"
              type="number"
              // defaultValue={0}
              step="any"
              required
              {...register("bank_transaction", {
                required: "bank_transaction is required",
              })}
              className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm border border-blue-500 focus:outline-blue-500  mt-2"
              placeholder="Enter bank_transaction"
            />
          </div>
          {errors.bank_transaction && (
            <p style={{ color: "red" }}>{errors.bank_transaction.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="cash_in" className="">
            Cash In
          </label>

          <div className="relative">
            <input
              id="cash_in"
              name="cash_in"
              type="number"
              step="any"
              required
              {...register("cash_in", {
                required: "cash_in is required",
              })}
              className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm border border-blue-500 focus:outline-blue-500  mt-2"
              placeholder="Enter cash_in"
            />
          </div>
          {errors.cash_in && (
            <p style={{ color: "red" }}>{errors.cash_in.message}</p>
          )}
        </div>
        {/* <div>
          <label className="font-semibold mb-6">Select an option:</label>
          <div className="flex-center gap-6 pt-4 font-medium">
            <label className="flex gap-2">
              <input
                type="radio"
                name="option"
                value="bank_transaction"
                className="radio radio-primary "
                onChange={() => setSelectedOption("bank_transaction")}
              />
              Bank Transaction / ব্যাংক
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                name="option"
                value="cash_in"
                className="radio radio-primary "
                onChange={() => setSelectedOption("cash_in")}
              />
              Cash In / ক্যাশ
            </label>
          </div>
        </div>

        {selectedOption && (
          <div>
            <label htmlFor="inputValue" className="font-medium capitalize">
              Enter value for {selectedOption.replace("_", " ")}:
            </label>
            <input
              type="number"
              id="inputValue"
              name="inputValue"
              required
              step="any"
              {...register("inputValue")}
              placeholder={`Enter value for ${selectedOption.replace(
                "_",
                " "
              )}`}
              className="w-full rounded-lg mt-3 p-4 pe-12 text-sm shadow-sm border border-blue-500 focus:outline-blue-500 capitalize"
            />
          </div>
        )} */}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;
