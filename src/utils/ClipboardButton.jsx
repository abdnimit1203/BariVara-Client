import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const ClipboardButton = ({ textToCopy }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return <button onClick={copyToClipboard}><MdContentCopy  className="inline text-slate-500 text-xl float-right" />
</button>;
};

export default ClipboardButton;
