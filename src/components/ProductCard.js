import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {

  const [liked, setLiked] = useState(false); // ✅ HERE ONLY

  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "260px",
        backgroundColor: "#4b484831",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
        cursor: "pointer",
        position: "relative"   // ✅ IMPORTANT for heart position
      }}
    >

      {/* ❤️ LIKE BUTTON */}
      <button
        onClick={() => setLiked(!liked)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
          background: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        {liked ? "" : ""}
      </button>

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: "140px",
          objectFit: "contain",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/product/${product.id}`)}
      />

      {/* TITLE */}
      <h2 style={{ fontSize: "14px", height: "15px", overflow: "hidden",margin:"8px 0" }}>
        {product.title}
      </h2>

      {/* PRICE */}
      <h3 style={{ color: "#f70d0d", margin: "5px 0", fontWeight: "bold" }}>
        ₹ {product.price}
      </h3>

      <p style={{ color: "#055c14", fontWeight: "bold" }}>
        ⭐ {product.rating?.rate}
      </p>

    </div>
  );
}