/* eslint-disable react/prop-types */
import { useState } from "react";
import useRooms from "../../hooks/useRooms";
import UniversalModal from "../Modals/UniversalModal";
import { FaSackDollar } from "react-icons/fa6";

const BillCalculations = ({ room, billingRoomNo, selectedMonth, myData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(room);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(myData);

  return (
    <div className="flex flex-col justify-center ">
      <div className="">
        <p className="flex justify-center text-center gap-2">
          <FaSackDollar className="inline text-xl text-secondary" />
          {myData?.roomNo == undefined ? (
            <span>1800 টাকা</span>
          ) : (
            <span>{myData?.total} টাকা</span>
          )}
        </p>
      </div>
      <div className="App">
        {/* Your content */}
        <button
          onClick={openModal}
          className="underline text-[16px] text-xs text-success"
        >
          Details
        </button>

        <UniversalModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="💵 RENT RECEIPT 🧾"
        >
          {/* Content inside the modal */}
          <div className="flex flex-col gap-6 p-4  ">
            <div className="text-left font-medium">
              <div className="border w-fit p-2 bg-yellow-300 rounded-t-lg">
                DATE :{" "}
                <span className="underline text-[16px] decoration-dotted b-2 drop-shadow-2xl text-lg">
                  {new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className=" leading-7 border-x-8 p-3 border-error drop-shadow-lg bg-yellow-400 text-black rounded-ee-[2rem] ">
                Room No :{" "}
                <span className="underline text-[16px] bg-success text-white px-3  rounded-lg ">
                  {room.roomNo}
                </span>
                <br />
                ভাড়াটিয়া :{" "}
                <span className="underline text-[16px] bg-success text-white px-3  rounded-lg ">
                  {room?.leaseholder?.length
                    ? room?.leaseholder[0].name
                    : "null"}{" "}
                </span>
                <br />, আপনার{" "}
                <span className="underline text-[16px] bg-primary text-white px-3  rounded-lg ">
                  {selectedMonth}
                </span>{" "}
                মাস এর ভাড়া{" "}
                <span className="underline text-[16px] bg-primary text-white px-3  rounded-lg ">
                  {myData?.roomNo == undefined ? (
                    <span> ৳1800 </span>
                  ) : (
                    <span>৳{myData?.total.toLocaleString("bn-BD", { useGrouping: false })} </span>
                  )}
                </span>
                ধার্য করা হয়েছে ।
               <hr className="my-2 border-black border-dotted"/>
                এই মাসের ১০ তারিখের মধ্যে ভাড়া পরিশোধের জন্য আবেদন করা হলো ।
              </div>
            </div>
            <h2 className="text-lg">Details | বিবরণ </h2>
            <hr className="-m-4" />
            <section className="space-y-2 font_secondary text-base drop-shadow-lg py-1">
              <div className="grid grid-cols-2 ">
                <p>Current Meter</p>
                <p>
                  {myData?.currentReading.toLocaleString("bn-BD", {
                    useGrouping: false,
                  })}
                </p>
              </div>
              <div className="grid grid-cols-2 justify-between">
                <p>Previous Meter</p>
                <p>
                  {myData?.previousReading.toLocaleString("bn-BD", {
                    useGrouping: false,
                  })}
                </p>
              </div>
              <hr className="border-[1px] border-slate-700" />

              <div className="grid grid-cols-2 justify-between">
                <p>( - )</p>
                <p>
                  {(
                    myData?.currentReading - myData?.previousReading
                  ).toLocaleString("bn-BD", { useGrouping: false })}{" "}
                  ✕ ১০
                </p>
              </div>
              <div className="grid grid-cols-2 justify-between">
                <p className="text-yellow-500 drop-shadow-xl">Current bill</p>
                <p>
                  {myData?.currentBill.toLocaleString("bn-BD", {
                    useGrouping: false,
                  })}
                </p>
              </div>
              {
                room.hasWaterBill?<div className="grid grid-cols-2 justify-between">
                <p className="text-blue-500 drop-shadow-xl">Water bill</p>
                <p>
                  {myData?.waterBill.toLocaleString("bn-BD", {
                    useGrouping: false,
                  })}
                </p>
              </div>:""
              }
              
              <div className="grid grid-cols-2 justify-between">
                <p className="text-red-600">Rent</p>
                <p>
                  {myData?.rent.toLocaleString("bn-BD", { useGrouping: false })}
                </p>
              </div>

              <div className="grid grid-cols-2 justify-between">
                <p className="text-red-600">Due</p>
                <p>
                  {myData?.due.toLocaleString("bn-BD", { useGrouping: false })}
                </p>
              </div>
              <hr className="border-[1px] border-slate-700 " />
            </section>
          </div>
          <div className="grid grid-cols-2 justify-between font_secondary text-xl">
            <p className="text-red-600 ">Total</p>
            <p className="t">
              {myData?.total.toLocaleString("bn-BD", { useGrouping: false })}
            </p>
          </div>
          <div className="grid grid-cols-2 justify-end font_secondary pt-2">
            <p className="">Payment Status : </p>
            <button className="btn btn-xs bg-blue-700 text-white">{myData?.paid}</button>
          </div>
          <div className="grid grid-cols-3 justify-between items-center gap-2 font_secondary py-5 shadow-lg border bg-yellow-300 border-x-8 border-error m-4">
            <p className="text-success ">Submit Payment</p>

            <input type="text"  className="border-2 outline-2 outline-success py-1 rounded-md border-gray-400"/>
            <button className="btn  btn-sm w-fit btn-success text-white">Submit</button>
          </div>
        </UniversalModal>
      </div>
     
    </div>
  );
};

export default BillCalculations;
