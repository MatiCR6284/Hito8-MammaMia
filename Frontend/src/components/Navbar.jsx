import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const { token, login, logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Mamma Mia</h1>
        <Link to="/" className="home-btn">Inicio</Link>
        <Link to="/cart" className="cart-btn">Total</Link>
      </div>
      <div className="navbar-right">
        {token ? (
          <>
            <Link to="/profile" className="btn btn-secondary">Profile</Link>
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;