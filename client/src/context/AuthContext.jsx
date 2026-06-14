import { useState } from 'react';
import { AuthContext } from './auth-context';

const getStoredAuth = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  if (!storedUser || !storedToken) {
    return { user: null, token: null };
  }

  try {
    return { user: JSON.parse(storedUser), token: storedToken };
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return { user: null, token: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = (userData, authToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    setAuth({ user: userData, token: authToken });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ user: auth.user, token: auth.token, login, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
