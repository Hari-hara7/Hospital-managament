// src/components/PatientCard.tsx
import React from 'react';

interface PatientCardProps {
  name: string;
  age: number;
  disease: string;
  address: string;
  contact: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ name, age, disease, address, contact }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p>Age: {age}</p>
      <p>Disease: {disease}</p>
      <p>Address: {address}</p>
      <p>Contact: {contact}</p>
    </div>
  );
};

export default PatientCard;
