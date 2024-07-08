import CompoWrapper from "../Wrapper/CompoWrapper";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { IoWaterSharp } from "react-icons/io5";
import { GiGate, GiTreeGrowth } from "react-icons/gi";
import ModalUniversal from "../../utils/ModalUniversal";
// import useRooms from "../../hooks/useRooms";
// import Loader from "./../../utils/Loader";
import rooms from "../../../public/rooms.json";
const HouseMap = () => {
  // const [rooms, isLoading] = useRooms();
  // console.log(rooms);
  console.log(rooms);
  return (
    <CompoWrapper>
      {/* {isLoading ? (
        <div className="flex  items-center justify-center min-h-[calc(100vh-250px)]">
          <Loader />
        </div>
      ) : ( */}
      <div className="text-white">
        <div>
          <div className="grid grid-cols-2 gap-2 justify-end">
            {rooms
              .filter((room) => room.category === "Lal Gate(লাল গেইট)")
              .map((item, index) => (
                <div
                  key={index}
                  className={`${
                    !item?.hasMeter ? "bg-green-500" : " bg-blue-500 "
                  } shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex  justify-between flex-col gap-2 items-center text-center `}
                >
                  {!isNaN(item?.roomNo) ? `Room ${item?.roomNo}` : item?.roomNo}
                  {item?.roomNo === "Kitchen (Pani Meter)" ? (
                    <IoWaterSharp className="block text-center w-full m-2  text-3xl  " />
                  ) : !item?.hasMeter ? (
                    <GiTreeGrowth className="block text-center w-full m-2  text-2xl  " />
                  ) : (
                    <FaHouseChimneyUser className="block text-center w-full m-2  text-3xl  " />
                  )}
                  <div className={`${!item.hasMeter ? "hidden" : "block"}`}>
                    <ModalUniversal roomData={item} />
                  </div>
                </div>
              ))}

            {/* <div className="grid grid-cols-1 gap-2">
                <div className="row-span-12  bg-green-500  shadow-md font-medium py-2  flex justify-center flex-col gap-2 items-center ">
                  Mango Tree (আমগাছ )
                </div>
                <div className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex justify-between flex-col gap-2 items-center  ">
                  Room 9{" "}
                  <FaHouseChimneyUser className="block text-center w-full m-2  text-3xl  " />
                  <div>
                    <button className="btn btn-primary btn-xs mx-auto rounded-sm w-full">
                      View{" "}
                    </button>
                  </div>
                </div>{" "}
                <div className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex justify-between flex-col gap-2 items-center ">
                  Kitchen (Pani Meter)
                  <IoWaterSharp className="block text-center w-full m-2  text-3xl  " />
                  <div>
                    <button className="btn btn-primary btn-xs mx-auto rounded-sm w-full">
                      View{" "}
                    </button>
                  </div>
                </div>
                <div className=" bg-teal-800  shadow-md font-medium py-2 flex justify-center  flex-col gap-2 items-center ">
                  BATHROOM
                </div>
              </div> */}
          </div>
          <h3 className="bg-red-600 flex justify-center gap-3 text-center font-semibold py-2 text-lg uppercase  my-2">
            <GiGate className="inline text-2xl text-red-900 " />
            Lal Gate
          </h3>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2 justify-end bg-gray-200">
            <div className="grid grid-cols-1 gap-2 ">
              <div className=" bg-teal-800  shadow-md font-medium py-2 flex justify-center flex-col gap-2 items-center ">
                Gap
              </div>
              <div className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex ju stify-between flex-col gap-2 items-center ">
                Room 10{" "}
                <FaHouseChimneyUser className="block text-center w-full m-2  text-3xl  " />
                <div>
                  <button className="btn btn-primary btn-xs mx-auto rounded-sm w-full">
                    View{" "}
                  </button>
                </div>
              </div>
              <div className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex justify-between flex-col gap-2 items-center  ">
                Room 11{" "}
                <FaHouseChimneyUser className="block text-center w-full m-2  text-3xl  " />
                <div>
                  <button className="btn btn-primary btn-xs mx-auto rounded-sm w-full">
                    View{" "}
                  </button>
                </div>
              </div>
              <div className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex justify-between flex-col gap-2 items-center  ">
                Room 12{" "}
                <FaHouseChimneyUser className="block text-center w-full m-2  text-3xl  " />
                <div>
                  <button className="btn btn-primary btn-xs mx-auto rounded-sm w-full">
                    View{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 ">
              <div className=" bg-teal-800  shadow-md font-medium py-2 flex justify-center flex-col gap-2  items-center ">
                BATHROOM
              </div>
              <div className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex ju stify-between flex-col gap-2 items-center ">
                Room 15 (NO METER){" "}
                <FaHouseChimneyUser className="block text-center w-full m-2  text-3xl  " />
                <div>
                  <button className="btn btn-primary btn-xs mx-auto rounded-sm w-full">
                    View{" "}
                  </button>
                </div>
              </div>{" "}
              <div className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex justify-between flex-col gap-2  items-center ">
                Room 14{" "}
                <FaHouseChimneyUser className="block text-center w-full m-2  text-3xl  " />
                <div>
                  <button className="btn btn-primary btn-xs mx-auto rounded-sm w-full">
                    View{" "}
                  </button>
                </div>
              </div>{" "}
              <div className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex justify-between flex-col gap-2  items-center ">
                Room 13{" "}
                <FaHouseChimneyUser className="block text-center w-full m-2  text-3xl  " />
                <div>
                  <button className="btn btn-primary btn-xs mx-auto rounded-sm w-full">
                    View{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img src="tin.PNG" alt="tin" className="mt-3" />
          <h3 className="bg-teal-400 text-center font-semibold py-2 text-lg uppercase  mb-2">
            Tin Shed
          </h3>
        </div>

        {/* KECHI GATE MAP AREA STARTS */}

        <section>
          <img src="kechigate.PNG" alt="kechi gate" className="mt-1" />
          <h3 className="bg-amber-800 text-center font-semibold  text-lg uppercase mb-2 ">
            KechiGate
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {rooms
              .filter((room) => room.category === "Kechi Gate(কেচি গেইট)")
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-500 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex  justify-between flex-col gap-2 items-center "
                >
                  <div className="flex-center gap-2 font-semibold">
                    <FaHouseChimneyUser className="flex-center" />
                    <span>Room {item.roomNo}</span>
                  </div>

                  <div>
                    <ModalUniversal roomData={item} />
                  </div>
                </div>
              ))}
          </div>

          <img src="wall.PNG" alt="great wall" className="my-1 h-5 w-full rounded" />
        </section>
      </div>
      {/* )} */}
    </CompoWrapper>
  );
};

export default HouseMap;
