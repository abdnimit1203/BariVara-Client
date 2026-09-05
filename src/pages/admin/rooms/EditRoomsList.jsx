import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaBolt, FaTint, FaFire } from "react-icons/fa";
import RoomForm from "../../../components/Forms/RoomForm";
import UniversalModal from "../../../components/Modals/UniversalModal";
import useRooms from "../../../hooks/useRooms";
import Loader from "../../../utils/Loader";
import { updateRoomById } from "../../../API/api";

const Flag = ({ on, icon, label }) => (
  <span
    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
      on ? "bg-base-100 text-base-content border border-base-300" : "bg-base-200/60 text-base-content/30 line-through"
    }`}
  >
    {icon} {label}
  </span>
);

const EditRoomsList = () => {
  const [rooms, isLoading, refetch] = useRooms();
  const [editingRoom, setEditingRoom] = useState(null);

  const handleSave = async (data) => {
    const payload = {
      category: data.category,
      position: data.position,
      rent: Number(data.rent),
      hasMeter: !!data.hasMeter,
      meterNo: data.hasMeter && data.meterNo ? Number(data.meterNo) : null,
      hasWaterBill: !!data.hasWaterBill,
      hasGasBill: !!data.hasGasBill,
    };

    try {
      await updateRoomById(editingRoom._id, payload);
      toast.success(`রুম ${editingRoom.roomNo} আপডেট করা হয়েছে! (Room updated)`);
      setEditingRoom(null);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "আপডেট ব্যর্থ হয়েছে। (Update failed)");
    }
  };

  const residentialRooms = rooms
    .filter((r) => isNaN(r.roomNo) === false)
    .sort((a, b) => a.roomNo - b.roomNo);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="border-b border-base-300 pb-4 flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-primary">Settings</span>
          <h1 className="text-xl sm:text-2xl font-black text-base-content flex items-center gap-2">
            <FaEdit className="text-blue-600" />
            রুম এডিট করুন (Edit Rooms)
          </h1>
        </div>
        <Link to="/admin/settings/rooms/add" className="btn btn-sm btn-primary rounded-xl gap-1.5 shrink-0">
          <FaPlus className="text-xs" /> Add
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-2.5">
          {residentialRooms.map((room) => (
            <div
              key={room._id}
              className="flex items-center justify-between gap-3 bg-base-100 border border-base-300 rounded-2xl p-3 sm:p-4 shadow-sm"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white bg-primary py-0.5 px-2.5 rounded-full font-bold text-xs shrink-0">
                    Room {room.roomNo}
                  </span>
                  <span className="text-xs font-semibold text-base-content/70 truncate">
                    {room.category} · {room.position} · ৳{room.rent}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Flag on={room.hasMeter} icon={<FaBolt />} label="Meter" />
                  <Flag on={room.hasWaterBill} icon={<FaTint />} label="Water" />
                  <Flag on={room.hasGasBill} icon={<FaFire />} label="Gas" />
                </div>
              </div>
              <button
                onClick={() => setEditingRoom(room)}
                className="btn btn-sm btn-square btn-ghost rounded-lg shrink-0"
                title="Edit room"
              >
                <FaEdit />
              </button>
            </div>
          ))}
        </div>
      )}

      <UniversalModal
        isOpen={!!editingRoom}
        onClose={() => setEditingRoom(null)}
        title={editingRoom ? `Edit Room ${editingRoom.roomNo}` : ""}
      >
        {editingRoom && (
          <RoomForm
            isRoomNoLocked
            defaultValues={{
              roomNo: editingRoom.roomNo,
              category: editingRoom.category,
              position: editingRoom.position,
              rent: editingRoom.rent,
              hasMeter: !!editingRoom.hasMeter,
              meterNo: editingRoom.meterNo || "",
              hasWaterBill: !!editingRoom.hasWaterBill,
              hasGasBill: !!editingRoom.hasGasBill,
            }}
            onSubmit={handleSave}
            submitLabel="সংরক্ষণ করুন (Save Changes)"
          />
        )}
      </UniversalModal>
    </div>
  );
};

export default EditRoomsList;
