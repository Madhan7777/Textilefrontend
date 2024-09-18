import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const ViewProductRequests = () => {
  const [productRequests, setProductRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductRequests = async () => {
      try {
        const response = await axios.get("http://localhost:7777/product-request/all");
        setProductRequests(response.data);
      } catch (err) {
        setError("Failed to load product requests.");
      }
    };

    fetchProductRequests();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Product Requests
      </Typography>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Request ID</TableCell>
              <TableCell align="center">Admin Product ID</TableCell>
              <TableCell align="center">Supplier ID</TableCell>
              <TableCell align="center">Requested Quantity</TableCell>
              <TableCell align="center">Supplied Quantity</TableCell>
              <TableCell align="center">Request Date</TableCell>
              <TableCell align="center">Response Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productRequests.map((request) => (
              <TableRow key={request.requestId}>
                <TableCell align="center">{request.requestId}</TableCell>
                <TableCell align="center">{request.adminProduct?.adminProductId}</TableCell>
                <TableCell align="center">{request.supplier?.supplierId}</TableCell>
                <TableCell align="center">{request.requestedQuantity}</TableCell>
                <TableCell align="center">{request.suppliedQuantity ?? "N/A"}</TableCell>
                <TableCell align="center">{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">{request.responseDate ? new Date(request.responseDate).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell align="center">{request.status}</TableCell>
                <TableCell align="center">{request.comments ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewProductRequests;
