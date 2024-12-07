// components/RegisterForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Отримуємо існуючих користувачів з localStorage або створюємо новий масив
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Створюємо нового користувача з даними з форми
    const newUser = {
      login: formData.login,
      password: formData.password,
      role: 'user', // За замовчуванням роль "user"
      // Додайте інші поля, якщо потрібно
    };

    // Додаємо нового користувача до масиву існуючих
    existingUsers.push(newUser);

    // Зберігаємо оновлений масив користувачів в localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Перенаправляємо на сторінку входу
    navigate('/login');
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
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default RegisterPage;