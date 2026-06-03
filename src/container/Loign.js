import React, { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { loginUser } from "../features/auth/authSlice";

import { useNavigate } from "react-router-dom";

function Login() {
const dispatch=useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const response = await axios.post(

        "https://dummyjson.com/auth/login",

        {
          username,
          password,
        }
      );

      console.log(
        response.data,
        "LOGIN SUCCESS"
      );

      localStorage.setItem(
        "token",
        response.data.token
      );
dispatch(loginUser({username,password}));
      navigate("/home");

    } catch (error) {

      console.log(error);

      setError(
        "Invalid Username or Password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      <form
        style={styles.loginBox}
        onSubmit={handleLogin}
      >

        <h1 style={styles.heading}>
          Login
        </h1>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={styles.button}
        >

          {loading
            ? "Loading..."
            : "Login"}

        </button>

        <p style={styles.demoText}>
          Username : emilys
        </p>

        <p style={styles.demoText}>
          Password : emilyspass
        </p>

      </form>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "linear-gradient(135deg, #fe4fd8, #fe00b2)",
    fontFamily: "Arial",
  },

  loginBox: {
    width: "350px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.2)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#35ca17",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },

  demoText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
};

export default Login;