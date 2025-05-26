import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/navbar.css"; 

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/"><strong>NoteBook</strong></Link>
        {token && <Link to="/notes">Notes</Link>}
      </div>
      <div>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
