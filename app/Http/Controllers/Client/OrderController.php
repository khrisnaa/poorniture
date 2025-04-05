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

    public function checkout()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->back()->with('error', 'Unauthorized');
        }

        $cart = optional($user->cart)->load('items.product');

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->back()->with('error', 'Cart is empty');
        }

        $order = null;

        DB::transaction(function () use ($user, $cart, &$order) {
            $total = 0;

            $order = $user->orders()->create([
                'total_price' => 0, // akan diupdate setelah perhitungan
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

        return redirect()->route('order.detail', $order)->with('success', 'Checkout successful');
    }


    public function detail(Order $order)
    {
        $user = Auth::user();

        if ($order->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this order.');
        }

        $order->load('items.product');

        return Inertia::render('orders/detail', compact('order'));
    }



    public function index()
    {
        $user = Auth::user();

        $orders = Order::with('items.product')
            ->where('user_id', $user->id)
            ->get();

        return Inertia::render('orders/index', compact('orders'));
    }
}
