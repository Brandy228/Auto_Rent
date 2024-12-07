// components/LoginForm.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.tsx';

const LoginPage = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Отримуємо існуючих користувачів з localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Перевірка чи існує користувач з введеними логіном і паролем
    const foundUser = existingUsers.find(
      (user: any) => user.login === formData.login && user.password === formData.password
    );

    if (foundUser) {
      // Авторизуємо користувача через контекст
      login(foundUser);

      // Перенаправляємо на головну сторінку
      navigate('/');
    } else {
      alert('Невірний логін або пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        name="login"
        placeholder="Login"
        value={formData.login}
        onChange={(e) => setFormData({ ...formData, login: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginPage;