import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const hardcodedUsername = "admin";
  const hardcodedPassword = "Admin@123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === hardcodedUsername && password === hardcodedPassword) {
      toast.success("Login successful");
      navigate("/adminnavbar");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <img
          src="https://media.istockphoto.com/id/1226883131/photo/human-figure-icon-graphic-as-user-login-button-on-white-keyboard.jpg?s=612x612&w=0&k=20&c=CyN-29ujoJF-GkPcaF3wtLkX_oSr0lUfbXnC9Xw0hfk="
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full rounded-lg opacity-30"
        />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaUserAlt className="ml-3 text-gray-500" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="mt-1 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-6 flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaLock className="ml-3 text-gray-500" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-1 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
