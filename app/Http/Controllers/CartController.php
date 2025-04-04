<?php

namespace App\Http\Controllers;

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
        DB::transaction(function () use ($request) {
            $validated = $request->validated();

            $user = Auth::user();

            $cart = Cart::firstOrCreate([
                'user_id' => $user->id,
            ]);

            $item = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $validated['product_id'])
                ->first();

            if ($item) {
                $item->quantity += $validated['quantity'];
                $item->save();
            } else {
                CartItem::create([
                    'cart_id'    => $cart->id,
                    'product_id' => $validated['product_id'],
                    'quantity'   =>  $validated['quantity'],
                ]);
            }
        });

        return back()->with('success', 'Added to cart!');
    }

    public function count()
    {

        $user = Auth::user();

        if (!$user) {
            return response()->json(['count' => 0]);
        }

        $cart = Cart::withCount('items')->where('user_id', $user->id)->first();

        $total = $cart ? $cart->items()->sum('quantity') : 0;

        return response()->json(['count' => $total]);
    }
}
