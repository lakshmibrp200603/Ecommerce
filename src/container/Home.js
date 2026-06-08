import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

import Dashboard from "../container/Dashboard";


import ProductDetails from "./ProductDetails";
import Header from "../components/Header";
import { getProducts } from "../Services/productService";
import LoaderIcon from "@iconify-react/codex/loader";

function Home() {

  const [products, setProducts] = useState([]);
  
  

  const [cart, setCart] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");

 

  const [loading, setLoading] = useState(true);
  const filteredProducts = products.filter((item) =>
  item.title?.toLowerCase().includes(searchTerm.toLowerCase())
);
  

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
      <Header
  cartCount={cart.length}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>

      <Routes>

        <Route
          path="/"
          element={
            <Dashboard
  products={filteredProducts}
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