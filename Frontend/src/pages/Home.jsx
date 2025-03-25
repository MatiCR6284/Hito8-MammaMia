import React, { useState, useEffect, useContext } from "react";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const { addToCart } = useCart();
  const { token } = useContext(UserContext);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        if (!response.ok) {
          throw new Error("Error al cargar las pizzas");
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return <div>Cargando pizzas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Productos</h1>
      <div className="product-list">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="card">
            <img src={pizza.img} alt={pizza.name} className="card-image" />
            <div className="card-details">
              <h2>{pizza.name}</h2>
              <p>Precio: ${pizza.price}</p>
              {token ? (
                <>
                  <button className="add-to-cart" onClick={() => addToCart(pizza)}>
                    Añadir al carrito
                  </button>
                  <Link to={`/pizza/${pizza.id}`} className="btn btn-primary">
                    Ver Detalles
                  </Link>
                </>
              ) : (
                <Link to={`/pizza/${pizza.id}`} className="btn btn-primary">
                  Ver Detalles
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;