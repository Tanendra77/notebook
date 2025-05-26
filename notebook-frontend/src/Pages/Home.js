import React from "react";
import { Link } from "react-router-dom";
import "../Styles/home.css";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="home-container">
      <h1>Welcome <br />To <br />Note Book</h1>
      {token ? (
        <Link to="/notes"><button class="btn">Go to Notes</button></Link>
      ) : (
        <>
          <Link to="/login"><button class="btn">Login</button></Link>
          <Link to="/register"><button class="btn">Register</button></Link>
        </>
      )}
    </div>
  );
};

export default Home;
