import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Header({cartCount,searchTerm,setSearchTerm}) {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
return (
  <div
  style={{
    backgroundColor: "#143a30",
    padding: "5px 15px",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000
  }}
>
 <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  }}
>

  <h1
    style={{
      margin: "0",
      fontSize: "32px",
      color: "white",
      fontWeight: "bold",
    }}
  >
    Prime Pick
  </h1>
    
      {/* HOME */}
      <button
  onClick={() => {
    alert("Home Clicked");
    navigate("/home");
  }}
  
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
  placeholder="Search Products....."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    width: "700px",
    padding: "13px",
    borderRadius: "15px",
    border: "none",
    outline: "none",
    marginLeft: "20px",
    marginRight: "20px",
  }}
/>

      {/* CART */}
      <button
        onClick={() => navigate("/cart")}
        style={{
  marginLeft: "auto",
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

      {/* LOGIN / PROFILE */}
      <div
        style={{ position: "relative", 
       
        }}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {!token ? (
          <button
            onClick={() => navigate("/login")}
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
            Login
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "#2874f0",
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
           <FaUserCircle size={22} color="white" />
            Profile ▼
          </button>
        )}
{token && showDropdown && (
  <div
    style={{
      position: "absolute",
      top: "45px",
      right: "0",
      width: "260px",
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      zIndex: 999,
      overflow: "hidden",
    }}
  >
    <div
      style={menuItem}
      onClick={() => navigate("/profile")}
    >
       My Profile
    </div>

    <div
      style={menuItem}
      onClick={() => navigate("/orders")}
    >
       Orders
    </div>

    <div
      style={menuItem}
      onClick={() => navigate("/wishlist")}
    >
       Wishlist
    </div>

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