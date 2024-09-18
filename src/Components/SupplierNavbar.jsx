import React from "react";
import { Link } from "react-router-dom";

const SupplierNavbar = () => {
  return (
    <nav className="bg-gray-100 text-black py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Supplier
        </Link>
        <div className="flex space-x-4">
        <Link to="/adminnavbar" className="hover:text-orange-400">Home</Link>
          <Link to="/viewrequest" className="hover:text-orange-400">View Request</Link>
          <Link to="/createrequest" className="hover:text-orange-400">send Request</Link>
          <Link to="/" className="hover:text-orange-400">Logout</Link>

        </div>
      </div>
    </nav>
  );
};

export default SupplierNavbar;
