import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";

import {
  FiShoppingCart,
  FiHome,
  FiX,
  FiPlus,
  FiBox,
  FiUsers,
} from "react-icons/fi";

import { FaUserCircle } from "react-icons/fa";


export default function Header({
  cartCount = 0,
  searchTerm = "",
  setSearchTerm = () => {},
}) {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <>
      <div style={styles.header}>
        {/* LOGO */}
        <h1 style={styles.logo}>Prime Pick</h1>

        {/* ADMIN MENU */}
        {role === "admin" && (
          <div
            style={styles.iconBox}
            onClick={() => setShowSidebar(true)}
            title="Admin Panel"
          >
          </div>
        )}

        {/* HOME */}
        <div
          style={styles.iconBox}
          onClick={() => navigate("/home")}
          title="Home"
        >
          <FiHome size={22} />
        </div>
 

        {/* SEARCH */}
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />
  {role === "admin" && (
  <button
    onClick={() => navigate("/admin")}
    style={{
      background: "transparent",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px",
    }}
    title="Admin Panel"
  >
    <MdAdminPanelSettings size={28} />
  </button>
)}

        {/* CART */}
        <div
          style={styles.cartBox}
          onClick={() => navigate("/cart")}
          title="Cart"
        >
          <FiShoppingCart size={22} />

          {cartCount > 0 && (
            <span style={styles.badge}>{cartCount}</span>
          )}
        </div>

        {/* PROFILE */}
        <div
          style={{ position: "relative" }}
         onClick={() => setShowDropdown(!showDropdown)}
        >
          <div style={styles.iconBox}>
            <FaUserCircle size={24} />
          </div>

          {token && showDropdown && (
            <div style={styles.dropdown}>
              <div
                style={styles.menuItem}
                onClick={() => navigate("/profile")}
              >
                My Profile
              </div>

              <div
                style={styles.menuItem}
                onClick={() => navigate("/orders")}
              >
                Orders
              </div>

              <div
                style={styles.menuItem}
                onClick={() => navigate("/wishlist")}
              >
                Wishlist
              </div>

              <div
                style={styles.logout}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      {showSidebar && role === "admin" && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setShowSidebar(false)}
          />

          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <h3>Admin Panel</h3>

              <FiX
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => setShowSidebar(false)}
              />
            </div>

            <div
              style={styles.sidebarItem}
              onClick={() => {
                navigate("/add-product");
                setShowSidebar(false);
              }}
            >
              <FiPlus size={20} />
              <span>Add Product</span>
            </div>

            <div
              style={styles.sidebarItem}
              onClick={() => {
                navigate("/manage-products");
                setShowSidebar(false);
              }}
            >
              <FiBox size={20} />
              <span>Manage Products</span>
            </div>

            <div
              style={styles.sidebarItem}
              onClick={() => {
                navigate("/users");
                setShowSidebar(false);
              }}
              
            >
              <FiUsers size={20} />
              <span>Users</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const styles = {
  header: {
    backgroundColor: "#143a30",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 20px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
  },

  search: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
  },

  iconBox: {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cartBox: {
    position: "relative",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "10px",
  },

  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    background: "red",
    color: "#fff",
    borderRadius: "50%",
    minWidth: "18px",
    height: "18px",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  dropdown: {
    position: "absolute",
    top: "45px",
    right: 0,
    width: "200px",
    background: "#fff",
    color: "#000",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },

  menuItem: {
    padding: "12px 16px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },

  logout: {
    padding: "12px 16px",
    cursor: "pointer",
    color: "red",
    fontWeight: "bold",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 1001,
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "260px",
    height: "100vh",
    background: "#fff",
    color: "#000",
    zIndex: 1002,
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
    padding: "20px",
  },

  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    cursor: "pointer",
    borderRadius: "10px",
    marginBottom: "10px",
  },
};