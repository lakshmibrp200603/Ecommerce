import React from "react";

export default function Cart({ cart = [] }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Cart</h2>

      {cart.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{item.title}</h3>
            <p>₹ {item.price}</p>

            <button
              style={{
                background: "red",
                color: "white",
                padding: "5px 10px",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}