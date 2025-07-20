import React from 'react';

export default function ProductsLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="bg-white rounded shadow p-6">
        {children}
      </div>
    </div>
  );
}