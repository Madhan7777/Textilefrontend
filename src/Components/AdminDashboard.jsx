import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

const AdminDashboard = () => {
  const [data, setData] = useState({
    productGrowth: [],
    highestSoldProducts: [],
    orderSummary: {}, // Initialize as an empty object
    activeUsers: [],
    inventoryStocks: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard data
        const [dashboardResponse, orderSummaryResponse] = await Promise.all([
          axios.get('http://localhost:7777/api/dashboard'),
          axios.get('http://localhost:7777/api/orders/summary') // Fetch order summary
        ]);

        // Set the state with fetched data
        setData({
          ...dashboardResponse.data,
          orderSummary: orderSummaryResponse.data
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // Data for Product Growth Bar Chart
  const productGrowthData = {
    labels: data.productGrowth.map(item => item.date),
    datasets: [
      {
        label: 'Product Growth',
        data: data.productGrowth.map(item => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Highest Sold Products Pie Chart
  const highestSoldProductsData = {
    labels: data.highestSoldProducts.map(item => item.productName),
    datasets: [
      {
        data: data.highestSoldProducts.map(item => item.quantity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Data for Order Summary Bar Chart
  const orderSummaryData = {
    labels: Object.keys(data.orderSummary),
    datasets: [
      {
        label: 'Orders per Date',
        data: Object.values(data.orderSummary),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex flex-wrap gap-8">
        <div className="w-full lg:w-1/2 xl:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Product Growth</h2>
            <Bar data={productGrowthData} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Highest Sold Products</h2>
            <Pie data={highestSoldProductsData} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Orders Summary</h2>
            <Bar data={orderSummaryData} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Active Users</h2>
            {/* Add chart or table for active users */}
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Inventory Stocks</h2>
            {/* Add chart or table for inventory stocks */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
