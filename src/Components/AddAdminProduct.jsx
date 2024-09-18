import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaTag, FaTextHeight, FaWeight, FaDollarSign, FaList } from 'react-icons/fa';
import { MdColorLens, MdPattern, MdCategory } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import AdminHeader from './AdminHeader';

const AddAdminProduct = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    imageProduct: null,
    description: '',
    price: '',
    category: '',
    quantity: '',
    brand: '',
    material: '',
    color: '',
    pattern: '',
    size: '',
    gender: '',
    careInstructions: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const validateStep1 = () => {
    const { productName, imageProduct, description, price, category, quantity } = formData;
    const newErrors = {};
    if (!productName) newErrors.productName = 'Product Name is required';
    if (!imageProduct) newErrors.imageProduct = 'Product Image is required';
    if (!description) newErrors.description = 'Description is required';
    if (!price) newErrors.price = 'Price is required';
    if (!category) newErrors.category = 'Category is required';
    if (!quantity) newErrors.quantity = 'Quantity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const { brand, material, color, pattern, size, gender, careInstructions } = formData;
    const newErrors = {};
    if (!brand) newErrors.brand = 'Brand is required';
    if (!material) newErrors.material = 'Material is required';
    if (!color) newErrors.color = 'Color is required';
    if (!pattern) newErrors.pattern = 'Pattern is required';
    if (!size) newErrors.size = 'Size is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!careInstructions) newErrors.careInstructions = 'Care Instructions are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:7777/AdminProduct/insertSellerProduct', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product added successfully');
      navigate('/viewadminproduct');
    } catch (error) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* <AdminHeader/> */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className={`flex items-center ${step === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <AiOutlineCheck className="w-6 h-6" />
              <span className={`ml-2 ${step === 1 ? 'font-bold' : ''}`}>Step 1</span>
            </div>
            <div className={`flex items-center ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <AiOutlineCheck className="w-6 h-6" />
              <span className={`ml-2 ${step === 2 ? 'font-bold' : ''}`}>Step 2</span>
            </div>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div className={`absolute h-full bg-blue-600 rounded-full ${step === 1 ? 'w-1/2' : 'w-full'}`} />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
          {step === 1 ? 'Step 1: Product Details' : 'Step 2: Additional Details'}
        </h2>

        {step === 1 ? (
          <div>
            <div className="relative mb-6">
              <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
              <div className="relative">
                {/* <FaTag className="absolute inset-y-0 left-3 flex items-center text-gray-500" /> */}
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 p-2.5 w-full"
                />
              </div>
              {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="imageProduct" className="block mb-2 text-sm font-medium text-gray-900">Product Image</label>
              <input
                type="file"
                id="imageProduct"
                name="imageProduct"
                onChange={handleInputChange}
                className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2.5"
              />
              {errors.imageProduct && <p className="text-red-500 text-sm mt-1">{errors.imageProduct}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <div className="relative">
                {/* <FaTextHeight className="absolute inset-y-0 left-3 flex items-center text-gray-500" /> */}
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 p-2.5 w-full"
                />
              </div>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
              <div className="relative">
                {/* <FaDollarSign className="absolute inset-y-0 left-3 flex items-center text-gray-500" /> */}
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 p-2.5 w-full"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <div className="relative">
                {/* <MdCategory className="absolute inset-y-0 left-3 flex items-center text-gray-500" /> */}
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 p-2.5 w-full"
                />
              </div>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative mb-6">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
              <div className="relative">
                {/* <FaTag className="absolute inset-y-0 left-3 flex items-center text-gray-500" /> */}
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 p-2.5 w-full"
                />
              </div>
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="material" className="block mb-2 text-sm font-medium text-gray-900">Material</label>
              <input
                type="text"
                id="material"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                placeholder="Material"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
              />
              {errors.material && <p className="text-red-500 text-sm mt-1">{errors.material}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="Color"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="pattern" className="block mb-2 text-sm font-medium text-gray-900">Pattern</label>
              <input
                type="text"
                id="pattern"
                name="pattern"
                value={formData.pattern}
                onChange={handleInputChange}
                placeholder="Pattern"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
              />
              {errors.pattern && <p className="text-red-500 text-sm mt-1">{errors.pattern}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900">Size</label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="Size"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
              />
              {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                placeholder="Gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
              />
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div className="relative mb-6">
              <label htmlFor="careInstructions" className="block mb-2 text-sm font-medium text-gray-900">Care Instructions</label>
              <input
                type="text"
                id="careInstructions"
                name="careInstructions"
                value={formData.careInstructions}
                onChange={handleInputChange}
                placeholder="Care Instructions"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
              />
              {errors.careInstructions && <p className="text-red-500 text-sm mt-1">{errors.careInstructions}</p>}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default AddAdminProduct;
