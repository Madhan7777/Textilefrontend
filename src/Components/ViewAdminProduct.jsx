// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Button,
//   Box
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote"; // Add this import for the Request Stock icon
// import { styled } from "@mui/material/styles";
// import AdminHeader from "./AdminHeader";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   backgroundColor: theme.palette.grey[300],
//   color: theme.palette.text.primary,
//   fontWeight: 'bold',
//   textAlign: 'center',
//   padding: theme.spacing(2),
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:nth-of-type(even)': {
//     backgroundColor: theme.palette.background.default,
//   },
//   '&:hover': {
//     backgroundColor: theme.palette.action.selected,
//   },
// }));

// const TableHeader = styled(TableHead)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
// }));

// const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
//   boxShadow: theme.shadows[3],
//   marginTop: theme.spacing(3),
//   borderRadius: theme.shape.borderRadius,
// }));

// function ViewAdminProduct() {
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:7777/AdminProduct/findAllProduct")
//       .then((response) => {
//         setRecords(response.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleDelete = (productId) => {
//     const conf = window.confirm("Do you want to delete?");
//     if (conf) {
//       axios
//         .delete(`http://localhost:7777/AdminProduct/deleteProduct/${productId}`)
//         .then((res) => {
//           alert("Record has been deleted");
//           setRecords(records.filter((record) => record.productId !== productId));
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   return (
//     <div id="view-admin-product" style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f5f5' }}>
//       <AdminHeader />
//       <div className="container" style={{ maxWidth: '1200px', margin: 'auto', position: 'relative' }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Product Details
//         </Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//           <Button
//             component={Link}
//             to="/addproduct"
//             variant="contained"
//             color="primary"
//             startIcon={<AddCircleIcon />}
//             sx={{ textTransform: 'none', marginRight: 1 }}
//           >
//             Add Product
//           </Button>
//           <Button
//             component={Link}
//             to="/adminrequest" 
//             variant="contained"
//             color="secondary"
//             startIcon={<RequestQuoteIcon />}
//             sx={{ textTransform: 'none' }}
//           >
//             Request Stock
//           </Button>
//         </Box>
//         <TableContainerStyled component={Paper}>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <StyledTableCell>Product ID</StyledTableCell>
//                 <StyledTableCell>Image</StyledTableCell>
//                 <StyledTableCell>Category</StyledTableCell>
//                 <StyledTableCell>Product Name</StyledTableCell>
//                 <StyledTableCell>Description</StyledTableCell>
//                 <StyledTableCell>Price</StyledTableCell>
//                 <StyledTableCell>Quantity</StyledTableCell>
//                 <StyledTableCell>Brand</StyledTableCell>
//                 <StyledTableCell>Material</StyledTableCell>
//                 <StyledTableCell>Color</StyledTableCell>
//                 <StyledTableCell>Pattern</StyledTableCell>
//                 <StyledTableCell>Size</StyledTableCell>
//                 <StyledTableCell>Gender</StyledTableCell>
//                 <StyledTableCell>Care Instructions</StyledTableCell>
//                 <StyledTableCell>Action</StyledTableCell>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {records.map((d) => (
//                 <StyledTableRow key={d.productId}>
//                   <TableCell align="center">{d.productId}</TableCell>
//                   <TableCell align="center">
//                     {d.imageName ? (
//                       <img
//                         src={`http://localhost:7777/AdminProduct/findProdImage/${d.productId}`}
//                         alt={d.imageName}
//                         style={{ width: '100px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
//                       />
//                     ) : (
//                       'No Image'
//                     )}
//                   </TableCell>
//                   <TableCell align="center">{d.category}</TableCell>
//                   <TableCell align="center">{d.productName}</TableCell>
//                   <TableCell align="center">{d.description}</TableCell>
//                   <TableCell align="center">₹{d.price.toFixed(2)}</TableCell>
//                   <TableCell align="center">{d.quantity}</TableCell>
//                   <TableCell align="center">{d.brand}</TableCell>
//                   <TableCell align="center">{d.material}</TableCell>
//                   <TableCell align="center">{d.color}</TableCell>
//                   <TableCell align="center">{d.pattern}</TableCell>
//                   <TableCell align="center">{d.size}</TableCell>
//                   <TableCell align="center">{d.gender}</TableCell>
//                   <TableCell align="center">{d.careInstructions}</TableCell>
//                   <TableCell align="center">
//                     <IconButton
//                       component={Link}
//                       to={`/editadminproduct/${d.productId}`}
//                       color="success"
//                       style={{ marginRight: '10px' }}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       onClick={() => handleDelete(d.productId)}
//                       color="error"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainerStyled>
//       </div>
//     </div>
//   );
// }

// export default ViewAdminProduct;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote"; 
import AdminHeader from "./AdminHeader";

function ViewAdminProduct() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7777/AdminProduct/findAllProduct")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (productId) => {
    const conf = window.confirm("Do you want to delete?");
    if (conf) {
      axios
        .delete(`http://localhost:7777/AdminProduct/deleteProduct/${productId}`)
        .then((res) => {
          alert("Record has been deleted");
          setRecords(records.filter((record) => record.productId !== productId));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="font-sans p-3 bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="container mx-auto max-w-screen-xl relative">
        <Typography variant="h4" align="center" className="mb-6 text-gray-800 font-bold text-3xl">
          Product Details
        </Typography>
        <Box className="flex justify-end mb-4">
          <Button
            component={Link}
            to="/addproduct"
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            className="text-white bg-blue-500 hover:bg-blue-600 mr-2"
          >
            Add Product
          </Button>
          {/* <Button
            component={Link}
            to="/adminrequest"
            variant="contained"
            color="secondary"
            startIcon={<RequestQuoteIcon />}
            className="text-white bg-red-500 hover:bg-red-600"
          >
            Request Stock
          </Button> */}
        </Box>
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Product ID</th>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Brand</th>
                <th className="px-6 py-3 text-left">Material</th>
                <th className="px-6 py-3 text-left">Color</th>
                <th className="px-6 py-3 text-left">Pattern</th>
                <th className="px-6 py-3 text-left">Size</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Care Instructions</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((d) => (
                <tr key={d.productId} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{d.productId}</td>
                  <td className="px-6 py-4">
                    {d.imageName ? (
                      <img
                        src={`http://localhost:7777/AdminProduct/findProdImage/${d.productId}`}
                        alt={d.imageName}
                        className="w-24 h-auto rounded-lg shadow-md"
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.productName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">₹{d.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.brand}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.material}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.color}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.pattern}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.careInstructions}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <Button
                      component={Link}
                      to={`/editadminproduct/${d.productId}`}
                      variant="contained"
                      color="success"
                      className="mr-2"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(d.productId)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewAdminProduct;

