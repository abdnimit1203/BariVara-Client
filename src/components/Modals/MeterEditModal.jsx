import { FaEdit } from "react-icons/fa";
import UniversalModal from "./UniversalModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateMeterReadingById } from "../../API/api";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const MeterEditModal = ({ meterReading, refetch2, month, year }) => {
  // eslint-disable-next-line react/prop-types
  const { roomNo, meterNumber, createdAt, _id } = meterReading;
  console.log(month, year);
  // ----------------MODAL CALLING---------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      meterNumber: parseFloat(parseFloat(data.meterNumber).toFixed(2)),
      roomNo: roomNo,
      month: month,
      year: year,
    };
    if (month === "") {
      toast.error("Please Select a valid Month!");
    } else {
      console.log("Form Data:", formData);

      try {
        const { data } = await updateMeterReadingById(_id, formData);
        console.log(data);
        toast.success("New meter data updated!");
        reset();
        refetch2();
        closeModal();
      } catch (err) {
        console.log(err.response?.data?.message || "Invalid credentials!");
        toast.error(err.response?.data.message);
      }
    }
  };
  return (
    <div>
      <button onClick={openModal} className="underline text-xs text-success">
        <FaEdit className="inline text-lg sm:text-xl text-secondary ml-2 sm:ml-3 hover:opacity-70" />
      </button>
      <UniversalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="EDIT METER NUMBER 📝"
      >
        <div className="flex flex-col gap-4  ">
          <section className="flex flex-row gap-2 border rounded-lg py-2 glass bg-slate-800 ">
            <div className="bg-warning px-6 ml-2 flex-center rounded-lg">
              <p>Info:</p>
            </div>
            <div className="flex flex-col text-left pl-4 drop-shadow-lg p-2 gap-2 text-white">
              <p>
                Room Number :{" "}
                <span className="bg-primary px-2 text-[15px] text-white rounded-lg ">
                  {roomNo}
                </span>{" "}
              </p>
              <p>
                Previous inserted M Number :{" "}
                <span className="bg-base-100 px-2 text-[15px] text-base-content font-bold rounded-lg block text-center py-1 font-mono text-xl shadow-inner border border-base-300 tracking-wider">
                  {meterNumber}
                </span>{" "}
              </p>
              <p>
                Date :{" "}
                <span className="bg-primary px-2 text-[15px] text-white rounded-lg ">
                  {" "}
                  {month}, {year}
                </span>
              </p>
            </div>
          </section>

          <hr />
          <div className="relative rounded-lg shadow-lg p-6 sm:p-8 bg-primary">
          <div className="glass absolute inset-0 rounded-lg"></div>
          <div className="relative">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex px-1 sm:px-2 justify-center items-center gap-2 sm:gap-3"
          >
            <div className="w-full">
              <input
                id="meterNumber"
                name="meterNumber"
                type="number"
                step="any"
                inputMode="numeric"
                required
                {...register("meterNumber", {
                  required: "meterNumber is required",
                })}
                className="bg-base-100 text-base-content rounded-lg p-2 sm:p-2.5 w-full text-base font-mono font-medium tracking-wider shadow-sm border-2 border-base-300 focus:border-secondary focus:outline-none placeholder:text-sm placeholder:font-sans placeholder:tracking-normal placeholder:opacity-50 text-center sm:text-left"
                placeholder="e.g. 12345"
              />

              {errors.meterNumber && (
                <p className="text-xs text-error mt-1">{errors.meterNumber.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-sm btn-warning text-slate-950 font-bold shrink-0">
              Update
            </button>
          </form>
          </div>
        </div>
         
          <hr />
          <span className="text-xs opacity-55">
            Last Inserted : {new Date(createdAt).toUTCString()}
          </span>
        </div>
       
      </UniversalModal>
    </div>
  );
};

export default MeterEditModal;
