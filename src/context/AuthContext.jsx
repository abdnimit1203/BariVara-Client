import { createContext, useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { subscribeToAuthChanges } from "../firebase/auth";
import client from "../API/client";

const AuthContext = createContext(undefined);

// Replaces the old `auth-change` window-event + localStorage-JWT pattern.
// Role-aware UI (superadmin/admin/household/tenant) needs real shared
// reactive auth state, which the old ad hoc event couldn't cleanly provide.
export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await client.get("/users/me");
      setProfile(data.data);
    } catch (error) {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setFirebaseUser(user);
      if (user) {
        await refreshProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [refreshProfile]);

  const value = {
    firebaseUser,
    profile,
    role: profile?.role ?? null,
    isAuthenticated: !!firebaseUser,
    loading,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
