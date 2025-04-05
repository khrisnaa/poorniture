<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function store(CartRequest $request)
    {
        $user = Auth::user();

        DB::transaction(function () use ($request, $user) {
            $data = $request->validated();

            $cart = Cart::firstOrCreate(['user_id' => $user->id]);

            $item = CartItem::firstOrNew([
                'cart_id'    => $cart->id,
                'product_id' => $data['product_id'],
            ]);

            $item->quantity += $data['quantity'];
            $item->save();
        });

        return response()->json(['message' => 'Added to cart!']);
    }

    public function decrement(Request $request)
    {
        $request->validate(['product_id' => 'required|uuid']);

        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->first();

        $item = $cart?->items()->where('product_id', $request->product_id)->first();

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $item->quantity > 1 ? $item->decrement('quantity') : $item->delete();

        return response()->json(['message' => 'Cart updated']);
    }


    public function all()
    {
        $user = Auth::user();

        $items = $user
            ? CartItem::with('product')->whereHas('cart', fn($q) => $q->where('user_id', $user->id))->get()
            : collect();

        return response()->json(['items' => $items]);
    }
}
