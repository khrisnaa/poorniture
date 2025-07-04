<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Http\Requests\Customer\UpdateOrderAddressRequest;
use App\Models\Order;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Display a list of the authenticated user's orders.
     */
    public function listOrders()
    {
        $user = Auth::user();

        $orders = Order::with('items.product')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('customer/orders/index', compact('orders'));
    }

    /**
     * Handle the checkout process for the authenticated user's cart.
     */
    public function processCheckout()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->back()->with('error', 'You must be logged in to proceed.');
        }

        $cart = optional($user->cart)->load('items.product');

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        $order = null;

        DB::transaction(function () use ($user, $cart, &$order) {
            $total = 0;

            $order = $user->orders()->create([
                'total_price' => 0,
                'status' => 'pending',
            ]);

            $total = 0;

            foreach ($cart->items as $item) {
                $product = $item->product;

                if ($product->stock < $item->quantity) {
                    throw new \Exception("Stok {$product->name} tidak cukup");
                }

                $product->decrement('stock', $item->quantity);

                $subtotal = $product->price * $item->quantity;

                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'subtotal' => $subtotal,
                ]);

                $total += $subtotal;
            }

            $shipping = 1000000;
            $tax = 0.10 * ($total + $shipping);
            $grandTotal = $total + $shipping + $tax;

            $order->update([
                'total_price' => $grandTotal,
            ]);

            $cart->items()->delete();
            $cart->delete();
        });

        return redirect()->route('orders.payment', $order)->with('success', 'Checkout completed successfully.');
    }

    /**
     * Display the details of a specific order owned by the authenticated user.
     */
    public function showDetails(Order $order)
    {
        $user = Auth::user();

        if ($order->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this order.');
        }

        $order->load('items.product');

        return Inertia::render('customer/orders/detail', compact('order'));
    }

    /**
     * Show the payment page and generate Snap token.
     */
    public function payOrder(Order $order)
    {
        $user = Auth::user();

        if ($order->user_id !== $user->id) {
            abort(403);
        }

        if ($order->status == 'completed') {
            return redirect()->route('orders.show', $order->id)
                ->with('error', 'This order has already been paid');
        }

        $order->load('items.product');

        try {
            $snapToken = $this->paymentService->generateSnapToken($order);
            //Update kalau success
            $order->update(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return redirect()->route('orders.show', $order->id)
                ->with('error', 'Payment gateway error: ' . $e->getMessage());
        }

        $clientKey = config('services.midtrans.client_key');
        return Inertia::render('customer/orders/payment', compact('order', 'clientKey'));
    }

    public function updateAddress(UpdateOrderAddressRequest $request, Order $order)
    {


        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->update([
            'address' => $request->address,
        ]);

        return response()->noContent();
    }
}
