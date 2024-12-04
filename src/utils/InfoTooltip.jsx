import { MdInfoOutline } from "react-icons/md";

const InfoTooltip = ({ tipTexts }) => {
  return (
    <div className="tooltip tooltip-left" data-tip={`${tipTexts}`}>
      <MdInfoOutline className="animate-pulse text-red-800 text-xl" />
    </div>
  );
};

export default InfoTooltip;
