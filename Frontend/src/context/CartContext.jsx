import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (pizza) => {
        setCart((prevCart) => {
            const existingPizza = prevCart.find(item => item.id === pizza.id);
            if (existingPizza) {
                return prevCart.map(item =>
                    item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...pizza, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (pizzaId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== pizzaId));
    };

    const updateQuantity = (pizzaId, quantity) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === pizzaId ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};