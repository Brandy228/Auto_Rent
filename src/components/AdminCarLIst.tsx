// AdminCarList.tsx
import React, { useState, useEffect, useRef } from 'react';
import LicensePlate from './LicensePlate.tsx';
import { Car } from '../models/garage/vehicle/Car';
import { Garage } from '../models/garage/Garage';
import '../styles/globals.css';

interface GaragesListProps {
  garages: Garage[];
}

// AdminCarList.tsx - update CarCard component
const CarCard = ({ car, isSelected, onClick }: { 
  car: Car; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <div
  onClick={(e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    onClick();
  }}
  className={`
    relative bg-white rounded-lg p-4 cursor-pointer
    ${isSelected ? 'border-running-animation' : ''}
  `}
  >
    <h3 className="font-semibold">
      {car.details.exterior.mark} {car.details.exterior.model}
    </h3>
    <p className="text-sm text-gray-600">Year: {car.details.manufacture_year}</p>
    <p className="text-sm text-gray-600">GearBox: {car.details.gear_box}</p>
    <LicensePlate plateNumber={car.details.license_plate} />
    <p className="text-lg font-bold text-green-600 mt-2">${car.price}/day</p>
  </div>
);

export default function AdminCarsList({ garages }: GaragesListProps) {
  const [expandedGarage, setExpandedGarage] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setSelectedCar(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-6" ref={listRef} onClick={() => setSelectedCar(null)}>
      <div className="space-y-4">
        {garages.map((garage) => (
          <div key={garage.name} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => setExpandedGarage(prev => prev === garage.name ? null : garage.name)}
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <div>
                <h2 className="text-xl font-semibold">{garage.name}</h2>
                <p className="text-gray-600">Capacity: {garage.max_cars} cars</p>
              </div>
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  expandedGarage === garage.name ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedGarage === garage.name && (
              <div className="p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {garage.vehicles
                    .filter(car => 
                      car.gps.latitude === garage.address.latitude &&
                      car.gps.longitude === garage.address.longitude
                    )
                    .map(car => (
                      <CarCard
                        key={car.details.license_plate}
                        car={car}
                        isSelected={selectedCar === car.details.license_plate}
                        onClick={() => setSelectedCar(car.details.license_plate)}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Rented Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {garages.flatMap(garage =>
            garage.vehicles.filter(car =>
              car.gps.latitude !== garage.address.latitude ||
              car.gps.longitude !== garage.address.longitude
            )
          ).map(car => (
            <CarCard
              key={car.details.license_plate}
              car={car}
              isSelected={selectedCar === car.details.license_plate}
              onClick={() => setSelectedCar(car.details.license_plate)}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes expandLeft {
            from { transform: scaleX(0); transform-origin: left; }
            to { transform: scaleX(1); transform-origin: left; }
          }
          @keyframes expandRight {
            from { transform: scaleX(0); transform-origin: right; }
            to { transform: scaleX(1); transform-origin: right; }
          }
          .animate-expandLeft {
            animation: expandLeft 1s linear infinite;
          }
          .animate-expandRight {
            animation: expandRight 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
}