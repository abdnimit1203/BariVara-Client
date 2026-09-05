import CompoWrapper from "../Wrapper/CompoWrapper";
import useRooms from "../../hooks/useRooms";
import Loader from "./../../utils/Loader";
import RoomColumn from "./RoomColumn";
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
        <div className="text-white bg-base-200/50 rounded-3xl p-3 sm:p-6 mb-6 border border-base-300">
          {/* There is a navigator compass on bottom left . This is  */}

          {/* Tin Shed(টিনশেড) MAP AREA STARTS */}
          <section>
            <div>
              <img
                src="/tin.jpg"
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
              <RoomColumn
                rooms={rooms}
                category="Tin Shed(টিনশেড)"
                position="right"
                className="space-y-2 col-span-2"
                tileProps={{ variant: "tin" }}
              />
              <div className="h-full bg-sky-950 relative">
                <span className="w-2 h-full left-[45%] border-dotted border-2 absolute"></span>
              </div>
              <RoomColumn
                rooms={rooms}
                category="Tin Shed(টিনশেড)"
                position="left"
                className="space-y-2 col-span-2"
                tileProps={{ variant: "tin" }}
              />
            </div>
            {/* Divider image portion ends */}
          </section>
          {/* Tin Shed(টিনশেড) MAP AREA ENDS */}

          <hr className="my-3" />

          {/* Lal Gate(লাল গেইট) MAP AREA STARTS */}
          <section>
            <div>
              <img
                src="/redgate.PNG"
                alt="Red Gate"
                className="mt-1 rounded-t-2xl "
              />
              <h3 className="bg-red-800 text-center font-semibold  text-lg uppercase mb-2 ">
                Lal Gate(লাল গেইট)
              </h3>
            </div>
            {/* Divider image portion starts */}

            <div className="grid grid-cols-2 gap-2">
              <RoomColumn
                rooms={rooms}
                category="Lal Gate(লাল গেইট)"
                position="right"
                className="space-y-2"
                tileProps={{
                  baseColor: "bg-rose-700",
                  heightClass: "h-20",
                  numericLabel: (roomNo) => `Room : ${roomNo}`,
                }}
              />
              <RoomColumn
                rooms={rooms}
                category="Lal Gate(লাল গেইট)"
                position="left"
                className="space-y-2 "
                tileProps={{ baseColor: "bg-rose-700", heightClass: "h-20" }}
              />
            </div>
            {/* Divider image portion ends */}
          </section>
          {/* Lal Gate(লাল গেইট) MAP AREA ENDS */}

          <hr className="my-3" />

          {/* Kechi Gate(কেচি গেইট) MAP AREA STARTS */}
          <section>
            <div>
              <img
                src="/kechigate.PNG"
                alt="kechi gate"
                className="mt-1 rounded-t-2xl"
              />
              <h3 className="bg-amber-800 text-center font-semibold  text-lg uppercase mb-2 ">
                KechiGate
              </h3>
            </div>
            {/* Divider image portion starts */}
            <div>
              <RoomColumn
                rooms={rooms}
                category="Kechi Gate(কেচি গেইট)"
                position="top"
                className="flex justify-end pb-2"
                tileProps={{ baseColor: "bg-amber-800", widthClass: "w-1/3" }}
              />
              <RoomColumn
                rooms={rooms}
                category="Kechi Gate(কেচি গেইট)"
                position="bottom"
                className="grid grid-cols-3 gap-2"
                tileProps={{ baseColor: "bg-amber-800" }}
              />
            </div>
            {/* Divider image portion ends */}

            <img
              src="/wall.PNG"
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
