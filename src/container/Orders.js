import React from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <button
  onClick={() => navigate(-1)}
  style={{
    marginBottom: "20px",
    padding: "8px 14px",
    backgroundColor: "#ff5722",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  ⬅ Back
</button>
      <h1> My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
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

            <p>
              ₹ {item.price}
            </p>

            <p>
              Qty: {item.qty || 1}
            </p>
          </div>
        ))
      )}
    </div>
  );
}