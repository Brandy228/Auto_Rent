// src/pages/LoginPage.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.tsx';
import { User, Role } from '../models/person/User.ts';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('login:', login, 'password:', password)
    const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('existingUsers:', existingUsers)

    const foundUser = existingUsers.find(
      (user: any) => user.login === login && user.password === password
    );

    if (foundUser) {
      // Перетворення рядка ролі на enum
      const userRole: Role = foundUser.role === 'admin' ? Role.ADMIN : Role.USER;

      const userInstance = new User(
        foundUser.name,
        foundUser.phone_nums,
        foundUser.money,
        foundUser.login,
        foundUser.password,
        foundUser.rental_history || [],
        userRole // Використання enum Role
      );
      setCurrentUser(userInstance);
      navigate('/');
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        name="login"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        Login
      </button>
    </form>
  );
};

export default LoginPage;