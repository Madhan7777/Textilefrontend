// import React, { useState, useEffect } from 'react';
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
//   Alert,
//   TextField,
//   Button,
// } from '@mui/material';
// import CustomerHeader from './CustomerHeader';

// const CustomerOrderTracking = () => {
//   const [orderTrackings, setOrderTrackings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredTracking, setFilteredTracking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:7777/orderTracking/all');
//         setOrderTrackings(response.data);
//       } catch (err) {
//         setError('Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearch = () => {
//     const tracking = orderTrackings.find(
//       (tracking) => tracking.trackingNumber === searchTerm
//     );
//     setFilteredTracking(tracking || null);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Snackbar open={true} autoHideDuration={6000}>
//         <Alert severity="error">{error}</Alert>
//       </Snackbar>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <CustomerHeader/>
//       <Typography variant="h4" className="font-bold mb-6 text-center px-4 py-4 text-gray-800">
//         Order Tracking
//       </Typography>
//       <div className="mb-6 flex justify-center">
//         <TextField
//           value={searchTerm}
//           onChange={handleSearchChange}
//           label="Search by Tracking Number"
//           variant="outlined"
//           fullWidth
//         />
//         <Button onClick={handleSearch} variant="contained" color="primary" className="ml-2">
//           Search
//         </Button>
//       </div>

//       {filteredTracking && (
//         <TableContainer component={Paper} className="shadow-lg rounded-lg">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Tracking Number</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Carrier</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Status</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Estimated Delivery Date</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Last Updated Date</TableCell>
//                 <TableCell className="bg-gray-200 text-gray-600 font-semibold">Current Location</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow key={filteredTracking.trackingId}>
//                 <TableCell className="border px-4 py-2">{filteredTracking.trackingNumber}</TableCell>
//                 <TableCell className="border px-4 py-2">{filteredTracking.carrier}</TableCell>
//                 <TableCell className="border px-4 py-2">{filteredTracking.status}</TableCell>
//                 <TableCell className="border px-4 py-2">{filteredTracking.estimatedDeliveryDate}</TableCell>
//                 <TableCell className="border px-4 py-2">{filteredTracking.lastUpdatedDate}</TableCell>
//                 <TableCell className="border px-4 py-2">{filteredTracking.currentLocation}</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default CustomerOrderTracking;


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
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import CustomerHeader from './CustomerHeader';

const steps = [
  'Order Placed',
  'Processing',
  'Shipped',
  'In Transit',
  'Out for Delivery',
  'Delivered'
];

const CustomerOrderTracking = () => {
  const [orderTrackings, setOrderTrackings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTracking, setFilteredTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7777/orderTracking/all');
        setOrderTrackings(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const tracking = orderTrackings.find(
      (tracking) => tracking.trackingNumber === searchTerm
    );
    setFilteredTracking(tracking || null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStepIndex = (status) => {
    return steps.indexOf(status);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
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
    <div className="min-h-screen">
      <CustomerHeader/>
      <div className="container mx-auto px-4 py-6">
        <Typography variant="h4" className="font-bold mb-6 text-center text-gray-800">
          Order Tracking
        </Typography>
        <div className="mb-6 flex flex-col md:flex-row justify-center items-center">
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            label="Search by Tracking Number"
            variant="outlined"
            className="w-full md:w-2/3 lg:w-1/2 mb-4 md:mb-0"
          />
          <Button onClick={handleSearch} variant="contained" color="primary" className="ml-0 md:ml-2 px-5 py-3">
            Search
          </Button>
        </div>

        {filteredTracking && (
          <>
            <div className="mb-6">
              <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
                Tracking Details
              </Typography>
              <TableContainer component={Paper} className="shadow-lg rounded-lg">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="bg-gray-200 text-gray-600 font-semibold">Tracking Number</TableCell>
                      <TableCell className="bg-gray-200 text-gray-600 font-semibold">Carrier</TableCell>
                      <TableCell className="bg-gray-200 text-gray-600 font-semibold">Status</TableCell>
                      <TableCell className="bg-gray-200 text-gray-600 font-semibold">Estimated Delivery Date</TableCell>
                      <TableCell className="bg-gray-200 text-gray-600 font-semibold">Last Updated Date</TableCell>
                      <TableCell className="bg-gray-200 text-gray-600 font-semibold">Current Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={filteredTracking.trackingId}>
                      <TableCell className="border px-4 py-2">{filteredTracking.trackingNumber}</TableCell>
                      <TableCell className="border px-4 py-2">{filteredTracking.carrier}</TableCell>
                      <TableCell className="border px-4 py-2">{filteredTracking.status}</TableCell>
                      <TableCell className="border px-4 py-2">{filteredTracking.estimatedDeliveryDate}</TableCell>
                      <TableCell className="border px-4 py-2">{filteredTracking.lastUpdatedDate}</TableCell>
                      <TableCell className="border px-4 py-2">{filteredTracking.currentLocation}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className="mb-6">
              <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
                Tracking Progress
              </Typography>
              <Stepper activeStep={getStepIndex(filteredTracking.status)} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderTracking;
