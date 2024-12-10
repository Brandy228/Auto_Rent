import React from 'react';
import LicensePlate from './LicensePlate.tsx';
import { Car } from '../models/garage/vehicle/Car.ts';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import '../styles/globals.css';

interface CarCardProps {
  car: Car;
  garageName: string;
}

const CarCard: React.FC<CarCardProps> = ({ car, garageName }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-bg rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        //src={car.imageUrl || '/path/to/default/car/image.jpg'}
        alt={`${car.details.exterior.mark} ${car.details.exterior.model}`}
      />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">
          {car.details.exterior.mark} {car.details.exterior.model}
        </h3>
        <p className="text-gray-700 text-base">Garage: {garageName}</p>
        <p className="text-gray-700 text-base">Year: {car.details.getManufactureYear()}</p>
        <p className="text-gray-700 text-base">GearBox: {car.details.gear_box}</p>
        <LicensePlate plateNumber={car.details.license_plate} />
        <p className="text-lg font-bold text-green-600">${car.getPricePerDay()}/day</p>
        <div className="mt-4">
          <h4 className="font-bold">Power Sources:</h4>
          <ul>
            {car.power_sources.map((ps, index) => (
              <li key={index} className="text-gray-700 text-base">
                Type: {ps.type}, Capacity: {ps.getCapacity()} {ps.measurement_unit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-6 py-4"></div>
    </div>
  );
};

export default CarCard;