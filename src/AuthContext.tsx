// src/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from './models/person/User.ts';

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser'); // Використовуємо sessionStorage
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const userInstance = new User(
        userData.name,
        userData.phone_nums,
        userData.money,
        userData.login,
        userData.password,
        userData.rentalHistory || [],
        userData.role === 'admin' ? Role.ADMIN : Role.USER
      );
      setCurrentUser(userInstance);
      console.log(userInstance, "User loaded from sessionStorage");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser)); // Зберігаємо в sessionStorage
      console.log(currentUser);
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};