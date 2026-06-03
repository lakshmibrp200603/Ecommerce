import React from "react";

import {
  useNavigate
} from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

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
        textAlign: "center"
      }}
    >

      <h1
        style={{
          marginBottom: "20px"
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
          flexWrap: "wrap"
        }}
      >

        {/* HOME */}
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Home
        </button>

        {/* SEARCH */}
        <input
          type="search"
          placeholder="Search Products..."
          style={{
            width: "250px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none"
          }}
        />

        {/* CART */}
        <button
          style={{
            backgroundColor: "#198754",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Cart
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}

          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}