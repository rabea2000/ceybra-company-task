import { router } from "@inertiajs/react";
import React, { createContext, useContext, useEffect, useState } from "react";


/* This file defines a React context for managing a shopping cart in a web application.
 It provides a CartContext and a CartProvider component that wraps the app and manages cart state.
 The cart state is persisted in localStorage for guest users, allowing the cart to persist across page reloads.
 The useCart hook allows any component to access the cart state and actions (add, remove, update items).
*/

const CartContext = createContext();


export function useCart() {
    return useContext(CartContext);
}


export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("guest_cart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem("guest_cart", JSON.stringify(cart));
    }, [cart]);

    // Add, remove, update functions
    const addToCart = (product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            // if product is exist update the quantity
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity > 0) {
            setCart((prev) =>
                prev.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = () => setCart([]);
    const sendCart = () => {
        router.post(
            route("cart.guest.store"),
            {
                products: cart,
            },
            {
                onSuccess: () => setCart([]),
            }
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                sendCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
