// src/pages/AddPatient.tsx
import React, { useState } from 'react';
import api from '../services/api'; // Ensure this is the correct API instance

const AddPatient: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Make the API request to add a new patient
      await api.post('/patients', { name, age, diagnosis });
      // You could add a success message or redirect the user to another page here
    } catch (error: any) {
      // Handle errors if the request fails
      setError(error.response?.data?.message || 'Error adding patient');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleAddPatient} className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Patient</h2>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
