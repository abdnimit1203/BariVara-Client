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
        <FaEdit className="inline text-xl text-secondary ml-6 hover:opacity-70" />
      </button>
      <UniversalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="EDIT METER NUMBER 📝"
      >
        <div className="flex flex-col gap-4  ">
          <section className="flex flex-row gap-2 ">
            <div className="bg-warning px-6 flex-center rounded-lg">
              <p>Info:</p>
            </div>
            <div className="flex flex-col text-left pl-4">
              <p>
                Room Number :{" "}
                <span className="bg-primary px-2 text-[15px] text-white rounded-lg ">
                  {roomNo}
                </span>{" "}
              </p>
              <p>
                Previous Meter Number :{" "}
                <span className="bg-error px-2 text-[15px] text-white rounded-lg ">
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
          <div className="relative rounded-lg shadow-lg p-8  bg-primary">
          <div className="glass  absolute inset-0 rounded-lg"></div>
          <div className="relative ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex px-2 justify-center items-center gap-4 "
          >
            <div >
              <input
                id="meterNumber"
                name="meterNumber"
                type="number"
                required
                {...register("meterNumber", {
                  required: "meterNumber is required",
                })}
                className=" rounded-lg p-2 w-full text-sm shadow-sm border-2 border-gray-500 focus:outline-secondary  "
                placeholder="Enter New Meter Number"
              />

              {errors.meterNumber && (
                <p style={{ color: "red" }}>{errors.meterNumber.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-sm bg-warning  text-black">
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
