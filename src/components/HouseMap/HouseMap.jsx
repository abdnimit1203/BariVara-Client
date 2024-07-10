import CompoWrapper from "../Wrapper/CompoWrapper";
import { FaHouseChimneyUser, FaShower, FaTree } from "react-icons/fa6";
import { GiSun, GiWaterDrop } from "react-icons/gi";
import ModalUniversal from "../../utils/ModalUniversal";
import useRooms from "../../hooks/useRooms";
import Loader from "./../../utils/Loader";
import { isNumericKey } from "../../utils/isNumeric";
// import rooms from "../../../public/rooms.json";
const HouseMap = () => {
  const [rooms, isLoading] = useRooms();
  console.log(rooms);
  // console.log(rooms.filter());
  return (
    <CompoWrapper>
      {isLoading ? (
        <div className="flex  items-center justify-center min-h-[calc(100vh-250px)] ">
          <Loader />
        </div>
      ) : (
        <div className="text-white bg-gray-100 mb-6 ">
          {/* There is a navigator compass on bottom left . This is  */}
          
          {/* Tin Shed(টিনশেড) MAP AREA STARTS */}
          <section>
            <div>
              <img
                src="tin.jpg"
                alt="Tin Shade"
                className="mt-1 rounded-t-2xl"
              />
              <h3 className="bg-sky-700 text-center font-semibold  text-lg uppercase  ">
                Tin Shed(টিনশেড)
              </h3>
            </div>
            {/* Divider image portion starts */}
            <div className="flex items-center flex-col">
            <div className="bg-sky-200 w-[16%] h-4 border-2 border-sky-300"></div>
            <div className="bg-sky-200 w-[14%] h-4 border-2 border-sky-300"></div>
            <div className="bg-sky-200 w-[12%] h-4 border-2 border-sky-300"></div>
          </div>
            <div className="grid grid-cols-5 gap-2">
              <div className="space-y-2 col-span-2">
                {rooms
                  .filter(
                    (room) =>
                      room.category === "Tin Shed(টিনশেড)" &&
                      room.position === "right"
                  )
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
              <div className="h-full bg-sky-950 relative">
                  <span className="w-2 h-full left-[45%] border-dotted border-2 absolute"></span>
              </div>
              <div className="space-y-2 col-span-2">
                {rooms
                  .filter(
                    (room) =>
                      room.category === "Tin Shed(টিনশেড)" &&
                      room.position === "left"
                  )
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
            </div>
            {/* Divider image portion ends */}
          </section>
          {/* Tin Shed(টিনশেড) MAP AREA ENDS */}

          <hr className="my-3" />

          {/* Lal Gate(লাল গেইট) MAP AREA STARTS */}
          <section>
            <div>
              <img
                src="redgate.PNG"
                alt="Red Gate"
                className="mt-1 rounded-t-2xl "
              />
              <h3 className="bg-red-800 text-center font-semibold  text-lg uppercase mb-2 ">
                Lal Gate(লাল গেইট)
              </h3>
            </div>
            {/* Divider image portion starts */}

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                {rooms
                  .filter(
                    (room) =>
                      room.category === "Lal Gate(লাল গেইট)" &&
                      room.position === "right"
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        item.roomNo === "WashRoom"
                          ? "bg-sky-300"
                          : item.roomNo === "Water Meter (পানি)"
                          ? "bg-blue-600"
                          : item.roomNo === "Mango Tree (আমগাছ)"
                          ? "bg-lime-500"
                          : "bg-rose-700"
                      } shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex  justify-between flex-col gap-2 items-center`}
                    >
                      <div className="flex-center gap-2 font-semibold">
                        {item.roomNo === "WashRoom" ? (
                          <FaShower className="flex-center" />
                        ) : item.roomNo === "Water Meter (পানি)" ? (
                          <GiWaterDrop className="flex-center animate-pulse" />
                        ) : item.roomNo === "Mango Tree (আমগাছ)" ? (
                          <FaTree className="flex-center" />
                        ) : (
                          <FaHouseChimneyUser className="flex-center" />
                        )}

                        <span>
                          {isNumericKey(item.roomNo)
                            ? `Room : ${item.roomNo}`
                            : `${item.roomNo}`}
                        </span>
                      </div>
                      {item.roomNo === "WashRoom" ||
                      item.roomNo === "Mango Tree (আমগাছ)" ? (
                        <GiSun className="text-2xl text-orange-200" />
                      ) : (
                        <div>
                          <ModalUniversal roomData={item} />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="space-y-2">
                {rooms
                  .filter(
                    (room) =>
                      room.category === "Lal Gate(লাল গেইট)" &&
                      room.position === "left"
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="bg-rose-700 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex  justify-between flex-col gap-2 items-center "
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
            </div>
            {/* Divider image portion ends */}
          </section>
          {/* Lal Gate(লাল গেইট) MAP AREA ENDS */}

          <hr className="my-3" />

          {/* Kechi Gate(কেচি গেইট) MAP AREA STARTS */}
          <section>
            <div>
              <img
                src="kechigate.PNG"
                alt="kechi gate"
                className="mt-1 rounded-t-2xl"
              />
              <h3 className="bg-amber-800 text-center font-semibold  text-lg uppercase mb-2 ">
                KechiGate
              </h3>
            </div>
            {/* Divider image portion starts */}
            <div>
              <div className="flex justify-end pb-2">
                {rooms
                  .filter(
                    (room) =>
                      room.category === "Kechi Gate(কেচি গেইট)" &&
                      room.position === "top"
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="bg-amber-800 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex  justify-between flex-col gap-2 items-center w-1/3 "
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
              <div className="grid grid-cols-3 gap-2">
                {rooms
                  .filter(
                    (room) =>
                      room.category === "Kechi Gate(কেচি গেইট)" &&
                      room.position === "bottom"
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="bg-amber-800 shadow-md hover:scale-105 rounded-md transition-all duration-200 font-medium py-2 flex  justify-between flex-col gap-2 items-center "
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
            </div>
            {/* Divider image portion ends */}

            <img
              src="wall.PNG"
              alt="great wall"
              className="my-1 h-5 w-full rounded"
            />
          </section>
          {/* Kechi Gate(কেচি গেইট) MAP AREA ENDS */}
        </div>
      )}
    </CompoWrapper>
  );
};

export default HouseMap;
