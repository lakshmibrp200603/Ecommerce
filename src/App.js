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
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

      
  <Route
    path="/cart"
    element={<Cart />}
  />
</Routes>

    </HashRouter>
  );
}

export default App;