// src/pages/RentPage.tsx

import React, { useState, useEffect, useContext } from 'react';
import '../styles/globals.css';
import CarCard from '../components/CarInformation.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import DataRangePicker from '../components/DataRangePicker.tsx';
import { Car } from '../models/garage/vehicle/Car.ts';
import { RentSpecs } from '../models/application/RentSpecs.ts';
import BackToHome from '../components/BackToHome.tsx';
import { AuthContext } from '../AuthContext.tsx';
import { CarDetails } from '../models/garage/vehicle/Car.ts';
import { PowerSource } from '../models/garage/vehicle/PowerSource.ts';

import { User } from '../models/person/User.ts';
import { Coordinate } from '../models/application/Coordinate.ts';
import { Exterior } from '../models/garage/vehicle/Car.ts'; // Ensure this import exists

const RentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [rentalPeriod, setRentalPeriod] = useState<{ startDate: Date; endDate: Date } | null>(null);
  const { currentUser: user } = useContext(AuthContext);

  const fetchCarData = (license_plate: string): Car | null => {
    const savedGarages = JSON.parse(localStorage.getItem('garages') || '[]');
    for (const garage of savedGarages) {
      const foundCarData = garage.vehicles.find(
        (v: any) => v.details.license_plate === license_plate
      );
      if (foundCarData) {
        try {
          // Instantiate PowerSource objects
          const powerSources: PowerSource[] = Array.isArray(foundCarData.power_sources)
            ? foundCarData.power_sources.map(
                (ps: any) => new PowerSource(ps.type, ps.capacity, ps.measurement_unit)
              )
            : [];

          // Instantiate Coordinate object
          const gpsData = foundCarData.gps;
          const gps: Coordinate = gpsData
            ? new Coordinate(gpsData.latitude, gpsData.longitude)
            : new Coordinate(0, 0); // Default values

          // Instantiate Exterior object
          const exteriorData = foundCarData.details.exterior;
          const exterior = new Exterior(
            exteriorData.mark,
            exteriorData.model,
            exteriorData.body_type
          );

          // Instantiate CarDetails object
          const detailsData = foundCarData.details;
          const details = new CarDetails(
            exterior,
            detailsData.license_plate,
            detailsData.gear_box,
            detailsData.manufacture_year
          );

          // Ensure price_per_day is a number
          const pricePerDay: number =
            typeof foundCarData.price_per_day === 'number'
              ? foundCarData.price_per_day
              : 0;

          // Instantiate Car object
          const carInstance = new Car(
            powerSources,
            gps,
            details,
            pricePerDay,
            foundCarData.rents
          );

          return carInstance;
        } catch (error) {
          console.error('Error instantiating Car:', error);
          return null;
        }
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
        renter_login: user.login,
      };

      const updatedRents = [...car.rents, newRent];
      const updatedCar = new Car(
        car.power_sources,
        car.gps,
        car.details,
        car.getPricePerDay(),
        updatedRents
      );
      // updatedCar.rents = updatedRents;

      // Update localStorage
      const savedGarages = JSON.parse(localStorage.getItem('garages') || '[]');
      const updatedGarages = savedGarages.map((garage: any) => {
        const carIndex = garage.vehicles.findIndex(
          (v: any) => v.details.license_plate === car.details.license_plate
        );
        if (carIndex !== -1) {
          garage.vehicles[carIndex] = {
            power_sources: updatedCar.power_sources.map(ps => ({
              type: ps.type,
              capacity: ps.getCapacity(),
              measurement_unit: ps.measurement_unit,
            })),
            gps: {
              latitude: updatedCar.gps.latitude,
              longitude: updatedCar.gps.longitude,
            },
            details: {
              exterior: {
                mark: updatedCar.details.exterior.mark,
                model: updatedCar.details.exterior.model,
                body_type: updatedCar.details.exterior.body_type,
              },
              license_plate: updatedCar.details.license_plate,
              gear_box: updatedCar.details.gear_box,
              manufacture_year: updatedCar.details.getManufactureYear(),
            },
            price_per_day: updatedCar.getPricePerDay(),
            rents: updatedCar.rents,
          };
        }
        return garage;
      });

      localStorage.setItem('garages', JSON.stringify(updatedGarages));

      // Update component state
      const latestCar = fetchCarData(car.details.license_plate);
    if (latestCar) {
      setCar(latestCar);
    }

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
        <CarCard car={car} garageName="" />
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