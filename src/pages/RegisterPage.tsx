// src/pages/RegisterPage.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Role } from '../models/person/User.ts';
import { AuthContext } from '../AuthContext.tsx';

interface FormData {
  login: string;
  password: string;
  name: string;
  phone_nums: string[];
  hasDriverLicense: boolean;
  role: Role;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormData>({
    login: '',
    password: '',
    name: '',
    phone_nums: [''],
    hasDriverLicense: false,
    role: Role.USER, // Використовуємо enum Role
  });

  const [phoneErrors, setPhoneErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const phoneRegex = /^\+\d{12}$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('phone_nums')) {
      const index = parseInt(name.split('[')[1].split(']')[0]);
      const updatedPhones = [...formData.phone_nums];
      updatedPhones[index] = value;
      setFormData({ ...formData, phone_nums: updatedPhones });
    } else if (name === 'hasDriverLicense') {
      setFormData({ ...formData, hasDriverLicense: checked });
    } else if (name === 'role') {
      setFormData({ ...formData, role: value as Role });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addPhone = () => {
    setFormData({ ...formData, phone_nums: [...formData.phone_nums, ''] });
    setPhoneErrors([...phoneErrors, '']);
  };

  const removePhone = (index: number) => {
    const updatedPhones = formData.phone_nums.filter((_, i) => i !== index);
    const updatedErrors = phoneErrors.filter((_, i) => i !== index);
    setFormData({ ...formData, phone_nums: updatedPhones });
    setPhoneErrors(updatedErrors);
  };

  const validatePhones = (): boolean => {
    const errors = formData.phone_nums.map((phone) =>
      phoneRegex.test(phone)
        ? ''
        : 'Invalid phone number. It should start with "+" and contain exactly 12 digits.'
    );
    setPhoneErrors(errors);
    return errors.every((error) => error === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhones()) {
      alert('Please correct the phone number errors.');
      return;
    }

    const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (existingUsers.some((user: any) => user.login === formData.login)) {
      alert('User with this login already exists');
      return;
    }

    if (!formData.hasDriverLicense) {
      alert('You must have a driver license to register');
      return;
    }

    const newUser = new User(
      formData.name,
      formData.phone_nums,
      2000, // Початкова сума грошей
      formData.login,
      formData.password,
      [], // rentalHistory
      formData.role // Використання enum Role
    );

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers)); // Зберігаємо в localStorage
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {/* Поля форми */}
      <input
        type="text"
        name="login"
        placeholder="Login"
        value={formData.login}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <div>
        <label className="block font-medium">Phone Numbers:</label>
        {formData.phone_nums.map((phone, index) => (
          <div key={index} className="flex flex-col space-y-1 mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name={`phone_nums[${index}]`}
                value={phone}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  phoneErrors[index] ? 'border-red-500' : ''
                }`}
                placeholder="+380234838382"
                required
              />
              {formData.phone_nums.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhone(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
            {phoneErrors[index] && (
              <span className="text-red-500 text-sm">{phoneErrors[index]}</span>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addPhone}
          className="mt-2 text-blue-500"
        >
          Add Phone
        </button>
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          name="hasDriverLicense"
          checked={formData.hasDriverLicense}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="font-medium">Do you have a Driver's License?</label>
      </div>

      {/* Вибір ролі */}
      <div className="mt-4">
        <label className="block font-medium">Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value={Role.USER}>User</option>
          <option value={Role.ADMIN}>Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded mt-4"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterPage;