// AddCarPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CarDetails, Exterior, GearBox } from '../models/garage/vehicle/Car.ts';
import { Garage } from '../models/garage/Garage.ts';
import BackToHome from '../components/BackToHome.tsx';
import { PowerSource } from '../models/garage/vehicle/PowerSource.ts';
import CarForm from './AddCarPage/CarForm.tsx';
import PowerSourceForm from './AddCarPage/PowerSourceForm.tsx';
import GarageSelect from './AddCarPage/GarageSelect.tsx';
import { deserializeGarages } from '../utils/Deserialize.ts';

interface PowerSourceData {
  type: string;
  capacity: number;
  unit: string;
}

interface AddCarPageProps {
  onAddCar: (car: Car, newGarages: Garage[]) => void;
}

const getAllGarages = (): Garage[] => {
  const savedGarages = localStorage.getItem('garages');
  if (!savedGarages) {
    return [];
  }

  try {
    const garagesData = JSON.parse(savedGarages);
    return deserializeGarages(garagesData);
  } catch (error) {
    console.error('Помилка при парсингу даних з localStorage:', error);
    return [];
  }
};

export default function AddCarPage({ onAddCar }: AddCarPageProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    mark: '',
    model: '',
    year: 0,
    license_plate: '',
    daily_rate: 0,
    body_type: '',
    gearBox: 'Automatic',
    garageIndex: 0,
  });

  const [powerSources, setPowerSources] = useState<PowerSourceData[]>([]);

  const navigate = useNavigate();

  // Завантаження даних про гаражі
  const garages: Garage[] = getAllGarages();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === 'year' ||
        name === 'daily_rate' ||
        name === 'garageIndex'
          ? parseFloat(value)
          : value,
    }));
  };

  const handleAddPowerSource = () => {
    setPowerSources([...powerSources, {
      type: '',
      capacity: 0,
      unit: '',
    }]);
  };

  const predefinedFuelTypes = [
    { type: 'Petrol', unit: 'liters' },
    { type: 'Diesel', unit: 'liters' },
    { type: 'Electric', unit: 'kWh' },
    { type: 'Gas', unit: 'liters' },
  ];

  const handlePowerSourceChange = (index: number, field: keyof PowerSourceData, value: string | number) => {
    const newPowerSources = [...powerSources];
    newPowerSources[index][field] = value;

    if (field === 'type') {
      const selectedFuel = predefinedFuelTypes.find(fuel => fuel.type === value);
      if (selectedFuel) {
        newPowerSources[index].unit = selectedFuel.unit;
      }
    }

    setPowerSources(newPowerSources);
  };

  const handleRemovePowerSource = (index: number) => {
    setPowerSources(powerSources.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const duplicateCar = garages.flatMap(garage => garage.vehicles).find(car => car.details.license_plate === formData.license_plate);

    if (duplicateCar) {
      setErrors(['Car with this license plate already exists.']);
      return;
    }

    try {
      const selectedGarage = garages[formData.garageIndex];
      const carLocation = selectedGarage.address;

      const powerSourceInstances = powerSources.map(ps => {
        const powerSource = new PowerSource(ps.type,ps.capacity, ps.unit);
        return powerSource;
      });

      const exterior = new Exterior(formData.mark, formData.model, formData.body_type);
      const details = new CarDetails(exterior, formData.license_plate, formData.gearBox as GearBox, formData.year);

      const newCar = new Car(
        powerSourceInstances,
        carLocation,
        details,
        formData.daily_rate,
        []
      );

      //newCar.setPricePerDay(formData.daily_rate);

      // Додаємо новий автомобіль до гаража
      selectedGarage.addVehicle(newCar);

      

      // Оновлюємо дані у localStorage
      localStorage.setItem('garages', JSON.stringify(garages));
      onAddCar(newCar, garages);

      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        console.error('Unexpected error:', error);
        setErrors(['An unexpected error occurred.']);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Car</h2>
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <CarForm formData={formData} handleChange={handleChange} />
        <GarageSelect
          garages={garages}
          selectedGarageIndex={formData.garageIndex}
          handleChange={handleChange}
        />
        <PowerSourceForm
          powerSources={powerSources}
          predefinedFuelTypes={predefinedFuelTypes}
          handlePowerSourceChange={handlePowerSourceChange}
          handleAddPowerSource={handleAddPowerSource}
          handleRemovePowerSource={handleRemovePowerSource}
        />
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