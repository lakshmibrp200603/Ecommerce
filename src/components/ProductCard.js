import React from "react";

import {
  useNavigate
} from "react-router-dom";

export default function ProductCard({
  product,
  addToCart
}) {

  const navigate = useNavigate();

  return (

    <div
      style={{
        width: "250px",
        border: "1px solid gray",
        padding: "10px",
      }}
    >

      {/* IMAGE CLICK */}
      <img
        src={product.image}
        alt={product.title}

        style={{
          width: "100%",
          height: "250px",
          objectFit: "contain",
          cursor: "pointer"
        }}

        onClick={() =>
          navigate(
            `/product/${product.id}`
          )
        }
      />

      <h2>
        {product.title}
      </h2>

      <p>
        ₹ {product.price}
      </p>

      <button
        onClick={() =>
          addToCart(product)
        }
        style={{
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  }}

      >
        Add To Cart
      </button>

    </div>
  );
}