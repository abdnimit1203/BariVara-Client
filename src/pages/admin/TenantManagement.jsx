import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useRooms from "../../hooks/useRooms";
import Loader from "../../utils/Loader";
import {
  FaUserEdit,
  FaMoneyBillWave,
  FaUserPlus,
  FaPhoneAlt,
  FaSearch,
  FaHome,
  FaTimes,
  FaCheck,
  FaHistory,
  FaSync,
} from "react-icons/fa";
import { updateLeaseholder } from "../../API/api";
import toast from "react-hot-toast";
import NewLeaseHolderForm from "../../components/Forms/NewLeaseHolderForm";
import UniversalModal from "../../components/Modals/UniversalModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Helper function to convert English digits to Bengali digits
const toBn = (num) => {
  if (num === null || num === undefined || num === "") return "০";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const TenantManagement = () => {
  const [rooms, isLoading, refetch] = useRooms();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'occupied' | 'vacant' | 'due'

  // Modals state
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDueModalOpen, setIsDueModalOpen] = useState(false);
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: "",
    phoneNumber: "",
    advance: 0,
    rentFrom: new Date(),
    rentTo: null,
    due: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Due adjustment form state
  const [newDueAmount, setNewDueAmount] = useState("");

  // Filter only actual residential rooms (skip water meter / tree if any)
  const residentialRooms = useMemo(() => {
    return (rooms || [])
      .filter(
        (r) =>
          r.roomNo !== "Water Meter (পানি)" &&
          r.roomNo !== "Mango Tree (আমগাছ)" &&
          r.roomNo !== "WashRoom"
      )
      .sort((a, b) => {
        const numA = parseInt(a.roomNo, 10);
        const numB = parseInt(b.roomNo, 10);
        const isNumA = !isNaN(numA);
        const isNumB = !isNaN(numB);

        if (isNumA && isNumB) return numA - numB;
        if (isNumA) return -1;
        if (isNumB) return 1;
        return String(a.roomNo).localeCompare(String(b.roomNo));
      });
  }, [rooms]);

  // Filtered rooms based on search and status
  const filteredRooms = useMemo(() => {
    return residentialRooms.filter((room) => {
      const currentTenant =
        room.leaseholder && room.leaseholder.length > 0
          ? room.leaseholder[0]
          : null;
      const isOccupied = !!(currentTenant && currentTenant.name);
      const hasDue = isOccupied && (currentTenant.due || 0) > 0;

      // Status filter
      if (statusFilter === "occupied" && !isOccupied) return false;
      if (statusFilter === "vacant" && isOccupied) return false;
      if (statusFilter === "due" && !hasDue) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesRoom = String(room.roomNo).toLowerCase().includes(query);
        const matchesName = currentTenant?.name?.toLowerCase().includes(query);
        const matchesPhone = currentTenant?.phoneNumber?.includes(query);
        const matchesCategory = room.category?.toLowerCase().includes(query);
        return matchesRoom || matchesName || matchesPhone || matchesCategory;
      }
      return true;
    });
  }, [residentialRooms, searchQuery, statusFilter]);

  // Overview stats
  const totalRoomsCount = residentialRooms.length;
  const occupiedCount = residentialRooms.filter(
    (r) => r.leaseholder?.length && r.leaseholder[0]?.name
  ).length;
  const vacantCount = totalRoomsCount - occupiedCount;
  const totalDuesSum = residentialRooms.reduce(
    (sum, r) => sum + (r.leaseholder?.[0]?.due || 0),
    0
  );

  // Handlers for Edit Modal
  const handleOpenEditModal = (room) => {
    const tenant = room.leaseholder?.[0];
    if (!tenant) {
      toast.error("এই রুমে বর্তমানে কোনো সক্রিয় ভাড়াটিয়া নেই।");
      return;
    }
    setSelectedRoom(room);
    setEditFormData({
      name: tenant.name || "",
      phoneNumber: tenant.phoneNumber || "",
      advance: tenant.advance || 0,
      rentFrom: tenant.rentFrom ? new Date(tenant.rentFrom) : new Date(),
      rentTo: tenant.rentTo ? new Date(tenant.rentTo) : null,
      due: tenant.due || 0,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditTenant = async (e) => {
    e.preventDefault();
    if (!selectedRoom || !selectedRoom.leaseholder?.[0]) return;

    setIsSubmitting(true);
    try {
      const tenantId = selectedRoom.leaseholder[0]._id;
      const payload = {
        ...editFormData,
        advance: Number(editFormData.advance) || 0,
        due: Number(editFormData.due) || 0,
      };

      await updateLeaseholder(selectedRoom._id, tenantId, payload);
      toast.success("ভাড়াটিয়ার তথ্য সফলভাবে আপডেট করা হয়েছে!");
      setIsEditModalOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "আপডেট ব্যর্থ হয়েছে!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handlers for Due Adjustment Modal
  const handleOpenDueModal = (room) => {
    const tenant = room.leaseholder?.[0];
    if (!tenant) {
      toast.error("রুমটি ফাঁকা, কোনো বকেয়া নেই।");
      return;
    }
    setSelectedRoom(room);
    setNewDueAmount(tenant.due !== undefined ? tenant.due : 0);
    setIsDueModalOpen(true);
  };

  const handleSaveDueAdjustment = async (e) => {
    e.preventDefault();
    if (!selectedRoom || !selectedRoom.leaseholder?.[0]) return;

    setIsSubmitting(true);
    try {
      const tenant = selectedRoom.leaseholder[0];
      const payload = {
        ...tenant,
        due: Number(newDueAmount) || 0,
      };

      await updateLeaseholder(selectedRoom._id, tenant._id, payload);
      toast.success(
        `রুম ${selectedRoom.roomNo}-এর বকেয়া ৳ ${toBn(newDueAmount)} নির্ধারণ করা হয়েছে!`
      );
      setIsDueModalOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("বকেয়া আপডেট ব্যর্থ হয়েছে!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handlers for Add/Replace Tenant
  const handleOpenAddTenantModal = (room) => {
    setSelectedRoom(room);
    setIsAddTenantModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-base-300 pb-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-primary">
            Super Admin Control Center
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-base-content flex items-center gap-2">
            <FaHome className="text-primary" />
            <span>ভাড়াটিয়া ও রুম ব্যবস্থাপনা (Tenant Management)</span>
          </h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            সরাসরি ড্যাশবোর্ড থেকে ভাড়াটিয়ার তথ্য এডিট, নতুন ভাড়াটিয়া যোগ এবং বকেয়া (Due) নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="btn btn-sm btn-outline border-base-300 rounded-xl flex items-center gap-2 self-start sm:self-auto hover:bg-base-200"
        >
          <FaSync className="text-xs" />
          <span>রিফ্রেশ (Refresh)</span>
        </button>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-base-content/60 uppercase">মোট আবাসিক রুম</span>
          <div className="text-xl sm:text-2xl font-black text-primary mt-1">
            {toBn(totalRoomsCount)} টি
          </div>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">ভাড়া দেওয়া রুম</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {toBn(occupiedCount)} টি
          </div>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">ফাঁকা রুম (Vacant)</span>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {toBn(vacantCount)} টি
          </div>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-error uppercase">সর্বমোট বকেয়া (Total Due)</span>
          <div className="text-xl sm:text-2xl font-black text-error mt-1 font-mono">
            ৳ {toBn(totalDuesSum)}
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-base-content/40" />
          <input
            type="text"
            placeholder="রুম নং, ভাড়াটিয়ার নাম বা ফোন দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-sm sm:input-md input-bordered w-full pl-9 rounded-xl text-xs sm:text-sm border-base-300 focus:border-primary focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-base-content/40 hover:text-base-content"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`btn btn-xs sm:btn-sm rounded-lg font-bold ${
              statusFilter === "all" ? "btn-primary" : "btn-ghost border border-base-300"
            }`}
          >
            সব ({toBn(residentialRooms.length)})
          </button>
          <button
            onClick={() => setStatusFilter("occupied")}
            className={`btn btn-xs sm:btn-sm rounded-lg font-bold ${
              statusFilter === "occupied" ? "btn-success text-white" : "btn-ghost border border-base-300"
            }`}
          >
            ভাড়া দেওয়া ({toBn(occupiedCount)})
          </button>
          <button
            onClick={() => setStatusFilter("vacant")}
            className={`btn btn-xs sm:btn-sm rounded-lg font-bold ${
              statusFilter === "vacant" ? "btn-warning text-white" : "btn-ghost border border-base-300"
            }`}
          >
            ফাঁকা ({toBn(vacantCount)})
          </button>
          <button
            onClick={() => setStatusFilter("due")}
            className={`btn btn-xs sm:btn-sm rounded-lg font-bold ${
              statusFilter === "due" ? "btn-error text-white" : "btn-ghost border border-base-300"
            }`}
          >
            বকেয়া আছে
          </button>
        </div>
      </div>

      {/* 4. Centralized Management Table */}
      <div className="bg-base-100 border border-base-300 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead className="bg-base-200/80 text-base-content font-bold border-b border-base-300">
              <tr>
                <th className="py-3 px-3">রুম নং ও অবস্থান</th>
                <th className="py-3 px-3">বর্তমান ভাড়াটিয়া ও ফোন</th>
                <th className="py-3 px-3 text-right">ভাড়া</th>
                <th className="py-3 px-3 text-right">বর্তমান বকেয়া</th>
                <th className="py-3 px-3 text-center">স্ট্যাটাস</th>
                <th className="py-3 px-3 text-center">ম্যানেজমেন্ট অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => {
                  const currentTenant =
                    room.leaseholder && room.leaseholder.length > 0
                      ? room.leaseholder[0]
                      : null;
                  const isOccupied = !!(currentTenant && currentTenant.name);
                  const due = currentTenant?.due || 0;

                  return (
                    <tr key={room._id} className="hover:bg-base-200/40 transition-colors">
                      {/* Room No & Location */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-black flex items-center justify-center font-mono text-sm shrink-0 border border-primary/20">
                            {toBn(room.roomNo)}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-bold text-base-content">
                              রুম {toBn(room.roomNo)}
                            </span>
                            <span className="text-[10px] text-base-content/60 truncate max-w-[130px]">
                              {room.category} ({room.position})
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Tenant Name & Phone */}
                      <td className="py-3 px-3">
                        {isOccupied ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-primary">
                              {currentTenant.name}
                            </span>
                            <span className="text-[11px] font-mono text-base-content/70 flex items-center gap-1">
                              <FaPhoneAlt className="text-[9px] text-secondary" />
                              {toBn(currentTenant.phoneNumber || "N/A")}
                            </span>
                          </div>
                        ) : (
                          <span className="badge badge-sm badge-ghost text-base-content/50 italic">
                            কোনো ভাড়াটিয়া নেই
                          </span>
                        )}
                      </td>

                      {/* Rent */}
                      <td className="py-3 px-3 text-right font-mono font-bold text-base-content">
                        ৳ {toBn(room.rent || 0)}
                      </td>

                      {/* Due */}
                      <td className="py-3 px-3 text-right">
                        {isOccupied ? (
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded-md text-xs inline-block ${
                              due > 0
                                ? "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-300/40"
                                : due < 0
                                ? "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
                                : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            ৳ {toBn(due)}
                          </span>
                        ) : (
                          <span className="text-base-content/40 font-mono">-</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`badge badge-sm font-bold text-[10px] ${
                            isOccupied
                              ? "badge-success text-white"
                              : "badge-warning text-white"
                          }`}
                        >
                          {isOccupied ? "Occupied" : "Vacant"}
                        </span>
                      </td>

                      {/* Actions Toolbar */}
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          {isOccupied ? (
                            <>
                              {/* 1. Edit Tenant */}
                              <button
                                onClick={() => handleOpenEditModal(room)}
                                title="ভাড়াটিয়ার তথ্য এডিট করুন"
                                className="btn btn-xs btn-primary rounded-lg flex items-center gap-1"
                              >
                                <FaUserEdit className="text-xs" />
                                <span className="hidden sm:inline">এডিট</span>
                              </button>

                              {/* 2. Adjust Due */}
                              <button
                                onClick={() => handleOpenDueModal(room)}
                                title="ম্যানুয়ালি বকেয়া (Due) পরিবর্তন করুন"
                                className="btn btn-xs btn-error text-white rounded-lg flex items-center gap-1 shadow-xs"
                              >
                                <FaMoneyBillWave className="text-xs" />
                                <span>বকেয়া</span>
                              </button>
                            </>
                          ) : (
                            /* Add Tenant when Vacant */
                            <button
                              onClick={() => handleOpenAddTenantModal(room)}
                              title="নতুন ভাড়াটিয়া যুক্ত করুন"
                              className="btn btn-xs btn-success text-white rounded-lg flex items-center gap-1"
                            >
                              <FaUserPlus className="text-xs" />
                              <span>ভাড়াটিয়া যোগ</span>
                            </button>
                          )}

                          {/* 3. Deep History in Single Room */}
                          <Link
                            to={`/singleroom/${room._id}`}
                            title="রুমের বিস্তারিত ইতিহাস ও হিস্ট্রি দেখুন"
                            className="btn btn-xs btn-ghost border border-base-300 rounded-lg"
                          >
                            <FaHistory className="text-xs text-base-content/70" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-base-content/60">
                    কোনো তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. EDIT TENANT MODAL */}
      <UniversalModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`✏️ ভাড়াটিয়ার তথ্য এডিট (রুম নং: ${toBn(selectedRoom?.roomNo)})`}
      >
        <form onSubmit={handleSaveEditTenant} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-base-content/80">নাম (Name) *</label>
              <input
                type="text"
                required
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
                className="input input-sm input-bordered w-full rounded-xl"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-base-content/80">ফোন নম্বর (Phone)</label>
              <input
                type="text"
                value={editFormData.phoneNumber}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, phoneNumber: e.target.value })
                }
                className="input input-sm input-bordered w-full rounded-xl font-mono"
              />
            </div>

            {/* Advance */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-base-content/80">অগ্রিম টাকা (Advance)</label>
              <input
                type="number"
                value={editFormData.advance}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, advance: e.target.value })
                }
                className="input input-sm input-bordered w-full rounded-xl font-mono"
              />
            </div>

            {/* Current Due */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-base-content/80">বর্তমান বকেয়া (Due)</label>
              <input
                type="number"
                value={editFormData.due}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, due: e.target.value })
                }
                className="input input-sm input-bordered w-full rounded-xl font-mono text-error font-bold"
              />
            </div>

            {/* Rent From Date */}
            <div className="space-y-1 flex flex-col">
              <label className="text-xs font-bold text-base-content/80">ভাড়া শুরু (Rent From)</label>
              <DatePicker
                selected={editFormData.rentFrom}
                onChange={(date) =>
                  setEditFormData({ ...editFormData, rentFrom: date })
                }
                className="input input-sm input-bordered w-full rounded-xl"
              />
            </div>

            {/* Rent To Date (Leave Date) */}
            <div className="space-y-1 flex flex-col">
              <label className="text-xs font-bold text-base-content/80">ভাড়া শেষ (Rent To)</label>
              <DatePicker
                selected={editFormData.rentTo}
                isClearable
                placeholderText="বর্তমান থাকলে ফাঁকা রাখুন"
                onChange={(date) =>
                  setEditFormData({ ...editFormData, rentTo: date })
                }
                className="input input-sm input-bordered w-full rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-base-300">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="btn btn-sm btn-ghost rounded-xl"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-sm btn-primary rounded-xl font-bold flex items-center gap-1.5"
            >
              <FaCheck />
              <span>{isSubmitting ? "সংরক্ষণ হচ্ছে..." : "আপডেট সংরক্ষণ করুন"}</span>
            </button>
          </div>
        </form>
      </UniversalModal>

      {/* 2. MANUAL DUE ADJUSTMENT MODAL */}
      <UniversalModal
        isOpen={isDueModalOpen}
        onClose={() => setIsDueModalOpen(false)}
        title={`💰 বকেয়া সমন্বয় (রুম নং: ${toBn(selectedRoom?.roomNo)})`}
      >
        <form onSubmit={handleSaveDueAdjustment} className="space-y-4 text-left">
          <div className="bg-base-200/60 p-3 rounded-xl border border-base-300 space-y-1">
            <div className="text-xs font-bold text-base-content">
              ভাড়াটিয়া: <span className="text-primary">{selectedRoom?.leaseholder?.[0]?.name}</span>
            </div>
            <div className="text-xs text-base-content/70">
              বর্তমান বকেয়া: <strong className="text-error font-mono font-bold">৳ {toBn(selectedRoom?.leaseholder?.[0]?.due || 0)}</strong>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-base-content">
              নতুন বকেয়ার পরিমাণ (New Due Amount in Taka) *
            </label>
            <div className="relative">
              <input
                type="number"
                required
                value={newDueAmount}
                onChange={(e) => setNewDueAmount(e.target.value)}
                placeholder="যেমন: 1000 বা 0"
                className="input input-bordered w-full rounded-xl font-mono text-base font-bold pr-12 focus:border-error focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/60">
                টাকা
              </span>
            </div>
            <p className="text-[11px] text-base-content/60">
              * বকেয়া কমাতে বা মাফ করতে নতুন সংখ্যা দিন (যেমন: ০ টাকা বা ১০০০ টাকা)।
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-base-300">
            <button
              type="button"
              onClick={() => setIsDueModalOpen(false)}
              className="btn btn-sm btn-ghost rounded-xl"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-sm btn-error text-white rounded-xl font-bold flex items-center gap-1.5"
            >
              <FaCheck />
              <span>{isSubmitting ? "সংরক্ষণ হচ্ছে..." : "বকেয়া নির্ধারণ করুন"}</span>
            </button>
          </div>
        </form>
      </UniversalModal>

      {/* 3. ADD NEW LEASEHOLDER MODAL */}
      <UniversalModal
        isOpen={isAddTenantModalOpen}
        onClose={() => setIsAddTenantModalOpen(false)}
        title={`➕ নতুন ভাড়াটিয়া যুক্ত করুন (রুম নং: ${toBn(selectedRoom?.roomNo)})`}
      >
        {selectedRoom && (
          <NewLeaseHolderForm
            id={selectedRoom._id}
            onSuccess={() => {
              setIsAddTenantModalOpen(false);
              refetch();
            }}
          />
        )}
      </UniversalModal>
    </div>
  );
};

export default TenantManagement;
