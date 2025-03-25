import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/cardpizza.css"; // Importar el archivo CSS

const CardPizza = ({ pizza }) => {
  const { addToCart, token } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    if (token) {
      addToCart(pizza);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className="card">
      <img src={pizza.img} alt={pizza.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{pizza.name}</h5>
        <p className="card-text">${pizza.price}</p>
        <Link to={`/pizza/${pizza.id}`} className="btn btn-primary">
          Ver Detalles
        </Link>
        <button
          className="btn btn-secondary mt-2"
          onClick={handleAddToCart}
          disabled={!token}
        >
          Añadir al carrito
        </button>
        {!token && <p>Debes iniciar sesión para añadir al carrito.</p>}
        {showPopup && (
          <div className="alert alert-success mt-2" role="alert">
            Añadido al carrito
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPizza;