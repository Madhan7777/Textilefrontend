// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, Alert, Button, TextField } from '@mui/material';

// const ViewOrderTracking = () => {
//     const [orderTrackings, setOrderTrackings] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [editing, setEditing] = useState(null);
//     const [form, setForm] = useState({
//         trackingId: '',
//         orderId: '',
//         trackingNumber: '',
//         carrier: '',
//         status: '',
//         estimatedDeliveryDate: '',
//         lastUpdatedDate: '',
//         currentLocation: ''
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [orderTrackingResponse, orderResponse] = await Promise.all([
//                     axios.get('http://localhost:7777/orderTracking/all'),
//                     axios.get('http://localhost:7777/api/orders/all')
//                 ]);
//                 setOrderTrackings(orderTrackingResponse.data);
//                 setOrders(orderResponse.data);
//             } catch (err) {
//                 setError('Failed to fetch data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleEdit = (tracking) => {
//         setForm(tracking);
//         setEditing(tracking.trackingId);
//     };

//     const handleSave = () => {
//         axios.put('http://localhost:7777/orderTracking/update', form)
//             .then(() => {
//                 setOrderTrackings(orderTrackings.map(item => item.trackingId === form.trackingId ? form : item));
//                 setEditing(null);
//                 setForm({
//                     trackingId: '',
//                     orderId: '',
//                     trackingNumber: '',
//                     carrier: '',
//                     status: '',
//                     estimatedDeliveryDate: '',
//                     lastUpdatedDate: '',
//                     currentLocation: ''
//                 });
//             })
//             .catch(error => console.error('Error updating order tracking:', error));
//     };

//     const handleDelete = (trackingId) => {
//         axios.delete(`http://localhost:7777/orderTracking/delete/${trackingId}`)
//             .then(() => setOrderTrackings(orderTrackings.filter(item => item.trackingId !== trackingId)))
//             .catch(error => console.error('Error deleting order tracking:', error));
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <CircularProgress />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <Snackbar open={true} autoHideDuration={6000}>
//                 <Alert severity="error">{error}</Alert>
//             </Snackbar>
//         );
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <Typography variant="h4" className="font-bold mb-6 text-center text-gray-800">Order Tracking</Typography>
//             <TableContainer component={Paper} className="shadow-lg rounded-lg">
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell className="bg-gray-200 text-gray-600 font-semibold">Order ID</TableCell>
//                             <TableCell className="bg-gray-200 text-gray-600 font-semibold">Tracking Number</TableCell>
//                             <TableCell className="bg-gray-200 text-gray-600 font-semibold">Carrier</TableCell>
//                             <TableCell className="bg-gray-200 text-gray-600 font-semibold">Status</TableCell>
//                             <TableCell className="bg-gray-200 text-gray-600 font-semibold">Estimated Delivery Date</TableCell>
//                             <TableCell className="bg-gray-200 text-gray-600 font-semibold">Last Updated Date</TableCell>
//                             <TableCell className="bg-gray-200 text-gray-600 font-semibold">Current Location</TableCell>
//                             <TableCell className="bg-gray-200 text-gray-600 font-semibold">Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {orderTrackings.map((tracking) => (
//                             <TableRow key={tracking.trackingId}>
//                                 <TableCell className="border px-4 py-2">
//                                     {orders.find(order => order.orderId === tracking.orderId)?.orderId || 'N/A'}
//                                 </TableCell>
//                                 <TableCell className="border px-4 py-2">{tracking.trackingNumber}</TableCell>
//                                 <TableCell className="border px-4 py-2">{tracking.carrier}</TableCell>
//                                 <TableCell className="border px-4 py-2">{tracking.status}</TableCell>
//                                 <TableCell className="border px-4 py-2">{tracking.estimatedDeliveryDate}</TableCell>
//                                 <TableCell className="border px-4 py-2">{tracking.lastUpdatedDate}</TableCell>
//                                 <TableCell className="border px-4 py-2">{tracking.currentLocation}</TableCell>
//                                 <TableCell className="border px-4 py-2 flex space-x-2">
//                                     <Button
//                                         onClick={() => handleEdit(tracking)}
//                                         variant="contained"
//                                         color="primary"
//                                     >
//                                         Edit
//                                     </Button>
//                                     <Button
//                                         onClick={() => handleDelete(tracking.trackingId)}
//                                         variant="contained"
//                                         color="secondary"
//                                     >
//                                         Delete
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {editing && (
//                 <div className="mt-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
//                     <Typography variant="h6" className="font-bold mb-4">Edit Order Tracking</Typography>
//                     <TextField
//                         name="orderId"
//                         value={form.orderId}
//                         label="Order ID"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                         disabled
//                     />
//                     <TextField
//                         name="trackingNumber"
//                         value={form.trackingNumber}
//                         onChange={handleChange}
//                         label="Tracking Number"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         name="carrier"
//                         value={form.carrier}
//                         onChange={handleChange}
//                         label="Carrier"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         name="status"
//                         value={form.status}
//                         onChange={handleChange}
//                         label="Status"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         name="estimatedDeliveryDate"
//                         value={form.estimatedDeliveryDate}
//                         onChange={handleChange}
//                         label="Estimated Delivery Date"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         name="lastUpdatedDate"
//                         value={form.lastUpdatedDate}
//                         onChange={handleChange}
//                         label="Last Updated Date"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         name="currentLocation"
//                         value={form.currentLocation}
//                         onChange={handleChange}
//                         label="Current Location"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <div className="flex justify-end mt-4">
//                         <Button
//                             onClick={handleSave}
//                             variant="contained"
//                             color="success"
//                         >
//                             Save
//                         </Button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewOrderTracking;


import React, { useState, useEffect } from 'react';
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
  Alert,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import AdminHeader from './AdminHeader';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ViewOrderTracking = () => {
  const [orderTrackings, setOrderTrackings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    trackingId: '',
    trackingNumber: '',
    carrier: '',
    status: '',
    estimatedDeliveryDate: '',
    lastUpdatedDate: '',
    currentLocation: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carriers = ['FedEx', 'UPS', 'DHL', 'USPS', 'Amazon Logistics', 'Blue Dart', 'DTDC', 'TNT', 'Royal Mail', 'Aramex'];
  const statuses = ['Ordered', 'Shipped', 'Delivered', 'Not Delivered'];
  const locations = [
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Coimbatore', value: 'Coimbatore' },
    { label: 'Madurai', value: 'Madurai' },
    { label: 'Salem', value: 'Salem' },

  ];

  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderTrackingResponse, orderResponse] = await Promise.all([
          axios.get('http://localhost:7777/orderTracking/all'),
          axios.get('http://localhost:7777/api/orders/all')
        ]);
        setOrderTrackings(orderTrackingResponse.data);
        setOrders(orderResponse.data);

        const storedOrderId = sessionStorage.getItem('selectedOrderId');
        if (storedOrderId) {
          const selectedTracking = orderTrackingResponse.data.find(tracking => tracking.orderId === storedOrderId);
          if (selectedTracking) {
            setForm(selectedTracking);
            setEditing(selectedTracking.trackingId);
          }
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (tracking) => {
    setForm(tracking);
    setEditing(tracking.trackingId);
  };

  const handleSave = () => {
    axios.put('http://localhost:7777/orderTracking/update', form)
      .then(() => {
        setOrderTrackings(orderTrackings.map(item => item.trackingId === form.trackingId ? form : item));
        setEditing(null);
        setForm({
          trackingId: '',
          trackingNumber: '',
          carrier: '',
          status: '',
          estimatedDeliveryDate: '',
          lastUpdatedDate: '',
          currentLocation: ''
        });
      })
      .catch(error => console.error('Error updating order tracking:', error));
  };

  const handleDelete = (trackingId) => {
    axios.delete(`http://localhost:7777/orderTracking/delete/${trackingId}`)
      .then(() => setOrderTrackings(orderTrackings.filter(item => item.trackingId !== trackingId)))
      .catch(error => console.error('Error deleting order tracking:', error));
  };

  const carrierStatusCounts = carriers.reduce((acc, carrier) => {
    acc[carrier] = orderTrackings.filter(tracking => tracking.carrier === carrier).reduce((statusAcc, tracking) => {
      statusAcc[tracking.status] = (statusAcc[tracking.status] || 0) + 1;
      return statusAcc;
    }, {});
    return acc;
  }, {});

  const locationsCounts = locations.reduce((acc, location) => {
    acc[location.label] = orderTrackings.filter(tracking => tracking.currentLocation === location.value).length;
    return acc;
  }, {});

  const statusCounts = statuses.reduce((acc, status) => {
    acc[status] = orderTrackings.filter(tracking => tracking.status === status).length;
    return acc;
  }, {});

  const dataCarrierStatus = {
    labels: Object.keys(carrierStatusCounts),
    datasets: Object.keys(carrierStatusCounts).map(carrier => ({
      label: carrier,
      data: Object.values(carrierStatusCounts[carrier]),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }))
  };

  const dataLocationDistribution = {
    labels: Object.keys(locationsCounts),
    datasets: [{
      data: Object.values(locationsCounts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1
    }]
  };

  const dataStatusDistribution = {
    labels: Object.keys(statusCounts),
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1
    }]
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-red-500">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminHeader />

      <div className="flex-grow p-6 overflow-x-auto">
        <Typography variant="h4" className="font-extrabold mb-6 px-4 py-4 text-center text-blue-500">Order Tracking</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <Typography variant="h6" className="font-semibold text-lg mb-4 text-blue-700">Carrier Status Distribution</Typography>
            <Bar data={dataCarrierStatus} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <Typography variant="h6" className="font-semibold text-lg mb-4 text-blue-700">Location Distribution</Typography>
            <Doughnut data={dataLocationDistribution} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <Typography variant="h6" className="font-semibold text-lg mb-4 text-blue-700">Status Distribution</Typography>
            <Pie data={dataStatusDistribution} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold">Tracking Number</TableCell>
                <TableCell className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold">Carrier</TableCell>
                <TableCell className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold">Status</TableCell>
                <TableCell className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold">Estimated Delivery Date</TableCell>
                <TableCell className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold">Last Updated Date</TableCell>
                <TableCell className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold">Current Location</TableCell>
                <TableCell className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderTrackings.map((tracking) => (
                <TableRow key={tracking.trackingId} className="hover:bg-gray-50">
                  <TableCell className="border px-4 py-2">{tracking.trackingNumber}</TableCell>
                  <TableCell className="border px-4 py-2">{tracking.carrier}</TableCell>
                  <TableCell className="border px-4 py-2">{tracking.status}</TableCell>
                  <TableCell className="border px-4 py-2">{tracking.estimatedDeliveryDate}</TableCell>
                  <TableCell className="border px-4 py-2">{tracking.lastUpdatedDate}</TableCell>
                  <TableCell className="border px-4 py-2">{tracking.currentLocation}</TableCell>
                  <TableCell className="border px-4 py-2 flex space-x-2">
                    <Button onClick={() => handleEdit(tracking)} variant="contained" color="primary" className="bg-blue-600 hover:bg-blue-700">Edit</Button>
                    <Button onClick={() => handleDelete(tracking.trackingId)} variant="contained" color="secondary" className="bg-red-600 hover:bg-red-700">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {editing && (
          <div className="mt-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <Typography variant="h6" className="font-semibold mb-4 text-blue-700">Edit Order Tracking</Typography>
            <TextField
              name="trackingNumber"
              value={form.trackingNumber}
              onChange={handleChange}
              label="Tracking Number"
              fullWidth
              margin="normal"
              variant="outlined"
              className="bg-gray-50"
            />

            <FormControl fullWidth margin="normal" variant="outlined" className="bg-gray-50">
              <InputLabel>Carrier</InputLabel>
              <Select
                name="carrier"
                value={form.carrier}
                onChange={handleChange}
                label="Carrier"
                className="bg-gray-50"
              >
                {carriers.map((carrier) => (
                  <MenuItem key={carrier} value={carrier}>{carrier}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined" className="bg-gray-50">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={form.status}
                onChange={handleChange}
                label="Status"
                className="bg-gray-50"
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined" className="bg-gray-50">
              <InputLabel>Current Location</InputLabel>
              <Select
                name="currentLocation"
                value={form.currentLocation}
                onChange={handleChange}
                label="Current Location"
                className="bg-gray-50"
              >
                {locations.map((location) => (
                  <MenuItem key={location.value} value={location.value}>{location.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="estimatedDeliveryDate"
              value={form.estimatedDeliveryDate}
              onChange={handleChange}
              label="Estimated Delivery Date"
              fullWidth
              margin="normal"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: todayDate }}
              className="bg-gray-50"
            />
            <TextField
              name="lastUpdatedDate"
              value={form.lastUpdatedDate}
              onChange={handleChange}
              label="Last Updated Date"
              fullWidth
              margin="normal"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              className="bg-gray-50"
            />

            <div className="flex justify-end mt-4">
              <Button onClick={handleSave} variant="contained" color="success" className="bg-green-600 hover:bg-green-700">Save</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrderTracking;


