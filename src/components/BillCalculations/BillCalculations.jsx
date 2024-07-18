import { useState } from "react";
import useRooms from "../../hooks/useRooms";
import UniversalModal from "../Modals/UniversalModal";
import { FaSackDollar } from "react-icons/fa6";

const BillCalculations = ({ billingMonthMeter, nextMonthMeter }) => {
  //Modal related
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log("BILL CALLCULATION DATA LIST", billingMonthMeter, nextMonthMeter);
  //   if(billingMonthMeter.roomNo ==="Water Meter (পানি)"){
  //     setWaterMeter(9)
  //     console.log(waterMeter)
  //   }else{
  //     console.log("Nai")
  // }

  // Single Room data
  const [room, isLoading, refetch] = useRooms(billingMonthMeter?.roomNo);
  let myDue = 0;
  if (room?.leaseholder) {
    myDue = room?.leaseholder[0]?.due;
  }
  const total =
    (nextMonthMeter?.meterNumber - billingMonthMeter?.meterNumber) * 10 +
    room?.rent;

  console.log("BILLING ROOMS : ", room);

  
  return (
    <div className="flex flex-col justify-center ">
      <div className="">
        <p className="flex justify-center text-center gap-2">
          <FaSackDollar className="inline text-xl text-secondary" />
          {total} টাকা
        </p>
      </div>
      <div className="App">
        {/* Your content */}
        <button onClick={openModal} className="underline text-xs text-success">Details</button>

        <UniversalModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="BILL DETAILS"
        >
          {/* Content inside the modal */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 ">
              <p>Curr Meter</p>
              <p>{nextMonthMeter?.meterNumber}</p>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <p>Prev Meter</p>
              <p>{billingMonthMeter?.meterNumber}</p>
            </div>
            <hr className="border-[1px] border-slate-700" />

            <div className="grid grid-cols-2 justify-between">
              <p>( - )</p>
              <p>
                {nextMonthMeter?.meterNumber - billingMonthMeter?.meterNumber}{" "}
                (x10)
              </p>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <p className="text-yellow-500 drop-shadow-xl">Current bill</p>
              <p>
                {(nextMonthMeter?.meterNumber -
                  billingMonthMeter?.meterNumber) *
                  10}
              </p>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <p className="text-red-600">Rent</p>
              <p>{room?.rent}</p>
            </div>

            <div className="grid grid-cols-2 justify-between">
              <p className="text-red-600">Due</p>
              <p>{myDue ? myDue : "0"}</p>
            </div>
            <hr className="border-[1px] border-slate-700" />
          </div>
          <div className="grid grid-cols-2 justify-between pt-2 ">
              <p className="text-red-600 text-xl">Total</p>
              <p>{total}</p>
            </div>
        </UniversalModal>
      </div>
      {/* <div className="grid grid-cols-2 justify-between">
        <p>Water bill ?</p>
        <p>{room.hasWaterBill? `${(waterMeter +14)*10}`:"No"}</p>
      </div> */}
    </div>
  );
};

export default BillCalculations;
