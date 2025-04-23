import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Patient {
  id: string;
  name: string;
  details: string;
}

export default function PatientView() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPatientData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const q = query(
        collection(db, "patients"),
        where("uid", "==", user.uid) 
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Patient[];

      if (data.length > 0) {
        setPatient(data[0]); 
      } else {
        alert("No patient data found for this user.");
      }
    } else {
      alert("User not authenticated");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!patient) return <p>No patient data available</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Details</h1>
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Patient Info</h2>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Details:</strong> {patient.details}</p>
      </div>
    </div>
  );
}
