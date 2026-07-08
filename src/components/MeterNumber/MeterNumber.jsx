import { useEffect, useState } from "react";
import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HeaderText from "../../utils/HeaderText";
import MeterForm from "../Forms/MeterForm";
import { FcDisplay } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import CompoWrapper from "../Wrapper/CompoWrapper";
import useMonthlyMeterData from "../../hooks/useMonthlyMeterData";
import useRooms from "../../hooks/useRooms";
import Loader from "../../utils/Loader";
import UniversalModal from "./../Modals/UniversalModal";
import MeterEditModal from "../Modals/MeterEditModal";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { DeleteMeterReadingById } from "../../API/api";
import { getPreviousMonthAndYear } from "../../utils/getPreviousMonthYear";

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

  const defaultDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedEndMonth, setSelectedEndMonth] = useState(monthNames[now.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [insertedWaterMeter, setInsertedWaterMeter] = useState(false);

  // DATA FETCHING
  const [rooms, isLoading, refetch] = useRooms();

  const [monthlyData, isLoading2, refetch2] = useMonthlyMeterData(
    selectedEndMonth,
    selectedYear
  );

  const { previousMonth, previousYear } = getPreviousMonthAndYear(
    selectedEndMonth,
    selectedYear
  );
  const [prevMonthlyData] = useMonthlyMeterData(previousMonth, previousYear);

  //  water meter inserted logic
  useEffect(() => {
    if (
      monthlyData[0]?.meterReadings.find(
        (room) => room.roomNo == "Water Meter (পানি)"
      )
    ) {
      setInsertedWaterMeter(true);
    } else {
      setInsertedWaterMeter(false);
    }
  }, [monthlyData]);

  useEffect(() => {
    refetch2();
  }, [refetch2, selectedEndMonth, selectedYear]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedEndMonth(monthNames[getMonth(date)]);
    setSelectedYear(getYear(date));
  };

  // Delete Meter Reading
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to get the meter details!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes - remove data",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await DeleteMeterReadingById(id);
          console.log(data);
          Swal.fire({
            position: "top-end",
            text: `Meter Data has been deleted`,
            showConfirmButton: false,
            timer: 2500,
            icon: 'success'
            
          }) 
          refetch2();
      
        } catch (err) {
          console.log(err.response?.data?.message || "Invalid credentials!");
          toast.error(err.response?.data.error);
        }
      }
    });
  };
  return (
    <CompoWrapper>
      <HeaderText
        title={"Insert Meter Number 🔢"}
        subTitle={`Selected : ${selectedEndMonth} , ${selectedYear}`}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
        <p className="border w-fit p-2 rounded-full">
          Meter inserted: {monthlyData[0]?.meterReadings?.length} / 15
        </p>
        <div className="flex items-center gap-2 bg-blue-950 text-white px-3 py-2 rounded-lg">
          <span className="text-sm font-semibold">মাস ও সাল:</span>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="text-black rounded p-1 text-sm w-36"
          />
        </div>
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
              .sort((a, b) => {
                // Place "Water Meter (পানি)" at the beginning
                if (a.roomNo === "Water Meter (পানি)") return -1;
                if (b.roomNo === "Water Meter (পানি)") return 1;

                // Sort the remaining room numbers numerically
                return parseInt(a.roomNo) - parseInt(b.roomNo);
              })
              .map((item, index) => {
                const meterReading = monthlyData[0]?.meterReadings?.find(
                  (item2) => item2.roomNo === item.roomNo
                );
                const prevMeterReading = prevMonthlyData?.[0]?.meterReadings?.find(
                  (item2) => item2.roomNo === item.roomNo
                );
                const prevReadingNum = prevMeterReading?.meterNumber ?? null;

                return (
                  <tr key={index} className="h-12 odd:bg-[#f8f8f8] ">
                    <td className="p-3 font-semibold leading-relaxed">
                      <span className="text-xs opacity-70 mr-2">রুম :</span>
                      <span className="text-white bg-primary p-1 rounded-full">
                        {item?.roomNo}
                      </span>{" "}
                      <br />
                      <span className="text-xs opacity-70 mr-1">নাম :</span>
                      <span className="text-xs drop-shadow-xl mr-2">
                        {item?.leaseholder[0]?.name}
                      </span>
                    </td>
                    <td className="font-semibold text-center border-l-2 ">
                      {meterReading ? (
                        <div className="flex flex-col items-center justify-center py-1">
                          <span className="flex justify-center items-center gap-2">
                            <FcDisplay className="inline text-xl border pb-1 border-b-2 border-primary" />

                            {/* {meterReading.meterNumber.toLocaleString("bn-BD", { useGrouping: false })} */}
                            {meterReading.meterNumber}

                            <MeterEditModal
                              meterReading={meterReading}
                              refetch2={refetch2}
                              month={selectedEndMonth}
                              year={selectedYear}
                            />
                            <button
                              onClick={() => handleDelete(meterReading?._id)}
                            >
                              <MdDelete className="text-xl text-error" />
                            </button>
                          </span>
                          {prevReadingNum !== null && (
                            <p className="text-[10px] opacity-40 mt-0.5 truncate leading-tight">
                              prev: {prevReadingNum}
                            </p>
                          )}
                        </div>
                      ) : ["12", "13", "14"].includes(item?.roomNo) &&
                        !insertedWaterMeter ? (
                        <span className="text-error animate-pulse duration-300">
                          ⚠️Insert Water Meter{" "}
                        </span>
                      ) : (
                        <MeterForm
                          roomData={item}
                          month={selectedEndMonth}
                          year={selectedYear}
                          refetch={refetch}
                          refetch2={refetch2}
                          prevReading={prevReadingNum}
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
