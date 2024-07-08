/* eslint-disable react/prop-types */

import ClipboardButton from "./ClipboardButton";

// eslint-disable-next-line react/prop-types
const ModalUniversal = ({ roomData }) => {
  const { roomNo, category, leaseholder, rent } = roomData;
  return (
    <div className="text-black">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary btn-xs mx-auto rounded-sm w-full"
        onClick={() => document.getElementById(roomNo).showModal()}
      >
        view
      </button>
      <dialog id={`${roomNo}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h2 className="font-bold text-xl text-center border-b-4 pb-2 border-blue-500">
              Room : {roomNo} | Details
            </h2>
            <h4 className="font-bold text-xl text-center  p-2 border-blue-500">
              ভাড়া : {rent}
            </h4>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td className="bg-blue-100">লোকেশন </td>
                    <td>{category}</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <td className="bg-blue-100">ভাড়াটিয়া </td>
                    <td>{leaseholder[0]?.name}</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <td className="bg-blue-100">ফোন নম্বর </td>
                    <td className="flex justify-between">
                      {leaseholder[0]?.phoneNumber}{" "}
                      <ClipboardButton
                        textToCopy={leaseholder[0]?.phoneNumber}
                      />
                    </td>
                  </tr>
                  {/* row 4 */}
                  <tr>
                    <td className="bg-blue-100">আগমন </td>
                    <td>
                      {new Date(leaseholder[0]?.rentFrom).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                  {/* row 5 */}
                  <tr>
                    <td className="bg-blue-100">বিদায় </td>
                    <td>
                      {leaseholder[0]?.rentTo
                        ? new Date(leaseholder[0]?.rentTo).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Present..."}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="collapse ">
                <input type="checkbox"  className="peer" />
                <div className="collapse-title text-center text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content ">
                  View More
                </div>
                <div className="collapse-content focus:bg-secondary focus:text-secondary">
                {
                                leaseholder?.map((item,index)=>( <table key={index} className="table">
                                    <thead>
                                      <tr>
                                        <th></th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                               
                                      <tr>
                                        <td className="bg-blue-100">ভাড়াটিয়া </td>
                                        <td>{item?.name}</td>
                                      </tr>
                                      {/* row 3 */}
                                      <tr>
                                        <td className="bg-blue-100">ফোন নম্বর </td>
                                        <td className="flex justify-between">
                                          {item?.phoneNumber}{" "}
                                          <ClipboardButton
                                            textToCopy={item?.phoneNumber}
                                          />
                                        </td>
                                      </tr>
                                      {/* row 4 */}
                                      <tr>
                                        <td className="bg-blue-100">আগমন </td>
                                        <td>
                                          {new Date(item?.rentFrom).toLocaleDateString(
                                            "en-US",
                                            {
                                              month: "long",
                                              year: "numeric",
                                            }
                                          )}
                                        </td>
                                      </tr>
                                      {/* row 5 */}
                                      <tr>
                                        <td className="bg-blue-100">বিদায় </td>
                                        <td>
                                          {item?.rentTo
                                            ? new Date(item?.rentTo).toLocaleDateString(
                                                "en-US",
                                                {
                                                  month: "long",
                                                  year: "numeric",
                                                }
                                              )
                                            : "Present..."}
                                        </td>
                                      </tr>
                                    </tbody>
                                    </table>))
                            }
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ModalUniversal;
