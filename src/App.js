import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Drawer } from './components/Drawer';
import { Home } from './components/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import Register from './pages/Register';
import { Navbar } from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressNew from './pages/ShippingAddressNew';
import ShippingAddress from './pages/ShppingAddress';
import LandingPage from './pages/LandingPage';
import ProductDetails from './pages/ProductDetails';
import DirectCheckout from './pages/DirectCheckout';
import MyOrders from './pages/MyOrders';
import MyOrderDetail from './pages/MyOrderDetail';
import MyCart from './pages/MyCart';
import Checkout from './pages/Checkout';
import RegisterValidation from './pages/RegisterValidation';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/validation/register" element={<RegisterValidation/>}/>
          <Route path="/auth/forgot-password" element={<ForgotPassword/>} />
          <Route path="/forgot-password/:userId/:token" element={<ResetPassword/>} />
          <Route path="/" element={<Navbar />} >
            <Route path='/' element={<LandingPage/>}/>
            <Route path="/oke" elemetn={<div>Oke nice progress</div>} />
            <Route path="/customers/address" element={<ShippingAddress/>} />
            <Route path="/customers/address/new" element={<ShippingAddressNew/>} />
            <Route path="/customers/myorders" element={<MyOrders/>} />
            <Route path="/customers/myorders/:id" element={<MyOrderDetail/>} />
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            <Route path="/cart" element={<MyCart/>} />
            <Route path="/cart/checkout" element={<Checkout/>}/>
            <Route path="/products/:productId" element={<ProductDetails/>}/>
            <Route path="/shopping-cart/direct-checkout" element={<DirectCheckout/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
