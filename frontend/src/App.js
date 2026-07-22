import React, { useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "./container/Login";
import Register from "./container/Register";
import Home from "./container/Home";
import ProductDetails from "./container/ProductDetails";
import Cart from "./container/Cart";
import Orders from "./container/Orders";
import Wishlist from "./container/Wishlist";
import MyProfile from "./container/MyProfile";
import OrderDetails from "./container/OrderDetails";




import Header from "./components/Header";
import AddProduct from "./components/AddProduct";

import AdminDashboard from "./container/AdminDashboard";
import ManageProducts from "./container/ManageProducts";
import AdminOrders from "./container/AdminOrders";
import AdminUsers from "./container/AdminUsers";
import AdminUserDetails from "./container/AdminUserDetails";
import Checkout from "./container/Checkout";

function AppContent() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  // Login page- Header hide
  const showHeader = location.pathname !== "/";

  return (
    <>
      {showHeader && (
       <Header
  cartCount={cart.length}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
      )}

      <div style={{ marginTop: showHeader ? "70px" : "0" }}>
        <Routes>

          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Register */}
          <Route path="/register" element={<Register />} />

          {/* Home */}
          <Route
            path="/home"
            element={
             <Home
  cart={cart}
  setCart={setCart}
  searchTerm={searchTerm}
/>
            }
          />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                cart={cart}
                setCart={setCart}
              />
            }
          />
          <Route
  path="/checkout"
  element={
    <Checkout
      cart={cart}
      setCart={setCart}
    />
  }
/>

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
              />
            }
          />
          <Route path="/order/:id" element={<OrderDetails />} />

          {/* Orders */}
          <Route
            path="/orders"
            element={<Orders />}
          />

          {/* Wishlist */}
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route path="/profile" element={<MyProfile />} />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              localStorage.getItem("role") === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          {/* Admin Users */}
          <Route
            path="/users"
            element={<AdminUsers />}
          />

          {/* User Details */}
         <Route
  path="/admin/user/:email"
  element={<AdminUserDetails />}
/>

          {/* Admin Orders */}
          <Route
            path="/admin-orders"
            element={<AdminOrders />}
          />

          {/* Add Product */}
          <Route
            path="/add-product"
            element={<AddProduct />}
          />

          {/* Manage Products */}
          <Route
            path="/manage-products"
            element={<ManageProducts />}
          />

        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;