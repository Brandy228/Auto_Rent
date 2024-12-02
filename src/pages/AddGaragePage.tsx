import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Garage } from '../models/garage/Garage.ts';
import BackToHome from '../components/BackToHome.tsx';
import { Coordinate } from '../models/application/Coordinate.ts';

interface AddGaragePageProps {
  onAddGarage: (garage: Garage, newGarages: Garage[]) => void;
}

export default function AddGaragePage({ onAddGarage }: AddGaragePageProps) {
  const [formData, setFormData] = useState({
    name: '',
    latitude: 0,
    longitude: 0,
    max_cars: 0,
  });

  const navigate = useNavigate();

  // Завантаження даних про гаражі
  const garages = JSON.parse(localStorage.getItem('garages') || '[]');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'max_cars' || name === 'latitude' || name === 'longitude' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const address = new Coordinate(formData.latitude, formData.longitude);
    const newGarage = new Garage(formData.name, address, formData.max_cars);

    // Додаємо новий гараж до списку гаражів
    garages.push(newGarage);

    // Оновлюємо дані у localStorage
    localStorage.setItem('garages', JSON.stringify(garages));
    // Викликаємо onAddGarage для оновлення стану у верхньому компоненті
    onAddGarage(newGarage, garages);

    // Повертаємося на головну сторінку
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Garage</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <input
          type="number"
          name="latitude"
          // value={}
          onChange={handleChange}
          placeholder="Latitude"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <input
          type="number"
          name="longitude"
          //value={formData.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <input
          type="number"
          name="max_cars"
          //value={formData.max_cars}
          onChange={handleChange}
          placeholder="Max Cars"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Garage
          </button>
          <BackToHome/>
        </div>
      </form>
    </div>
  );
}