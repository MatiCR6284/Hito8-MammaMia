import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

const Cart = () => {
  const { token, checkout } = useContext(UserContext);
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [successMessage, setSuccessMessage] = useState("");
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calcula el total

  const handleCheckout = async () => {
    try {
      const response = await checkout(cart);
      if (response) {
        setSuccessMessage("¡Compra realizada con éxito!");
      }
    } catch (error) {
      console.error("Error al realizar el checkout:", error);
      alert("Hubo un problema al procesar el pago.");
    }
  };

  const handleQuantityChange = (pizzaId, quantity) => {
    if (quantity > 0) {
      updateQuantity(pizzaId, quantity);
    }
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Mensaje de éxito */}
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cart.map((pizza) => (
            <div key={pizza.id} className="cart-item">
              <img src={pizza.img} alt={pizza.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{pizza.name}</h2>
                <p>${pizza.price}</p>
                <div className="quantity">
                  <button onClick={() => handleQuantityChange(pizza.id, pizza.quantity - 1)}>-</button>
                  <span>{pizza.quantity}</span>
                  <button onClick={() => handleQuantityChange(pizza.id, pizza.quantity + 1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(pizza.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <span>Total: ${total.toFixed(2)}</span>
        {token ? (
          <button className="checkout-btn" onClick={handleCheckout}>
            Pagar
          </button>
        ) : (
          <p>Debes iniciar sesión para poder pagar.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;