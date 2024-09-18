import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProductRequest = () => {
  const [adminProducts, setAdminProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    adminProductId: "",
    supplierId: "", 
    requestedQuantity: "",
    suppliedQuantity: "",
    requestDate: "",
    responseDate: "",
    status: "",
    comments: ""
  });
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7777/AdminProduct/findAllProduct");
        setAdminProducts(response.data);
      } catch (err) {
        setError("Failed to load admin products.");
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("/api/suppliers"); 
        setSuppliers(response.data);
      } catch (err) {
        setError("Failed to load suppliers.");
      }
    };

    fetchAdminProducts();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (suppliers.length > 0) {
      setFormData(prevData => ({
        ...prevData,
        supplierId: suppliers[0].id 
      }));
    }
  }, [suppliers]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/product-request/create", formData);
      toast.success("Product request created successfully");
      setFormData({
        adminProductId: "",
        supplierId: suppliers.length > 0 ? suppliers[0].id : "", 
        requestedQuantity: "",
        suppliedQuantity: "",
        requestDate: "",
        responseDate: "",
        status: "",
        comments: ""
      });
    } catch (err) {
      toast.error("Creation Failure: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Product Request</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Admin Product Dropdown */}
          <div className="mb-4">
            <label htmlFor="adminProductId" className="block text-gray-700 font-medium mb-2">Admin Product</label>
            <select
              id="adminProductId"
              name="adminProductId"
              value={formData.adminProductId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Admin Product</option>
              {adminProducts.map((product) => (
                <option key={product.productId} value={product.productId}>{product.productName}</option>
              ))}
            </select>
          </div>

          {/* Supplier ID (Read-only) */}
          <div className="mb-4">
            <label htmlFor="supplierId" className="block text-gray-700 font-medium mb-2">Supplier ID</label>
            <input
              type="text"
              id="supplierId"
              name="supplierId"
              value={formData.supplierId}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>

          {/* Requested Quantity */}
          <div className="mb-4">
            <label htmlFor="requestedQuantity" className="block text-gray-700 font-medium mb-2">Requested Quantity</label>
            <input
              type="number"
              id="requestedQuantity"
              name="requestedQuantity"
              value={formData.requestedQuantity}
              onChange={handleChange}
              placeholder="Requested Quantity"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Supplied Quantity */}
          <div className="mb-4">
            <label htmlFor="suppliedQuantity" className="block text-gray-700 font-medium mb-2">Supplied Quantity</label>
            <input
              type="number"
              id="suppliedQuantity"
              name="suppliedQuantity"
              value={formData.suppliedQuantity}
              onChange={handleChange}
              placeholder="Supplied Quantity (optional)"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Request Date */}
          <div className="mb-4">
            <label htmlFor="requestDate" className="block text-gray-700 font-medium mb-2">Request Date</label>
            <input
              type="date"
              id="requestDate"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Response Date */}
          <div className="mb-4">
            <label htmlFor="responseDate" className="block text-gray-700 font-medium mb-2">Response Date</label>
            <input
              type="date"
              id="responseDate"
              name="responseDate"
              value={formData.responseDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Status"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Comments */}
          <div className="mb-4">
            <label htmlFor="comments" className="block text-gray-700 font-medium mb-2">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Additional comments (optional)"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Request
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProductRequest;
