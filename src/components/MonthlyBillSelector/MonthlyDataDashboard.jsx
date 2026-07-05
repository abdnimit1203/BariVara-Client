/* eslint-disable no-unused-vars */
import { useState } from "react";
import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useMonthlyBills from "../../hooks/useMonthlyBills";
import InfoTooltip from "../../utils/InfoTooltip";
import BarChartMonthly from "../../utils/BarChartMonthly";

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

const MonthlyDataDashboard = () => {
  const today = new Date();
  const defaultDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedYear, setSelectedYear] = useState(getYear(defaultDate));
  const [selectedMonth, setSelectedMonth] = useState(
    monthNames[getMonth(defaultDate)]
  );

  const [monthlyBillsData, isLoading] = useMonthlyBills(
    selectedMonth,
    selectedYear
  );
  const unfilteredBills = monthlyBillsData[0]?.bills || [];
  const bills = unfilteredBills.filter(
    (bill) => bill.roomNo !== "Water Meter (পানি)"
  );
  const waterMeterBill = unfilteredBills.find(
    (bill) => bill.roomNo === "Water Meter (পানি)"
  );
  const totalRent = bills.reduce((sum, b) => sum + (b.total || 0), 0);
  const totalCollected = bills.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
  const totalCurrentBill = bills.reduce(
    (sum, item) => sum + (item.currentBill || 0),
    0
  );
  const totalDue = totalRent - totalCollected;
  const totalRooms = bills.length;
  const totalPaidCount = bills.filter((b) => b.paid !== "false").length;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedYear(getYear(date));
    setSelectedMonth(monthNames[getMonth(date)]);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Month Picker */}
      <div className="bg-blue-950 text-white p-3 rounded-lg shadow-md text-center">
        <p className="font-semibold">মাস ও সাল নির্বাচন করুন</p>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="text-black w-full mt-2 rounded p-2"
        />
      </div>

      {/* Room Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-500 text-white rounded-lg p-3 shadow-md">
          <div className="flex justify-between items-center text-sm mb-1">
            <span>Total Rooms</span>
            <InfoTooltip
              tipTexts="Rooms with bills this month"
              position="top"
            />
          </div>
          <p className="text-xl font-bold">{totalRooms}</p>
        </div>

        <div className="bg-red-500 text-white rounded-lg p-3 shadow-md">
          <div className="flex justify-between items-center text-sm mb-1">
            <span>Paid</span>
            <InfoTooltip tipTexts="Rooms that have paid" position="left" />
          </div>
          <p className="text-xl font-bold">
            {totalPaidCount}/{totalRooms}
          </p>
        </div>
      </div>

      {/* Rent Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-yellow-400 text-black rounded-lg p-3 shadow-md col-span-2 sm:col-span-1">
          <p className="text-sm font-semibold mb-1 flex items-center gap-1">
            Total Rent{" "}
            <InfoTooltip tipTexts="রুম - ৩ এর ১৮০০ টাকা বাদে " position="top" />
          </p>
          <p className="text-xl font-bold">৳ {totalRent}</p>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-3 shadow-md">
          <p className="text-sm font-semibold mb-1 flex items-center gap-1">
            Collected{" "}
            <InfoTooltip tipTexts="Paid amount so far" position="top" />
          </p>
          <p className="text-xl font-bold">৳ {totalCollected}</p>
        </div>

        <div className="bg-gray-700 text-white rounded-lg p-3 shadow-md">
          <p className="text-sm font-semibold mb-1 flex items-center gap-1">
            Due <InfoTooltip tipTexts="Amount yet to be paid" position="top" />
          </p>
          <p className="text-xl font-bold">৳ {totalDue}</p>
        </div>
      </div>
      <div>
        {/* Other bills summary  */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-100 rounded-lg p-3 shadow-md">
            <p className="font-semibold text-amber-600  mb-1">
              Total Electric Bill
            </p>
            <p>৳ ⚡{totalCurrentBill}</p>
          </div>

          <div className="bg-blue-100  rounded-lg p-3 shadow-md">
            {waterMeterBill && (
              <div>
                <p className="font-semibold text-blue-800  mb-1">
                  Water Meter Bill
                </p>
                <p> ৳ 💦{waterMeterBill.total}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Charts */}

      <div>
        <BarChartMonthly bills={bills} />
      </div>
    </div>
  );
};

export default MonthlyDataDashboard;
