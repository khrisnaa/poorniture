<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreCartRequest;
use App\Http\Requests\Customer\UpdateCartItemRequest;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Add or increase product quantity in cart.
     */
    public function addItem(StoreCartRequest $request)
    {
        $user = Auth::user();

        DB::transaction(function () use ($request, $user) {
            $data = $request->validated();

            $cart = Cart::firstOrCreate([
                'user_id' => $user->id,
            ]);

            $item = CartItem::firstOrNew([
                'cart_id' => $cart->id,
                'product_id' => $data['product_id'],
            ]);

            $item->quantity += $data['quantity'];
            $item->save();
        });

        return response()->json(['message' => 'Added item to cart.']);
    }


    /**
     * Get all cart items for the authenticated user.
     */
    public function getItems()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['items' => []]);
        }

        $items = CartItem::with('product.category')
            ->whereHas('cart', fn($q) => $q->where('user_id', $user->id))
            ->get();

        return response()->json(['items' => $items]);
    }


    /**
     * Update quantity or remove an item from cart based on action.
     */
    public function updateItem(UpdateCartItemRequest $request)
    {
        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found.'], 404);
        }

        $item = $cart->items()->where('product_id', $request->product_id)->first();

        if (!$item) {
            return response()->json(['message' => 'Item not found in cart.'], 404);
        }

        switch ($request->action) {
            case 'increase':
                $item->increment('quantity');
                return response()->json(['message' => 'Cart item quantity increased.']);

            case 'decrease':
                $item->quantity > 1 ? $item->decrement('quantity') : $item->delete();
                return response()->json(['message' => 'Cart item quantity updated.']);

            case 'remove':
                $item->delete();
                return response()->json(['message' => 'Item removed from cart.']);
        }
    }
}
