// src/utils/deserialize.ts

import { Garage } from '../models/garage/Garage.ts';
import { Coordinate } from '../models/application/Coordinate.ts';
import { Car } from '../models/garage/vehicle/Car.ts';
import { RentSpecs } from '../models/application/RentSpecs.ts';

// Helper function to deserialize RentSpecs
const deserializeRentSpecs = (rentData: any): RentSpecs => {
  return new RentSpecs(
    new Date(rentData.rent_start),
    new Date(rentData.rent_end),
    rentData.vehicle_license_plate,
    rentData.renter_id
  );
};

// Helper function to deserialize Car
const deserializeCar = (carData: any): Car => {
  const gps = new Coordinate(carData.gps.latitude, carData.gps.longitude);
  
  const car = new Car(
    carData.price,
    gps,
    carData.discount_procent,
  );

  // Deserialize rents
  car.rents = carData.rents.map((rent: any) => deserializeRentSpecs(rent));

  // If Car has a details property, deserialize it accordingly
  if (carData.details) {
    car.details = {
      exterior: carData.details.exterior,
      manufacture_year: carData.details.manufacture_year,
      gear_box: carData.details.gear_box,
      license_plate: carData.details.license_plate,
      last_maintenance: carData.details.last_maintenance,
      // Add other properties if necessary
    };
  }

  return car;
};

// Helper function to deserialize Garage
export const deserializeGarages = (garagesData: any[]): Garage[] => {
  return garagesData.map((garageData: any) => {
    const address = new Coordinate(
      garageData.address.latitude,
      garageData.address.longitude
    );

    const garage = new Garage(
      garageData.name,
      address,
      garageData.max_cars
    );

    // Deserialize vehicles
    garage.vehicles = garageData.vehicles.map((carData: any) => deserializeCar(carData));

    return garage;
  });
};