/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
const BarChartMonthly = ({ bills }) => {
  //   const chartData = bills.map((item) => ({
  //     roomNo: `Room ${item.roomNo}`,
  //     total: item.total || 0,
  //   }));
  const [barType, setBarType] = useState("total");
  const chartData = [...bills]
  .sort((a, b) => {
    const aNum = parseInt(a.roomNo);
    const bNum = parseInt(b.roomNo);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    if (!isNaN(aNum)) return -1;
    if (!isNaN(bNum)) return 1;
    return a.roomNo.localeCompare(b.roomNo);
  })
  .map((item) => ({
    roomNoLabel: !isNaN(parseInt(item.roomNo))
      ? `Room - ${item.roomNo}`
      : item.roomNo,
    total: item.total || 0,
    currentBill: item.currentBill || 0,
    fill: item.paid === "false" ? "#ef4444" : "#22c55e",
  }));


  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-lg mt-4">
      <h2 className="text-lg font-semibold mb-2 bg-green-200 p-2">
        মাসিক বাড়ি ভাড়া লিস্ট (Room-wise )
      </h2>
      {/* Toggler starts */}
      <div className="flex gap-2 my-4">
  <button
    onClick={() => setBarType("total")}
    className={`btn btn-sm ${barType === "total" ? "btn-primary" : "btn-outline"}`}
  >
    Show Total Rent
  </button>
  <button
    onClick={() => setBarType("currentBill")}
    className={`btn btn-sm ${barType === "currentBill" ? "btn-primary" : "btn-outline"}`}
  >
    Show Current Bill
  </button>
</div>
      {/* Toggler ends */}
      {bills.length > 0 && (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={chartData}
      margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="roomNoLabel"
        angle={-90}
        textAnchor="end"
        interval={0}
        height={80}
      />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey={barType}
        name={barType === "total" ? "Total Rent" : "Current Bill"}
        isAnimationActive
        radius={[6, 6, 0, 0]}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
        <LabelList
          dataKey={barType}
          position="top"
          fill="#000"
          fontSize={12}
          angle={-90}
          offset={18} // This ensures label stays above bar
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
)}

    </div>
  );
};

export default BarChartMonthly;
