// RentPage.tsx
import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import CarCard from '../components/CarInformation.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import DataRangePicker from '../components/DataRangePicker.tsx';
import { Car } from '../models/garage/vehicle/Car.ts';
import { RentSpecs } from '../models/application/RentSpecs.ts';
import BackToHome from '../components/BackToHome.tsx';

// Ініціалізація користувача
import { User } from '../models/person/User.ts';
import { PersonalInformation, SexType } from '../models/person/Person.ts';
import { Coordinate } from '../models/application/Coordinate.ts';
import { DriverLicense } from '../models/person/DriverLicense.ts';

const RentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ініціалізація користувача
  const cord1 = { latitude: 12, longitude: 23 } as Coordinate;
  const driver_license = new DriverLicense();
  const date1 = new Date(1990, 2, 12);
  const personal_inform = new PersonalInformation("Abdul", SexType.Male, date1, cord1, ["+3809394234"]);
  const user = new User(personal_inform, 20000, false, driver_license, "Abdul229", "qwerty1");

  const [car, setCar] = useState<Car | null>(null);
  const [rentalPeriod, setRentalPeriod] = useState<{ startDate: Date; endDate: Date } | null>(null);

  const fetchCarData = (license_plate: string): Car | null => {
    const savedGarages = JSON.parse(localStorage.getItem('garages') || '[]');
    for (const garage of savedGarages) {
      const foundCarData = garage.vehicles.find((v: any) => v.details.license_plate === license_plate);
      if (foundCarData) {
        return foundCarData as Car;
      }
    }
    return null;
  };

  useEffect(() => {
    const { car: selectedCar } = location.state as { car: Car };
    const latestCar = fetchCarData(selectedCar.details.license_plate);
    if (latestCar) {
      setCar(latestCar);
    } else {
      alert('Автомобіль не знайдено.');
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleDateSelection = (startDate: Date, endDate: Date) => {
    setRentalPeriod({ startDate, endDate });
  };

  const handleConfirmRental = () => {
    if (rentalPeriod && user && car) {
      const newRent: RentSpecs = {
        rent_start: rentalPeriod.startDate.toISOString(),
        rent_end: rentalPeriod.endDate.toISOString(),
        vehicle_license_plate: car.details.license_plate,
        renter_id: user.id
      };

      const updatedRents = [...car.rents, newRent];
      const updatedCar: Car = { ...car, rents: updatedRents };

      // Оновлення localStorage
      const savedGarages = JSON.parse(localStorage.getItem('garages') || '[]');
      const updatedGarages = savedGarages.map((garage: any) => {
        const carIndex = garage.vehicles.findIndex(
          (v: any) => v.details.license_plate === car.details.license_plate
        );
        if (carIndex !== -1) {
          garage.vehicles[carIndex] = updatedCar;
        }
        return garage;
      });

      localStorage.setItem('garages', JSON.stringify(updatedGarages));

      // Оновлення стану компонента
      setCar(updatedCar);

      alert('Автомобіль успішно орендований!');
      navigate('/');
    } else {
      alert('Будь ласка, виберіть період оренди та переконайтесь, що ви увійшли в систему.');
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
      <CarCard car={car} />
      <DataRangePicker car={car} onDateSelect={handleDateSelection} />
      <div className="flex space-x-4">
      <button
        onClick={handleConfirmRental}
        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
        disabled={!rentalPeriod}
      >
        Confirm rent
      </button>
      <BackToHome />
      </div>
    </div>
  </div>
  );
};

export default RentPage;