import React from 'react';
import LicensePlate from './LicensePlate.tsx';
import { Car } from '../models/garage/vehicle/Car';
import 'tailwindcss/tailwind.css';
import { AuthContext } from '../AuthContext.tsx';
import { AuthProvider } from '../AuthContext.tsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import CarCard from './CarInformation.tsx';

interface CarsListProps {
  cars: Car[];
  onRent: (car: Car) => void;
}

export default function CarsList({ cars, onRent }: CarsListProps) {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.details.license_plate}
          className="rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              {car.details.exterior.mark} {car.details.exterior.model}
            </h3>
            <p className="text-sm text-gray-600">Year: {car.details.manufacture_year}</p>
            <p className="text-sm text-gray-600">GearBox: {car.details.gear_box}</p>
            <LicensePlate plateNumber={car.details.license_plate} />
            <p className="text-lg font-bold text-green-600">${car.price}/day</p>
            <div className="flex justify-between items-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  if (user) {
                  onRent(car)
                  }
                  else {
                    navigate('/login')
                  }
                }}
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
