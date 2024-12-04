/* eslint-disable react/prop-types */
import { Controller,useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const NewLeaseHolderForm = ({id}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = {
      ...data,
      advance: parseFloat(data.advance),
      due:0,
      rentTo:null
      
    };
   
      console.log("Form Data:", formData);
    
      axiosInstance
        .post(`/rooms/${id}/leaseholder`, formData)
        .then((res) => {
          console.log("New Bharatia Data : ", res.data);
          toast.success("New Bharatia added!");
          // setRefetch(!refetch)
          reset();
        })
        .catch((error) => {
          // handle error
          console.log(error.response.data);
          // toast.error("Opps! something went wrong!");
          toast.error(error.response.data);
        });
    
  };

  return (
    <div className="border-2 drop-shadow-xl border-secondary p-6 rounded-lg mx-2 my-4">
      <h2 className="font-semibold text-center pb-5 text-secondary">
        FORM :নতুন ভাড়াটিয়া অ্যাড করুন{" "}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex px-2 justify-center items-center gap-4 flex-col"
      >
        <div>
          <label>Name (ভাড়াটিয়া নাম )</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            {...register("name", {
              required: "name is required",
            })}
            className=" rounded-lg p-2 w-full text-sm shadow-sm border-2 border-secondary focus:outline-secondary  "
            placeholder="Enter name"
          />

          {errors.name && (
            <p style={{ color: "red" }}>{errors.name.message}</p>
          )}
        </div>
        <div>
          <label>Phone Number (ভাড়াটিয়া ফোন  )</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            
            {...register("phoneNumber")}
            className=" rounded-lg p-2 w-full text-sm shadow-sm border-2 border-secondary focus:outline-secondary  "
            placeholder="Enter phoneNumber"
          />

          {errors.phoneNumber && (
            <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <label>Advance (অগ্রিম) </label>
          <input
            id="advance"
            name="advance"
            type="number"
            required
            {...register("advance", {
              required: "advance is required",
            })}
            className=" rounded-lg p-2 w-full text-sm shadow-sm border-2 border-secondary focus:outline-secondary  "
            placeholder="Enter advance"
          />

          {errors.advance && (
            <p style={{ color: "red" }}>{errors.advance.message}</p>
          )}
        </div>
       
        <div>
          <label>Rent From (ভাড়া শুরুর মাস)</label>
         
          <Controller
                  control={control}
                  name="rentFrom"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                    showIcon
                    isClearable
                  
                    className="z-20"
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
                {errors.rentFrom?.type === "required" && (
                  <p role="alert" className="text-error text-xs pt-2">
                    Please select a date
                  </p>
                )}
        </div>
     

        <button type="submit" className="btn btn-xs btn-secondary text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewLeaseHolderForm;
