import { MdInfoOutline } from "react-icons/md";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const InfoTooltip = ({ tipTexts, position = "left" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const positionClasses = {
    left: "right-full mr-2",
    right: "left-full ml-2",
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
  };

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <MdInfoOutline className="animate-pulse text-red-800 text-xl" />
      </div>

      {showTooltip && (
        <div
          className={`absolute z-50 p-2 bg-gray-800 text-white text-sm rounded shadow-lg max-w-xs w-[200px] ${positionClasses[position]}`}
        >
          {tipTexts}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
