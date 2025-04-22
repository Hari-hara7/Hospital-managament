import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FaUserPlus, FaUserInjured } from "react-icons/fa";
import "./admin-dashboard.css";

interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  doctor: string;
  treatment: string;
  email: string;
}

export default function AdminDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [diagnosis, setDiagnosis] = useState("");
  const [doctor, setDoctor] = useState("");
  const [treatment, setTreatment] = useState("");
  const [email, setEmail] = useState("");

  const fetchPatients = async () => {
    const querySnapshot = await getDocs(collection(db, "patients"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Patient[];
    setPatients(data);
  };

  const handleAddPatient = async () => {
    if (!name || !age || !diagnosis || !doctor || !treatment || !email) {
      return alert("Please fill in all fields!");
    }

    await addDoc(collection(db, "patients"), {
      name,
      age,
      diagnosis,
      doctor,
      treatment,
      email,
    });

    setName("");
    setAge("");
    setDiagnosis("");
    setDoctor("");
    setTreatment("");
    setEmail("");
    fetchPatients();
    alert("Patient data uploaded successfully!");
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Add Patient Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUserPlus className="text-blue-600" /> Add Patient
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            placeholder="Patient Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Doctor's Name"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <textarea
            placeholder="Treatment Plan"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className="border border-gray-300 p-2 rounded col-span-1 md:col-span-2"
          />
          <input
            type="email"
            placeholder="Patient Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddPatient}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Patient
        </button>
      </div>

      {/* Patient List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUserInjured className="text-blue-600" /> All Patients
        </h2>
        {patients.length === 0 ? (
          <p className="text-gray-500">No patients found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <li key={patient.id} className="py-4">
                <p><span className="font-semibold">Name:</span> {patient.name}</p>
                <p><span className="font-semibold">Age:</span> {patient.age}</p>
                <p><span className="font-semibold">Diagnosis:</span> {patient.diagnosis}</p>
                <p><span className="font-semibold">Doctor:</span> {patient.doctor}</p>
                <p><span className="font-semibold">Treatment Plan:</span> {patient.treatment}</p>
                <p><span className="font-semibold">Email:</span> {patient.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
