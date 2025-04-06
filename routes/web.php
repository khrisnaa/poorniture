<?php

use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\CLient\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/products', [ProductController::class, 'products'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'details'])->name('products.show');

Route::post('/cart/store', [CartController::class, 'store'])->name('cart.store');
Route::get('/cart/count', [CartController::class, 'count'])->name('cart.count');
Route::get('/cart/all', [CartController::class, 'all'])->name('cart.all');
Route::post('/cart/decrement', [CartController::class, 'decrement'])->name('cart.decrement');

Route::get('/orders', [OrderController::class, 'index'])->name('order.index');
Route::get('/orders/{order}', [OrderController::class, 'detail'])->name('order.detail');
Route::post('/orders/checkout', [OrderController::class, 'checkout'])->name('order.checkout');
Route::get('/orders/{order}/payment', [PaymentController::class, 'payment'])->name('order.payment');

require __DIR__ . '/settings.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
