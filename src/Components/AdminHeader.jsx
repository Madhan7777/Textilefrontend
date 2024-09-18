import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <nav className="w-full bg-gray-100 text-black py-4">
    <div className="container mx-auto px-1 py-1 flex items-center justify-between">
      <Link to="/" className="text-3xl font-serif">
        Modern Loom
      </Link>
      <div className="flex space-x-4">
      <Link to="/adminnavbar" className="hover:text-orange-400">Home</Link>
        <Link to="/addproduct" className="hover:text-orange-400">Add Stock</Link>
        <Link to="/viewadminproduct" className="hover:text-orange-400">View Stock</Link>
        <Link to="/orderhistory" className="hover:text-orange-400">Order History</Link>
        {/* <Link to="/allorder" className="hover:text-orange-400">order Dashboard</Link> */}
        <Link to="/addtracking" className="hover:text-orange-400">Manage Order Tracking</Link>
        <Link to="/viewtracking" className="hover:text-orange-400">View Order Tracking</Link>
        <Link to="/" className="hover:text-orange-400">Logout</Link>

      </div>
    </div>
    </nav>
  );
};

export default AdminHeader;
