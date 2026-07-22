import React from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();

  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 15px",
          marginBottom: "15px",
          cursor: "pointer",
          backgroundColor: "orange",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        ⬅ Back
      </button>

      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <h3>No Wishlist Items</h3>
      ) : (
        wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />

            <h3>{item.title}</h3>

            <p>₹ {item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}