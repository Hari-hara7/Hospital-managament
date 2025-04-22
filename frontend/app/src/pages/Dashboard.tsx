// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'; // API service to interact with the backend

interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
}

const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/patients'); // Assuming this API returns a list of patients
        setPatients(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Error fetching patient data');
      }
    };

    fetchPatients();
  }, []);

  // Function to handle deleting a patient
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/patients/${id}`);
      setPatients(patients.filter((patient) => patient.id !== id)); // Remove the deleted patient from the state
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error deleting patient');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Link to Add a new patient */}
      <Link to="/add-patient">
        <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
          Add New Patient
        </button>
      </Link>

      {/* Patients Table */}
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Age</th>
            <th className="px-4 py-2 text-left">Diagnosis</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">{patient.diagnosis}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/patient/${patient.id}`}
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center px-4 py-2">
                No patients available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
