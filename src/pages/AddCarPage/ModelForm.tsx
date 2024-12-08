import React from 'react';
import 'tailwindcss/tailwind.css';

interface FormProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  }

  const ModelForm: React.FC<FormProps> = ({ formData, handleChange }) => (
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
    </>
  );

