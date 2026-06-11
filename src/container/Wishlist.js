import React from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Back Button */}
    <button
  onClick={() => navigate(-1)}
  style={{
    padding: "8px 15px",
    marginBottom: "15px",
    cursor: "pointer",
    backgroundColor: "orange",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }}
>
  ⬅ Back
</button>

      <h2>My Wishlist</h2>

      {/* your wishlist items */}
    </div>
  );
}