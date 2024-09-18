// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
// import { Email, Lock } from '@mui/icons-material'; 

// const CustomerLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showNotification, setShowNotification] = useState(false);
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
//       const response = await axios.post('http://localhost:7777/loginCustomer', formData);
      
//       localStorage.setItem('email', formData.email);
      
//       setSuccess('Login successful! Start to purchase');
//       setShowNotification(true);
//       setTimeout(() => {
//         navigate('/customerview'); 
//       }, 2000); 
//     } catch (error) {
//       const errorMessage = error.response?.data || 'An error occurred';
//       setError(errorMessage);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex flex-col md:flex-row max-w-4xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
//         <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
//           <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
//           {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//           {showNotification && (
//             <div className="w-full max-w-sm p-2 mb-4 bg-green-200 text-green-800 border border-green-300 rounded">
//               {success}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="w-full max-w-sm">
//             <div className="mb-4 flex items-center border border-gray-300 rounded">
//               <Email className="ml-2 text-gray-600" />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border-0 rounded-r focus:outline-none"
//                 placeholder="Email"
//                 required
//               />
//             </div>
//             <div className="mb-4 flex items-center border border-gray-300 rounded">
//               <Lock className="ml-2 text-gray-600" />
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-2 border-0 rounded-r focus:outline-none"
//                 placeholder="Password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//         <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
//           <img
//             src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo=" // Replace with your desired image URL
//             alt="Login"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerLogin;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Email, Lock } from '@mui/icons-material'; 

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate(); 

  const validateForm = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address. Must contain @ symbol.';
    }

    if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character.';
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

    setErrors({}); 
    setSuccess('');
    
    try {
      const response = await axios.post('http://localhost:7777/loginCustomer', formData);
      
      sessionStorage.setItem('email', formData.email);
      
      setSuccess('Login successful! Start to purchase');
      setShowNotification(true);
      setTimeout(() => {
        navigate('/customerview'); 
      }, 2000); 
    } catch (error) {
      const errorMessage = error.response?.data || 'An error occurred';
      setErrors({ general: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          {errors.general && <p className="text-red-500 mb-4 text-center">{errors.general}</p>}
          {showNotification && (
            <div className="w-full max-w-sm p-2 mb-4 bg-green-200 text-green-800 border border-green-300 rounded">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
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
            
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <img
            src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo=" // Replace with your desired image URL
            alt="Login"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
