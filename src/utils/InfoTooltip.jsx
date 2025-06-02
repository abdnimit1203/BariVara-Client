import { MdInfoOutline } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const InfoTooltip = ({ tipTexts, position = "left" }) => {
  return (
    <div className={`tooltip tooltip-${position} `} data-tip={tipTexts}>
      <MdInfoOutline className="animate-pulse text-red-800 text-xl" />
    </div>
  );
};

export default InfoTooltip;
