import React from "react";
export default function Cart({Cart}) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>onClick</h2>

      {cart.length === 0 ? (
        <h3>Add To cart</h3>
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
            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>

            <button
              onClick={() => onClick(item.id)}
              style={{
                background: "red",
                color: "white",
                padding: "5px 10px",
              }}
            >
            </button>
          </div>
        ))
      )}
    </div>
  );
}