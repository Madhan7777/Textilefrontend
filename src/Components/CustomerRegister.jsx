// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Person, Email, Phone, Lock, LockOpen } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

// const CustomerRegister = () => {
//   const [formData, setFormData] = useState({
//     customerName: '',
//     email: '',
//     phoneNo: '',
//     password: '',
//     reEnterPassword: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
    
//     try {
//       const response = await axios.post('http://localhost:7777/registerCustomer', formData);
//       setSuccess(response.data);
//       toast.success('Registration successful! Redirecting to login...');
//       setTimeout(() => {
//         navigate('/customerlogin');
//       }, 2000); 
//     } catch (error) {
//       setError(error.response?.data || 'An error occurred');
//       toast.error(error.response?.data || 'An error occurred');
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 border rounded-lg shadow-lg mt-10 bg-white">
//       <div className="w-full md:w-1/2 p-4">
//         <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>
//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 flex items-center border border-gray-300 rounded">
//             <Person className="ml-2 text-gray-600" />
//             <input
//               type="text"
//               id="customerName"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleChange}
//               className="w-full p-2 border-0 rounded-r focus:outline-none"
//               placeholder="Name"
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center border border-gray-300 rounded">
//             <Email className="ml-2 text-gray-600" />
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border-0 rounded-r focus:outline-none"
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center border border-gray-300 rounded">
//             <Phone className="ml-2 text-gray-600" />
//             <input
//               type="text"
//               id="phoneNo"
//               name="phoneNo"
//               value={formData.phoneNo}
//               onChange={handleChange}
//               className="w-full p-2 border-0 rounded-r focus:outline-none"
//               placeholder="Phone Number"
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center border border-gray-300 rounded">
//             <Lock className="ml-2 text-gray-600" />
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border-0 rounded-r focus:outline-none"
//               placeholder="Password"
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center border border-gray-300 rounded">
//             <LockOpen className="ml-2 text-gray-600" />
//             <input
//               type="password"
//               id="reEnterPassword"
//               name="reEnterPassword"
//               value={formData.reEnterPassword}
//               onChange={handleChange}
//               className="w-full p-2 border-0 rounded-r focus:outline-none"
//               placeholder="Re-enter Password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//           >
//             Register
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           <span className="text-gray-600">Already have an account? </span>
//           <a href="/customerlogin" className="text-blue-500 underline hover:text-blue-700">
//             Login here
//           </a>
//         </p>
//       </div>
//       <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
//         <img
//           src="https://st3.depositphotos.com/3765293/17384/i/450/depositphotos_173848246-stock-photo-christmas-shopping-gift-boxes-in.jpg/500x500" // Replace with your desired image URL
//           alt="Registration"
//           className="w-full h-full object-cover rounded-lg"
//         />
//       </div>
//       <ToastContainer /> 
//     </div>
//   );
// };

// export default CustomerRegister;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Person, Email, Phone, Lock, LockOpen } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNo: '',
    password: '',
    reEnterPassword: '',
  });

  const [errors, setErrors] = useState({
    customerName: '',
    email: '',
    phoneNo: '',
    password: '',
    reEnterPassword: '',
  });

  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.customerName)) {
      newErrors.customerName = 'Name must contain only alphabets and spaces.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!/^\d{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = 'Phone number must be exactly 10 digits.';
    }

    if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character.';
    }

    if (formData.password !== formData.reEnterPassword) {
      newErrors.reEnterPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    try {
      const response = await axios.post('http://localhost:7777/registerCustomer', formData);
      setSuccess(response.data);
      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/customerlogin');
      }, 2000); 
    } catch (error) {
      toast.error(error.response?.data || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 border rounded-lg shadow-lg mt-10 bg-white">
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>
        {errors.general && <p className="text-red-500 mb-4 text-center">{errors.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <Person className="ml-2 text-gray-600" />
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={`w-full p-2 border-0 rounded-r focus:outline-none ${errors.customerName ? 'border-red-500' : ''}`}
              placeholder="Name"
              required
            />
          </div>
          {errors.customerName && <p className="text-red-500 mb-4 text-center">{errors.customerName}</p>}
          
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <Email className="ml-2 text-gray-600" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border-0 rounded-r focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Email"
              required
            />
          </div>
          {errors.email && <p className="text-red-500 mb-4 text-center">{errors.email}</p>}
          
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <Phone className="ml-2 text-gray-600" />
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className={`w-full p-2 border-0 rounded-r focus:outline-none ${errors.phoneNo ? 'border-red-500' : ''}`}
              placeholder="Phone Number"
              required
            />
          </div>
          {errors.phoneNo && <p className="text-red-500 mb-4 text-center">{errors.phoneNo}</p>}
          
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <Lock className="ml-2 text-gray-600" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border-0 rounded-r focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Password"
              required
            />
          </div>
          {errors.password && <p className="text-red-500 mb-4 text-center">{errors.password}</p>}
          
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <LockOpen className="ml-2 text-gray-600" />
            <input
              type="password"
              id="reEnterPassword"
              name="reEnterPassword"
              value={formData.reEnterPassword}
              onChange={handleChange}
              className={`w-full p-2 border-0 rounded-r focus:outline-none ${errors.reEnterPassword ? 'border-red-500' : ''}`}
              placeholder="Re-enter Password"
              required
            />
          </div>
          {errors.reEnterPassword && <p className="text-red-500 mb-4 text-center">{errors.reEnterPassword}</p>}
          
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/customerlogin" className="text-blue-500 underline hover:text-blue-700">
            Login here
          </a>
        </p>
      </div>
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
        <img
          src="https://st3.depositphotos.com/3765293/17384/i/450/depositphotos_173848246-stock-photo-christmas-shopping-gift-boxes-in.jpg/500x500" // Replace with your desired image URL
          alt="Registration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default CustomerRegister;

