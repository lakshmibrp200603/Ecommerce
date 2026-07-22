import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../Services/supabase";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [showImage, setShowImage] = useState(false);
useEffect(() => {
  fetchOrder();
}, [id]);

  async function fetchOrder() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    } else {
      setOrder(data);
    }
  }

  if (!order) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  const steps = [
    "Pending",
    "Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = steps.indexOf(order.status);

 return (
  <div className="order-page">

    <button className="back-btn" onClick={() => navigate(-1)}>
      ← Back
    </button>

    <div className="status-card">
      <h2>{order.status}</h2>
      <p>
        Ordered on {new Date(order.created_at).toLocaleString()}
      </p>
    </div>

    <div className="order-card">

      <h2>Order Details</h2>

      <div className="product-section">
<img
  src={order.product_image}
  alt={order.product_title}
  className="product-image"
  onClick={() => navigate(`/product/${order.product_id}`)}
  style={{
    width: "180px",
    height: "180px",
    objectFit: "contain",
    cursor: "pointer",
  }}
/>

        <div className="product-info">

          <h3>{order.product_title}</h3>

          <p><b>Price:</b> ₹{order.price}</p>

          <p><b>Quantity:</b> {order.qty}</p>

          <p><b>Total:</b> ₹{order.price * order.qty}</p>

          <p><b>Order ID:</b> #{order.id}</p>

          <p><b>Status:</b> {order.status}</p>

        </div>

      </div>

      <hr />

      <h3>Order Tracking</h3>

      <div className="tracking">

        {steps.map((step, index) => (

          <div
            key={step}
            className={`step ${index <= currentStep ? "active" : ""}`}
          >

            <div className="circle">✓</div>

            <p>{step}</p>

          </div>

        ))}

      </div>

      <hr />

            <div className="address-box">

        <h3>Delivery Address</h3>

        <p><b>Name:</b> {order.customer_name}</p>

        <p><b>Phone:</b> {order.customer_phone}</p>

        <p><b>Address:</b> {order.delivery_address}</p>

      </div>

    </div>

    {showImage && (
      <div
        className="image-overlay"
        onClick={() => setShowImage(false)}
      >
        <img
          src={order.product_image}
          alt={order.product_title}
          className="popup-image"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )}

  </div>
);
}