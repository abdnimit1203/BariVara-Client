/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { fetchCategories } from "../API/api";
import useMonthlyMeterData from "../hooks/useMonthlyMeterData";
import useCategory from "../hooks/useCategory";

const TestData = () => {
  const [roomData, setRoomData] = useState([]);
  const [category, isLoading] = useCategory();
  console.log(category);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await fetchCategories();
        setRoomData(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      }
    };
    getData();
  }, []);
  console.log(roomData);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Room Data</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc pl-5">
        {roomData.map((room, index) => (
          <div key={index}>
            <li>{room.name}</li>
            <li>{room.totalRoom}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TestData;
