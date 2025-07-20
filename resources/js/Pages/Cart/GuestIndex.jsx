import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useCart } from "@/Contexts/CartContex";
import CartComponent from "@/Components/Cart";

// GuestIndex component displays the shopping cart for guest users.
// It uses the CartComponent to render the cart items and provides the necessary cart state and actions.


export default function GuestIndex() {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const total = cart.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Shopping Cart
                </h2>
            }
        >
            <CartComponent
                user={null}
                cartItems={cart}
                total={total}
                updateQuantity={updateQuantity}
                removeItem={removeFromCart}
            />
        </AuthenticatedLayout>
    );
}
