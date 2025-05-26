import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../Styles/register.css"; // Reuse login.css for styling

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          Register,
          <br />
          <span>create your account</span>
        </div>

        <input
          className="input"
          name="name"
          placeholder="Name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
        />

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
          Sign up →
        </button>
      </form>
    </div>
  );
};

export default Register;
