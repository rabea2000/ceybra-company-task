<?php

namespace Tests\Unit;

use App\Models\CartItem;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class CartServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $product;
    protected $cartService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = \App\Models\User::factory()->create();
        $this->product = Product::factory()->create(['price' => 100]);
        $this->cartService = new CartService();
        $this->be($this->user); // Set the currently authenticated user
    }

    public function test_add_to_cart_creates_new_cart_item()
    {
        $this->cartService->addToCart($this->product->id, 2);
        $this->assertDatabaseHas('cart_items', [
            'user_id' => $this->user->id,
            'product_id' => $this->product->id,
            'quantity' => 2,
        ]);
    }

    public function test_add_to_cart_updates_existing_cart_item()
    {
        $this->cartService->addToCart($this->product->id, 1);
        $this->cartService->addToCart($this->product->id, 3);
        $this->assertDatabaseHas('cart_items', [
            'user_id' => $this->user->id,
            'product_id' => $this->product->id,
            'quantity' => 4,
        ]);
    }

    public function test_get_user_cart_items_returns_items()
    {
        $this->cartService->addToCart($this->product->id, 2);
        $items = $this->cartService->getUserCartItems();
        $this->assertCount(1, $items);
        $this->assertEquals($this->product->id, $items->first()->product_id);
    }

    public function test_update_quantity_changes_cart_item_quantity()
    {
        $this->cartService->addToCart($this->product->id, 2);
        $cartItem = CartItem::first();
        $this->cartService->updateQuantity($cartItem->id, 5);
        $this->assertDatabaseHas('cart_items', [
            'id' => $cartItem->id,
            'quantity' => 5,
        ]);
    }

    public function test_remove_from_cart_deletes_cart_item()
    {
        $this->cartService->addToCart($this->product->id, 2);
        $cartItem = CartItem::first();
        $this->cartService->removeFromCart($cartItem->id);
        $this->assertDatabaseMissing('cart_items', [
            'id' => $cartItem->id,
        ]);
    }

    public function test_get_user_cart_total_returns_correct_sum()
    {
        $this->cartService->addToCart($this->product->id, 2); // 2 * 100 = 200
        $product2 = Product::factory()->create(['price' => 50]);
        $this->cartService->addToCart($product2->id, 3); // 3 * 50 = 150
        $total = $this->cartService->getUserCartTotal();
        $this->assertEquals(350, $total);
    }
} 