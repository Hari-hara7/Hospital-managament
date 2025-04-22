import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", user.user.uid);
      const userData = await getDoc(docRef);
      const role = userData.data()?.role;

      navigate(role === "admin" ? "/admin" : "/patient");
    } catch (error) {
      alert("Login failed. Check credentials and try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text bg-white">
              <MdEmail />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text bg-white">
              <MdLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
