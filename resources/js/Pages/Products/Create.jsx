import React, { useRef } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

// Create component displays a form for adding a new product.
// It allows users to input the product name, price, and image.



export default function Create() {
    const imageInput = useRef();
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        price: "",
        image: null,
    });

    const { props } = usePage();
   

    const handleImageChange = (e) => {
        setData("image", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/products", {
            forceFormData: true,
            onSuccess: () => {
                reset();
                imageInput.current.value = "";
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="w-full">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Product Name"
                                required
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                            />
                            {errors.price && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.price}
                                </div>
                            )}
                        </div>
                    </div>
                   
                    <div className="flex flex-col w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Product Image
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={imageInput}
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        {errors.image && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </div>
                        )}
                        {data.image && typeof data.image === "object" && (
                            <div className="mt-2 flex justify-center">
                                <img
                                    src={URL.createObjectURL(data.image)}
                                    alt="Preview"
                                    className="w-full max-w-xs h-40 object-cover rounded border"
                                />
                            </div>
                        )}
                    </div>
                    {/* Submit button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
