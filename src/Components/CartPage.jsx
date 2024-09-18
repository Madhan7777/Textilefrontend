import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Grid } from '@mui/material';

const CartDetailsPage = () => {
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

  return (
    <div className="p-4">
      <Typography variant="h4" className="font-bold mb-4">Cart Details</Typography>
      <Grid container spacing={2}>
        {cartItems.map(({ productId, quantity, price }) => (
          <Grid item xs={12} sm={6} md={4} key={productId}>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
              {/* Placeholder image URL; replace with actual image URL if available */}
              <img
                src={`http://localhost:7777/AdminProduct/findProdImage/${productId}`}
                alt={`Product ${productId}`}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <Typography variant="h6" className="font-semibold">{`Product ${productId}`}</Typography>
                <Typography variant="subtitle2" className="text-gray-600">Price: ₹{price.toFixed(2)}</Typography>
                <Typography variant="body2" className="text-gray-600">Quantity: {quantity}</Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <div className="mt-4 text-center">
        <Typography variant="h5" className="font-bold mb-4 text-gray-800">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className="w-full"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartDetailsPage;
