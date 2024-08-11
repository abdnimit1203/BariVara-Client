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
import InfoTooltip from "../../utils/InfoTooltip";
import { IoIosWarning } from "react-icons/io";

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
      <section className="border-2 border-primary px-4 my-2 rounded-lg shadow-lg ">
        <HeaderText
          title={"💵 Monthly Bill Page"}
          subTitle={`Current Month : ${month} , ${year}`}
        />

        <div className="grid grid-cols-8 gap-2  w-[100%] p-2 items-center font-semibold ">
          <p className="col-span-3">ভাড়ার মাস:</p>
          <span className="col-span-4">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="border-primary border-2 w-[100%] p-2 rounded-full font-semibold text-primary focus:outline-sky-600"
            />
          </span>
          <span className="col-span-1">
            <InfoTooltip tipTexts="চলতি মাসে বিল দেয়া হয় গত মাসের টি ।  তাই গত মাস সিলেক্ট করুন " />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2  w-[100%] p-2 items-center font-semibold ">
          <p>NEXT MONTH :</p>
          {nextMonth}
        </div>
      </section>
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right bg-primary text-white h-12">
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
              .sort((a, b) => a.roomNo - b.roomNo)
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
                      {(selectedMonthReading && nextMonthReading) ||
                      item?.roomNo === 3 ? (
                        // <span className="flex justify-center items-center gap-2 drop-shadow-xl bg-white w-fit mx-auto p-3 rounded-full border">
                        //   <FaSackDollar className="inline text-xl text-secondary" />
                        //   {selectedMonthReading.meterNumber}
                        //   <FaEdit className="inline text-xl text-secondary ml-6" />
                        // </span>
                        <BillCalculations
                          billingMonthMeter={selectedMonthReading}
                          nextMonthMeter={nextMonthReading}
                          billingRoomNo={item.roomNo}
                        />
                      ) : (
                        <p className="flex-center text-error animate-pulse">
                          <IoIosWarning className="text-lg mr-1"/>
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
    </CompoWrapper>
  );
};

export default MonthlyBillsTable;
