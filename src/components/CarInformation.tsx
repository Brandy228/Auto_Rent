// CarCard.tsx
import React from 'react';
import LicensePlate from './LicensePlate.tsx';
import { Car } from '../models/garage/vehicle/Car.ts';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import '../styles/globals.css';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-bg rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        //src={car.imageUrl || '/path/to/default/car/image.jpg'} // Використовуйте реальний шлях до зображення
        alt={`${car.details.exterior.mark} ${car.details.exterior.model}`}
      />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">
          {car.details.exterior.mark} {car.details.exterior.model}
        </h3>
        <p className="text-gray-700 text-base">Year: {car.details.manufacture_year}</p>
        <p className="text-gray-700 text-base">GearBox: {car.details.gear_box}</p>
        <LicensePlate plateNumber={car.details.license_plate} />
        <p className="text-lg font-bold text-green-600">${car.price}/day</p>
      </div>
      <div className="px-6 py-4">
      </div>
    </div>
  );
};

export default CarCard;