import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Services/supabase";
import "./Login.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !phone || !address || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const { error: userError } = await supabase
        .from("users")
        .insert([
          {
            id: data.user.id,
            name: name,
            email: data.user.email,
            phone: phone,
            address: address,
            role: "user",
          },
        ]);

      if (userError) throw userError;

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-box"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <h1 className="login-heading">Register</h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone"
          className="login-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Address"
          className="login-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p
          className="login-text"
          style={{
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}