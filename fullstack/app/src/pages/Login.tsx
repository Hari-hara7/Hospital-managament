import "./login.css";
import { MdEmail, MdLock } from "react-icons/md";
import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>

        <label>Email</label>
        <div className="input-group">
          <MdEmail style={{ marginRight: "8px" }} />
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label>Password</label>
        <div className="input-group">
          <MdLock style={{ marginRight: "8px" }} />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <Link to="/register" className="signup-link">
  Don't have an account? Sign up here
</Link>

      </div>
    </div>
  );
}
