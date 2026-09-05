/* eslint-disable react/prop-types */
import { FaHouseChimneyUser, FaShower, FaTree } from "react-icons/fa6";
import { GiSun, GiWaterDrop } from "react-icons/gi";
import ModalUniversal from "../../utils/ModalUniversal";
import { isNumericKey } from "../../utils/isNumeric";

// Fixed, non-tenant markers that live among Lal Gate's room tiles (a
// washroom, the shared water meter, a mango tree) — keyed by the exact
// roomNo string stored for these entries. WashRoom and the mango tree show
// a sun icon instead of the tenant modal; the water meter still opens it.
const SPECIAL_MARKERS = {
  WashRoom: { bg: "bg-sky-300", icon: <FaShower />, hideModal: true },
  "Water Meter (পানি)": {
    bg: "bg-blue-600",
    icon: <GiWaterDrop className="animate-pulse" />,
    hideModal: false,
  },
  "Mango Tree (আমগাছ)": { bg: "bg-lime-500", icon: <FaTree />, hideModal: true },
};

const RoomTile = ({
  room,
  baseColor = "bg-primary",
  heightClass = "",
  widthClass = "",
  numericLabel = (roomNo) => `Room ${roomNo}`,
  variant = "default",
}) => {
  const marker = SPECIAL_MARKERS[room.roomNo];
  // A special marker (washroom/water meter/mango tree) always wins over the
  // section's own theme — those aren't tin-roof rooms even inside Tin Shed.
  const isTin = variant === "tin" && !marker;
  const bg = marker?.bg || (isTin ? "tin-roof-tile" : baseColor);
  const icon = marker?.icon || <FaHouseChimneyUser />;
  const label = isNumericKey(room.roomNo) ? numericLabel(room.roomNo) : room.roomNo;

  return (
    <div
      className={`${bg} ${heightClass} ${widthClass} group relative flex flex-col justify-between items-center gap-2 rounded-xl py-2.5 px-2 shadow-md ring-1 ring-black/10 dark:ring-white/10 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95`}
    >
      {isTin && (
        <>
          <span className="tin-rivet" style={{ top: 4, left: 4 }} />
          <span className="tin-rivet" style={{ top: 4, right: 4 }} />
          <span className="tin-rivet" style={{ bottom: 4, left: 4 }} />
          <span className="tin-rivet" style={{ bottom: 4, right: 4 }} />
        </>
      )}
      <div className="flex items-center gap-1.5 font-semibold text-white">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-xs shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
        <span className="text-xs sm:text-sm tracking-wide text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          {label}
        </span>
      </div>
      <div>
        {marker?.hideModal ? (
          <GiSun className="text-2xl text-orange-200" />
        ) : (
          <ModalUniversal roomData={room} />
        )}
      </div>
    </div>
  );
};

export default RoomTile;
