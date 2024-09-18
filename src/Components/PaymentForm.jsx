// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Grid, Container, Snackbar, Alert } from '@mui/material';
// import axios from 'axios';

// const PaymentForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartItems = [], totalAmount = 0 } = location.state || {};

//   const [formData, setFormData] = useState({
//     orderDate: new Date().toISOString().split('T')[0],
//     userName: '',
//     email: '',
//     contactNumber: '',
//     plotNumber: '',
//     streetName: '',
//     cityName: '',
//     stateName: '',
//     invoiceNumber: '',
//   });

//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Step 1: Create the order on your server
//       const response = await axios.post('http://localhost:7777/api/orders/create', formData);
//       const orderData = response.data;

//       if (orderData.error) {
//         throw new Error(orderData.error);
//       }

//       // Step 2: Initialize Razorpay payment
//       const options = {
//         key: "rzp_test_NWjWpUbPDPq9r2", // Your Razorpay key
//         amount: totalAmount * 100, // Amount in paise
//         currency: "INR",
//         name: "TEXTILE_SHOP",
//         description: "Order Payment",
//         order_id: orderData.id, // Use the order ID returned from the server
//         handler: async function (response) {
//           try {
//             // Verify payment on the server
//             await axios.post('http://localhost:7777/api/orders/verify-payment', {
//               orderId: orderData.id,
//               paymentId: response.razorpay_payment_id,
//               signature: response.razorpay_signature
//             });
//             setSuccessMessage('Payment successful!');
//             navigate('/success'); // Redirect to a success page or another route
//           } catch (err) {
//             setError('Payment verification failed');
//           }
//         },
//         prefill: {
//           name: formData.userName,
//           email: formData.email,
//           contact: formData.contactNumber
//         },
//         theme: {
//           color: '#F37254'
//         }
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (err) {
//       setError('Failed to create order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Payment Form
//       </Typography>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
//         <Alert onClose={() => setSuccessMessage('')} severity="success">
//           {successMessage}
//         </Alert>
//       </Snackbar>

//       <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
//         <Alert onClose={() => setError('')} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Order Date"
//               type="date"
//               name="orderDate"
//               value={formData.orderDate}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="User Name"
//               name="userName"
//               value={formData.userName}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Contact Number"
//               type="tel"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Plot Number"
//               name="plotNumber"
//               value={formData.plotNumber}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Street Name"
//               name="streetName"
//               value={formData.streetName}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="City Name"
//               name="cityName"
//               value={formData.cityName}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="State Name"
//               name="stateName"
//               value={formData.stateName}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               Cart Items
//             </Typography>
//             {cartItems.length > 0 ? (
//               <Grid container spacing={2}>
//                 {cartItems.map(item => (
//                   <Grid item xs={12} sm={6} md={4} key={item.productId}>
//                     <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
//                       <Typography variant="h6" className="font-semibold">{item.productName}</Typography>
//                       <Typography variant="subtitle2" className="text-gray-600 ml-4">Quantity: {item.quantity}</Typography>
//                       <Typography variant="subtitle2" className="text-gray-600 ml-4">Price: ₹{item.price.toFixed(2)}</Typography>
//                       <Typography variant="subtitle2" className="text-gray-600 ml-4">Total: ₹{(item.quantity * item.price).toFixed(2)}</Typography>
//                     </div>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Typography variant="h6" align="center" className="text-gray-600">No items in the cart</Typography>
//             )}
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h5" className="font-bold mb-4 text-gray-800">
//               Total Amount: ₹{totalAmount.toFixed(2)}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               disabled={loading}
//             >
//               {loading ? 'Submitting...' : 'Submit Payment'}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// };

// export default PaymentForm;


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Grid, Container, Snackbar, Alert } from '@mui/material';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import axios from 'axios';
 
// const PaymentForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartItems = [], totalAmount = 0 } = location.state || {};
 
