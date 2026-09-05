/* eslint-disable react/prop-types */
import { useForm, useWatch } from "react-hook-form";
import { FaDoorOpen, FaMapMarkerAlt, FaMoneyBillWave, FaBolt, FaTint, FaFire } from "react-icons/fa";

// The House Map page (HouseMap.jsx) filters rooms by an exact category+position
// match to place them on the map. A room saved outside these pairs simply
// never appears there, so the choices here are locked to what HouseMap.jsx
// actually renders rather than left as free text.
const CATEGORY_OPTIONS = [
  { value: "Tin Shed(টিনশেড)", positions: ["right", "left"] },
  { value: "Lal Gate(লাল গেইট)", positions: ["right", "left"] },
  { value: "Kechi Gate(কেচি গেইট)", positions: ["top", "bottom"] },
];

const RoomForm = ({ defaultValues, onSubmit, submitLabel, isRoomNoLocked }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const category = useWatch({ control, name: "category" });
  const hasMeter = watch("hasMeter");
  const positionOptions =
    CATEGORY_OPTIONS.find((c) => c.value === category)?.positions || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Room No */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
            <FaDoorOpen className="text-xs text-primary" />
            <span>Room No</span>
            <span className="text-error">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 15"
            disabled={isRoomNoLocked}
            {...register("roomNo", { required: "Room number is required" })}
            className={`input input-bordered w-full rounded-xl text-sm ${
              isRoomNoLocked ? "opacity-60 cursor-not-allowed" : ""
            } ${errors.roomNo ? "input-error border-error" : "border-base-300"}`}
          />
          {isRoomNoLocked && (
            <p className="text-[11px] text-base-content/40">
              Room number can&apos;t be changed after creation — bills and meter readings are linked to it.
            </p>
          )}
          {errors.roomNo && <p className="text-error text-xs pt-1">{errors.roomNo.message}</p>}
        </div>

        {/* Rent */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
            <FaMoneyBillWave className="text-xs text-accent" />
            <span>Rent (৳)</span>
            <span className="text-error">*</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 3500"
            {...register("rent", { required: "Rent is required", min: 0 })}
            className={`input input-bordered w-full rounded-xl text-sm ${
              errors.rent ? "input-error border-error" : "border-base-300"
            }`}
          />
          {errors.rent && <p className="text-error text-xs pt-1">{errors.rent.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-xs text-secondary" />
            <span>Category (House Map section)</span>
            <span className="text-error">*</span>
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className={`select select-bordered w-full rounded-xl text-sm ${
              errors.category ? "select-error border-error" : "border-base-300"
            }`}
          >
            <option value="">নির্বাচন করুন (Select)</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.value}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-error text-xs pt-1">{errors.category.message}</p>}
        </div>

        {/* Position (depends on category) */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-xs text-secondary" />
            <span>Position on map</span>
            <span className="text-error">*</span>
          </label>
          <select
            disabled={!category}
            {...register("position", { required: "Position is required" })}
            className={`select select-bordered w-full rounded-xl text-sm ${
              !category ? "opacity-60 cursor-not-allowed" : ""
            } ${errors.position ? "select-error border-error" : "border-base-300"}`}
          >
            <option value="">{category ? "নির্বাচন করুন (Select)" : "Select a category first"}</option>
            {positionOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.position && <p className="text-error text-xs pt-1">{errors.position.message}</p>}
        </div>
      </div>

      {/* Utility flags */}
      <div className="space-y-2.5 bg-base-200/50 rounded-xl p-4">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="hasMeter" className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
            <FaBolt className="text-xs text-amber-500" />
            <span>Has its own electric meter</span>
          </label>
          <input id="hasMeter" type="checkbox" {...register("hasMeter")} className="toggle toggle-warning" />
        </div>

        {hasMeter && (
          <div className="space-y-1 pl-1">
            <label className="text-xs font-semibold text-base-content/60">Meter No</label>
            <input
              type="number"
              placeholder="e.g. 4521"
              {...register("meterNo")}
              className="input input-bordered input-sm w-full rounded-lg text-sm border-base-300"
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <label htmlFor="hasWaterBill" className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
            <FaTint className="text-xs text-cyan-500" />
            <span>Has water bill</span>
          </label>
          <input id="hasWaterBill" type="checkbox" {...register("hasWaterBill")} className="toggle toggle-info" />
        </div>

        <div className="flex items-center justify-between gap-3">
          <label htmlFor="hasGasBill" className="text-xs sm:text-sm font-bold text-base-content/80 flex items-center gap-1.5">
            <FaFire className="text-xs text-orange-500" />
            <span>Has gas bill</span>
          </label>
          <input id="hasGasBill" type="checkbox" {...register("hasGasBill")} className="toggle toggle-error" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full rounded-xl font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
      >
        {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : submitLabel}
      </button>
    </form>
  );
};

export default RoomForm;
