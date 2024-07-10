import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import NewLeaseHolderForm from "../Forms/NewLeaseHolderForm";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { BsSpeedometer2 } from "react-icons/bs";

const SingleRoom = () => {
  const roomData = useLoaderData();
  const { _id, category, position, hasMeter, leaseholder, rent, roomNo } =
    roomData;
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div>
      <a
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              Room No : {roomNo}
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600 border-b-2 w-fit border-red-600">
              অবস্থান : {category} ({position})
            </p>
          </div>
        </div>

        <div className="mt-4">
          {leaseholder.length > 0 ? (
            <div className="text-pretty text-sm ">
              <p className="text-lg block pb-2 text-primary">
                {" "}
                বর্তমান ভাড়াটিয়া:{" "}
              </p>
              <div className="border border-primary p-2  rounded-lg shadow-lg ">
                নাম : {leaseholder[0]?.name} <br />
                ফোন : {leaseholder[0]?.phoneNumber} <br />
                ভাড়া শুরু : {new Date(leaseholder[0]?.rentFrom).toDateString()}
              </div>
            </div>
          ) : (
            "No Information 😞"
          )}
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6 ">
          <div className="flex flex-col-reverse border border-primary p-2  rounded-lg shadow-lg ">
            <dt className="text-sm font-medium text-gray-600">{rent} টাকা </dt>
            <dd className="text-xs text-gray-500 pb-2 underline underline-offset-4">
              <GiMoneyStack className="inline text-secondary text-xl" />
              ভাড়া{" "}
            </dd>
          </div>

          <div className="flex flex-col-reverse border border-primary p-2  rounded-lg shadow-lg ">
            <dt className="text-sm font-medium text-gray-600">
              {hasMeter ? "আছে" : " নেই  "}
            </dt>
            <dd className="text-xs text-gray-500 pb-2 underline underline-offset-4">
            <BsSpeedometer2 className="inline text-secondary text-xl" />
            মিটার?
            </dd>
          </div>
          <div className="flex flex-col-reverse border border-primary p-2  rounded-lg shadow-lg ">
            <dt className="text-sm font-medium text-gray-600">
              {leaseholder[0]?.advance} টাকা
            </dt>
            <dd className="text-xs text-gray-500 pb-2 underline underline-offset-4">
              <GrMoney className="inline text-secondary text-xl" /> Advance
            </dd>
          </div>
        </dl>
      </a>
      <div>
        <button
          className="btn btn-sm btn-secondary text-white m-2"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? "নতুন ভাড়াটিয়া অ্যাড " : "✖ Close Form"}
        </button>
        <div className={`${isVisible ? "hidden" : "block"}`}>
          <NewLeaseHolderForm id={_id} />
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
