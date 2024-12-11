// AddAdminPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToHome from '../components/BackToHome.tsx';

interface User {
  login: string;
  role: string;
}

export default function AddAdmin() {
  const [errors, setErrors] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [login, setLogin] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Завантаження користувачів з локального сховища
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogin(value);

    // Фільтрація логінів для автодоповнення
    const filteredSuggestions = users
      .map(user => user.login)
      .filter(login => login.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filteredSuggestions);
  };

  const handleAddAdmin = () => {
    const user = users.find(user => user.login === login);
    if (!user) {
      setMessage('User not found');
      return;
    }

    if (user.role === 'admin') {
      setMessage('User is already an admin');
      return;
    }

    // Зміна ролі користувача на "адмін"
    const updatedUsers = users.map(u =>
      u.login === login ? { ...u, role: 'admin' } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setMessage('User role updated to admin');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Admin</h2>
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          value={login}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter user login"
        />
        {suggestions.length > 0 && (
          <ul className="border border-gray-300 rounded mt-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setLogin(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex space-x-4">
      <button
        onClick={handleAddAdmin}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Admin
      </button>
      <BackToHome />
      </div>
      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
}