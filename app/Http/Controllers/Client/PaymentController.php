<?php

namespace App\Http\Controllers\CLient;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Midtrans\Config;
use Midtrans\Snap;

// use Midtrans\Config;

class PaymentController extends Controller
{
    public function __construct()
    {
        // Configure Midtrans
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.is_sanitized');
        Config::$is3ds = config('services.midtrans.is_3ds');
    }

    public function payment(Order $order)
    {
        $user = Auth::user();
        // Ensure order belongs to current user
        if ($order->user_id !== $user->id) {
            abort(403);
        }


        // Don't allow paid orders to pay again
        if ($order->status === 'paid') {
            return redirect()->route('orders.show', $order->id)
                ->with('error', 'This order has already been paid');
        }

        $order->load('items.product');

        // Always regenerate token on page load to ensure it's fresh
        $params = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => $order->total_price,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
            'expiry' => [
                'start_time' => now()->format('Y-m-d H:i:s O'),
                'unit' => 'hour',
                'duration' => 2,
            ]
        ];

        try {
            $snapToken = Snap::getSnapToken($params);

            $order->update(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return redirect()->route('orders.show', $order->id)
                ->with('error', 'Payment gateway error: ' . $e->getMessage());
        }

        return inertia('orders/payment', [
            'order' => $order,
            'clientKey' => config('services.midtrans.client_key'),
        ]);
    }
}
