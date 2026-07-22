import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Services/supabase";

export default function Checkout({ cart = [], setCart }) {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * (item.qty || 1),
    0
  );

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
  loadAddress();
}, []);

const loadAddress = async () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser) return;

  const { data, error } = await supabase
    .from("users")
    .select("name, phone, city, address")
    .eq("email", currentUser.email)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  if (data) {
    setAddress({
      name: data.name || "",
      phone: data.phone || "",
      city: data.city || "",
      address: data.address || "",
    });
  }
};

const updateAddress = async () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser) return;

  const { error } = await supabase
    .from("users")
    .update({
      name: address.name,
      phone: address.phone,
      city: address.city,
      address: address.address,
    })
    .eq("email", currentUser.email);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Address Updated Successfully");
  setIsEditing(false);
};
const deleteAddress = async () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser) return;

  const { error } = await supabase
    .from("users")
    .update({
      name: "",
      phone: "",
      city: "",
      address: "",
    })
    .eq("email", currentUser.email);

  if (error) {
    alert(error.message);
    return;
  }

  setAddress({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  alert("Address Deleted");
};
  const placeOrder = async () => {

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }


    const currentUser = JSON.parse(
      localStorage.getItem("user")
    );


    if (!currentUser) {
      alert("Please Login First");
      navigate("/");
      return;
    }


    if (
      !address.name ||
      !address.phone ||
      !address.city ||
      !address.address
    ) {
      alert("Please fill delivery address");
      return;
    }


const ordersData = cart.map((item) => ({
  user_email: currentUser.email,

  product_id: item.id,

  product_title: item.title,

  product_image: item.image,

  price: item.price,

  qty: item.qty || 1,

  customer_name: address.name,

  customer_phone: address.phone,

  delivery_address:
    `${address.address}, ${address.city}`,

  status: "Confirmed"
}));
    console.log("Order Data:", ordersData);


    const { error } = await supabase
      .from("orders")
      .insert(ordersData);


    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }


    alert("🎉 Order Placed Successfully");


    setCart([]);


    navigate("/orders");
  };


  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto"
      }}
    >

      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 15px",
          marginBottom: "20px"
        }}
      >
        ⬅ Back
      </button>


      <h2>Checkout</h2>


      <h3>Delivery Address</h3>

<div style={{ marginBottom: "15px" }}>
  <button
    onClick={() => setIsEditing(true)}
    style={{
      padding: "8px 15px",
      marginRight: "10px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Edit
  </button>

  <button
    onClick={deleteAddress}
    style={{
      padding: "8px 15px",
      background: "red",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</div>
      <input
  name="name"
  placeholder="Full Name"
  value={address.name}
  onChange={handleChange}
  readOnly={!isEditing}
  style={inputStyle}
/>


     <input
  name="phone"
  placeholder="Phone Number"
  value={address.phone}
  onChange={handleChange}
  readOnly={!isEditing}
  style={inputStyle}
/>


      <input
      readOnly={!isEditing}
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
        style={inputStyle}
      />


    <textarea
  name="address"
  placeholder="Full Address"
  value={address.address}
  onChange={handleChange}
  readOnly={!isEditing}
  style={inputStyle}
/>


      <h3>
        Total Amount : ₹ {totalAmount.toFixed(2)}
      </h3>
{isEditing && (
  <button
    onClick={updateAddress}
    style={{
      background: "orange",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      marginBottom: "10px",
      marginRight: "10px",
      cursor: "pointer",
    }}
  >
    Save Address
  </button>
)}

      <button
        onClick={placeOrder}
        style={{
          background:"#075e12",
          color:"white",
          padding:"12px 25px",
          border:"none",
          borderRadius:"8px",
          cursor:"pointer",
          fontSize:"16px"
        }}
      >
        Place Order
      </button>


    </div>
  );
}


const inputStyle = {
  width:"100%",
  padding:"10px",
  margin:"10px 0",
  borderRadius:"5px",
  border:"1px solid #ccc"
};