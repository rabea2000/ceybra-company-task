<?php

namespace App\Services;

use App\Http\Resources\CartResource;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartService
{
    /**
     * Add product to user's cart
     *
     * @param int $productId The ID of the product to add to the cart.
     * @param int $quantity The quantity of the product to add to the cart.
     * @return void
     */
    public function addToCart($productId, $quantity = 1)
    {
        $userId = Auth::id();
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            // Update quantity if product already exists
            $cartItem->update(['quantity' => $cartItem->quantity + $quantity]);
        } else {
            // Create new cart item
            CartItem::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
        }

        // return $this->getUserCartItems();
    }

    /**
     * Get user's cart items with products
     *
     * @return \Illuminate\Database\Eloquent\Collection The cart items with their associated products.
     */
    public function getUserCartItems()
    {
        $userId = Auth::id();

        return CartItem::with('product')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Update cart item quantity
     *
     * @param int $cartItemId The ID of the cart item to update.
     * @param int $quantity The new quantity of the cart item.
     * @return void
     */
    public function updateQuantity($cartItemId, $quantity)
    {
        $userId = Auth::id();

        $cartItem = CartItem::where('id', $cartItemId)
            ->where('user_id', $userId)
            ->firstOrFail();

        if ($quantity > 0) {
            $cartItem->update(['quantity' => $quantity]);
        }
    }

    /**
     * Remove item from user's cart
     *
     * @param int $cartItemId The ID of the cart item to remove.
     * @return void
     */
    public function removeFromCart($cartItemId)
    {
        $userId = Auth::id();

        $cartItem = CartItem::where('id', $cartItemId)
            ->where('user_id', $userId)
            ->firstOrFail();

        $cartItem->delete();
    }

    /**
     * Get user's cart total
     *
     * @return float The total price of all items in the cart.
     */
    public function getUserCartTotal()
    {
        $cartItems = $this->getUserCartItems();

        return $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });
    }
}
