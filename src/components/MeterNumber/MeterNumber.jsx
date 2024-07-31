import { useEffect, useState } from "react";
import HeaderText from "../../utils/HeaderText";
import MeterForm from "../Forms/MeterForm";
import { FcDisplay } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import CompoWrapper from "../Wrapper/CompoWrapper";
import useMonthlyMeterData from "../../hooks/useMonthlyMeterData";
import useRooms from "../../hooks/useRooms";
import Loader from "../../utils/Loader";

const MeterNumber = () => {
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
  const [selectedEndMonth, setSelectedEndMonth] = useState(month);
  // console.log(`Current Month: ${month}`);
  // console.log(`Current Year: ${year}`);

  // DATA FETCHING
  const [rooms, isLoading, refetch] = useRooms();
  // console.log(rooms);

  const [monthlyData, isLoading2, refetch2] = useMonthlyMeterData(
    selectedEndMonth,
    year
  );
  console.log("monthlyData : ", monthlyData);

  useEffect(() => {
    if (selectedEndMonth) {
      refetch2();
    }
  }, [refetch2, selectedEndMonth]);
  const handleChange = (event) => {
    setSelectedEndMonth(event.target.value);
  };

  return (
    <CompoWrapper>
      <HeaderText
        title={"Insert Meter Number 🔢"}
        subTitle={`Current Month : ${month} , ${year}`}
      />
      <div className="grid grid-cols-3 pb-2">
        <p className="border w-fit p-2 rounded-full m-2 col-span-2">
          Meter inserted: {monthlyData[0]?.meterReadings?.length} / 15
        </p>
        <select
          id="month"
          value={selectedEndMonth}
          onChange={handleChange}
          className="border-2 border-secondary rounded-lg p-2 "
        >
          <option value="">--Select current month</option>
          {monthNames.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
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
            {isLoading && <Loader/>}
            {rooms
              .filter((data) => data.hasMeter === true).sort((a, b) => a.roomNo - b.roomNo).map((item, index) => {
                const meterReading = monthlyData[0]?.meterReadings?.find(
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
                        <span className="flex justify-center items-center  gap-2">
                          <FcDisplay className="inline text-xl border pb-1 border-b-2 border-primary" />

                          {meterReading.meterNumber}
                          <FaEdit className="inline text-xl text-secondary ml-6"/>

                        </span>
                      ) : (
                        <MeterForm
                          roomData={item}
                          month={selectedEndMonth}
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

export default MeterNumber;
