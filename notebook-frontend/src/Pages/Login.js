import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../Styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          Welcome,
          <br />
          <span>sign in to continue</span>
        </div>

        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="input"
          name="password"
          placeholder="Password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {error && <div className="error">{error}</div>}

        <button className="button-confirm" type="submit">
          Let's go →
        </button>
      </form>
    </div>
  );
};

export default Login;
