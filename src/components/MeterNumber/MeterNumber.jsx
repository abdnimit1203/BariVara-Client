import { useEffect, useState } from "react";
import HeaderText from "../../utils/HeaderText";
import MeterForm from "../Forms/MeterForm";
import axiosInstance from "../../utils/axiosConfig";
import CompoWrapper from './../Wrapper/CompoWrapper';

const MeterNumber = () => {
  const now = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  console.log(`Current Month: ${month}`);
  console.log(`Current Year: ${year}`);

  // DATA FETCHING

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/rooms");
        console.log(response.data); // Log data to console
        setNewData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [newData, setNewData] = useState([]);
  console.log(newData);
  return (
    <CompoWrapper>
      <HeaderText
        title={"Insert Meter Number"}
        subTitle={`Current Month : ${month} , ${year}`}
      />
      <div className="overflow-x-auto rounded-t-lg ">
            <table
              className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
            //   ref={componentRef}
            >
              <thead className="ltr:text-left rtl:text-right bg-secondary text-white h-12">
                <tr>
                <th className="whitespace-nowrap border-r-2 px-4 py-2 font-medium ">
                   Room No
                  </th>
                <th className="whitespace-nowrap border-r-2 px-4 py-2 font-medium ">
                    Meter No
                  </th>
                 
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
      {newData.map((item, index) => (
         <tr key={index} className="h-12 odd:bg-[#f8f8f8]">
            <td className="pl-2 font-semibold" >Room No : {item.roomNo} <br />Name: {item.leaseholder[0].name}</td>
            <td className="">  <MeterForm roomData={item} month={month} year={year} /></td >
        
        </tr>
      ))}
      </tbody>
      </table>
      </div>
    </CompoWrapper>
  );
};

export default MeterNumber;
