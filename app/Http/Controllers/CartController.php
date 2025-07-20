<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function __construct(protected CartService $cartService) {}

    /**
     * Display cart items
     *
     * @param \Illuminate\Http\Request $request The HTTP request containing the product ID and quantity.
     * @return \Inertia\Response The rendered view for the cart page.
     */
    public function index(Request $request)
    {
        $cartItems = $this->cartService->getUserCartItems();
        $total = $this->cartService->getUserCartTotal();

        // return CartResource::collection($cartItems);
        return Inertia::render('Cart/Index', [
            'cartItems' =>  CartResource::collection($cartItems),
            'total' => $total,

        ]);
    }

    /**
     * Add product to cart
     *
     * @param \Illuminate\Http\Request $request The HTTP request containing the product ID and quantity.
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $this->cartService->addToCart(
            $request->product_id,
            $request->quantity ?? 1
        );
          return redirect()->route('cart.index');
    }

    /**
     * Update cart item quantity
     *
     * @param \Illuminate\Http\Request $request The HTTP request containing the quantity to update.
     * @param int $cartItemId The ID of the cart item to update.
     * @return void
     */
    public function updateQuantity(Request $request, $cartItemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        $this->cartService->updateQuantity($cartItemId, $request->quantity);
    }

    /**
     * Remove item from cart
     *
     * @param int $cartItemId The ID of the cart item to remove.
     * @return void
     */
    public function removeFromCart($cartItemId)
    {
        $this->cartService->removeFromCart($cartItemId);
    }

    /**
     * Add multiple products to the cart for a guest user.
     *
     * Typically used for handling guest carts
     * (e.g., merging a local cart with the server-side cart upon login or registration).
     *
     * @param  \Illuminate\Http\Request  $request  The HTTP request containing a 'products' array.
     * @return void
     */
    public function storeGuestCart(Request $request)
    {
        $products = collect($request->input('products', []));
        $products->map(function ($product) {
            $this->cartService->addToCart($product['id'], $product['quantity']);
        });
    }
}
