import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Select from "react-select";
import { FaUsersCog, FaUserShield, FaCheckCircle, FaBan, FaSync } from "react-icons/fa";
import { fetchAllUsers, updateUserRole, updateUserAccountStatus } from "../../API/api";

const ROLE_META = {
  superadmin: { label: "Super Admin", hex: "#a855f7", badge: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30" },
  admin: { label: "Admin", hex: "#3b82f6", badge: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30" },
  household: { label: "Household", hex: "#f59e0b", badge: "bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30" },
  tenant: { label: "Tenant", hex: "#64748b", badge: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30" },
};

const ROLE_OPTIONS = Object.entries(ROLE_META).map(([value, meta]) => ({
  value,
  label: meta.label,
  hex: meta.hex,
}));

const roleSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 36,
    borderRadius: 12,
    borderColor: state.isFocused ? "#6366f1" : "rgba(148,163,184,0.4)",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(99,102,241,0.25)" : "none",
    "&:hover": { borderColor: "#6366f1" },
    minWidth: 160,
  }),
  menu: (base) => ({ ...base, borderRadius: 12, overflow: "hidden", zIndex: 20 }),
  option: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 600,
    backgroundColor: state.isSelected ? "rgba(99,102,241,0.12)" : state.isFocused ? "rgba(148,163,184,0.12)" : "transparent",
    color: "inherit",
    cursor: "pointer",
  }),
  singleValue: (base) => ({ ...base, display: "flex", alignItems: "center", gap: 8 }),
};

const RoleDot = ({ hex }) => (
  <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: hex }} />
);

RoleDot.propTypes = {
  hex: PropTypes.string.isRequired,
};

const formatRoleOption = (option) => (
  <div className="flex items-center gap-2">
    <RoleDot hex={option.hex} />
    <span>{option.label}</span>
  </div>
);

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data } = await fetchAllUsers();
      setUsers(data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "ইউজার তালিকা লোড করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const roleCounts = useMemo(() => {
    return users.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {});
  }, [users]);

  const handleRoleChange = async (id, option) => {
    setUpdatingId(id);
    try {
      await updateUserRole(id, option.value);
      toast.success(`রোল পরিবর্তন করা হয়েছে: ${option.label}`);
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "রোল পরিবর্তন ব্যর্থ হয়েছে।");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const next = currentStatus === "active" ? "disabled" : "active";
    setUpdatingId(id);
    try {
      await updateUserAccountStatus(id, next);
      toast.success(next === "active" ? "একাউন্ট সক্রিয় করা হয়েছে।" : "একাউন্ট নিষ্ক্রিয় করা হয়েছে।");
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে।");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-bars text-primary w-16"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-base-300 pb-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-primary">
            Super Admin Control Center
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-base-content flex items-center gap-2">
            <FaUsersCog className="text-primary" />
            <span>ইউজার ব্যবস্থাপনা (User Management)</span>
          </h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            রেজিস্টার্ড ইউজারদের রোল ও একাউন্ট স্ট্যাটাস নিয়ন্ত্রণ করুন।
          </p>
        </div>
        <button
          onClick={loadUsers}
          className="btn btn-sm btn-outline border-base-300 rounded-xl flex items-center gap-2 self-start sm:self-auto hover:bg-base-200"
        >
          <FaSync className="text-xs" />
          <span>রিফ্রেশ (Refresh)</span>
        </button>
      </div>

      {/* Role summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {ROLE_OPTIONS.map((role) => (
          <div
            key={role.value}
            className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm flex items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${role.hex}22` }}
            >
              <FaUserShield style={{ color: role.hex }} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-base-content/60">
                {role.label}
              </div>
              <div className="text-xl font-black text-base-content">
                {roleCounts[role.value] || 0}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User table card */}
      <div className="bg-base-100 border border-base-300 rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/70 text-[11px] uppercase tracking-wider text-base-content/60">
                <th>ইউজার</th>
                <th>ইমেইল</th>
                <th>রোল</th>
                <th>স্ট্যাটাস</th>
                <th className="text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const meta = ROLE_META[u.role] || ROLE_META.tenant;
                const isActive = u.accountStatus !== "disabled";
                const isRowUpdating = updatingId === u._id;
                return (
                  <tr
                    key={u._id}
                    className={`transition-colors hover:bg-base-200/40 ${isRowUpdating ? "opacity-50" : ""}`}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                          style={{ backgroundColor: meta.hex }}
                        >
                          {initials(u.name)}
                        </div>
                        <span className="font-semibold text-sm">{u.name}</span>
                      </div>
                    </td>
                    <td className="text-sm text-base-content/70 font-mono">{u.email || "—"}</td>
                    <td>
                      <Select
                        classNamePrefix="role-select"
                        styles={roleSelectStyles}
                        options={ROLE_OPTIONS}
                        value={ROLE_OPTIONS.find((opt) => opt.value === u.role)}
                        formatOptionLabel={formatRoleOption}
                        isDisabled={isRowUpdating}
                        isSearchable={false}
                        onChange={(option) => handleRoleChange(u._id, option)}
                        menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                      />
                    </td>
                    <td>
                      <span
                        className={`badge gap-1.5 border font-bold text-xs py-3 ${
                          isActive
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30"
                        }`}
                      >
                        {isActive ? <FaCheckCircle /> : <FaBan />}
                        {isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        disabled={isRowUpdating}
                        onClick={() => handleStatusToggle(u._id, u.accountStatus)}
                        className={`btn btn-xs rounded-lg font-bold ${
                          isActive ? "btn-outline btn-error" : "btn-outline btn-success"
                        }`}
                      >
                        {isActive ? "Disable" : "Activate"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