//   const [formData, setFormData] = useState({
//     orderDate: new Date().toISOString().split('T')[0],
//     userName: '',
//     email: '',
//     contactNumber: '',
//     plotNumber: '',
//     streetName: '',
//     cityName: '',
//     stateName: '',
//     cardNum: '',
//     expMonth: '',
//     expYear: '',
//     cvv: '',
//     invoiceNumber: '',
//   });
 
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
 
//   useEffect(() => {
//     // Handle the cart data or any other initialization
//   }, []);
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
 
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFont("Helvetica", "normal");
//     doc.setFontSize(16);
//     doc.text('INVOICE', 14, 20);
 
//     doc.setFontSize(12);
//     doc.text(`Order Date: ${formData.orderDate}`, 14, 30);
//     doc.text(`Invoice Number: ${formData.invoiceNumber}`, 14, 40);
//     doc.text('GST Number: 123456789012', 14, 50);
 
//     doc.setFontSize(14);
//     doc.text(`User Name: ${formData.userName}`, 14, 60);
//     doc.text(`Email: ${formData.email}`, 14, 70);
//     doc.text(`Contact Number: ${formData.contactNumber}`, 14, 80);
 
//     doc.setFontSize(12);
//     doc.text('Cart Items:', 14, 90);
 
//     const tableData = cartItems.map(item => [
//       item.productId,
//       item.quantity,
//       item.price.toFixed(2),
//       (item.quantity * item.price).toFixed(2)
//     ]);
 
//     doc.autoTable({
//       head: [['Product ID', 'Quantity', 'Price per Unit', 'Total']],
//       body: tableData,
//       startY: 100,
//       margin: { left: 14 },
//       theme: 'grid',
//       styles: {
//         fontSize: 10,
//         cellPadding: 4,
//         valign: 'middle'
//       },
//       headStyles: {
//         fillColor: [255, 255, 255],
//         textColor: [0, 0, 0],
//         fontStyle: 'bold'
//       },
//       alternateRowStyles: {
//         fillColor: [240, 240, 240]
//       }
//     });
 
//     doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
//     doc.save('invoice.pdf');
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
 
//     try {
//       const response = await axios.post('http://localhost:7777/api/orders/create', formData);
//       setFormData(prevState => ({
//         ...prevState,
//         invoiceNumber: response.data.invoiceNumber // Assuming the API returns the invoice number
//       }));
//       setSuccessMessage('Order created successfully! Generating PDF...');
//       generatePDF();
//       setFormData({
//         orderDate: new Date().toISOString().split('T')[0],
//         userName: '',
//         email: '',
//         contactNumber: '',
//         plotNumber: '',
//         streetName: '',
//         cityName: '',
//         stateName: '',
//         cardNum: '',
//         expMonth: '',
//         expYear: '',
//         cvv: '',
//         invoiceNumber: '',
//       });
//     } catch (err) {
//       setError('Failed to create order');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Payment Form
//       </Typography>
 
//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
//         <Alert onClose={() => setSuccessMessage('')} severity="success">
//           {successMessage}
//         </Alert>
//       </Snackbar>
 
//       <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
//         <Alert onClose={() => setError('')} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>
 
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Order Date"
//               type="date"
//               name="orderDate"
//               value={formData.orderDate}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="User Name"
//               name="userName"
//               value={formData.userName}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Contact Number"
//               type="tel"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Plot Number"
//               name="plotNumber"
//               value={formData.plotNumber}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Street Name"
//               name="streetName"
//               value={formData.streetName}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="City Name"
//               name="cityName"
//               value={formData.cityName}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="State Name"
//               name="stateName"
//               value={formData.stateName}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Card Number"
//               type="text"
//               name="cardNum"
//               value={formData.cardNum}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Expiration Month"
//               type="text"
//               name="expMonth"
//               value={formData.expMonth}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Expiration Year"
//               type="text"
//               name="expYear"
//               value={formData.expYear}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="CVV"
//               type="text"
//               name="cvv"
//               value={formData.cvv}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               Cart Items
//             </Typography>
//             {cartItems.length > 0 ? (
//               <Grid container spacing={2}>
//                 {cartItems.map(item => (
//                   <Grid item xs={12} sm={6} md={4} key={item.productId}>
//                     <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
//                       {/* <Typography variant="h6" className="font-semibold">{item.productId}</Typography> */}
//                       <Typography variant="h6" className="font-semibold">{item.productName}</Typography>
 
