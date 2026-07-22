import React from "react";
import { useNavigate } from "react-router-dom";


import {
  FiHome,
  FiPlusSquare,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
   

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2 className="admin-logo">Admin Panel</h2>

          <div
            className="admin-menu-item active"
            onClick={() => navigate("/admin")}
          >
            <FiHome />
            <span>Dashboard</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/add-product")}
          >
            <FiPlusSquare />
            <span>Add Product</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/manage-products")}
          >
            <FiBox />
            <span>Manage Products</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/admin-orders")}
          >
            <FiShoppingBag />
            <span>Manage Orders</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/users")}
          >
            <FiUsers />
            <span>Users</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/settings")}
          >
            <FiSettings />
            <span>Settings</span>
          </div>
        </aside>

        <div className="admin-content">
          <h1 className="admin-title">Dashboard</h1>

          <div className="admin-cards">
            <div
              className="admin-card"
              onClick={() => navigate("/manage-products")}
            >
              <p>Products</p>
              <h2>20</h2>
            </div>

            <div
              className="admin-card"
              onClick={() => navigate("/admin-orders")}
            >
              <p>Orders</p>
              <h2>25</h2>
            </div>

            <div
              className="admin-card"
              onClick={() => navigate("/users")}
            >
              <p>Users</p>
              <h2>15</h2>
            </div>

            <div
              className="admin-card"
              onClick={() => alert("Revenue Page Coming Soon")}
            >
              <p>Revenue</p>
              <h2>₹2,000</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}