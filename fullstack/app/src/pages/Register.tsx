import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleRegister = async () => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", user.user.uid), { email, role });
    alert("Registered Successfully");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">Register</h1>
      <input className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <select className="input" onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="admin">Admin</option>
      </select>
      <button className="btn" onClick={handleRegister}>Register</button>
    </div>
  );
}
