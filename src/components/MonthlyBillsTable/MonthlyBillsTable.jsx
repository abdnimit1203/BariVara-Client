import { useEffect, useState } from "react";
import HeaderText from "../../utils/HeaderText";
import MeterForm from "../Forms/MeterForm";
import { FaEdit } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import CompoWrapper from "../Wrapper/CompoWrapper";
import useMonthlyMeterData from "../../hooks/useMonthlyMeterData";
import useRooms from "../../hooks/useRooms";
import Loader from "../../utils/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";

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

  //Give previous month name
  const getPreviousMonth = (month) => {
    const index = monthNames.indexOf(month);
    if (index === -1) {
      return "Invalid month name";
    }
    // If the index is 0 (January), return the last month (December)
    const previousIndex = (index - 1 + monthNames.length) % monthNames.length;
    return monthNames[previousIndex];
  };
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  // Month Year Selector

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(getYear(selectedDate));
  const [selectedMonth, setSelectedMonth] = useState(
    monthNames[getMonth(selectedDate)]
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedYear(getYear(date));
    setSelectedMonth(monthNames[getMonth(date)]);
    const prevMonth = getPreviousMonth(monthNames[getMonth(date)]);
    setPreviousMonth(prevMonth);
  };

  const [previousMonth, setPreviousMonth] = useState(getPreviousMonth(month));
  // console.log(`Current Month: ${month}`);
  // console.log(`Current Year: ${year}`);

  // DATA FETCHING
  const [rooms, isLoading, refetch] = useRooms();

  const [selectedMonthsData, isLoading2, refetch2] = useMonthlyMeterData(
    selectedMonth,
    selectedYear
  );
  console.log("selectedMonthsData : ", selectedMonthsData);
  const [previousMonthsData, isLoading3, refetch3] = useMonthlyMeterData(
    previousMonth,
    selectedYear
  );
  console.log("previousMonthsData : ", previousMonthsData);

  useEffect(() => {
    if (selectedMonth) {
      refetch2();
      refetch3();
    }
  }, [refetch2, refetch3, selectedMonth]);

  return (
    <CompoWrapper>
      <HeaderText
        title={"💵 Monthly Bill Page"}
        subTitle={`Current Month : ${month} , ${year}`}
      />
      <div>
        <div>
          <p>Selected Month: {selectedMonth}</p>
          <p>Selected Year: {selectedYear}</p>
        </div>
      </div>
      <div className="flex gap-2  w-[100%] p-2 items-center font-semibold">
        <p>Current Month : </p>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border-primary border-2 w-[80%] p-2 rounded-full font-semibold text-primary "
        />
      </div>
      <div className=" pb-2 drop-shadow-xl">
        <p className="border w-fit p-2 rounded-full m-2 col-span-2 font-semibold ">
          BILLING MONTH:{" "}
          <span className="font-semibold bg-primary p-2 rounded-full text-white drop-shadow-xl">
            {previousMonth}
          </span>
        </p>
      </div>

      <div className="overflow-x-auto rounded-t-lg ">
        <table
          className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
          //   ref={componentRef}
        >
          <thead className="ltr:text-left rtl:text-right bg-secondary text-white h-12">
            <tr>
              <th className="whitespace-nowrap border-r-2 px-4 py-2 font-medium ">
                Room No
              </th>
              <th className="whitespace-nowrap border-r-2 px-4 py-2 font-medium ">
                Meter No
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 ">
            {isLoading && <Loader />}
            {rooms
              .filter((data) => data.hasMeter === true)
              .map((item, index) => {
                const meterReading = selectedMonthsData[0]?.meterReadings?.find(
                  (item2) => item2.roomNo === item.roomNo
                );
                return (
                  <tr key={index} className="h-12 odd:bg-[#f8f8f8] ">
                    <td className="p-3 font-semibold leading-relaxed">
                      Room No :{" "}
                      <span className="text-white bg-primary p-1 rounded-full">
                        {item?.roomNo}
                      </span>{" "}
                      <br />
                      Name: {item?.leaseholder[0]?.name}
                    </td>
                    <td className="font-semibold text-center border-l-2 ">
                      {meterReading ? (
                        <span className="flex justify-center items-center  gap-2 drop-shadow-xl bg-white w-fit mx-auto p-3 rounded-full border">
                          <FaSackDollar className="inline text-xl text-secondary " />
                          {meterReading.meterNumber} টাকা
                          <FaEdit className="inline text-xl text-secondary ml-6" />
                        </span>
                      ) : (
                        <MeterForm
                          roomData={item}
                          month={selectedMonth}
                          year={year}
                          refetch={refetch}
                          refetch2={refetch2}
                        />
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
