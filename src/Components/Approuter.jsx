import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRegister from './CustomerRegister';
import CustomerLogin from './CustomerLogin';
import CustomerNavbar from './CustomerNavbar';
import AdminLogin from './AdminLogin';
import AdminNavbar from './AdminNavbar';
import AddAdminProduct from './AddAdminProduct';
import ViewAdminProduct from './ViewAdminProduct';
import EditAdminProduct from './EditAdminProduct';
import AdminHeader from './AdminHeader';
import CustomerView from './CustomerView';
import CustomerHeader from './CustomerHeader';
import CartPage from './CartPage';
import PaymentForm from './PaymentForm';
import OrderHistory from './OrderHistory';
import AdminDashboard from './AdminDashboard';
import AddOrderTracking from './AddOrderTracking';
import ViewOrderTracking from './ViewOrderTracking';
import CustomerOrderTracking from './CustomerOrderTracking';
import SupplierLogin from './SupplierLogin';
import SupplierNavbar from './SupplierNavbar';
import CreateProductRequest from './CreateProductRequest';
import AdminProductRequest from './AdminProductRequest';
import ViewProductRequests from './ViewProductRequest';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Summary from './Summary';
import AllOrders from './AllOrders';
import CustomerDisplay from './CustomerDisplay';


function Approuter() {
  return (
   <Router>
    <Routes>
        <Route path="/" element={<Navbar/>}/>
        <Route path="/customerregister" element={<CustomerRegister/>}/>
        <Route path="/customerlogin" element={<CustomerLogin/>}/>
        <Route path="/customernavbar" element={<CustomerNavbar/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/adminnavbar" element={<AdminNavbar/>}/>
        <Route path="/addproduct" element={<AddAdminProduct/>}/>
        <Route path="/viewadminproduct" element={<ViewAdminProduct/>}/>
        <Route path="/editadminproduct/:id" element={<EditAdminProduct/>}/>
        <Route path="/adminheader" element={<AdminHeader/>}/>
        <Route path="/customerview" element={<CustomerView/>}/>
        <Route path="/customerheader" element={<CustomerHeader/>}/>
        <Route path="/cartpage" element={<CartPage/>}/>
        <Route path="/payment" element={<PaymentForm/>}/>
        <Route path="/orderhistory" element={<OrderHistory/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/addtracking" element={<AddOrderTracking/>}/>
        <Route path="/viewtracking" element={<ViewOrderTracking/>}/>
        <Route path="/customertracking" element={<CustomerOrderTracking/>}/>
        <Route path="/supplierlogin" element={<SupplierLogin/>}/>
        <Route path="/suppliernavbar" element={<SupplierNavbar/>}/>
        <Route path="/createrequest" element={<CreateProductRequest/>}/>
        <Route path="/adminrequest" element={<AdminProductRequest/>}/>
        <Route path="/viewrequest" element={<ViewProductRequests/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/summary" element={<Summary/>}/>
        <Route path="/allorder" element={<AllOrders/>}/>
        <Route path="/display" element={<CustomerDisplay/>}/>




        

























    </Routes>
   </Router>
  )
}

export default Approuter