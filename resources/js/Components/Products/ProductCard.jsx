import React from "react";
import AddToCartButton from "@/Components/AddToCartButton";

// ProductCard component displays a product card with its image, name, price, and add-to-cart button.
// It uses the AddToCartButton component to handle adding the product to the cart.


export default function ProductCard({ product }) {
    return (
        <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 p-4 flex flex-col">
            <div className="relative overflow-hidden rounded-xl aspect-w-1 aspect-h-1 w-full bg-gray-100">
                <img
                    src={`/storage/${product.image}`}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="mt-4 text-center flex-1 flex flex-col justify-between">
                <h3 className="text-md font-medium text-gray-800 truncate">
                    {product.name}
                </h3>

                <p className="text-blue-600 text-lg font-bold mt-1">
                    ${product.price}
                </p>

                <div className="mt-4">
                    <AddToCartButton product={product} className="w-full" />
                </div>
            </div>
        </div>
    );
}

// export default function ProductCard({ product }) {
//     return (
//         <div className="bg-white rounded shadow p-4 flex flex-col items-center">
//             <img
//                 src={`/storage/${product.image}`}
//                 alt={product.name}
//                 className="w-full h-40 object-cover rounded mb-2"
//             />
//             <h3 className="text-lg font-semibold">{product.name}</h3>
//             <p className="text-blue-600 font-bold mb-3">${product.price}</p>
//             <AddToCartButton product={product} className="w-full" />
//         </div>
//     );
// }
