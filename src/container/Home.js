import React, { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "../container/Dashboard";


import ProductDetails from "./ProductDetails";
import Header from "../components/Header";
import { getProducts } from "../Services/productService";
import LoaderIcon from "@iconify-react/codex/loader";

function Home() {

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const handleLogout =()=>{
    localStorage.removeItem("token");
    console.log("REMOVE");
    navigate("/");
  }

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();

        console.log(data);

        setProducts(data);
       
      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  const addToCart = (product) => {

    setCart([...cart, product]);

    console.log(product);
  };

  // Loading Screen
  if (loading) {

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >

      <LoaderIcon height="6em" />

      <h2>
        Loading Products...
      </h2>

    </div>
  );
}

  return (

    <div>
      <Header handleLogout={handleLogout} />
      <h1
        style={{
          textAlign: "center"
        }}
      >
     Cart: {cart.length}
      </h1>

      <Routes>

        <Route
          path="/"
          element={
            <Dashboard
              products={products}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

      </Routes>

    </div>
  );
}

export default Home;