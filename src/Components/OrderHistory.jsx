// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, Alert } from '@mui/material';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:7777/api/orders/all');
//         setOrders(response.data);
//       } catch (err) {
//         setError('Failed to fetch orders');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <Typography variant="h4" className="font-bold mb-4 text-center text-gray-800">Order History</Typography>

//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen">
//           <CircularProgress />
//         </div>
//       ) : error ? (
//         <Snackbar open={true} autoHideDuration={6000}>
//           <Alert severity="error">{error}</Alert>
//         </Snackbar>
//       ) : (
//         <TableContainer component={Paper} className="shadow-lg rounded-lg">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Order ID</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Customer Name</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Email</TableCell>
//                 {/* <TableCell className="bg-gray-200 text-gray-600 font-semibold">Product</TableCell> */}
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Order Date</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Contact Number</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Payment Info</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {orders.map((order) => (
//                 <TableRow key={order.orderId}>
//                   <TableCell className="border px-4 py-2">{order.orderId}</TableCell>
//                   <TableCell className="border px-4 py-2">{order.userName}</TableCell>
//                   <TableCell className="border px-4 py-2">{order.email}</TableCell>
//                   {/* <TableCell className="border px-4 py-2">{order.adminProduct ? order.adminProduct.productName : 'N/A'}</TableCell> */}
//                   <TableCell className="border px-4 py-2">{order.orderDate}</TableCell>
//                   <TableCell className="border px-4 py-2">{order.contactNumber}</TableCell>
//                   <TableCell className="border px-4 py-2">
//                     Card: {order.cardNum ? '**** **** **** ' + order.cardNum.toString().slice(-4) : 'N/A'}
//                     <br />
//                     Exp: {order.expMonth}/{order.expYear}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import AdminHeader from './AdminHeader';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:7777/api/orders/all');
//         setOrders(response.data);

//         const orderIds = response.data.map(order => order.orderId);
//         sessionStorage.setItem('orderIds', JSON.stringify(orderIds));
//       } catch (err) {
//         setError('Failed to fetch orders');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleRowClick = (orderId) => {
//     sessionStorage.setItem('selectedOrderId', orderId);
//     window.location.href = '/viewtracking'; 
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <AdminHeader />
//       <Typography variant="h4" className="font-bold mb-4 px-4 py-4 text-center text-gray-800">Order History</Typography>

//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen">
//           <CircularProgress />
//         </div>
//       ) : error ? (
//         <Snackbar open={true} autoHideDuration={6000}>
//           <Alert severity="error">{error}</Alert>
//         </Snackbar>
//       ) : (
//         <TableContainer component={Paper} className="shadow-md rounded-lg overflow-x-auto">
//           <Table className="w-full text-sm text-gray-500">
//             <TableHead>
//               <TableRow className="bg-gray-200 text-gray-600 font-semibold uppercase text-xs">
//                 <TableCell className="px-6 py-3">Order ID</TableCell>
//                 <TableCell className="px-6 py-3">Customer Name</TableCell>
//                 <TableCell className="px-6 py-3">Email</TableCell>
//                 <TableCell className="px-6 py-3">Order Date</TableCell>
//                 <TableCell className="px-6 py-3">Contact Number</TableCell>
//                 <TableCell className="px-6 py-3">Payment Info</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {orders.map((order) => (
//                 <TableRow
//                   key={order.orderId}
//                   onClick={() => handleRowClick(order.orderId)}
//                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   <TableCell className="border px-4 py-2">{order.orderId}</TableCell>
//                   <TableCell className="border px-4 py-2">{order.userName}</TableCell>
//                   <TableCell className="border px-4 py-2">{order.email}</TableCell>
//                   <TableCell className="border px-4 py-2">{order.orderDate}</TableCell>
//                   <TableCell className="border px-4 py-2">{order.contactNumber}</TableCell>
//                   <TableCell className="border px-4 py-2">
//                     Card: {order.cardNum ? '**** **** **** ' + order.cardNum.toString().slice(-4) : 'N/A'}
//                     <br />
//                     Exp: {order.expMonth}/{order.expYear}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import AdminHeader from './AdminHeader';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:7777/api/orders/all');
        setOrders(response.data);

        const orderIds = response.data.map(order => order.orderId);
        sessionStorage.setItem('orderIds', JSON.stringify(orderIds));
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (orderId) => {
    sessionStorage.setItem('selectedOrderId', orderId);
    window.location.href = '/viewtracking'; 
  };

  // Process data for charts
  const totalUsers = orders.length;
  const userPurchases = orders.reduce((acc, order) => {
    acc[order.userName] = (acc[order.userName] || 0) + 1;
    return acc;
  }, {});
  const peakDate = orders.reduce((acc, order) => {
    acc[order.orderDate] = (acc[order.orderDate] || 0) + 1;
    return acc;
  }, {});

  const userNames = Object.keys(userPurchases);
  const purchases = Object.values(userPurchases);

  const peakDates = Object.keys(peakDate);
  const orderCounts = Object.values(peakDate);

  const dataUserPurchases = {
    labels: userNames,
    datasets: [{
      label: 'Number of Purchases per User',
      data: purchases,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const dataPeakDate = {
    labels: peakDates,
    datasets: [{
      label: 'Orders Per Date',
      data: orderCounts,
      fill: false,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      tension: 0.1,
    }],
  };

  return (
    <div className="min-h-screen">
      <AdminHeader />
    <div className="min-h-screen p-8 bg-gray-50">
      <Typography variant="h4" className="font-bold mb-4 px-4 py-4 text-center text-gray-800">Order History</Typography>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <CircularProgress />
        </div>
      ) : error ? (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <Typography variant="h6" className="font-bold mb-4">Total Purchases by Users</Typography>
              <Bar data={dataUserPurchases} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <Typography variant="h6" className="font-bold mb-4">Order Peak Date</Typography>
              <Line data={dataPeakDate} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>
          </div>

          <TableContainer component={Paper} className="shadow-md rounded-lg overflow-x-auto mt-8">
            <Table className="w-full text-sm text-gray-500">
              <TableHead>
                <TableRow className="bg-gray-200 text-gray-600 font-semibold uppercase text-xs">
                  <TableCell className="px-6 py-3">Order ID</TableCell>
                  <TableCell className="px-6 py-3">Customer Name</TableCell>
                  <TableCell className="px-6 py-3">Email</TableCell>
                  <TableCell className="px-6 py-3">Order Date</TableCell>
                  <TableCell className="px-6 py-3">Contact Number</TableCell>
                  <TableCell className="px-6 py-3">Payment Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.orderId}
                    onClick={() => handleRowClick(order.orderId)}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <TableCell className="border px-4 py-2">{order.orderId}</TableCell>
                    <TableCell className="border px-4 py-2">{order.userName}</TableCell>
                    <TableCell className="border px-4 py-2">{order.email}</TableCell>
                    <TableCell className="border px-4 py-2">{order.orderDate}</TableCell>
                    <TableCell className="border px-4 py-2">{order.contactNumber}</TableCell>
                    <TableCell className="border px-4 py-2">
                      Card: {order.cardNum ? '**** **** **** ' + order.cardNum.toString().slice(-4) : 'N/A'}
                      <br />
                      Exp: {order.expMonth}/{order.expYear}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
    </div>
  );
};

export default OrderHistory;
