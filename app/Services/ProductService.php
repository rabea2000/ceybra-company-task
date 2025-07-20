<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    /**
     * Create a new product.
     *
     * @param array $data The data to create a product.
     * @return Product
     */
    public function createProduct(array $data)
    {

        $data['image'] = Storage::disk('public')->put('/ProductPictures', $data['image']);
        $product = Product::create($data);
        return $product;
    }

    /**
     * List all products.
     *
     * @param string|null $search The search term to filter by.
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function listProducts($search = null)
    {
        return Product::search($search)->latest()->paginate(8);
    }
}
