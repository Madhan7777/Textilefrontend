import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, IconButton, InputAdornment, Container, Typography, Paper, Grid } from '@mui/material';
import { Edit as EditIcon, Description as DescriptionIcon, Category as CategoryIcon, AttachMoney as PriceIcon, ShoppingCart as QuantityIcon, Palette as ColorIcon, Pattern as PatternIcon, ViewInAr as SizeIcon, Male as GenderIcon, EmojiObjects as CareInstructionsIcon } from '@mui/icons-material';

function EditAdminProduct() {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7777/AdminProduct/findProductById/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productId', data.productId || '');
    formData.append('productName', data.productName || '');
    formData.append('description', data.description || '');
    formData.append('price', data.price || '');
    formData.append('category', data.category || '');
    formData.append('quantity', data.quantity || '');
    formData.append('brand', data.brand || '');
    formData.append('material', data.material || '');
    formData.append('color', data.color || '');
    formData.append('pattern', data.pattern || '');
    formData.append('size', data.size || '');
    formData.append('gender', data.gender || '');
    formData.append('careInstructions', data.careInstructions || '');
    if (image) formData.append('imageProduct', image);

    axios
      .post('http://localhost:7777/AdminProduct/updateSellerProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('Product updated successfully');
        navigate('/viewadminproduct'); 
      })
      .catch((err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product');
      });
  };

  const handleGoBack = () => {
    navigate('/viewadminproduct'); 
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ padding: 4, marginTop: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Product
      </Typography>
      <Button
        onClick={handleGoBack}
        variant="outlined"
        color="primary"
        sx={{ mb: 2 }}
      >
        Go Back
      </Button>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="productId"
              name="productId"
              label="Product ID"
              variant="outlined"
              value={data.productId || ''}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="productName"
              name="productName"
              label="Product Name"
              variant="outlined"
              value={data.productName || ''}
              onChange={(e) => setData({ ...data, productName: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              value={data.description || ''}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="category"
              name="category"
              label="Category"
              variant="outlined"
              value={data.category || ''}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              type="number"
              value={data.price || ''}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PriceIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              variant="outlined"
              value={data.quantity || ''}
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <QuantityIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="brand"
              name="brand"
              label="Brand"
              variant="outlined"
              value={data.brand || ''}
              onChange={(e) => setData({ ...data, brand: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="material"
              name="material"
              label="Material"
              variant="outlined"
              value={data.material || ''}
              onChange={(e) => setData({ ...data, material: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="color"
              name="color"
              label="Color"
              variant="outlined"
              value={data.color || ''}
              onChange={(e) => setData({ ...data, color: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ColorIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="pattern"
              name="pattern"
              label="Pattern"
              variant="outlined"
              value={data.pattern || ''}
              onChange={(e) => setData({ ...data, pattern: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PatternIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="size"
              name="size"
              label="Size"
              variant="outlined"
              value={data.size || ''}
              onChange={(e) => setData({ ...data, size: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SizeIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="gender"
              name="gender"
              label="Gender"
              variant="outlined"
              value={data.gender || ''}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GenderIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="careInstructions"
              name="careInstructions"
              label="Care Instructions"
              variant="outlined"
              value={data.careInstructions || ''}
              onChange={(e) => setData({ ...data, careInstructions: e.target.value })}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CareInstructionsIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              id="imageProduct"
              name="imageProduct"
              onChange={handleImageChange}
              style={{ marginBottom: '16px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="info"
              fullWidth
              sx={{ fontStyle: 'italic' }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default EditAdminProduct;
