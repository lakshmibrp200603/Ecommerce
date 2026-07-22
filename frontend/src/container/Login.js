import React, { useState } from "react";
// import { loginUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Services/supabase";
// import loginImage from "../image/3230.jpg";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

   try {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  localStorage.setItem(
    "token",
    data.session.access_token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );
  localStorage.setItem("email", data.user.email);

const {
  data: roleData,
  // error: roleError,
} = await supabase
  .from("users")
  .select("role")
  .eq("id", data.user.id)
  .single();

console.log("User ID:", data.user.id);
console.log("Role Data:", roleData);
console.log("Role:", roleData?.role);

if (roleData?.role) {
  localStorage.setItem("role", roleData.role);
}


if (roleData?.role === "admin") {
  navigate("/admin");
} else {
  navigate("/home");
}
    } catch (error) {
      console.log(error);

      alert(
        error.message ||
          "Invalid email or password"
      );
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
          handleLogin();
        }}
      >

        {/* <img
          src={loginImage}
          alt="Login"
          className="login-image"
        /> */}

        <h1 className="login-heading">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="login-input"
        />

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>

        <p className="login-text">
          Welcome to E-Commerce
        </p> 
        <p
  style={{
    marginTop: "15px",
    color: "blue",
    cursor: "pointer",
    fontWeight: "bold",
  }}
  onClick={() => navigate("/register")}
>
  Don't have an account? Register
</p>

      </form>

    </div>
  );
}
