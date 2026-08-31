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
        <p className="border border-base-300 bg-base-100 text-base-content font-bold w-fit p-2 rounded-full shadow-sm">
          Meter inserted: {monthlyData[0]?.meterReadings?.length} / 15
        </p>
        <div className="flex items-center gap-2 bg-blue-950 text-white px-3 py-2 rounded-lg shadow-md">
          <span className="text-sm font-semibold">মাস ও সাল:</span>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="bg-base-100 text-base-content border border-base-300 rounded p-1 text-sm w-36 font-bold focus:outline-primary"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-t-lg border border-base-300 shadow-xl">
        <table className="w-full table-fixed divide-y-2 divide-base-300 bg-base-100 text-base-content text-sm">
          <thead className="ltr:text-left rtl:text-right bg-secondary text-white h-11">
            <tr>
              <th className="w-[44%] border-r-2 border-secondary-content/20 px-2 sm:px-4 py-2 font-medium text-xs sm:text-sm">
                Room No
              </th>
              <th className="w-[56%] px-2 sm:px-4 py-2 font-medium text-center text-xs sm:text-sm">
                Meter No
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-300">
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
                  <tr key={index} className="h-12 odd:bg-base-200/60 hover:bg-base-200 transition-colors">
                    <td className="p-2 sm:p-3 font-semibold leading-relaxed">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[11px] opacity-70">রুম:</span>
                        <span className="text-white bg-primary py-0.5 px-2 rounded-full font-bold text-xs">
                          {item?.roomNo}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 mt-1">
                        <span className="text-[11px] opacity-70">নাম:</span>
                        <span className="text-xs drop-shadow-sm font-bold text-primary truncate max-w-[120px] sm:max-w-none">
                          {item?.leaseholder[0]?.name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="font-semibold text-center border-l-2 border-base-300 p-1 sm:p-2">
                      {meterReading ? (
                        <div className="flex flex-col items-center justify-center py-1">
                          <span className="flex justify-center items-center gap-1.5 sm:gap-2 text-base font-bold font-mono tracking-wide">
                            <FcDisplay className="inline text-lg sm:text-xl border pb-1 border-b-2 border-primary shrink-0" />

                            <span>{meterReading.meterNumber}</span>

                            <MeterEditModal
                              meterReading={meterReading}
                              refetch2={refetch2}
                              month={selectedEndMonth}
                              year={selectedYear}
                            />
                            <button
                              onClick={() => handleDelete(meterReading?._id)}
                            >
                              <MdDelete className="text-lg sm:text-xl text-error hover:scale-110 transition-transform" />
                            </button>
                          </span>
                          {prevReadingNum !== null && (
                            <p className="text-[11px] opacity-60 mt-0.5 truncate leading-tight font-mono">
                              prev: {prevReadingNum}
                            </p>
                          )}
                        </div>
                      ) : ["12", "13", "14"].includes(item?.roomNo) &&
                        !insertedWaterMeter ? (
                        <span className="text-error font-bold animate-pulse duration-300">
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

