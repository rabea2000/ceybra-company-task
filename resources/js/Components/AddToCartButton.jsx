import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useCart } from "@/Contexts/CartContex";

// AddToCartButton component handles adding a product to the shopping cart.
// It supports both authenticated users (who have a backend cart) and guest users (who use localStorage).
// When the button is clicked, it checks if the user is logged in:
//   - If authenticated, it sends a POST request to the backend to add the product to the user's cart.
//   - If not authenticated, it adds the product to a local cart (using context/localStorage) and redirects to the guest cart page.
// The button shows a loading state while the add-to-cart action is processing.

export default function AddToCartButton({ product, className = "" }) {
    const [isLoading, setIsLoading] = useState(false);
    const { addToCart: addToLocalCart } = useCart();
    const { auth } = usePage().props;
    const user = auth.user;

    const addToCart = () => {
        setIsLoading(true);
        if (user) {
            // Authenticated user - use backend
            router.post(
                route("cart.items.store"),
                {
                    product_id: product.id,
                },
                {
                    onFinish: () => setIsLoading(false),
                }
            );
        } else {
            // Guest user - use localStorage
            addToLocalCart(product);
            setIsLoading(false);
            router.get(route("cart.guest"));
        }
    };

    return (
        <button
            onClick={addToCart}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
            {isLoading ? "Adding..." : "Add to Cart"}
        </button>
    );
}
