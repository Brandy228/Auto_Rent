// AddCarPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CarDetails, Exterior, GearBox } from '../models/garage/vehicle/Car.ts';
import { Garage } from '../models/garage/Garage.ts';
import BackToHome from '../components/BackToHome.tsx';

interface PowerSource {
  fuelType: string;
  capacity: number;
  measurementUnit: string;
}

interface AddCarPageProps {
  onAddCar: (car: Car, newGarages: Garage[]) => void;
}

export default function AddCarPage({ onAddCar }: AddCarPageProps) {
  const [formData, setFormData] = useState({
    mark: '',
    model: '',
    year: new Date().getFullYear(),
    license_plate: '',
    daily_rate: 5,
    body_type: '',
    gearBox: GearBox.Automatic,
    garageIndex: 0,
  });

  const [powerSources, setPowerSources] = useState<PowerSource[]>([]);

  const navigate = useNavigate();

  // Завантаження даних про гаражі
  const garages = JSON.parse(localStorage.getItem('garages') || '[]');

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
      fuelType: '',
      capacity: 0,
      measurementUnit: '',
    }]);
  };

  const predefinedFuelTypes = [
    { type: 'Petrol', unit: 'liters' },
    { type: 'Diesel', unit: 'liters' },
    { type: 'Electric', unit: 'kWh' },
    { type: 'Gas', unit: 'liters' },
  ];

  const handlePowerSourceChange = (index: number, field: keyof PowerSource, value: string | number) => {
    const newPowerSources = [...powerSources];
    newPowerSources[index][field] = value;

    if (field === 'fuelType') {
      const selectedFuel = predefinedFuelTypes.find(fuel => fuel.type === value);
      if (selectedFuel) {
        newPowerSources[index].measurementUnit = selectedFuel.unit;
      }
    }

    setPowerSources(newPowerSources);
  };

  const handleRemovePowerSource = (index: number) => {
    setPowerSources(powerSources.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const exterior = new Exterior(
      formData.mark,
      formData.model,
      formData.body_type
    );
    const details = new CarDetails(
      exterior,
      formData.license_plate,
      formData.year,
      formData.gearBox
    );
    const selectedGarage = garages[formData.garageIndex];
    const newCar = new Car(
      powerSources, // Передаємо масив powerSources
      formData.daily_rate,
      selectedGarage.address,
      details,
    );

    // Додаємо машину до обраного гаража
    if (!selectedGarage.vehicles) {
      selectedGarage.vehicles = [];
    }
    selectedGarage.vehicles.push(newCar);

    // Оновлюємо дані у localStorage
    localStorage.setItem('garages', JSON.stringify(garages));
    onAddCar(newCar, garages);

    // Повертаємося на головну сторінку
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Інші поля форми */}
        {/* ... */}
        <input
          type="text"
          list="marks"
          name="mark"
          value={formData.mark}
          onChange={handleChange}
          placeholder="Mark"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <datalist id="marks">
          <option value="Toyota" />
          <option value="Honda" />
          <option value="Ford" />
          <option value="Chevrolet" />
          <option value="Tesla" />
          <option value="BMW" />
          <option value="Mercedes-Benz" />
          <option value="Audi" />
          <option value="Nissan" />
          <option value="Hyundai" />
          <option value="Kia" />
          <option value="Volkswagen" />
          <option value="Subaru" />
          <option value="Mazda" />
          <option value="Volvo" />
          <option value="Jaguar" />
          <option value="Porsche" />
          <option value="Lexus" />
          <option value="Land Rover" />
          <option value="Jeep" />
        </datalist>

        <input
          type="text"
          list="models"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <datalist id="models">
          <option value="Camry" />
          <option value="Accord" />
          <option value="Mustang" />
          <option value="Malibu" />
          <option value="Model 3" />
          <option value="3 Series" />
          <option value="C-Class" />
          <option value="A4" />
          <option value="Altima" />
          <option value="Sonata" />
          <option value="Optima" />
          <option value="Passat" />
          <option value="Impreza" />
          <option value="6" />
          <option value="S60" />
          <option value="XF" />
          <option value="911" />
          <option value="RX" />
          <option value="Evoque" />
          <option value="Wrangler" />
          <option value="Land Cruiser" />
        </datalist>

        <input
          type="number"
          name="year"
          //value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          className="px-4 py-2 border rounded-md w-full"
        />
        <input
          type="text"
          name="license_plate"
          value={formData.license_plate}
          onChange={handleChange}
          placeholder="License plate"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <input
          type="number"
          name="daily_rate"
          //value={formData.daily_rate}
          onChange={handleChange}
          placeholder="Daily rate"
          className="px-4 py-2 border rounded-md w-full"
        />
        <select
          name="gearBox"
          value={formData.gearBox}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md w-full"
        >
          <option value={GearBox.Automatic}>Automatic</option>
          <option value={GearBox.Mechanical}>Mechanical</option>
          <option value={GearBox.Variator}>Variator</option>
        </select>
        <input
          type="text"
          list="bodyTypes"
          name="body_type"
          value={formData.body_type}
          onChange={handleChange}
          placeholder="Body type"
          autoComplete="off"
          className="px-4 py-2 border rounded-md w-full"
        />
        <datalist id="bodyTypes">
          <option value="Sedan" />
          <option value="Hatchback" />
          <option value="SUV" />
          <option value="Coupe" />
          <option value="Wagon" />
          <option value="Convertible" />
          <option value="Van" />
          <option value="Pickup" />
        </datalist>
        <select
          name="garageIndex"
          value={formData.garageIndex}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md w-full"
        >
          {garages.map((garage: any, index: number) => (
            <option key={index} value={index}>
              {garage.name} - Max Cars: {garage.max_cars}
            </option>
          ))}
        </select>

        {/* ... решта полів форми ... */}

        <div>
          <h3 className="text-lg font-semibold">Power Sources:</h3>
          {powerSources.map((source, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                list={`fuelTypes-${index}`}
                value={source.fuelType}
                onChange={(e) => handlePowerSourceChange(index, 'fuelType', e.target.value)}
                placeholder="Fuel Type"
                className="px-4 py-2 border rounded-md"
              />
              <datalist id={`fuelTypes-${index}`}>
                {predefinedFuelTypes.map(fuel => (
                  <option key={fuel.type} value={fuel.type} />
                ))}
              </datalist>
              <input
                type="number"
                value={source.capacity}
                onChange={(e) => handlePowerSourceChange(index, 'capacity', parseFloat(e.target.value))}
                placeholder="Capacity"
                className="px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                value={source.measurementUnit}
                onChange={(e) => handlePowerSourceChange(index, 'measurementUnit', e.target.value)}
                placeholder="Unit"
                className="px-4 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemovePowerSource(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPowerSource}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
          >
            Add Power Source
          </button>
        </div>

        {/* Решта форми */}
        {/* ... */}
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