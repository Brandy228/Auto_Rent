// AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext<{
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    // Try to get user data from sessionStorage on initial load
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: any) => {
    setUser(userData);
    // Save user data to sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // Remove user data from sessionStorage
    sessionStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};