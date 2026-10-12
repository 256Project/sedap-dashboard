import { authenticateDemo } from '../utils/auth';
import { createContext, useContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../data/auth.json';
const AuthContext = createContext(null);
const storageKey = 'sedap-demo-session';
export function AuthProvider({
  children
}) {
  const [user, setUser] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === auth.email ? {
        name: auth.name,
        email: auth.email
      } : null;
    } catch {
      return null;
    }
  });
  const login = (email, password) => {
    if (!authenticateDemo(email, password, auth)) return false;
    const next = {
      name: auth.name,
      email: auth.email
    };
    try {
      sessionStorage.setItem(storageKey, next.email);
    } catch {}
    setUser(next);
    return true;
  };
  const logout = () => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {}
    setUser(null);
  };
  return <AuthContext.Provider value={{
    user,
    login,
    logout
  }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
export function RequireAuth() {
  const {
    user
  } = useAuth();
  const location = useLocation();
  return user ? <Outlet /> : <Navigate to="/login" replace state={{
    from: location.pathname + location.search
  }} />;
}
