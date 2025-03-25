import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }
  
      const { token, email } = await response.json(); 
      setToken(token);
      setEmail(email);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", userData);
      const { email } = response.data;
      return email;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener el perfil");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const checkout = async (cart) => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });
      if (!response.ok) {
        throw new Error("Error al realizar el checkout");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile, checkout }}>
      {children}
    </UserContext.Provider>
  );
};