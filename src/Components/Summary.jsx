import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CustomerHeader from './CustomerHeader';

const OrderSummaryPage = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve cart items from session storage
    const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const storedTotalAmount = sessionStorage.getItem('totalAmount') || 0;
    const storedUserName = sessionStorage.getItem('userName') || '';

    setCartItems(storedCartItems);
    setTotalAmount(storedTotalAmount);
    setUserName(storedUserName);
  }, []);

  return (
    
    <div className='min-h-screen'>
    <CustomerHeader/>

    <Container maxWidth="md" sx={{ mt: 4 }} >
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      {/* <Typography variant="h6" gutterBottom>
        Customer Name: {userName}
      </Typography> */}
      {/* <Typography variant="h6" gutterBottom>
        Total Amount Paid: ₹{totalAmount.toFixed(2)}
      </Typography> */}

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price per Unit</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productName || item.productId}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{item.price.toFixed(2)}</TableCell>
                <TableCell>₹{(item.quantity * item.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
  );
};

export default OrderSummaryPage;
