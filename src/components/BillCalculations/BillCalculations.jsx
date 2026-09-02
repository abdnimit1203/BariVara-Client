/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import UniversalModal from "../Modals/UniversalModal";
import { FaSackDollar } from "react-icons/fa6";
import { FcPrint } from "react-icons/fc";
import { FaShareAlt } from "react-icons/fa";
import PaymentForm from "../Forms/PaymentForm";
import { toBlob } from "html-to-image";
import toast from "react-hot-toast";

// Helper function to convert English digits to Bengali digits
const toBn = (num) => {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const BillCalculations = ({
  room,
  billingRoomNo,
  selectedMonth,
  selectedYear,
  myData,
  refetch4,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const printRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Safe fallback values
  const totalAmount = myData?.total ?? 1800;
  const currentReading = myData?.currentReading ?? 0;
  const previousReading = myData?.previousReading ?? 0;
  const usedUnits = Math.max(0, currentReading - previousReading);
  const currentBill = myData?.currentBill ?? (usedUnits * 10);
  const waterBill = room?.hasWaterBill ? (myData?.waterBill ?? 0) : 0;
  const wasteBill = myData?.wasteBill ?? 0;
  const rentAmount = myData?.rent ?? 1800;
  const dueAmount = myData?.due ?? 0;
  const isPaid = myData?.paid === "true" || myData?.paid === true;
  const paidAmount = myData?.paidAmount !== undefined && myData?.paidAmount !== null ? myData.paidAmount : (isPaid ? totalAmount : 0);
  const tenantName = room?.leaseholder?.length ? room.leaseholder[0].name : "N/A";
  const yearDisplay = selectedYear ?? new Date().getFullYear();

  const currentDateFormatted = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const dateFormattedBn = toBn(currentDateFormatted);

  // High-resolution image generation for WhatsApp / Web Share
  const handleShareImage = async () => {
    const printElement = printRef.current;
    if (!printElement) return;

    setIsSharing(true);
    const toastId = toast.loading("মেমোর ছবি তৈরি হচ্ছে...");
    try {
      const blob = await toBlob(printElement, {
        pixelRatio: 2.5,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      if (!blob) {
        throw new Error("Failed to generate image blob");
      }

      const fileName = `Rent_Receipt_Room_${room.roomNo}_${selectedMonth}_${yearDisplay}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      // 1. Native Mobile Web Share (WhatsApp, Messenger, etc.)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        toast.dismiss(toastId);
        await navigator.share({
          title: `ভাড়া রশিদ - রুম ${toBn(room.roomNo)} (${selectedMonth} ${toBn(yearDisplay)})`,
          text: `🏡 নুরেজা ভিলা - রুম ${toBn(room.roomNo)} এর ${selectedMonth} ${toBn(yearDisplay)} মাসের ভাড়া রশিদ। মোট: ৳ ${toBn(totalAmount)}`,
          files: [file],
        });
      } else {
        // 2. Desktop Fallback: Download PNG + Clipboard Copy
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);

        if (navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
            toast.success("ছবি ডাউনলোড হয়েছে ও ক্লিপবোর্ডে কপি হয়েছে! WhatsApp Web এ Ctrl+V দিয়ে পেস্ট করুন।", { id: toastId });
          } catch {
            toast.success("রশিদের ছবি ডাউনলোড হয়েছে!", { id: toastId });
          }
        } else {
          toast.success("রশিদের ছবি ডাউনলোড হয়েছে!", { id: toastId });
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
        toast.error("ছবি তৈরিতে সমস্যা হয়েছে!", { id: toastId });
      } else {
        toast.dismiss(toastId);
      }
    } finally {
      setIsSharing(false);
    }
  };

  // Smooth, high-quality printing without reloading or destroying DOM
  const handlePrint = () => {
    const printElement = printRef.current;
    if (!printElement) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Rent_Receipt_Room_${room.roomNo}_${selectedMonth}_${yearDisplay}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap');
            @page {
              size: 3in 5in;
              margin: 3mm;
            }
            * {
              box-sizing: border-box;
            }
            body {
              font-family: 'Noto Sans Bengali', 'Poppins', sans-serif;
              font-size: 11px;
              line-height: 1.35;
              color: #0f172a;
              background: #ffffff;
              margin: 0;
              padding: 0;
              width: 100%;
              max-width: 100%;
            }
            .memo-wrapper {
              position: relative;
              overflow: hidden;
              border: 1px dashed #334155;
              border-radius: 6px;
              padding: 8px;
              background: #ffffff;
            }
            .header {
              text-align: center;
              border-bottom: 1px dashed #94a3b8;
              padding-bottom: 4px;
              margin-bottom: 6px;
            }
            .header h3 {
              margin: 0 0 2px 0;
              font-size: 13px;
              font-weight: 700;
            }
            .header p {
              margin: 0;
              font-size: 9.5px;
              color: #475569;
            }
            .memo-banner {
              background: #fef08a;
              border-left: 4px solid #eab308;
              padding: 5px 6px;
              border-radius: 4px;
              font-size: 10px;
              line-height: 1.35;
              margin-bottom: 6px;
              color: #1c1917;
            }
            .badge-val {
              font-weight: 700;
              padding: 0 3px;
              background: #fff;
              border-radius: 2px;
            }
            .section-title {
              font-size: 11px;
              font-weight: 700;
              margin: 4px 0 2px 0;
              border-bottom: 1px solid #cbd5e1;
              padding-bottom: 2px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              padding: 2px 0;
              font-size: 10.5px;
            }
            .row-bold {
              font-weight: 700;
            }
            .divider {
              border-top: 1px dashed #94a3b8;
              margin: 4px 0;
            }
            .total-box {
              display: flex;
              justify-content: space-between;
              font-size: 12.5px;
              font-weight: 700;
              color: #b91c1c;
              border-top: 1px solid #0f172a;
              padding-top: 3px;
              margin-top: 4px;
            }
            .paid-box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: 1.5px solid #16a34a;
              background: #f0fdf4;
              border-radius: 4px;
              padding: 4px 6px;
              margin-top: 4px;
              font-size: 11px;
              font-weight: 700;
              color: #15803d;
            }
            .paid-box .amount {
              font-size: 13px;
              font-weight: 800;
              font-family: 'Poppins', monospace;
              min-width: 40px;
              text-align: right;
            }
            .status-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 10px;
              margin-top: 4px;
              padding-top: 3px;
              border-top: 1px dotted #cbd5e1;
            }
            .status-pill {
              font-weight: 700;
              padding: 1px 6px;
              border-radius: 3px;
              font-size: 9px;
            }
            .paid {
              background: #dcfce7;
              color: #15803d;
            }
            .unpaid {
              background: #fee2e2;
              color: #b91c1c;
            }
            .footer {
              text-align: center;
              font-size: 8.5px;
              color: #64748b;
              margin-top: 6px;
              padding-top: 4px;
              border-top: 1px dashed #cbd5e1;
            }
          </style>
        </head>
        <body>
          <div class="memo-wrapper">
            ${isPaid ? `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-14deg); border: 3px dashed rgba(22, 163, 74, 0.28); border-radius: 8px; padding: 6px 18px; color: rgba(22, 163, 74, 0.25); font-size: 32px; font-weight: 900; letter-spacing: 4px; text-align: center; pointer-events: none; z-index: 0; font-family: monospace;">
              PAID ✓
              <div style="font-size: 11px; letter-spacing: 1px; font-family: 'Noto Sans Bengali', sans-serif;">পরিশোধিত</div>
            </div>
            ` : ''}

            <div class="header" style="position: relative; z-index: 1;">
              <h3>🏡 নুরেজা ভিলা (Nureja Villa)</h3>
              <p>বাড়িভাড়া রশিদ | RENT RECEIPT</p>
            </div>

            <div class="memo-banner" style="position: relative; z-index: 1;">
              <div><strong>ভাড়ার মাস ও সাল:</strong> <span class="badge-val">${selectedMonth}, ${toBn(yearDisplay)}</span> | <strong>তারিখ:</strong> ${dateFormattedBn}</div>
              <div style="margin-top: 2px;"><strong>রুম নং:</strong> <span class="badge-val">${toBn(room.roomNo)}</span> | <strong>ভাড়াটিয়া:</strong> ${tenantName}</div>
              <div style="margin-top: 3px;">
                আপনার <strong>${selectedMonth} ${toBn(yearDisplay)}</strong> মাসের মোট ভাড়া <strong>৳ ${toBn(totalAmount)}</strong> ধার্য করা হয়েছে।
              </div>
            </div>

            <div class="section-title" style="position: relative; z-index: 1;">Details | বিবরণ</div>

            <div style="position: relative; z-index: 1;">
              ${room?.hasMeter ? `
              <div class="row">
                <span>Current Meter</span>
                <span class="row-bold">${toBn(currentReading)}</span>
              </div>
              <div class="row">
                <span>Previous Meter</span>
                <span class="row-bold">${toBn(previousReading)}</span>
              </div>
              <div class="divider"></div>
              <div class="row">
                <span>( - ) Unit</span>
                <span>${toBn(usedUnits)} ✕ ১০</span>
              </div>
              <div class="row">
                <span style="color: #b45309; font-weight: 600;">Current Bill (বিদ্যুৎ)</span>
                <span class="row-bold">৳ ${toBn(currentBill)}</span>
              </div>
              ` : ''}

              ${room?.hasWaterBill ? `
              <div class="row">
                <span style="color: #0284c7; font-weight: 600;">Water Bill (পানি)</span>
                <span class="row-bold">৳ ${toBn(waterBill)}</span>
              </div>
              ` : ''}

              ${wasteBill > 0 ? `
              <div class="row">
                <span style="color: #059669; font-weight: 600;">Waste Bill (ময়লা)</span>
                <span class="row-bold">৳ ${toBn(wasteBill)}</span>
              </div>
              ` : ''}

              <div class="row">
                <span style="color: #dc2626;">Rent (ঘর ভাড়া)</span>
                <span class="row-bold">৳ ${toBn(rentAmount)}</span>
              </div>

              ${dueAmount > 0 ? `
              <div class="row">
                <span style="color: #dc2626;">Due (পূর্বের বকেয়া)</span>
                <span class="row-bold">৳ ${toBn(dueAmount)}</span>
              </div>
              ` : ''}

              <div class="total-box">
                <span>Total (সর্বমোট)</span>
                <span>৳ ${toBn(totalAmount)}</span>
              </div>

              <div class="row" style="margin-top: 5px; align-items: center; justify-content: space-between;">
                <span style="font-weight: 700; color: #15803d;">Paid Amount (পরিশোধিত):</span>
                <span style="display: inline-flex; align-items: center; gap: 4px; font-weight: 700; color: #15803d;">
                  <span style="font-size: 12px;">৳</span>
                  <span style="display: inline-block; border: 1.5px solid #16a34a; border-radius: 4px; min-width: 58px; height: 22px; line-height: 20px; text-align: center; font-family: 'Poppins', monospace; font-size: 12px; font-weight: 800; background: #ffffff; color: #15803d; vertical-align: middle;">
                    ${isPaid ? toBn(paidAmount) : '&nbsp;'}
                  </span>
                </span>
              </div>

              <div class="status-row">
                <span>Payment Status:</span>
                <span class="status-pill ${isPaid ? 'paid' : 'unpaid'}">
                  ${isPaid ? 'PAID (পরিশোধিত)' : 'UNPAID (বকেয়া)'}
                </span>
              </div>
            </div>

            <div class="footer" style="position: relative; z-index: 1;">
              * প্রতি মাসের ১০ তারিখের মধ্যে ভাড়া পরিশোধের জন্য অনুরোধ করা হলো।
            </div>
          </div>
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center py-1">
      {/* Total amount preview */}
      <div className="flex items-center gap-1.5">
        <FaSackDollar
          className={`${
            isPaid ? "text-success" : "text-error"
          } inline text-base shrink-0`}
        />
        <span className="font-bold font-mono text-sm sm:text-base text-base-content">
          {toBn(totalAmount)} টাকা
        </span>
      </div>

      {/* Details Button */}
      <button
        onClick={openModal}
        className="underline text-xs text-success hover:text-success/80 mt-0.5 font-medium"
      >
        Details
      </button>

      {/* Modal View */}
      <UniversalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`💵 RENT RECEIPT (Room: ${room.roomNo})`}
      >
        <div className="flex flex-col gap-3">
          {/* Top Bar: Print & WhatsApp Share Buttons */}
          <div className="flex items-center justify-between pb-2 border-b border-base-300 gap-2 flex-wrap">
            <span className="text-xs font-semibold opacity-75">
              মেমো অ্যাকশন:
            </span>
            <div className="flex items-center gap-1.5">
              {/* 1. Universal Image Share Button (WhatsApp, Messenger, Bluetooth, etc.) */}
              <button
                type="button"
                onClick={handleShareImage}
                disabled={isSharing}
                title="মেমো ছবি হিসেবে যেকোনো মাধ্যমে সরাসরি শেয়ার করুন"
                className="btn btn-xs sm:btn-sm btn-primary text-white border-none rounded-lg px-2.5 flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 font-bold"
              >
                <FaShareAlt className="text-xs" />
                <span className="text-xs">{isSharing ? "তৈরি হচ্ছে..." : "ছবি শেয়ার (Share)"}</span>
              </button>

              {/* 2. Print Button (Preserved 100%) */}
              <button
                type="button"
                onClick={handlePrint}
                title="Print Memo Token"
                className="btn btn-xs sm:btn-sm bg-base-200 hover:bg-base-300 border border-base-300 rounded-lg px-2.5 flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
              >
                <FcPrint className="text-lg" />
                <span className="text-xs font-bold text-base-content">প্রিন্ট (Print)</span>
              </button>
            </div>
          </div>

          {/* PRINTABLE ZONE (Clean, Tight, High Readability with Paid Seal) */}
          <div
            ref={printRef}
            className="relative overflow-hidden p-3 sm:p-4 bg-base-200/50 rounded-xl border border-base-300 text-xs font_secondary space-y-2.5"
          >
            {/* Big Greenish Opacity PAID Seal in background when Paid */}
            {isPaid && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <div className="border-4 border-dashed border-emerald-500/25 dark:border-emerald-400/25 rounded-2xl px-6 py-2.5 -rotate-12 transform text-center">
                  <span className="text-4xl sm:text-5xl font-black tracking-widest text-emerald-600/20 dark:text-emerald-400/20 uppercase font-mono block">
                    PAID ✓
                  </span>
                  <p className="text-[11px] sm:text-xs font-bold text-emerald-700/25 dark:text-emerald-400/25 tracking-widest uppercase mt-0.5">
                    পরিশোধিত
                  </p>
                </div>
              </div>
            )}

            {/* Memo Banner */}
            <div className="relative z-10 bg-yellow-100 dark:bg-yellow-950/40 text-yellow-950 dark:text-yellow-100 border-l-4 border-yellow-500 rounded-r-lg p-2.5 space-y-1 shadow-xs">
              <div className="flex justify-between items-center text-[11px] font-mono border-b border-yellow-300/40 pb-1">
                <span><strong>মাস ও সাল:</strong> <span className="text-primary font-bold text-xs">{selectedMonth}, {toBn(yearDisplay)}</span></span>
                <span className="opacity-75">DATE: {dateFormattedBn}</span>
              </div>
              <div className="text-xs leading-relaxed pt-0.5">
                <span>রুম নং: <strong className="bg-success text-white px-1.5 py-0.2 rounded font-mono">{toBn(room.roomNo)}</strong></span> | 
                <span> ভাড়াটিয়া: <strong className="text-primary font-bold">{tenantName}</strong></span>
                <p className="mt-1">
                  আপনার <strong className="underline text-primary">{selectedMonth} {toBn(yearDisplay)}</strong> মাসের মোট ভাড়া <strong className="font-bold text-sm">৳ {toBn(totalAmount)}</strong> ধার্য করা হয়েছে।
                </p>
                <p className="text-[10px] opacity-75 mt-0.5">
                  * এই মাসের ১০ তারিখের মধ্যে ভাড়া পরিশোধের জন্য আবেদন করা হলো।
                </p>
              </div>
            </div>

            {/* Details Section */}
            <div className="relative z-10 space-y-1 pt-1">
              <h4 className="text-xs font-bold text-base-content border-b border-base-300 pb-1">
                Details | বিবরণ
              </h4>

              {room?.hasMeter && (
                <>
                  <div className="grid grid-cols-2 justify-between py-0.5 text-xs">
                    <span className="opacity-80">Current Meter</span>
                    <span className="text-right font-mono font-semibold">{toBn(currentReading)}</span>
                  </div>
                  <div className="grid grid-cols-2 justify-between py-0.5 text-xs">
                    <span className="opacity-80">Previous Meter</span>
                    <span className="text-right font-mono font-semibold">{toBn(previousReading)}</span>
                  </div>

                  <div className="border-t border-dashed border-base-300 my-1"></div>

                  <div className="grid grid-cols-2 justify-between py-0.5 text-xs">
                    <span className="opacity-80">( - ) Unit</span>
                    <span className="text-right font-mono font-semibold">{toBn(usedUnits)} ✕ ১০</span>
                  </div>
                  <div className="grid grid-cols-2 justify-between py-0.5 text-xs">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">Current bill</span>
                    <span className="text-right font-mono font-bold text-amber-600 dark:text-amber-400">৳ {toBn(currentBill)}</span>
                  </div>
                </>
              )}

              {room?.hasWaterBill && (
                <div className="grid grid-cols-2 justify-between py-0.5 text-xs">
                  <span className="text-primary font-semibold">Water bill</span>
                  <span className="text-right font-mono font-bold text-primary">৳ {toBn(waterBill)}</span>
                </div>
              )}

              {wasteBill > 0 && (
                <div className="grid grid-cols-2 justify-between py-0.5 text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Waste bill</span>
                  <span className="text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">৳ {toBn(wasteBill)}</span>
                </div>
              )}

              <div className="grid grid-cols-2 justify-between py-0.5 text-xs">
                <span className="text-red-500 font-semibold">Rent</span>
                <span className="text-right font-mono font-semibold">৳ {toBn(rentAmount)}</span>
              </div>

              {dueAmount > 0 && (
                <div className="grid grid-cols-2 justify-between py-0.5 text-xs">
                  <span className="text-red-500 font-semibold">Due</span>
                  <span className="text-right font-mono font-semibold text-red-500">৳ {toBn(dueAmount)}</span>
                </div>
              )}

              <div className="border-t-2 border-base-300 my-1"></div>

              <div className="grid grid-cols-2 justify-between py-1 text-sm font-bold">
                <span className="text-red-600 dark:text-red-400">Total</span>
                <span className="text-right font-mono text-base text-red-600 dark:text-red-400">৳ {toBn(totalAmount)}</span>
              </div>

              <div className="grid grid-cols-2 justify-between items-center py-1 text-xs">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">Paid Amount (পরিশোধিত):</span>
                <div className="flex items-center justify-end gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                  <span className="font-mono text-sm">৳</span>
                  <div className="border border-emerald-500/60 bg-base-100 rounded-md w-20 h-7 flex items-center justify-center font-mono font-bold text-xs text-emerald-700 dark:text-emerald-300 shadow-inner">
                    {isPaid ? toBn(paidAmount) : ""}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 justify-between items-center py-0.5 text-xs">
                <span className="opacity-80">Payment Status:</span>
                <div className="text-right">
                  <span className={`badge badge-sm font-bold text-[10px] ${isPaid ? "badge-success text-white" : "badge-error text-white"}`}>
                    {isPaid ? "PAID (পরিশোধিত)" : "UNPAID (বকেয়া)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Form (Payment) */}
          {myData && !isPaid ? (
            <PaymentForm billID={myData._id} refetch4={refetch4} />
          ) : (
            <div className="flex items-center justify-between text-xs p-2 bg-success/10 rounded-lg border border-success/20">
              <span className="font-bold text-success">✓ Already Paid</span>
              <span className="text-[11px] opacity-60 font-mono">
                {myData?.updatedAt ? new Date(myData.updatedAt).toLocaleDateString("en-GB") : ""}
              </span>
            </div>
          )}
        </div>
      </UniversalModal>
    </div>
  );
};

export default BillCalculations;
