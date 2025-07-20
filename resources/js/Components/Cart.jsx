import React from "react";

// CartComponent displays the shopping cart items and allows users to update quantities and remove items.
// It supports both authenticated users (who have a backend cart) and guest users (who use localStorage).
export default function CartComponent({
    user,
    cartItems,
    total,
    updateQuantity,
    removeItem,
}) {
    return (
        
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">
                Cart Items
            </h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((item) => {
                            const itemId = item.id;
                            const product = user ? item.product : item;
                            const quantity = item.quantity;
                            const price = product.price;

                            return (
                                <div
                                    key={itemId}
                                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                                >
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="w-full rounded-lg sm:w-40 object-cover h-40 sm:h-32"
                                    />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">
                                                {product.name}
                                            </h2>
                                            <p className="mt-1 text-xs text-gray-700">
                                                ${price}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center border-gray-100">
                                                <span
                                                    className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            itemId,
                                                            quantity - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </span>
                                                <input
                                                    className="h-8 w-12 border bg-white text-xs outline-none text-black text-center"
                                                    type="number"
                                                    value={quantity}
                                                    min="1"
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            itemId,
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                                <span
                                                    className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            itemId,
                                                            quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className="text-sm">
                                                    $
                                                    {(
                                                        quantity * price
                                                    ).toFixed(2)}
                                                </p>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                                    onClick={() =>
                                                        removeItem(itemId)
                                                    }
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="rounded-lg bg-white p-6 shadow-md text-center">
                            <p className="text-gray-500">Your cart is empty</p>
                            <a
                                href={route("products.index")}
                                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Continue Shopping
                            </a>
                        </div>
                    )}
                </div>

                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div>
                            <p className="mb-1 text-lg font-bold">
                                ${total.toFixed(2)} USD
                            </p>
                            <p className="text-sm text-gray-700">
                                including VAT
                            </p>
                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
}
