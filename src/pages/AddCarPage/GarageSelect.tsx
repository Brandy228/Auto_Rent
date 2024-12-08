// GarageSelect.tsx

import React from 'react';
import { Garage } from '../../models/garage/Garage';

interface GarageSelectProps {
  garages: Garage[];
  selectedGarageIndex: number;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GarageSelect: React.FC<GarageSelectProps> = ({ garages, selectedGarageIndex, handleChange }) => (
  <select
    name="garageIndex"
    value={selectedGarageIndex}
    onChange={handleChange}
    className="px-4 py-2 border rounded-md w-full"
  >
    {garages.map((garage, index) => (
      <option key={index} value={index}>
        {garage.name} - Max Cars: {garage.getMaxCars()}
      </option>
    ))}
  </select>
);

export default GarageSelect;