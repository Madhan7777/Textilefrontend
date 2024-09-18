import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function CustomerHeader({ cartItemCount }) {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    
    sessionStorage.removeItem('email');

    
    navigate('/'); 
  };
  return (
    <nav className="bg-slate-100 shadow-md text-gray-800 py-4 relative z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-3xl font-bold text-red-500 hover:text-red-500 transition duration-300">
            Modern Loom
          </Link>
          <div className="hidden md:flex items-center space-x-6">
          <Link to="/customerregister" className="text-gray-600 hover:text-red-500 transition duration-300">Create Account</Link>

            <Link to="/customerview" className="text-gray-600 hover:text-red-500 transition duration-300">Shop</Link>
            <Link to="/customertracking" className="text-gray-600 hover:text-red-500 transition duration-300">Order Status</Link>
            <Link to="/summary" className="text-gray-600 hover:text-red-500 transition duration-300">Summary</Link>

            <Link to="/aboutus" className="text-gray-600 hover:text-red-500 transition duration-300">About Us</Link>
            <Link to="/contactus" className="text-gray-600 hover:text-red-500 transition duration-300">Contact Us</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link to="/cartpage" className="flex items-center text-gray-600 hover:text-red-500 transition duration-300">
              <FaShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 transform -translate-x-1/2 translate-y-1/2">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <Link to="/" className="text-gray-600 hover:text-red-500 transition duration-300">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default CustomerHeader;
