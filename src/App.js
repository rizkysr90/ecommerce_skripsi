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

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} >
            <Route path='/' element={<LandingPage/>}/>
            <Route path="/oke" elemetn={<div>Oke nice progress</div>} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/customers/address" element={<ShippingAddress/>} />
            <Route path="/customers/address/new" element={<ShippingAddressNew/>} />
            <Route path="/customers/myorders" element={<MyOrders/>} />
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            <Route path="/auth/register" element={<Register/>} />
            <Route path="/products/:categoryName/:productId" element={<ProductDetails/>}/>
            <Route path="/shopping-cart/direct-checkout" element={<DirectCheckout/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
