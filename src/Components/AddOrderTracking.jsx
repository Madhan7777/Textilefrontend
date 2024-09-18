import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import AdminHeader from './AdminHeader';

const AddOrderTracking = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [carrier, setCarrier] = useState('');
    const [status, setStatus] = useState('');
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
    const [lastUpdatedDate, setLastUpdatedDate] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const carriers = [
        'FedEx', 'UPS', 'DHL', 'USPS', 'Amazon Logistics', 'Blue Dart', 'DTDC', 'TNT', 'Royal Mail', 'Aramex'
    ];
    const statuses = [
        'Ordered', 'Shipped', 'Delivered', 'Not Delivered'
    ];
    const tamilNaduDistricts = [
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Coimbatore', value: 'Coimbatore' },
        { label: 'Madurai', value: 'Madurai' },
        { label: 'Salem', value: 'Salem' },


    ];

    // Get today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:7777/api/orders/all');
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders');
            }
        };

        fetchOrders();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderTracking = {
            productOrder: { orderId: selectedOrderId },
            trackingNumber,
            carrier,
            status,
            estimatedDeliveryDate,
            lastUpdatedDate,
            currentLocation
        };

        try {
            await axios.post('http://localhost:7777/orderTracking/save', orderTracking);
            setSuccess('Order Tracking saved successfully');
            setError('');
        } catch (err) {
            setError('Error saving Order Tracking');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <AdminHeader />
            <main className="flex-grow container mx-auto p-6">
                <h1 className="text-3xl font-extralight mb-6">Add Order Tracking</h1>

                <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    {/* Remove Tracking ID Field */}
                    
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-2">Order ID</label>
                        <select
                            value={selectedOrderId}
                            onChange={(e) => setSelectedOrderId(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <option value="" disabled>Select Order ID</option>
                            {orders.map((order) => (
                                <option key={order.orderId} value={order.orderId}>
                                    {order.orderId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-2">Tracking Number</label>
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-2">Carrier</label>
                        <select
                            value={carrier}
                            onChange={(e) => setCarrier(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <option value="" disabled>Select Carrier</option>
                            {carriers.map((carrierName) => (
                                <option key={carrierName} value={carrierName}>
                                    {carrierName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <option value="" disabled>Select Status</option>
                            {statuses.map((statusName) => (
                                <option key={statusName} value={statusName}>
                                    {statusName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-2">Estimated Delivery Date</label>
                        <input
                            type="date"
                            value={estimatedDeliveryDate}
                            onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            min={todayDate} // prevent selecting past dates
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-2">Last Updated Date</label>
                        <input
                            type="date"
                            value={lastUpdatedDate}
                            onChange={(e) => setLastUpdatedDate(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            min={todayDate} // prevent selecting past dates
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-2">Current Location</label>
                        <select
                            value={currentLocation}
                            onChange={(e) => setCurrentLocation(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <option value="" disabled>Select a district</option>
                            {tamilNaduDistricts.map((district) => (
                                <option key={district.value} value={district.value}>
                                    {district.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-lg ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white font-semibold`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>

                {success && (
                    <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="fixed bottom-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md">
                        {error}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AddOrderTracking;






// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { TextField, Button, Typography, Container, Snackbar, Alert, Grid } from '@mui/material';
// import axios from 'axios';

// const OrderTrackingForm = () => {
//     const { trackingId } = useParams(); 
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         trackingNumber: '',
//         carrier: '',
//         status: '',
//         estimatedDeliveryDate: '',
//         lastUpdatedDate: '',
//         currentLocation: '',
//     });

//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (trackingId) {
//             axios.get(`http://localhost:7777/orderTracking/${trackingId}`)
//                 .then(response => {
//                     setFormData(response.data);
//                 })
//                 .catch(err => setError('Failed to fetch order tracking details'));
//         }
//     }, [trackingId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             if (trackingId) {
//                 await axios.put('http://localhost:7777/orderTracking/update', formData);
//                 setSuccessMessage('Order Tracking updated successfully!');
//             } else {
//                 await axios.post('http://localhost:7777/orderTracking/save', formData);
//                 setSuccessMessage('Order Tracking added successfully!');
//             }
//             navigate('/orderTrackingList'); 
//         } catch (err) {
//             setError('Failed to save order tracking details');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Container maxWidth="md" sx={{ mt: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 {trackingId ? 'Update Order Tracking' : 'Add Order Tracking'}
//             </Typography>

//             <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
//                 <Alert onClose={() => setSuccessMessage('')} severity="success">
//                     {successMessage}
//                 </Alert>
//             </Snackbar>

//             <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
//                 <Alert onClose={() => setError('')} severity="error">
//                     {error}
//                 </Alert>
//             </Snackbar>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="Tracking Number"
//                             name="trackingNumber"
//                             value={formData.trackingNumber}
//                             onChange={handleChange}
//                             fullWidth
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="Carrier"
//                             name="carrier"
//                             value={formData.carrier}
//                             onChange={handleChange}
//                             fullWidth
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="Status"
//                             name="status"
//                             value={formData.status}
//                             onChange={handleChange}
//                             fullWidth
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="Estimated Delivery Date"
//                             type="date"
//                             name="estimatedDeliveryDate"
//                             value={formData.estimatedDeliveryDate}
//                             onChange={handleChange}
//                             fullWidth
//                             InputLabelProps={{ shrink: true }}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="Last Updated Date"
//                             type="date"
//                             name="lastUpdatedDate"
//                             value={formData.lastUpdatedDate}
//                             onChange={handleChange}
//                             fullWidth
//                             InputLabelProps={{ shrink: true }}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             label="Current Location"
//                             name="currentLocation"
//                             value={formData.currentLocation}
//                             onChange={handleChange}
//                             fullWidth
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             disabled={loading}
//                         >
//                             {loading ? 'Submitting...' : (trackingId ? 'Update Tracking' : 'Add Tracking')}
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Container>
//     );
// };

// export default OrderTrackingForm;
