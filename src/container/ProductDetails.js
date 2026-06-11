import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../Services/productService";

export default function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

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

  alert("Added to Cart");
   
  
};

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ padding: "40px" }}>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#ff5722",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ⬅ Back
      </button>

      {/* PRODUCT IMAGE */}
      <div style={{ textAlign: "LEFT" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
          }}
        />

        <h1>{product.title}</h1>
        <h2>₹ {product.price}</h2>
        <p>{product.description}</p>

        {/* ADD TO CART */}
        <button
          onClick={() => addToCart(product)}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🛒 Add To Cart
        </button>
      </div>

    </div>
  );
}