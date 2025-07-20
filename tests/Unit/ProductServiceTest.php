<?php

namespace Tests\Unit;

use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $productService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->productService = new ProductService();
    }

    public function test_create_product_stores_product_and_image()
    {
        Storage::fake('public');
        $image = \Illuminate\Http\UploadedFile::fake()->image('product.jpg');
        $data = [
            'name' => 'Test Product',
            'price' => 99.99,
            'image' => $image,
        ];
        $product = $this->productService->createProduct($data);
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Test Product',
            'price' => 99.99,
        ]);
        Storage::disk('public')->assertExists($product->image);
    }

    public function test_list_products_returns_paginated_products()
    {
        Product::factory()->count(15)->create();
        $products = $this->productService->listProducts();
        $this->assertEquals(8, $products->count()); // paginate(8)
        $this->assertInstanceOf(Product::class, $products->first());
    }

    public function test_list_products_with_search()
    {
        Product::factory()->create(['name' => 'UniqueProductName']);
        Product::factory()->create(['name' => 'AnotherProduct']);
        $products = $this->productService->listProducts('UniqueProductName');
        $this->assertGreaterThanOrEqual(1, $products->count());
        $this->assertStringContainsString('UniqueProductName', $products->first()->name);
    }
} 