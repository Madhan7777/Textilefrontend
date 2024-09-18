import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminOrderSummaryPage = ({ orderDetails }) => {
  const cartItems = orderDetails.cartItems || [];
  const totalAmount = orderDetails.totalAmount || 0;
  const userName = orderDetails.userName || '';

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Order Summary
      </Typography>
      <Typography variant="h6" gutterBottom>
        Customer Name: {userName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Amount Paid: ₹{totalAmount.toFixed(2)}
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
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
  );
};

export default AdminOrderSummaryPage;
