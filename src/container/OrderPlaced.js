import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderPlaced({ cart, setCart }) {
  const navigate = useNavigate();

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  console.log("OrderPlaced Page Cart:", cart);
alert(`Cart Items: ${cart.length}`);

 const handleBuyNow = () => {
  const oldOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const newOrders = [...oldOrders, ...cart];

  localStorage.setItem(
    "orders",
    JSON.stringify(newOrders)
  );

  alert("Order Confirmed 🎉");

  setCart([]);

  navigate("/orders");
};

 return (
  <div style={{ padding: "30px", textAlign: "center" }}>

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

    <h1>Order Placed Working ✅</h1>

    <p>Cart Items: {cart.length}</p>

    <h2>Grand Total: ₹{grandTotal}</h2>

    <button onClick={handleBuyNow}>
      Buy Now
    </button>

  </div>
);
}