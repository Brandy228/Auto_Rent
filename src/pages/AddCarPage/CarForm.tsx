// CarForm.tsx

import React from 'react';

interface CarFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CarForm: React.FC<CarFormProps> = ({ formData, handleChange }) => (
  <>
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
      onChange={handleChange}
      placeholder="Manufacture year"
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
      <option value="Automatic">Automatic</option>
      <option value="Mechanical">Mechanical</option>
      <option value="Variator">Variator</option>
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
  </>
);

export default CarForm;