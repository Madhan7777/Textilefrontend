// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button, Typography, Grid, Snackbar, Modal, TextField } from '@mui/material';
// import MuiAlert from '@mui/material/Alert';
// import { FaShoppingCart } from 'react-icons/fa';
// import { FiSearch } from 'react-icons/fi';
// import CustomerHeader from './CustomerHeader';

// const Alert = React.forwardRef((props, ref) => (
//   <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// ));

// const Cart = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState({});
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sort, setSort] = useState(null);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [promoCode, setPromoCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [cartDetails, setCartDetails] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     calculateTotalAmount();
//   }, [cart, products, discount]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:7777/AdminProduct/findAllProduct');
//       setProducts(response.data);
//     } catch (err) {
//       setError('Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = (productId, delta) => {
//     setCart(prevCart => ({
//       ...prevCart,
//       [productId]: Math.max(0, (prevCart[productId] || 0) + delta)
//     }));
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       if (!cart[productId]) {
//         const product = products.find(p => p.productId === productId);
//         if (product) {
//           setCart(prevCart => ({
//             ...prevCart,
//             [productId]: 1
//           }));
//           setCartDetails(prevDetails => ({
//             ...prevDetails,
//             [productId]: product
//           }));
//         }
//       } else {
//         setSnackbarMessage('Product already added to the cart');
//         setSnackbarOpen(true);
//       }
//     } catch (err) {
//       setError('Failed to add product to cart');
//     }
//   };

//   const handleBuyNow = (productId) => {
//     const product = products.find(p => p.productId === productId);
//     if (product) {
//       navigate('/payment', { state: { cartItems: [{ productId, quantity: 1, price: product.price }], totalAmount: product.price } });
//     }
//   };

//   const calculateTotalAmount = () => {
//     let amount = 0;
//     Object.keys(cart).forEach(productId => {
//       const product = cartDetails[productId];
//       const quantity = cart[productId] || 0;
//       amount += product.price * quantity;
//     });
//     setTotalAmount(amount * (1 - discount / 100));
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleCheckout = () => {
//     const cartItems = Object.keys(cart).map(productId => ({
//       productId,
//       quantity: cart[productId],
//       price: cartDetails[productId]?.price || 0
//     })).filter(item => item.quantity > 0);

//     if (cartItems.length > 0) {
//       navigate('/payment', { state: { cartItems, totalAmount } });
//     } else {
//       setError('No items in the cart');
//     }
//   };

//   const handleApplyPromoCode = () => {
//     if (promoCode === 'DISCOUNT10') {
//       setDiscount(10);
//       setError('');
//     } else {
//       setError('Invalid promo code');
//     }
//   };

//   const filteredAndSortedProducts = products
//     .filter(product => 
//       product.price <= maxPrice &&
//       (product.productName.toLowerCase().includes(searchQuery) || 
//        product.category.toLowerCase().includes(searchQuery))
//     )
//     .sort((a, b) => {
//       if (sort === 'asc') return a.price - b.price;
//       if (sort === 'desc') return b.price - a.price;
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <CustomerHeader cartItemCount={Object.keys(cart).length} className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />

//       <div className="pt-16 p-8 flex flex-col lg:flex-row">
//         {/* Left Side - Filter and Search */}
//         <div className="lg:w-1/4 lg:mr-4 bg-white p-4 rounded-lg shadow-lg">
//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="Search Products"
//               value={searchQuery}
//               onChange={handleSearch}
//               className="w-full p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <FiSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" />
//           </div>

//           {/* Filters */}
//           <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
//             <h2 className="text-lg font-semibold mb-2">Filter by Price</h2>
//             <div className="flex items-center">
//               <span className="mr-2 text-gray-600">0</span>
//               <input
//                 type="range"
//                 min={0}
//                 max={1000}
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 className="flex-grow"
//               />
//               <span className="ml-2 text-gray-600">{maxPrice}</span>
//             </div>
//           </div>

//           <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
//             <h2 className="text-lg font-semibold mb-2">Sort by</h2>
//             <div className="inputItem mb-2">
//               <input
//                 type="radio"
//                 id="asc"
//                 value="asc"
//                 name="price"
//                 onChange={() => setSort("asc")}
//                 className="mr-2"
//               />
//               <label htmlFor="asc" className="text-gray-800">Price (Lowest first)</label>
//             </div>
//             <div className="inputItem">
//               <input
//                 type="radio"
//                 id="desc"
//                 value="desc"
//                 name="price"
//                 onChange={() => setSort("desc")}
//                 className="mr-2"
//               />
//               <label htmlFor="desc" className="text-gray-800">Price (Highest first)</label>
//             </div>
//           </div>

//           <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
//             <h2 className="text-lg font-semibold mb-2">Promo Code</h2>
//             <div className="flex flex-col space-y-2">
//               <TextField
//                 variant="outlined"
//                 label="Enter Promo Code"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//                 className="w-full mb-2"
//               />
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleApplyPromoCode}
//                 className="w-full"
//               >
//                 Apply
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="lg:w-3/4">
//           {loading && <Typography align="center">Loading...</Typography>}
          
//           {error && (
//             <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
//               <Alert onClose={() => setError('')} severity="error">
//                 {error}
//               </Alert>
//             </Snackbar>
//           )}

//           {snackbarMessage && (
//             <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//               <Alert onClose={() => setSnackbarOpen(false)} severity="info">
//                 {snackbarMessage}
//               </Alert>
//             </Snackbar>
//           )}

//           <Grid container spacing={4}>
//             {filteredAndSortedProducts.length > 0 ? (
//               filteredAndSortedProducts.map(product => (
//                 <Grid item xs={12} sm={6} md={4} key={product.productId}>
//                   <div className="relative bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105">
//                     {product.imageName && (
//                       <>
//                         <img
//                           src={`http://localhost:7777/AdminProduct/findProdImage/${product.productId}`}
//                           alt={product.productName}
//                           className="w-full h-60 object-cover rounded-lg mb-4 cursor-pointer"
//                           onClick={() => setSelectedImage(`http://localhost:7777/AdminProduct/findProdImage/${product.productId}`)}
//                         />
//                         <Modal
//                           open={!!selectedImage}
//                           onClose={() => setSelectedImage('')}
//                           className="flex items-center justify-center"
//                         >
//                           <div className="bg-white p-4 rounded-lg max-w-lg mx-auto">
//                             <img
//                               src={selectedImage}
//                               alt="Full Size"
//                               className="max-w-full max-h-screen"
//                             />
//                           </div>
//                         </Modal>
//                       </>
//                     )}
//                     {product.offer && (
//                       <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
//                         {product.offer}
//                       </span>
//                     )}
//                     <Typography variant="h6" className="font-semibold text-gray-800 mb-2">{product.productName}</Typography>
//                     <Typography variant="subtitle2" className="text-gray-600 mb-2">Category: {product.category}</Typography>
//                     <Typography variant="h6" className="font-bold text-red-600 mb-2">Price: ₹{product.price.toFixed(2)}</Typography>
//                     <div className="flex flex-col items-center">
//                       <Typography variant="caption" className="text-gray-600 mb-2">Available Quantity: {product.quantity}</Typography>
//                       {cart[product.productId] ? (
//                         <div className="flex items-center mb-2">
//                           <Button
//                             variant="outlined"
//                             color="primary"
//                             onClick={() => handleQuantityChange(product.productId, -1)}
//                             disabled={(cart[product.productId] || 0) <= 0}
//                             className="mr-2"
//                           >
//                             -
//                           </Button>
//                           <Typography variant="h6" className="mx-2">
//                             {cart[product.productId] || 0}
//                           </Typography>
//                           <Button
//                             variant="outlined"
//                             color="primary"
//                             onClick={() => handleQuantityChange(product.productId, 1)}
//                             className="ml-2"
//                           >
//                             +
//                           </Button>
//                         </div>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={() => handleBuyNow(product.productId)}
//                           className="mt-2 flex items-center"
//                         >
//                           <FaShoppingCart className="mr-2" />
//                           Buy Now
//                         </Button>
//                       )}
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleAddToCart(product.productId)}
//                         className="mt-2 flex items-center"
//                       >
//                         <FaShoppingCart className="mr-2" />
//                         Add to Cart
//                       </Button>
//                     </div>
//                   </div>
//                 </Grid>
//               ))
//             ) : (
//               <Typography variant="h6" align="center" className="text-gray-600">No products found</Typography>
//             )}
//           </Grid>

//           <div className="text-center mt-6">
//             <Typography variant="h5" className="font-bold mb-4 text-gray-800">
//               Total Amount: ₹{totalAmount.toFixed(2)}
//             </Typography>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleCheckout}
//               disabled={Object.keys(cart).length === 0} 
//               className="mt-4"
//             >
//               Checkout
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Cart Details */}
//       <div className="fixed bottom-0 right-0 lg:w-1/4 lg:h-auto w-full bg-white shadow-lg p-4">
//         <Typography variant="h6" className="font-semibold mb-2">Cart Details</Typography>
//         <Grid container spacing={2}>
//           {Object.keys(cart).map(productId => {
//             const product = cartDetails[productId];
//             if (!product) return null;

