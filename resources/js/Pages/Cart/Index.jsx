import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CartComponent from "@/Components/Cart";

// Index component displays the shopping cart for authenticated users.
// It uses the CartComponent to render the cart items and provides the necessary cart state and actions.



export default function Index({
    cartItems: backendCartItems,
    total: backendTotal,
}) {
    const { auth } = usePage().props;
    const user = auth.user;

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity > 0) {
            router.patch(route("cart.update-quantity", cartItemId), {
                quantity: newQuantity,
            });
        }
    };

    const removeItem = (cartItemId) => {
        router.delete(route("cart.remove", cartItemId));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Shopping Cart
                </h2>
            }
        >
            <CartComponent
                user={user}
                cartItems={backendCartItems}
                total={backendTotal}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
            />
        </AuthenticatedLayout>
    );
}
