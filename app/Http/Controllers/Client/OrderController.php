<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $order = Order::with('items.product')->where('user_id', $user->id)->first();


        return Inertia::render('orders/index', compact('order'));
    }
    public function checkout()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->back()->with('error', 'Unauthorized');
        }

        DB::transaction(function () use ($user) {
            $cart = $user->cart;

            if (!$cart || $cart->items->isEmpty()) {
                throw new \Exception('Cart is empty');
            }

            $total = 0;

            $order = $user->orders()->create([
                'total_price' => 0, // sementara
                'status' => 'pending',
            ]);

            foreach ($cart->items as $item) {
                $subtotal = $item->product->price * $item->quantity;

                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'subtotal' => $subtotal,

                ]);

                $total += $subtotal;
            }

            $order->update(['total_price' => $total]);


            $cart->items()->delete();
            $cart->delete();
        });

        return redirect()->route('order.index')->with('success', 'Checkout successful');
    }
    public function history() {}
}
