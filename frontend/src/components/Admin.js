import React from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>

      <button
        className="btn btn-success me-2"
        onClick={() => navigate("/admin/add-product")}
      >
        Add Product
      </button>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/admin/products")}
      >
        Manage Products
      </button>
    </div>
  );
}