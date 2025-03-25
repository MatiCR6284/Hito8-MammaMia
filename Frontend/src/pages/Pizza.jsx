import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener la pizza");
        }
        const data = await response.json();
        setPizza(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2>Detalles de la Pizza</h2>

      {loading && <p>Cargando pizza...</p>}
      {error && <p>Error: {error}</p>}

      {pizza && (
        <div className="row">
          <div className="col-md-6">
            <img
              src={pizza.img}
              alt={pizza.name}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h3>{pizza.name}</h3>
            <p><strong>Precio:</strong> ${pizza.price}</p>
            <p><strong>Descripción:</strong> {pizza.desc}</p>
            <h4>Ingredientes:</h4>
            <ul>
              {pizza.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <button className="btn btn-primary mt-3">Añadir al carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pizza;