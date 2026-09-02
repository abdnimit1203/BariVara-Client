import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { updateMyProfile } from "../API/api";

const Profile = () => {
  const { profile, firebaseUser, refreshProfile } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateMyProfile({ name });
      await refreshProfile();
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded border bg-transparent"
            required
          />
        </div>

        <div>
          <span className="block mb-1 text-sm font-medium">Email</span>
          <p className="p-2 rounded border bg-base-200/50">{profile?.email || firebaseUser?.email}</p>
        </div>

        <div>
          <span className="block mb-1 text-sm font-medium">Role</span>
          <p className="p-2 rounded border bg-base-200/50 capitalize">{profile?.role}</p>
          <p className="text-xs text-gray-500 mt-1">Only a Super Admin can change your role.</p>
        </div>

        <div>
          <span className="block mb-1 text-sm font-medium">Account Status</span>
          <p className="p-2 rounded border bg-base-200/50 capitalize">{profile?.accountStatus}</p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="bg-primary text-white font-bold py-2 px-4 rounded-full disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
