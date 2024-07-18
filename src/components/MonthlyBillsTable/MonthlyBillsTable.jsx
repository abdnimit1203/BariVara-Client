import { useEffect, useState } from "react";
import HeaderText from "../../utils/HeaderText";
import { FaEdit } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import CompoWrapper from "../Wrapper/CompoWrapper";
import useMonthlyMeterData from "../../hooks/useMonthlyMeterData";
import useRooms from "../../hooks/useRooms";
import Loader from "../../utils/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import BillCalculations from "../BillCalculations/BillCalculations";

const MonthlyBillsTable = () => {
  const now = new Date();
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

  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  // Function for getting next month name
  const getNextMonth = (month) => {
    const index = monthNames.indexOf(month);
    if (index === -1) {
      return "Invalid month name";
    }
    const nextIndex = (index + 1) % monthNames.length;
    return monthNames[nextIndex];
  };

  // Month Year Selector
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(getYear(selectedDate));
  const [selectedMonth, setSelectedMonth] = useState(
    monthNames[getMonth(selectedDate)]
  );
  const [nextMonth, setNextMonth] = useState(
    getNextMonth(monthNames[getMonth(selectedDate)])
  );
  const [waterMeter, setWaterMeter] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedYear(getYear(date));
    setSelectedMonth(monthNames[getMonth(date)]);
    setNextMonth(getNextMonth(monthNames[getMonth(date)]));
  };

  // DATA FETCHING

  // Room data
  const [rooms, isLoading, refetch] = useRooms();

  // Selected month data
  const [selectedMonthsData, isLoading2, refetch2] = useMonthlyMeterData(
    selectedMonth,
    selectedYear
  );

  // Next month data
  const [nextMonthsData, isLoading3, refetch3] = useMonthlyMeterData(
    nextMonth,
    selectedYear
  );

  // const prevWater = selectedMonthsData[0]?.meterReadings.find(
  //   (item) => item.roomNo === "Water Meter (পানি)"
  // );
  // const nextWater = nextMonthsData[0]?.meterReadings.find(
  //   (item) => item.roomNo === "Water Meter (পানি)"
  // );
  // console.log("NEXT ==",nextWater.meterNumber - prevWater.meterNumber)

  return (
    <CompoWrapper>
      <HeaderText
        title={"💵 Monthly Bill Page"}
        subTitle={`Current Month : ${month} , ${year}`}
      />

      <div className="grid grid-cols-2 gap-2  w-[100%] p-2 items-center font-semibold ">
        <p>BILLING MONTH :</p>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border-primary border-2 w-[80%] p-2 rounded-full font-semibold text-primary focus:outline-sky-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-2  w-[100%] p-2 items-center font-semibold ">
        <p>NEXT MONTH :</p>
        {nextMonth}
      </div>

      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right bg-secondary text-white h-12">
            <tr>
              <th className="whitespace-nowrap border-r-2 px-4 py-2 font-medium">
                Room No
              </th>
              <th className="whitespace-nowrap border-r-2 px-4 py-2 font-medium">
                Total Bill
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-200">
            {isLoading && <Loader />}
            {rooms
              .filter(
                (data) =>
                  Number.isInteger(data.roomNo) === true ||
                  data.roomNo === "Water Meter (পানি)"
              )
              .map((item, index) => {
                const selectedMonthReading =
                  selectedMonthsData[0]?.meterReadings?.find(
                    (item2) => item2.roomNo === item.roomNo
                  );
                const nextMonthReading = nextMonthsData[0]?.meterReadings?.find(
                  (item2) => item2.roomNo === item.roomNo
                );
                return (
                  <tr key={index} className="h-12  odd:bg-[#f8f8f8]">
                    <td className="p-3 font-semibold leading-relaxed">
                      Room No:{" "}
                      <span className="text-white bg-primary p-1 rounded-full">
                        {item?.roomNo}
                      </span>{" "}
                      <br />
                      Name: {item?.leaseholder[0]?.name}
                    </td>
                    <td className="font-semibold text-center border-l-2 w-[35%]">
                      {selectedMonthReading && nextMonthReading ? (
                        // <span className="flex justify-center items-center gap-2 drop-shadow-xl bg-white w-fit mx-auto p-3 rounded-full border">
                        //   <FaSackDollar className="inline text-xl text-secondary" />
                        //   {selectedMonthReading.meterNumber}
                        //   <FaEdit className="inline text-xl text-secondary ml-6" />
                        // </span>
                        <BillCalculations
                          billingMonthMeter={selectedMonthReading}
                          nextMonthMeter={nextMonthReading}
                        />
                      ) : (
                        <p>Data missing</p>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </CompoWrapper>
  );
};

export default MonthlyBillsTable;
