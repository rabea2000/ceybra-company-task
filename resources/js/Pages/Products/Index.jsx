import React, { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import ProductList from "@/Components/Products/ProductList";
import ProductsLayout from "@/Layouts/ProductLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useCart } from '@/Contexts/CartContex';

export default function Index({ products }) {
    const [search, setSearch] = useState("");
    const { url, props } = usePage();
    const { addToCart } = useCart();
    const user = usePage().props.auth.user;

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            url,
            { search: search },
            {
                preserveState: true,  // Keep the search input value
                preserveScroll: true, // Don't scroll to top after search
            }
        );
    };
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto p-4">
            
                <form onSubmit={handleSearch} className="mb-6 flex">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-l px-4 py-2 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-r"
                    >
                        Search
                    </button>
                </form>
                <ProductList products={products.data} />
                
                {/* Pagination */}
                <div className="mt-6 flex  justify-center space-x-2">
                    <button
                        onClick={() => {
                            if (products.prev_page_url) {
                                router.get(products.prev_page_url);
                            }
                        }}
                        className={`px-4 py-2 bg-gray-200 rounded ${
                            products.prev_page_url
                                ? "hover:bg-gray-300 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!products.prev_page_url}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => {
                            if (products.next_page_url) {
                                router.get(products.next_page_url);
                            }
                        }}
                        className={`px-4 py-2 bg-gray-200 rounded ${
                            products.next_page_url
                                ? "hover:bg-gray-300 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!products.next_page_url}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