//                       <Typography variant="subtitle2" className="text-gray-600 ml-4">Quantity: {item.quantity}</Typography>
//                       <Typography variant="subtitle2" className="text-gray-600 ml-4">Price: ₹{item.price.toFixed(2)}</Typography>
//                       <Typography variant="subtitle2" className="text-gray-600 ml-4">Total: ₹{(item.quantity * item.price).toFixed(2)}</Typography>
//                     </div>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Typography variant="h6" align="center" className="text-gray-600">No items in the cart</Typography>
//             )}
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h5" className="font-bold mb-4 text-gray-800">
//               Total Amount: ₹{totalAmount.toFixed(2)}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               disabled={loading}
//             >
//               {loading ? 'Submitting...' : 'Submit Payment'}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// };
 
// export default PaymentForm;
 


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { Snackbar, Alert, Typography, Grid, Container, Button, TextField } from '@mui/material';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalAmount = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    orderDate: new Date().toISOString().split('T')[0],
    userName: '',
    email: '',
    contactNumber: '',
    plotNumber: '',
    streetName: '',
    cityName: '',
    stateName: '',
    cardNum: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    quantity: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchUpdatedProducts = async () => {
      try {
        const productUpdates = await Promise.all(
          cartItems.map(item => axios.get(`http://localhost:7777/AdminProduct/findProductById/${item.productId}`))
        );
        const updatedItems = productUpdates.map((response, index) => {
          const data = response.data;
          const cartItem = cartItems[index];
          return {
            ...cartItem,
            availableQuantity: data.availableQuantity
          };
        });
        setUpdatedCartItems(updatedItems);
      } catch (error) {
        console.error('Error fetching updated products:', error);
      }
    };

    fetchUpdatedProducts();
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.userName) newErrors.userName = 'User Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber)) newErrors.contactNumber = 'Valid Contact Number is required (10 digits)';
    if (!formData.cardNum || !/^\d{16}$/.test(formData.cardNum)) newErrors.cardNum = 'Valid Card Number is required (16 digits)';
    if (!formData.expMonth) newErrors.expMonth = 'Expiration Month is required';
    if (!formData.expYear) newErrors.expYear = 'Expiration Year is required';
    else if (parseInt(formData.expYear) < currentYear) newErrors.expYear = 'Expiration Year cannot be in the past';
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'Valid CVV is required (3 or 4 digits)';
    if (isNaN(totalAmount) || totalAmount <= 0) newErrors.totalAmount = 'Invalid total amount';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(16);
    doc.text('INVOICE', 14, 20);

    doc.setFontSize(12);
    doc.text(`Order Date: ${formData.orderDate}`, 14, 30);
    doc.text(`Invoice Number: ${formData.invoiceNumber}`, 14, 40);
    doc.text('GST Number: 123456789012', 14, 50);

    doc.setFontSize(14);
    doc.text(`User Name: ${formData.userName}`, 14, 60);
    doc.text(`Email: ${formData.email}`, 14, 70);
    doc.text(`Contact Number: ${formData.contactNumber}`, 14, 80);

    doc.setFontSize(12);
    doc.text('Cart Items:', 14, 90);

    const tableData = cartItems.map(item => [
      item.productId,
      item.quantity,
      item.price.toFixed(2),
      (item.quantity * item.price).toFixed(2)
    ]);

    doc.autoTable({
      head: [['Product ID', 'Quantity', 'Price per Unit', 'Total']],
      body: tableData,
      startY: 100,
      margin: { left: 14 },
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 4,
        valign: 'middle'
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      }
    });

    doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save('invoice.pdf');
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    const options = {
      key: "rzp_test_NWjWpUbPDPq9r2",
      amount: totalAmount * 100,
      currency: "INR",
      name: "TEXTILE_SHOP",
      description: "For testing purpose",
      handler: async function (response) {
        try {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          setSuccessMessage('Payment successful!');
          generatePDF();

          const orderData = {
            ...formData,
            totalAmount: totalAmount,
            cardNum: formData.cardNum,
            expMonth: formData.expMonth,
            expYear: formData.expYear,
            cvv: formData.cvv,
            quantity: formData.quantity  

          };

          await axios.post('http://localhost:7777/api/orders/create', orderData);

          const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

          await Promise.all(
            storedCartItems.map(item => axios.post('http://localhost:7777/AdminProduct/updateProductQuantity', {
              productId: item.productId,
              quantity: item.quantity
            }))
          );

          setFormData({
            orderDate: new Date().toISOString().split('T')[0],
            userName: '',
            email: '',
            contactNumber: '',
            plotNumber: '',
            streetName: '',
            cityName: '',
            stateName: '',
            cardNum: '',
            expMonth: '',
            expYear: '',
            cvv: '',
            quantity:''
          });
          sessionStorage.removeItem('cartItems');
          navigate('/order-summary', { state: { cartItems, totalAmount, userName: formData.userName } });

          
        } catch (error) {
          setErrors({ ...errors, general: 'Error saving order details. Please try again.' });
          console.error(error);
        }
      },
      prefill: {
        name: formData.userName,
        email: formData.email,
        contact: formData.contactNumber
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: '#F37254'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handlePayment();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
       <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/customerview')}
        className="mt-4"
      >
        Go Back
      </Button>
      <Typography variant="h4" gutterBottom className="text-gray-900 dark:text-white">
        Payment Form
      </Typography>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={!!errors.general} autoHideDuration={6000} onClose={() => setErrors({ ...errors, general: '' })}>
        <Alert onClose={() => setErrors({ ...errors, general: '' })} severity="error">
          {errors.general}
        </Alert>
      </Snackbar>

     

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Form Fields */}
          {['orderDate', 'userName', 'email', 'contactNumber', 'plotNumber', 'streetName', 'cityName', 'stateName', 'cardNum', 'expMonth', 'expYear', 'cvv'].map((field, index) => (
            <div className="relative mb-6" key={index}>
              <TextField
                fullWidth
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                placeholder={field === 'email' ? 'name@gmail.com' : field === 'contactNumber' ? '1234567890' : ''}
                error={!!errors[field]}
                helperText={errors[field]}
                className="mb-2"
              />
            </div>
          ))}
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      </form>

      {/* Cart Summary Section */}
      <div className="mt-8 p-4 border-t border-gray-300">
        <Typography variant="h6" gutterBottom className="text-gray-900 dark:text-white">
          Cart Summary
        </Typography>
        <div className="mt-4">
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item, index) => (
                <Grid container key={index} spacing={2} className="mb-4">
                  <Grid item xs={12} sm={3}>
                    <img src={`http://localhost:7777/AdminProduct/findProdImage/${item.productId}`} alt={item.productName} className="w-full h-auto object-cover" />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="body1" className="text-gray-900 dark:text-white">
                      <strong>Quantity:</strong> {item.quantity}
                    </Typography>
                    <Typography variant="body1" className="text-gray-900 dark:text-white">
                      <strong>Price:</strong> ₹{item.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" className="text-gray-900 dark:text-white">
                      <strong>Total:</strong> ₹{(item.quantity * item.price).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Typography variant="h6" className="text-gray-900 dark:text-white">
                <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
              </Typography>
            </div>
          ) : (
            <Typography variant="body1" className="text-gray-900 dark:text-white">
              No items in the cart.
            </Typography>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PaymentForm;
