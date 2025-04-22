// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">Hospital Management</Link>
      <div>
        {token ? (
          <>
            <Link to="/dashboard" className="text-white mx-2">Dashboard</Link>
            <button onClick={logout} className="text-white mx-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white mx-2">Login</Link>
            <Link to="/register" className="text-white mx-2">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
