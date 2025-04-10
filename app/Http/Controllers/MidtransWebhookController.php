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
        $fraudStatus = $payload['fraud_status'] ?? null;

        if (!$orderId) {
            return response()->json(['message' => 'Invalid payload'], 400);
        }

        $order = Order::where('id', $orderId)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        if (in_array($transactionStatus, ['capture', 'settlement'])) {
            $status = 'completed';
        } elseif ($transactionStatus == 'pending') {
            $status = 'pending';
        } elseif (in_array($transactionStatus, ['deny', 'cancel', 'expire', 'failure'])) {
            $status = 'canceled';
        } else {
            $status = 'pending';
        }

        $order->update([
            'status' => $status,
        ]);

        return response()->json(['message' => 'Webhook handled']);
    }
}
