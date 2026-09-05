import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import RoomForm from "../../../components/Forms/RoomForm";
import { createRoom } from "../../../API/api";

const AddRoomForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = {
      roomNo: data.roomNo.trim(),
      category: data.category,
      position: data.position,
      rent: Number(data.rent),
      hasMeter: !!data.hasMeter,
      meterNo: data.hasMeter && data.meterNo ? Number(data.meterNo) : null,
      hasWaterBill: !!data.hasWaterBill,
      hasGasBill: !!data.hasGasBill,
    };

    try {
      await createRoom(payload);
      toast.success(`রুম ${payload.roomNo} সফলভাবে যোগ করা হয়েছে! (Room added)`);
      navigate("/admin/settings/rooms/edit");
    } catch (error) {
      toast.error(error?.response?.data?.message || "রুম যোগ করা যায়নি। (Failed to add room)");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="border-b border-base-300 pb-4">
        <span className="text-[11px] font-black uppercase tracking-wider text-primary">Settings</span>
        <h1 className="text-xl sm:text-2xl font-black text-base-content flex items-center gap-2">
          <FaPlus className="text-emerald-600" />
          নতুন রুম যোগ করুন (Add Room)
        </h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          রুম তৈরির পর, ভাড়াটিয়া যোগ করতে Tenant Management পেজ ব্যবহার করুন।
        </p>
      </div>

      <div className="bg-base-100 border border-base-300 shadow-xl rounded-3xl p-5 sm:p-8">
        <RoomForm
          defaultValues={{
            roomNo: "",
            category: "",
            position: "",
            rent: "",
            hasMeter: false,
            meterNo: "",
            hasWaterBill: false,
            hasGasBill: false,
          }}
          onSubmit={onSubmit}
          submitLabel="রুম যোগ করুন (Add Room)"
        />
      </div>
    </div>
  );
};

export default AddRoomForm;
