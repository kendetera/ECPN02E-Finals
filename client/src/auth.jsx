import { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking, null = logged out

  useEffect(() => {
    api('/auth/me').then(setUser).catch(() => setUser(null));
  }, []);

  const login = async (username, password) => setUser(await api('/auth/login', { method: 'POST', body: { username, password } }));
  const logout = async () => {
    await api('/auth/logout', { method: 'POST' }).catch(() => {});
    setUser(null);
  };
  const can = (page) => !!user?.pages?.includes(page);

  return <AuthContext.Provider value={{ user, login, logout, can }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
