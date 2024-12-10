// Deserialize.ts

import { Garage } from '../models/garage/Garage.ts';
import { Coordinate } from '../models/application/Coordinate.ts';
import { Car, CarDetails, Exterior, GearBox } from '../models/garage/vehicle/Car.ts';
import { RentSpecs } from '../models/application/RentSpecs.ts';
import { PowerSource } from '../models/garage/vehicle/PowerSource.ts';

// Десеріалізація RentSpecs
const deserializeRentSpecs = (rentData: any): RentSpecs => {
  return new RentSpecs(
    new Date(rentData.rent_start),
    new Date(rentData.rent_end),
    rentData.vehicle_license_plate,
    rentData.renter_login
  );
};

// Десеріалізація PowerSource
const deserializePowerSource = (psData: any): PowerSource => {
  return new PowerSource(
    psData.type,
    psData.capacity,
    psData.measurement_unit
  );
};

// Десеріалізація CarDetails
const deserializeCarDetails = (detailsData: any): CarDetails => {
  const exterior = new Exterior(
    detailsData.exterior.mark,
    detailsData.exterior.model,
    detailsData.exterior.body_type
  );

  return new CarDetails(
    exterior,
    detailsData.license_plate,
    detailsData.gear_box as GearBox,
    detailsData.manufacture_year
  );
};

// Десеріалізація Car
const deserializeCar = (carData: any): Car => {
  const gps = new Coordinate(carData.gps.latitude, carData.gps.longitude);

  const powerSources = carData.power_sources.map((psData: any) => deserializePowerSource(psData));

  const details = deserializeCarDetails(carData.details);

  const price = carData.price_per_day;
  
  const rents = carData.rents.map((rent: any) => deserializeRentSpecs(rent));

  const car = new Car(
    powerSources,
    gps,
    details, 
    price,
    rents
  );

  //car.setPricePerDay(carData.price_per_day);

  // Десеріалізація оренд

  return car;
};

// Десеріалізація Garage
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

    // Десеріалізація автомобілів
    garage.vehicles = garageData.vehicles.map((carData: any) => deserializeCar(carData));

    return garage;
  });
};