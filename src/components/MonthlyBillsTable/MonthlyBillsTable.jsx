import { useEffect, useRef, useState } from "react";
import { FaSync, FaCalendarAlt } from "react-icons/fa";
import CompoWrapper from "../Wrapper/CompoWrapper";
import useRooms from "../../hooks/useRooms";
import Loader from "../../utils/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import BillCalculations from "../BillCalculations/BillCalculations";
import InfoTooltip from "../../utils/InfoTooltip";
import { IoIosWarning } from "react-icons/io";
import useMonthlyBills from "./../../hooks/useMonthlyBills";

const MonthlyBillsTable = () => {
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

  // Month Year Selector
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() - 1, 1); // First day of the previous month
  });
  const [selectedYear, setSelectedYear] = useState(getYear(selectedDate));
  const [selectedMonth, setSelectedMonth] = useState(
    monthNames[getMonth(selectedDate)]
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedYear(getYear(date));
    setSelectedMonth(monthNames[getMonth(date)]);
  };

  // DATA FETCHING
  const [rooms, isLoading, refetch] = useRooms();
  const [monthlyBillsData, isLoadingBills, refetchBills] = useMonthlyBills(
    selectedMonth,
    selectedYear
  );

  const residentialRooms = rooms.filter((data) => isNaN(data.roomNo) === false);
  const totalRoomsCount = residentialRooms.length;
  const billsFoundCount = residentialRooms.filter((item) =>
    monthlyBillsData[0]?.bills?.some((b) => b.roomNo === item.roomNo)
  ).length;
  const isRefreshing = isLoading || isLoadingBills;

  // Detects the exact moment the Billing Month/Refresh bar becomes pinned to
  // the top, so we can animate a smooth "settle" transition instead of a
  // jarring instant snap when it locks in place.
  const stickySentinelRef = useRef(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const node = stickySentinelRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPinned(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-56px 0px 0px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleRefreshAll = () => {
    refetch();
    refetchBills();
  };

  return (
    <CompoWrapper>
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border border-blue-500/30 rounded-2xl shadow-sm p-3 sm:p-4 mb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
            Billing Management
          </span>
          <h1 className="text-base sm:text-lg font-black text-white leading-tight">
            💵 Monthly Bill Page
          </h1>
        </div>
        <div className="mt-1">
          <span className="text-[11px] text-slate-300">
            {totalRoomsCount} rooms · {billsFoundCount}/{totalRoomsCount} bills found
          </span>
        </div>
      </div>

      {/* Shared container for the sticky bar + the table it scrolls with —
          `position: sticky` can only stay pinned while its own parent box is
          still in view, so the bar and the (tall) table must share this one
          parent, otherwise the bar unsticks the moment its old, short parent
          scrolls past instead of staying pinned through the whole list. */}
      <div className="relative">
        <div ref={stickySentinelRef} className="h-px" aria-hidden="true"></div>
        <div
          className={`sticky top-14 lg:top-0 z-20 mb-3 flex items-center gap-2 rounded-xl p-1.5 border transition-all duration-300 ease-out ${
            isPinned
              ? "bg-slate-900/80 backdrop-blur-md shadow-lg shadow-black/40 border-cyan-400/30 scale-[0.98]"
              : "bg-slate-900 border-white/10 shadow-md scale-100"
          }`}
        >
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg flex-1">
            <FaCalendarAlt className="text-cyan-300 text-sm shrink-0" />
            <span className="text-xs font-bold text-cyan-300 shrink-0 hidden xs:inline">Billing Month:</span>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="bg-transparent text-white font-black text-sm sm:text-base focus:outline-none cursor-pointer w-24 sm:w-32 text-center"
              portalId="billing-datepicker-portal"
            />
            <InfoTooltip tipTexts="Rent is collected for the previous month, not the current one — so select last month here." />
          </div>

          <button
            onClick={handleRefreshAll}
            title="Refresh data"
            className="btn btn-square btn-sm rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/15 shrink-0"
          >
            <FaSync className={isRefreshing ? "animate-spin text-cyan-400" : ""} />
          </button>
        </div>

        <div className="overflow-x-auto rounded-t-2xl border border-base-300 shadow-xl">
          <table className="w-full table-fixed divide-y-2 divide-base-300 bg-base-100 text-base-content text-sm">
          <thead className="ltr:text-left rtl:text-right bg-primary text-white h-12">
            <tr>
              <th className="w-[48%] border-r-2 border-primary-content/20 px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">
                Room No
              </th>
              <th className="w-[52%] px-3 sm:px-4 py-2 font-medium text-center text-xs sm:text-sm">
                Total Bill
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-base-300">
            {isLoading && <Loader />}
            {residentialRooms
              .sort((a, b) => a.roomNo - b.roomNo)
              .map((item, index) => {
                const myData = monthlyBillsData[0]?.bills?.find(
                  (item2) => item2.roomNo === item.roomNo
                );
                return (
                  <tr key={index} className="h-12 odd:bg-base-200/50 hover:bg-base-200 transition-colors">
                    <td className="p-2 sm:p-3 font-semibold leading-relaxed">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[11px] opacity-70">Room:</span>
                        <span className="text-white bg-primary py-0.5 px-2.5 rounded-full font-bold text-xs">
                          {item?.roomNo}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 mt-1">
                        <span className="text-[11px] opacity-70">Name:</span>
                        <span className="font-bold text-primary text-xs truncate max-w-[120px] sm:max-w-none">
                          {item?.leaseholder[0]?.name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="font-semibold text-center border-l-2 border-base-300 p-2">
                      {monthlyBillsData[0]?.bills?.find(
                        (item2) => item2.roomNo === item.roomNo
                      ) || item.roomNo === "3" ? (
                        <BillCalculations
                          room={item}
                          billingRoomNo={item.roomNo}
                          selectedMonth={selectedMonth}
                          selectedYear={selectedYear}
                          myData={myData}
                          refetch4={refetchBills}
                        />
                      ) : (
                        <p className="flex-center text-error font-bold text-xs animate-pulse">
                          <IoIosWarning className="text-base mr-1" />
                          Data missing
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
      </div>
    </CompoWrapper>
  );
};

export default MonthlyBillsTable;