//             return (
//               <Grid item xs={12} sm={6} md={4} key={productId}>
//                 <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
//                   {product.imageName && (
//                     <img
//                       src={`http://localhost:7777/AdminProduct/findProdImage/${productId}`}
//                       alt={product.productName}
//                       className="w-20 h-20 object-cover rounded-lg mr-4"
//                     />
//                   )}
//                   <div className="flex-1">
//                     <Typography variant="h6" className="font-semibold">{product.productName}</Typography>
//                     <Typography variant="subtitle2" className="text-gray-600">Price: ₹{product.price.toFixed(2)}</Typography>
//                     <Typography variant="body2" className="text-gray-600">Quantity: {cart[productId]}</Typography>
//                   </div>
//                 </div>
//               </Grid>
//             );
//           })}
//         </Grid>
//         <div className="mt-4 text-center">
//           <Typography variant="h5" className="font-bold mb-4 text-gray-800">
//             Total Amount: ₹{totalAmount.toFixed(2)}
//           </Typography>
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={() => navigate('/payment', { state: { cartItems: Object.keys(cart).map(productId => ({ productId, quantity: cart[productId], price: cartDetails[productId]?.price || 0 })), totalAmount } })}
//             className="w-full"
//             disabled={Object.keys(cart).length === 0}
//           >
//             Proceed to Checkout
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, Snackbar, Modal, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { FaShoppingCart } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import CustomerHeader from './CustomerHeader';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cartDetails, setCartDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [accountNotificationOpen, setAccountNotificationOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    const loggedInStatus = !!sessionStorage.getItem('email'); 
    setIsLoggedIn(loggedInStatus);
    const script = document.createElement('script');
    script.src = "https://embed.tawk.to/your-chat-id/default";
    script.async = true;
    document.body.appendChild(script);

    if (!loggedInStatus) { // Show notification if not logged in
      setAccountNotificationOpen(true);
    }
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [cart, products, discount]);

  useEffect(() => {
    generateRecommendations();
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:7777/AdminProduct/findAllProduct');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, delta) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: Math.max(0, (prevCart[productId] || 0) + delta)
    }));
  };

  const handleAddToCart = async (productId) => {
    try {
      if (!cart[productId]) {
        const product = products.find(p => p.productId === productId);
        if (product) {
          setCart(prevCart => ({
            ...prevCart,
            [productId]: 1
          }));
          setCartDetails(prevDetails => ({
            ...prevDetails,
            [productId]: product
          }));
        }
      } else {
        setSnackbarMessage('Product already added to the cart');
        setSnackbarOpen(true);
      }
    } catch (err) {
      setError('Failed to add product to cart');
    }
  };

  const handleBuyNow = (productId) => {
    const product = products.find(p => p.productId === productId);
    if (product) {
      navigate('/payment', { state: { cartItems: [{ productId, quantity: 1, price: product.price }], totalAmount: product.price } });
    }
  };

  const calculateTotalAmount = () => {
    let amount = 0;
    Object.keys(cart).forEach(productId => {
      const product = cartDetails[productId];
      const quantity = cart[productId] || 0;
      amount += product.price * quantity;
    });
    setTotalAmount(amount * (1 - discount / 100));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setSnackbarMessage('Please log in to proceed to checkout');
      setSnackbarOpen(true);
      return;
    }
    const cartItems = Object.keys(cart).map(productId => ({
      productId,
      quantity: cart[productId],
      price: cartDetails[productId]?.price || 0
    })).filter(item => item.quantity > 0);

    if (cartItems.length > 0) {
      navigate('/payment', { state: { cartItems, totalAmount } });
    } else {
      setError('No items in the cart');
    }
  };

  const handleApplyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10);
      setError('');
    } else {
      setError('Invalid promo code');
    } 
  };

  const generateRecommendations = () => {
    setRecommendations(products.filter(product => product.price < 500));
  };

  const filteredAndSortedProducts = products
    .filter(product => 
      product.price <= maxPrice &&
      (product.productName.toLowerCase().includes(searchQuery) || 
       product.category.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      if (sort === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomerHeader cartItemCount={Object.keys(cart).length} className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />

      <div className="pt-16 p-8 flex flex-col lg:flex-row">
        <div className="lg:w-1/4 lg:mr-4 bg-white p-4 rounded-lg shadow-lg sticky top-16 h-screen">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search Products"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Filters */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Filter by Price</h2>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">0</span>
              <input
                type="range"
                min={0}
                max={8000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-grow"
              />
              <span className="ml-2 text-gray-600">{maxPrice}</span>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Sort by</h2>
            <div className="inputItem mb-2">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={() => setSort("asc")}
                className="mr-2"
              />
              <label htmlFor="asc" className="text-gray-800">Price (Lowest first)</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={() => setSort("desc")}
                className="mr-2"
              />
              <label htmlFor="desc" className="text-gray-800">Price (Highest first)</label>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Promo Code</h2>
            <div className="flex flex-col space-y-2">
              <TextField
                variant="outlined"
                label="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full mb-2"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleApplyPromoCode}
                className="w-full"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4">
          {loading && <Typography align="center">Loading...</Typography>}
          
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
              <Alert onClose={() => setError('')} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}

          {snackbarMessage && (
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
              <Alert onClose={() => setSnackbarOpen(false)} severity="info">
                {snackbarMessage}
              </Alert>
            </Snackbar>
          )}

          <Grid container spacing={4}>
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.productId}>
<div className="relative bg-white bg-opacity-800 p-4 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-opacity-90 hover:shadow-xl hover:border hover:border-gray-300">
                    {product.imageName && (
                      <>
                        <img
                          src={`http://localhost:7777/AdminProduct/findProdImage/${product.productId}`}
                          alt={product.productName}
                          className="w-full h-60 object-cover rounded-lg mb-4 cursor-pointer"
                          onClick={() => setSelectedImage(`http://localhost:7777/AdminProduct/findProdImage/${product.productId}`)}
                        />
                        <Modal
                          open={!!selectedImage}
                          onClose={() => setSelectedImage('')}
                          className="flex items-center justify-center"
                        >
                          <div className="bg-white p-4 rounded-lg max-w-lg mx-auto">
                            <img
                              src={selectedImage}
                              alt="Full Size"
                              className="max-w-full max-h-screen"
                            />
                          </div>
                        </Modal>
                      </>
                    )}
                    {product.offer && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                        {product.offer}
                      </span>
                    )}
                    <Typography variant="h6" className="font-extrabold text-red-500 mb-2">{product.productName}</Typography>
                    <Typography variant="subtitle2" className="text-gray-600 mb-2">Category: {product.category}</Typography>
                    <Typography variant="subtitle2" className="text-gray-600 mb-2">Pattern: {product.pattern}</Typography>

                    <Typography variant="h6" className="font-bold text-red-600 mb-2">Price: ₹{product.price.toFixed(2)}</Typography>
                    <div className="flex flex-col items-center">
                      <Typography variant="caption" className="text-gray-600 mb-2">Description: {product.description}</Typography>
                      <Typography variant="caption" className="text-gray-600 mb-2">Gender: {product.gender}</Typography>
                      {/* <Typography variant="caption" className="text-gray-600 mb-2">Available Quantity: {product.quantity}</Typography> */}

                      <Typography variant="caption" className="text-gray-600 mb-2">CareInstructions: {product.careInstructions}</Typography>

                      {cart[product.productId] ? (
                        <div className="flex items-center mb-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleQuantityChange(product.productId, -1)}
                            disabled={(cart[product.productId] || 0) <= 0}
                            className="mr-2"
                          >
                            -
                          </Button>
                          <Typography variant="h6" className="mx-2">
                            {cart[product.productId] || 0}
                          </Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleQuantityChange(product.productId, 1)}
                            className="ml-2"
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleBuyNow(product.productId)}
                          className="mt-2 flex items-center"
                        >
                          <FaShoppingCart className="mr-2" />
                          Buy Now
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToCart(product.productId)}
                        className="mt-2 flex items-center"
                      >
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" className="text-gray-600">No products found</Typography>
            )}
          </Grid>

          <div className="mt-8">
            <Typography variant="h5" className="font-bold mb-4 text-gray-800">Recommended for You</Typography>
            <Grid container spacing={4}>
              {recommendations.length > 0 ? (
                recommendations.map(product => (
                  <Grid item xs={12} sm={6} md={4} key={product.productId}>
                    <div className="relative bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105">
                      {product.imageName && (
                        <>
                          <img
                            src={`http://localhost:7777/AdminProduct/findProdImage/${product.productId}`}
                            alt={product.productName}
                            className="w-full h-60 object-cover rounded-lg mb-4 cursor-pointer"
                            onClick={() => setSelectedImage(`http://localhost:7777/AdminProduct/findProdImage/${product.productId}`)}
                          />
                          <Modal
                            open={!!selectedImage}
                            onClose={() => setSelectedImage('')}
                            className="flex items-center justify-center"
                          >
                            <div className="bg-white p-4 rounded-lg max-w-lg mx-auto">
                              <img
                                src={selectedImage}
                                alt="Full Size"
                                className="max-w-full max-h-screen"
                              />
                            </div>
                          </Modal>
                        </>
                      )}
                      {product.offer && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                          {product.offer}
                        </span>
                      )}
                      <Typography variant="h6" className="font-semibold text-gray-800 mb-2">{product.productName}</Typography>
                      <Typography variant="subtitle2" className="text-gray-600 mb-2">Category: {product.category}</Typography>
                      <Typography variant="h6" className="font-bold text-red-600 mb-2">Price: ₹{product.price.toFixed(2)}</Typography>
                      <div className="flex flex-col items-center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddToCart(product.productId)}
                          className="mt-2 flex items-center"
                        >
                          <FaShoppingCart className="mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" align="center" className="text-gray-600">No recommendations available</Typography>
              )}
            </Grid>
          </div>

          <div className="text-center mt-6">
            <Typography variant="h5" className="font-bold mb-4 text-gray-800">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </Typography>
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={handleCheckout}
              disabled={Object.keys(cart).length === 0} 
              className="mt-4"
            >
              Checkout
            </Button> */}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 lg:w-1/4 lg:h-auto w-full bg-white shadow-lg p-4">
        <Typography variant="h6" className="font-semibold mb-2">Cart Details</Typography>
        <Grid container spacing={2}>
          {Object.keys(cart).map(productId => {
            const product = cartDetails[productId];
            if (!product) return null;

            return (
              <Grid item xs={12} sm={6} md={4} key={productId}>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
                  {product.imageName && (
                    <img
                      src={`http://localhost:7777/AdminProduct/findProdImage/${productId}`}
                      alt={product.productName}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                  )}
                  <div className="flex-1">
                    <Typography variant="h6" className="font-semibold">{product.productName}</Typography>
                    <Typography variant="subtitle2" className="text-gray-600">Price: ₹{product.price.toFixed(2)}</Typography>
                    <Typography variant="body2" className="text-gray-600">Quantity: {cart[productId]}</Typography>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
        <div className="mt-4 text-center">
          <Typography variant="h5" className="font-bold mb-4 text-gray-800">
            Total Amount: ₹{totalAmount.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/payment', { state: { cartItems: Object.keys(cart).map(productId => ({ productId, quantity: cart[productId], price: cartDetails[productId]?.price || 0 })), totalAmount } })}
            className="w-full"
            disabled={Object.keys(cart).length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;







