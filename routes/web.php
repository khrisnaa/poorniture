<?php

use App\Http\Controllers\Customer\CartController;
use App\Http\Controllers\Customer\ProductController;
use App\Http\Controllers\Customer\OrderController;
// use App\Http\Controllers\CLient\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::prefix('products')->name('products.')->group(function () {
    Route::get('/', [ProductController::class, 'listProducts'])->name('index'); // List & filter products
    Route::get('/{product}', [ProductController::class, 'productDetails'])->name('show'); // Product detail page
});

Route::prefix('cart')->middleware(['auth'])->name('cart.')->group(function () {
    Route::post('/add', [CartController::class, 'addItem'])->name('add'); // Add or increase quantity
    Route::get('/items', [CartController::class, 'getItems'])->name('items'); // Get all cart items
    Route::patch('/update', [CartController::class, 'updateItem'])->name('update'); // Update, decrease, or remove
});

Route::prefix('orders')->name('orders.')->middleware(['auth'])->group(function () {
    Route::get('/', [OrderController::class, 'listOrders'])->name('index'); // List all orders
    Route::post('/checkout', [OrderController::class, 'processCheckout'])->name('checkout'); // Checkout action
    Route::get('/{order}', [OrderController::class, 'showDetails'])->name('show'); // Order details
    Route::get('/{order}/pay', [OrderController::class, 'payOrder'])->name('payment'); // Payment page
});

// Route::post('/payment/webhook', [PaymentWebhookController::class, 'handle']);

// Route::get('/products', [ProductController::class, 'products'])->name('products.index');
// Route::get('/products/{product}', [ProductController::class, 'details'])->name('products.show');

// Route::post('/cart/store', [CartController::class, 'store'])->name('cart.store');
// Route::get('/cart/count', [CartController::class, 'count'])->name('cart.count');
// Route::get('/cart/all', [CartController::class, 'all'])->name('cart.all');
// Route::post('/cart/decrement', [CartController::class, 'decrement'])->name('cart.decrement');

// Route::get('/orders', [OrderController::class, 'index'])->name('order.index');
// Route::get('/orders/{order}', [OrderController::class, 'detail'])->name('order.detail');
// Route::post('/orders/checkout', [OrderController::class, 'checkout'])->name('order.checkout');
// Route::get('/orders/{order}/payment', [PaymentController::class, 'payment'])->name('order.payment');

require __DIR__ . '/settings.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
