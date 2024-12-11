// AdminCarList.tsx
import React, { useState, useEffect, useRef } from 'react';
import LicensePlate from './LicensePlate.tsx';
import { Car } from '../models/garage/vehicle/Car.ts';
import { Garage } from '../models/garage/Garage.ts';
import '../styles/globals.css';

interface GaragesListProps {
  garages: Garage[];
  selectedCar: Car | null;
  onSelectCar: (car: Car | null) => void;
  onViewOnMap: (car: Car) => void; 
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1); // Додаємо один день
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці в JavaScript починаються з 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const CarCard = ({ car, garageName, isSelected, onViewOnMap }: { 
  car: Car; 
  isSelected: boolean; 
  garageName: string;
  onViewOnMap: (car: Car) => void;
}) => {
  return (
    <div
      id={`car-${car.details.license_plate}`}
      className={`
        relative bg-white rounded-lg p-4
        ${isSelected ? 'border-running-animation' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">
            {car.details.exterior.mark} {car.details.exterior.model}
          </h3>
          <p className="text-sm text-gray-600">Year: {car.details.getManufactureYear()}</p>
          <p className="text-sm text-gray-600">GearBox: {car.details.gear_box}</p>
          <LicensePlate plateNumber={car.details.license_plate} />
          <p className="text-lg font-bold text-green-600 mt-2">${car.getPricePerDay()}/day</p>
          {garageName !== '' && (
            <>
              <p className="text-sm text-gray-600">Garage: {garageName}</p>
              <p className="text-sm text-gray-600">Rented by: {car.getCurrentOrClosestPastRent().renter_login}</p>
              <p className="text-sm text-gray-600">Rent end: {formatDate(car.getCurrentOrClosestPastRent().rent_end)}</p>
            </>
          )}
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewOnMap(car);
        }}
        className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View on Map
      </button>
    </div>
  );
};

export default function AdminCarsList({ garages, selectedCar, onSelectCar, onViewOnMap }: GaragesListProps) {
  const [expandedGarage, setExpandedGarage] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  //console.log(garages.forEach(garage => console.log(garage.getAvailableCars())));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        onSelectCar(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onSelectCar]);

  useEffect(() => {
    if (selectedCar) {
      const element = document.getElementById(`car-${selectedCar.details.license_plate}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedCar]);

  return (
    <div className="space-y-6" ref={listRef} onClick={() => onSelectCar(null)}>
      <div className="space-y-4">
        {garages.map((garage) => (
          <div key={garage.name} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => setExpandedGarage(prev => prev === garage.name ? null : garage.name)}
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <div>
                <h2 className="text-xl font-semibold">{garage.name}</h2>
                <p className="text-gray-600">Capacity: {garage.getMaxCars()} cars, All cars: {garage.vehicles.length}</p>
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
                  {garage.getAvailableCars().map(car => (
                    <CarCard
                      key={car.details.license_plate}
                      car={car}
                      garageName={''}
                      isSelected={selectedCar?.details.license_plate === car.details.license_plate}
                      onViewOnMap={() => {
                        setExpandedGarage(null);
                        onViewOnMap(car);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Not Returned Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {garages.flatMap(garage => garage.getNotReturnedCars()).map(car => (
            <CarCard
              key={car.details.license_plate}
              car={car}
              garageName={garages.find(garage => garage.getNotReturnedCars().includes(car))?.name || ''}
              isSelected={selectedCar?.details.license_plate === car.details.license_plate}
              onViewOnMap={onViewOnMap}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Rented Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {garages.flatMap(garage => garage.getRentedCars()).map(car => (
            <CarCard
              key={car.details.license_plate}
              car={car}
              garageName={garages.find(garage => garage.getRentedCars().includes(car))?.name || ''}
              isSelected={selectedCar?.details.license_plate === car.details.license_plate}
              onViewOnMap={onViewOnMap}
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