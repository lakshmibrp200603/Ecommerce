import React, { useEffect, useState } from "react";
import Dashboard from "../container/Dashboard";
import { getProducts } from "../Services/productService";
import LoaderIcon from "@iconify-react/codex/loader";

function Home({
  cart = [],
  setCart,
  searchTerm = "",
}) {
  console.log("Cart from App:", cart);

  const [products, setProducts] = useState([]);
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
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              qty: (item.qty || 1) + 1,
            }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoaderIcon height="6em" />
        <h2>Loading Products...</h2>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "80px" }}>
      <Dashboard
        products={filteredProducts}
        addToCart={addToCart}
      />
    </div>
  );
}

export default Home;