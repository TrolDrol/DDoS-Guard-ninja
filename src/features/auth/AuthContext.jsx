import { createContext, useContext, useMemo, useState } from 'react';
import { clearAuth, loadAuth, saveAuth } from './authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuthState] = useState(loadAuth());

  const setAuth = (payload) => {
    saveAuth(payload);
    setAuthState(payload);
  };

  const logout = () => {
    clearAuth();
    setAuthState(null);
  };

  const value = useMemo(
    () => ({
      auth,
      isAuthorized: Boolean(auth?.token),
      setAuth,
      logout,
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return value;
}
