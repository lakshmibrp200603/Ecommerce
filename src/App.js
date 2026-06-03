import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./container/Loign";

import Home from "./container/Home";

import ProductDetails from "./container/ProductDetails";

function App() {

  return (

    <BrowserRouter>

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;