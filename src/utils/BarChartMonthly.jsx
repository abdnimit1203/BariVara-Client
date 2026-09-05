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
import { FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg px-3 py-2 text-xs sm:text-sm">
      <p className="font-bold text-base-content">{label}</p>
      <p className="text-primary font-black">৳ {payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const BarChartMonthly = ({ bills }) => {
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
    <div className="text-base-content">
      {/* Toggler — smaller on mobile, distinct color per metric */}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => setBarType("total")}
          className={`btn btn-xs sm:btn-sm rounded-xl gap-1.5 border-none transition-all ${barType === "total"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30"
            : "bg-blue-500/10 text-blue-600 dark:text-blue-300 hover:bg-blue-500/20"
            }`}
        >
          <FaMoneyBillWave className="text-xs sm:text-sm" />
          <span>Total Rent</span>
        </button>
        <button
          onClick={() => setBarType("currentBill")}
          className={`btn btn-xs sm:btn-sm rounded-xl gap-1.5 border-none transition-all ${barType === "currentBill"
            ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30"
            : "bg-amber-500/10 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20"
            }`}
        >
          <MdOutlineElectricBolt className="text-xs sm:text-sm" />
          <span>Electric Bill</span>
        </button>
      </div>

      {bills.length > 0 && (
        // Bleeds past the dashboard card's own horizontal padding on mobile,
        // where every extra pixel of width matters for the room labels and
        // bar values to actually show — the card still has plenty of room
        // at sm+ so the bleed is switched off there.
        <div className="-mx-1 sm:mx-0">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData} margin={{ top: 30, right: 10, left: -20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="roomNoLabel"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={70}
                tick={{ fontSize: 11 }}
                className="fill-base-content"
              />
              <YAxis tick={{ fontSize: 11 }} className="fill-base-content" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.12)" }} />
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
                  className="fill-base-content"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BarChartMonthly;
