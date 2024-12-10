// PowerSourceForm.tsx

import React from 'react';

interface PowerSourceData {
  type: string;
  capacity: number;
  unit: string;
}

interface PowerSourceFormProps {
  powerSources: PowerSourceData[];
  predefinedFuelTypes: { type: string; unit: string }[];
  handlePowerSourceChange: (index: number, field: keyof PowerSourceData, value: string | number) => void;
  handleAddPowerSource: () => void;
  handleRemovePowerSource: (index: number) => void;
}

const PowerSourceForm: React.FC<PowerSourceFormProps> = ({
  powerSources,
  predefinedFuelTypes,
  handlePowerSourceChange,
  handleAddPowerSource,
  handleRemovePowerSource,
}) => (
  <div>
    <h3 className="text-lg font-semibold">Power Sources:</h3>
    {powerSources.map((source, index) => (
      <div key={index} className="flex gap-2 items-center">
        <input
          type="text"
          list={`fuelTypes-${index}`}
          value={source.type}
          onChange={(e) => handlePowerSourceChange(index, 'type', e.target.value)}
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
          // value={source.capacity}
          onChange={(e) => handlePowerSourceChange(index, 'capacity', parseFloat(e.target.value))}
          placeholder="Capacity"
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          value={source.unit}
          onChange={(e) => handlePowerSourceChange(index, 'unit', e.target.value)}
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
);

export default PowerSourceForm;