import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coordinate } from '../models/application/Coordinate.ts';
import { Car, CarDetails, Exterior, GearBox } from '../models/garage/vehicle/Car.ts';
import { Garage } from '../models/garage/Garage.ts';
import BackToHome from '../components/BackToHome.tsx';

interface AddCarPageProps {
  onAddCar: (car: Car, newGarages: Garage[]) => void;
}

export default function AddCarPage({ onAddCar }: AddCarPageProps) {
  const [formData, setFormData] = useState({
    mark: '',
    model: '',
    year: new Date().getFullYear(),
    license_plate: '',
    daily_rate: 5,
    body_type: '',
    gearBox: GearBox.Automatic,
    garageIndex: 0, // Поле для вибору гаража
  });

  const navigate = useNavigate();

  // Завантаження даних про гаражі
  const garages = JSON.parse(localStorage.getItem('garages') || '[]');

  console.log(garages)
  console.log(Array.isArray(garages))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'year' || name === 'daily_rate' || name === 'garageIndex'
        ? parseFloat(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const exterior = new Exterior(
      formData.mark,
      formData.model,
      formData.body_type
    );
    const details = new CarDetails(
      exterior,
      new Date(),
      formData.license_plate,
      formData.year,
      formData.gearBox
    );
    const selectedGarage = garages[formData.garageIndex];
    const newCar = new Car(formData.daily_rate, selectedGarage.address, details);

    // Додаємо машину до обраного гаража
    if (!selectedGarage.vehicles) {
      selectedGarage.vehicles = [];
    }
    selectedGarage.vehicles.push(newCar);

    // Оновлюємо дані у localStorage
    localStorage.setItem('garages', JSON.stringify(garages));
    // Викликаємо onAddCar для оновлення стану у верхньому компоненті
    onAddCar(newCar, garages);

    // Повертаємося на головну сторінку
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          list="marks"
          name="mark"
          value={formData.mark}
          onChange={handleChange}
          placeholder="Mark"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <datalist id="marks">
          <option value="Toyota" />
          <option value="Honda" />
          <option value="Ford" />
          <option value="Chevrolet" />
          <option value="Tesla" />
          <option value="BMW" />
          <option value="Mercedes-Benz" />
          <option value="Audi" />
          <option value="Nissan" />
          <option value="Hyundai" />
          <option value="Kia" />
          <option value="Volkswagen" />
          <option value="Subaru" />
          <option value="Mazda" />
          <option value="Volvo" />
          <option value="Jaguar" />
          <option value="Porsche" />
          <option value="Lexus" />
          <option value="Land Rover" />
          <option value="Jeep" />
        </datalist>

        <input
          type="text"
          list="models"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <datalist id="models">
          <option value="Camry" />
          <option value="Accord" />
          <option value="Mustang" />
          <option value="Malibu" />
          <option value="Model 3" />
          <option value="3 Series" />
          <option value="C-Class" />
          <option value="A4" />
          <option value="Altima" />
          <option value="Sonata" />
          <option value="Optima" />
          <option value="Passat" />
          <option value="Impreza" />
          <option value="6" />
          <option value="S60" />
          <option value="XF" />
          <option value="911" />
          <option value="RX" />
          <option value="Evoque" />
          <option value="Wrangler" />
          <option value="Land Cruiser" />
        </datalist>

        <input
          type="number"
          name="year"
          //value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          className="px-4 py-2 border rounded-md w-full"
        />
        <input
          type="text"
          name="license_plate"
          value={formData.license_plate}
          onChange={handleChange}
          placeholder="License plate"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <input
          type="number"
          name="daily_rate"
          //value={formData.daily_rate}
          onChange={handleChange}
          placeholder="Daily rate"
          className="px-4 py-2 border rounded-md w-full"
        />
        <select
          name="gearBox"
          value={formData.gearBox}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md w-full"
        >
          <option value={GearBox.Automatic}>Automatic</option>
          <option value={GearBox.Mechanical}>Mechanical</option>
          <option value={GearBox.Variator}>Variator</option>
        </select>
        <input
          type="text"
          list="bodyTypes"
          name="body_type"
          value={formData.body_type}
          onChange={handleChange}
          placeholder="Body type"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <datalist id="bodyTypes">
          <option value="Sedan" />
          <option value="Hatchback" />
          <option value="SUV" />
          <option value="Coupe" />
          <option value="Wagon" />
          <option value="Convertible" />
          <option value="Van" />
          <option value="Pickup" />
        </datalist>
        <select
          name="garageIndex"
          value={formData.garageIndex}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md w-full"
        >
          {garages.map((garage: any, index: number) => (
            <option key={index} value={index}>
              {garage.name} - Max Cars: {garage.max_cars}
            </option>
          ))}
        </select>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Car
          </button>
          <BackToHome />
        </div>
      </form>
    </div>
  );
}
