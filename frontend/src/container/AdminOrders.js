import React, { useEffect, useState } from "react";
import { supabase } from "../Services/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setOrders(data);
  };

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (!error) {
      fetchOrders();
      setSelectedOrder((prev) =>
        prev?.id === id ? { ...prev, status } : prev
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f59e0b";
      case "Processing":
        return "#3b82f6";
      case "Shipped":
        return "#8b5cf6";
      case "Delivered":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f5f7fb", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate(-1)} style={btnStyle}>
          ⬅ Back
        </button>

        <h2>All Orders</h2>
      </div>

      {/* ORDER LIST */}
      <div style={{ marginTop: "20px" }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={cardStyle}
          >
            <div>
              <p style={{ fontSize: "12px", color: "#6b7280" }}>
                ORDER ID
              </p>
              <p style={{ fontWeight: "bold" }}>{order.id}</p>
            </div>

            <div>
              <p
                style={{
                  padding: "5px 10px",
                  borderRadius: "20px",
                  background: getStatusColor(order.status),
                  color: "#fff",
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                {order.status}
              </p>
            </div>

            <div>
              <p>₹ {order.price}</p>
            </div>

            

            <button
              onClick={() => setSelectedOrder(order)}
              style={viewBtn}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      {selectedOrder && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            
            <h2>Order Details</h2>

            <p><b>Order ID:</b> {selectedOrder.id}</p>
            <p><b>User:</b> {selectedOrder.user_email}</p>
            <p><b>Product:</b> {selectedOrder.product_title}</p>
            <p><b>Price:</b> ₹{selectedOrder.price}</p>
            <p><b>Qty:</b> {selectedOrder.qty}</p>
            <p>
              <b>Total:</b> ₹{selectedOrder.price * selectedOrder.qty}
            </p>

            <p>
              <b>Date:</b>{" "}
              {new Date(selectedOrder.created_at).toLocaleString()}
            </p>

            <hr />

            <label>Status</label>
            <select
              value={selectedOrder.status}
              onChange={(e) =>
                updateStatus(selectedOrder.id, e.target.value)
              }
              style={selectStyle}
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>

            <br />

            <button
              onClick={() => setSelectedOrder(null)}
              style={closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */
const cardStyle = {
  background: "#fff",
  padding: "15px",
  marginBottom: "12px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const btnStyle = {
  padding: "8px 12px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
};

const viewBtn = {
  padding: "8px 12px",
  background: "#f97316",
  border: "none",
  color: "#fff",
  borderRadius: "8px",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalBox = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
};

const closeBtn = {
  marginTop: "15px",
  padding: "8px 12px",
  border: "none",
  background: "#111",
  color: "#fff",
  borderRadius: "8px",
  cursor: "pointer",
};