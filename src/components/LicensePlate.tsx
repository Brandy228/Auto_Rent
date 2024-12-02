// LicensePlate.tsx
import React from 'react';
import 'tailwindcss/tailwind.css';

interface LicensePlateProps {
  plateNumber: string;
}

const LicensePlate: React.FC<LicensePlateProps> = ({ plateNumber }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      width="200"
      height="40"
      className="license-plate"
    >
      <rect width="140" height="40" fill="#FFFFFF" stroke="#000000" rx="5" ry="5" />
      <text
        x="10"
        y="25"
        fontSize="20"
        fontWeight="bold"
        fill="#000000"
        style={{ letterSpacing: '2px' }}
      >
        {plateNumber}
      </text>
    </svg>
  );
};

export default LicensePlate;
