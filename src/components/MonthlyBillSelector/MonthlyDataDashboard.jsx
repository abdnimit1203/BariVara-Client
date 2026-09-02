import { useState } from "react";
import { getMonth, getYear } from "date-fns";
import useMonthlyBills from "../../hooks/useMonthlyBills";
import DashboardHeader from "../Dashboard/DashboardHeader";
import KpiOverviewCards from "../Dashboard/KpiOverviewCards";
import DashboardTabs from "../Dashboard/DashboardTabs";
import Loader from "../../utils/Loader";

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

  const [monthlyBillsData, isLoading, refetch] = useMonthlyBills(
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header & Quick Switch DatePicker */}
      <DashboardHeader
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        totalRooms={totalRooms}
        totalPaidCount={totalPaidCount}
        isLoading={isLoading}
        onRefresh={refetch}
      />

      {/* 2. KPI Overview Financial Cards */}
      <KpiOverviewCards
        totalRent={totalRent}
        totalCollected={totalCollected}
        totalDue={totalDue}
        totalCurrentBill={totalCurrentBill}
        waterMeterBill={waterMeterBill}
        totalRooms={totalRooms}
        totalPaidCount={totalPaidCount}
      />

      {/* 3. Interactive Analytics, Status Table, & Meter Summary Tabs */}
      <DashboardTabs bills={bills} waterMeterBill={waterMeterBill} refetch={refetch} />
    </div>
  );
};

export default MonthlyDataDashboard;
