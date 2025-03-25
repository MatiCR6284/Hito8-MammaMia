// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Página No Encontrada</h1>
      <p style={styles.message}>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" style={styles.link}>
        Regresar al inicio
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
  message: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  link: {
    fontSize: "1.2rem",
    textDecoration: "none",
    color: "#155724",
    backgroundColor: "#d4edda",
    padding: "10px 20px",
    borderRadius: "5px",
  },
};

export default NotFound;