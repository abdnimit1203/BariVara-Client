import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaSlidersH, FaUserCog } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const SettingsTile = ({ to, icon, iconBg, label }) => (
  <Link
    to={to}
    className="group flex flex-col items-center justify-center gap-3 aspect-square bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-0.5 transition-all"
  >
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl ${iconBg}`}>
      {icon}
    </div>
    <span className="text-xs sm:text-sm font-bold text-base-content text-center leading-tight">
      {label}
    </span>
  </Link>
);

const SettingsSection = ({ title, subtitle, children }) => (
  <section className="space-y-3">
    <div>
      <h2 className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
        {title}
      </h2>
      <p className="text-xs text-base-content/40">{subtitle}</p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
      {children}
    </div>
  </section>
);

const AdminSettingsHub = () => {
  const { profile } = useAuth();
  const isSuperAdmin = profile?.role === "superadmin";

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-base-content">⚙️ Settings</h1>
        <p className="text-xs sm:text-sm text-base-content/60 mt-0.5">
          Manage rooms, rates, and system configuration.
        </p>
      </div>

      <SettingsSection title="Room Management" subtitle="Add rooms, edit meters and utility flags">
        <SettingsTile
          to="/admin/settings/rooms/add"
          icon={<FaPlus className="text-emerald-600" />}
          iconBg="bg-emerald-500/10"
          label="Add Room"
        />
        <SettingsTile
          to="/admin/settings/rooms/edit"
          icon={<FaEdit className="text-blue-600" />}
          iconBg="bg-blue-500/10"
          label="Edit Rooms"
        />
      </SettingsSection>

      {isSuperAdmin && (
        <SettingsSection title="System" subtitle="Rates and access control">
          <SettingsTile
            to="/admin/utility-settings"
            icon={<FaSlidersH className="text-rose-600" />}
            iconBg="bg-rose-500/10"
            label="Utility Rates"
          />
          <SettingsTile
            to="/admin/users"
            icon={<FaUserCog className="text-purple-600" />}
            iconBg="bg-purple-500/10"
            label="User Management"
          />
        </SettingsSection>
      )}
    </div>
  );
};

export default AdminSettingsHub;
