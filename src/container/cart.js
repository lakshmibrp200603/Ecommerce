import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart = [], setCart }) {
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * (item.qty || 1),
    0
  );

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );
    setCart(updatedCart);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "15px",
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

      <h2>My Cart</h2>

      {cart.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                }}
              />

              <div>
                <h3>{item.title}</h3>

                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  ₹ {(item.price * (item.qty || 1)).toFixed(2)}
                </p>

                <p>
                  Quantity: {item.qty || 1}
                </p>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* PRODUCTS KEELA TOTAL */}
          <h3 style={{ color: "green" }}>
            Total Amount: ₹{" "}
            {totalAmount.toFixed(2)}
          </h3>

          {/* TOTAL KEELA BUTTON */}
          <button
            onClick={() =>
              navigate("/order-placed")
            }
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}