import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./patient-dashboard.css";

const PatientDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    const fetchDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        const userEmail = user.email;  
        const q = query(
          collection(db, "patients"),
          where("email", "==", userEmail)  
        );

        try {
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const patientData = querySnapshot.docs[0].data(); 
            setData(patientData);
          } else {
            setData(null);
          }
        } catch (error) {
          console.error("Error fetching patient data: ", error);
          setError("There was an error fetching your medical details.");
        }

        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;  

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Medical Details</h1>
      {data ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Age:</strong> {data.age}</p>
          <p><strong>Diagnosis:</strong> {data.diagnosis}</p>
          <p><strong>Doctor:</strong> {data.doctor}</p>
          <p><strong>Treatment Plan:</strong> {data.treatment}</p>
        </div>
      ) : (
        <p>No details found. Please contact admin.</p>
      )}
    </div>
  );
};

export default PatientDashboard;
