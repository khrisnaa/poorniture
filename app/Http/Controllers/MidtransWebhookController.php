<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();

        Log::info('Midtrans Webhook Received:', $payload); // opsional buat debug

        $orderId = $payload['order_id'] ?? null;
        $transactionStatus = $payload['transaction_status'] ?? null;

        if (!$orderId) {
            return response()->json(['message' => 'Invalid payload'], 400);
        }

        $order = Order::where('id', $orderId)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        if ($order->status === 'completed') {
            return response()->json(['message' => 'Order already completed'], 200);
        }

        if (in_array($transactionStatus, ['capture', 'settlement'])) {

            // Decrement Stock
            // foreach ($order->items as $item) {
            //     $product = $item->product;
            //     if ($product && $product->stock >= $item->quantity) {
            //         $product->decrement('stock', $item->quantity);
            //     }
            // }

            $order->update([
                'status' => 'completed',
            ]);
        } elseif (in_array($transactionStatus, ['deny', 'cancel', 'expire', 'failure'])) {
            $order->update([
                'status' => 'canceled',
            ]);
        } elseif ($transactionStatus == 'pending') {
            $order->update([
                'status' => 'pending',
            ]);
        }

        return response()->json(['message' => 'Webhook handled']);
    }
}
