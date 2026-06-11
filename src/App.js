import React, { useState } from "react";

import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./container/Login";

import Home from "./container/Home";

import ProductDetails from "./container/ProductDetails";
import Cart from "./container/Cart";
import Orders from "./container/Orders";
import Wishlist from "./container/Wishlist";
import Header from "./components/Header";
import OrderPlaced from "./container/OrderPlaced";



function App() {
  const [cart, setCart] = useState([]);
  

  return (
    

   <HashRouter>
    

      <Routes> 

        <Route
          path="/"
          element={<Login />}
        />

        <Route
  path="/home"
  element={
    <Home
      cart={cart}
      setCart={setCart}
    />
  }
/> 
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
  path="/cart"
  element={
    <Cart
      cart={cart}
      setCart={setCart}
    />
  }
/>
<Route
  path="/profile"
  element={<h1>My Profile</h1>}
/>

<Route
  path="/orders"
  element={<Orders />}
/>

<Route
  path="/wishlist"
  element={<Wishlist />}
/>
<Route
  path="/order-placed"
  element={
    <OrderPlaced
      cart={cart}
      setCart={setCart}
    />
  }
/> 
</Routes>

    </HashRouter>
  );
}

export default App;