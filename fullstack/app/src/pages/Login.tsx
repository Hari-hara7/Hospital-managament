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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
            <MdEmail className="text-gray-500 mr-2" />
            <input
              type="email"
              className="w-full outline-none"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
            <MdLock className="text-gray-500 mr-2" />
            <input
              type="password"
              className="w-full outline-none"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
