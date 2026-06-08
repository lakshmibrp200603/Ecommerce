import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FiHome } from "react-icons/fi";

export default function Header({cartCount,searchTerm,setSearchTerm}) {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#343a40",
        padding: "20px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Prime Pick
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        {/* HOME */}
       <button
  onClick={() => navigate("/home")}
  style={{
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <FiHome size={20} />
</button>
        {/* SEARCH */}
        <input
          type="search"
          placeholder="Search Products..."
          onChange={(e)=> setSearchTerm(e.target.value)}
          style={{
            width: "250px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />

        {/* CART */}
      <button
  onClick={() => navigate("/cart")}
  style={{
    backgroundColor: "#198754",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  }}
>
  <FiShoppingCart size={20} />
  Cart ({cartCount})
</button>

        {/* LOGIN DROPDOWN */}
        <div
          style={{
            position: "relative",
          }}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            style={{
              backgroundColor: "#2874f0",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login ▼
          </button>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: "0",
                width: "260px",
                backgroundColor: "white",
                color: "black",
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                zIndex: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>New Customer?</span>

                <span
                  style={{
                    color: "#2874f0",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </span>
              </div>

              <div style={menuItem}>👤 My Profile</div>
              <div style={menuItem}>⭐ Flipkart Plus Zone</div>
              <div style={menuItem}>📦 Orders</div>
              <div style={menuItem}>❤️ Wishlist</div>
              <div style={menuItem}>🏪 Become a Seller</div>
              <div style={menuItem}>🎁 Rewards</div>
              <div style={menuItem}>🎫 Gift Cards</div>
              <div style={menuItem}>🔔 Notification Preferences</div>
              <div style={menuItem}>🎧 24x7 Customer Care</div>
              <div style={menuItem}>📢 Advertise</div>

              <div
                onClick={handleLogout}
                style={{
                  padding: "14px 18px",
                  cursor: "pointer",
                  color: "red",
                  fontWeight: "bold",
                  borderTop: "1px solid #eee",
                }}
              >
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const menuItem = {
  padding: "14px 18px",
  cursor: "pointer",
  borderBottom: "1px solid #f2f2f2",
};