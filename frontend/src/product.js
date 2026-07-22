import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        width: "250px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      {/* NAME */}
      <h3>{product.name}</h3>

      {/* PRICE */}
      <p
        style={{
          color: "green",
          fontWeight: "bold"
        }}
      >
        ₹ {product.price}
      </p>

      {/* STOCK */}
      {product.stock ? (
        <p style={{ color: "green" }}>
          Available
        </p>
      ) : (
        <p style={{ color: "red" }}>
          Out Of Stock
        </p>
      )}

      {/* BUTTON */}
      <button
        disabled={!product.stock}
        onClick={() => addToCart(product)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: product.stock ? "orange" : "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: product.stock ? "pointer" : "not-allowed"
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}