import { useState, useEffect } from "react";
import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useMonthlyBills from "../../hooks/useMonthlyBills";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthlyBillSelector = () => {
  const today = new Date();
  const defaultDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedYear, setSelectedYear] = useState(getYear(defaultDate));
  const [selectedMonth, setSelectedMonth] = useState(
    monthNames[getMonth(defaultDate)]
  );

  const [monthlyBillsData, isLoading, refetch] = useMonthlyBills(
    selectedMonth,
    selectedYear
  );
  const totalRent = monthlyBillsData[0]?.bills.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );
  const totalCollected = monthlyBillsData[0]?.bills.reduce(
    (sum, item) => sum + (item.paidAmount || 0),
    0
  );
  console.log("Total Rent = ", totalRent);
  console.log("Total Collected = ", totalCollected);
  useEffect(() => {
    console.log("NEW DATA :", monthlyBillsData[0]?.bills);
  }, [monthlyBillsData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedYear(getYear(date));
    setSelectedMonth(monthNames[getMonth(date)]);
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto px-4 bg-primary shadow mt-2 py-2">
        <p className="mb-2 font-semibold text-white">Select Month & Year:</p>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border border-primary p-2 rounded w-full"
        />
      </div>
      <div className="flex text-center  justify-between items-center px-2 py-3 gap-3">
        <div className="rounded-lg  px-2 py-3 font-semibold flex flex-col w-full bg-blue-400 text-white  shadow-md border">
          <p className="text-sm  underline-offset-4 underline pb-2">
            Total Rooms
          </p>
          <p className="text-xl">15</p>
        </div>
        <div className="rounded-lg  px-2 py-3 font-semibold flex flex-col w-full text-white bg-red-500  shadow-md border">
          <p className="text-sm underline-offset-4 underline pb-2">
            Payment Status
          </p>
          <p className="text-xl">
            4/15 <span className="text-xs ">(9 left)</span>
          </p>
        </div>
       
      </div>
      <div className="flex text-center  justify-between items-center px-2 py-3 gap-3">
      <div className="rounded-lg  px-2 py-3 font-semibold flex flex-col w-full bg-warning  shadow-md border">
          <p className="text-sm  underline-offset-4 underline pb-2">
            Total Rent
          </p>
          <p className="text-xl">৳ {totalRent}</p>
        </div>
        <div className="rounded-lg  px-2 py-3 font-semibold flex flex-col w-full bg-success text-white shadow-md border">
          <p className="text-sm  underline-offset-4 underline pb-2">
            Total Payed
          </p>
          <p className="text-xl">৳ {totalCollected}</p>
        </div>
       
      </div>
    </div>
  );
};

export default MonthlyBillSelector;
