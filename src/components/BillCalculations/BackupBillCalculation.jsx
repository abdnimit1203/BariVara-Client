/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import UniversalModal from "../Modals/UniversalModal";
import { FaSackDollar } from "react-icons/fa6";
import { FcPrint } from "react-icons/fc";
import PaymentForm from "../Forms/PaymentForm";

const BillCalculations = ({
  room,
  billingRoomNo,
  selectedMonth,
  myData,
  refetch4,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(room);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(myData);

  // ------------------- PRINT --------------------
  const printRef = useRef();

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = printRef.current.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore original content
  };
  return (
    <div className="flex flex-col justify-center ">
      <div className="">
        <p className="flex justify-center text-center gap-2">
          <FaSackDollar className={`${myData?.paid === "false" ? "text-error":"text-secondary"} inline text-xl `}/>
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
          title={`💵 RENT RECEIPT (Room: ${myData?.roomNo})`}
        >
          <div className="flex justify-end   relative ">
            <button onClick={handlePrint} className=" btn-sm absolute right-4 ">
              <FcPrint className="text-4xl drop-shadow-lg shadow-error animate-wave" />
            </button>
          </div>
          {/* Content inside the modal */}

          {/* PRINTING ZONE STARTS */}

          <section ref={printRef}>
            <div className="flex flex-col gap-6 p-4  pt-0">
              {/* ACCORDION STARTS */}
              <div className="max-w-md mx-auto ">
                <div className="border rounded shadow overflow-hidden">
                  {/* Accordion Header */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${
                      isOpen
                        ? ""
                        : "bg-primary text-white font-semibold hover:bg-cyan-500"
                    } w-full flex justify-between items-center px-4 py-2 `}
                  >
                    <span>
                      {isOpen ? "MEMO (click to hide)" : "SHOW MEMO:"}{" "}
                    </span>
                    <span>{isOpen ? "-" : "+"}</span>
                  </button>
                  {/* Accordion Content */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-auto" : "max-h-0 p-0"
                    } bg-gray-100 text-gray-700 overflow-hidden`}
                  >
                    {isOpen && (
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
                        <div className="leading-7 border-x-8 p-3 border-error drop-shadow-lg bg-yellow-400 text-black rounded-ee-[2rem] ">
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
                              <span className="font-bold text-lg"> ৳1800 </span>
                            ) : (
                              <span className="font-bold text-lg">
                                ৳
                                {myData?.total.toLocaleString("bn-BD", {
                                  useGrouping: false,
                                })}{" "}
                              </span>
                            )}
                          </span>
                          ধার্য করা হয়েছে ।
                          <hr className="my-2 border-black border-dotted" />
                          এই মাসের ১০ তারিখের মধ্যে ভাড়া পরিশোধের জন্য আবেদন করা
                          হলো ।
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* ACCORDION ENDS */}

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
                {room.hasWaterBill ? (
                  <div className="grid grid-cols-2 justify-between">
                    <p className="text-primary drop-shadow-xl">Water bill</p>
                    <p>
                      {myData?.waterBill.toLocaleString("bn-BD", {
                        useGrouping: false,
                      })}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                <div className="grid grid-cols-2 justify-between">
                  <p className="text-red-600">Rent</p>
                  <p>
                    {myData?.rent.toLocaleString("bn-BD", {
                      useGrouping: false,
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-2 justify-between">
                  <p className="text-red-600">Due</p>
                  <p>
                    {myData?.due.toLocaleString("bn-BD", {
                      useGrouping: false,
                    })}
                  </p>
                </div>
                <hr className="border-[1px] border-slate-700 " />
              </section>
            </div>
            <div className="grid grid-cols-2 justify-between font_secondary text-xl">
              <p className="text-red-600 ">Total</p>
              <p className="t">
                ৳{" "}
                {myData?.total.toLocaleString("bn-BD", { useGrouping: false })}
              </p>
            </div>
            <div className="grid grid-cols-2 justify-end font_secondary pt-2 items-center">
              <p className="">Paid Amount : </p>
              <p className="text-white text-lg drop-shadow-lg underline underline-offset-2 border glass bg-success">
                ৳{" "}
                {myData?.paidAmount.toLocaleString("bn-BD", {
                  useGrouping: false,
                })}{" "}
              </p>
            </div>
            <div className="grid grid-cols-2 justify-end font_secondary pt-2">
              <p className="">Payment Status : </p>
              <button className="btn btn-xs bg-blue-700 text-white w-fit mx-auto px-3">
                {myData?.paid}
              </button>
            </div>
          </section>

          {/* PRINTING ZONE ENDS */}

          {myData?.paid == "false" ? (
            <PaymentForm billID={myData._id} refetch4={refetch4} />
          ) : (
            <p className="btn-success btn btn-sm mt-2 text-white">
              Already paid
            </p>
          )}
        </UniversalModal>
      </div>
    </div>
  );
};

export default BillCalculations;
