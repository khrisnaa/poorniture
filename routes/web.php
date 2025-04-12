<?php

use App\Http\Controllers\Customer\CartController;
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Customer\ProductController;
use App\Http\Controllers\Customer\OrderController;
use App\Http\Controllers\Customer\OrderPdfController;
use App\Http\Controllers\MidtransWebhookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('customer/home/index');
})->name('home');

Route::get('/categories/names', [HomeController::class, 'listCategories'])->name('categories.names');
Route::get('/products/latest', [HomeController::class, 'latestProducts'])->name('products.latest');    // Latest products

Route::prefix('products')->name('products.')->group(function () {
    Route::get('/', [ProductController::class, 'listProducts'])->name('index'); // List & filter products
    Route::get('/{product}', [ProductController::class, 'productDetails'])->name('show'); // Product detail page

});

Route::prefix('cart')->middleware(['auth'])->name('cart.')->group(function () {
    Route::post('/add', [CartController::class, 'addItem'])->name('add'); // Add or increase quantity
    Route::get('/items', [CartController::class, 'getItems'])->name('items'); // Get all cart items
    Route::put('/update', [CartController::class, 'updateItem'])->name('update'); // Update, decrease, or remove
});

Route::prefix('orders')->name('orders.')->middleware(['auth'])->group(function () {
    Route::get('/', [OrderController::class, 'listOrders'])->name('index'); // List all orders
    Route::post('/checkout', [OrderController::class, 'processCheckout'])->name('checkout'); // Checkout action
    Route::get('/{order}', [OrderController::class, 'showDetails'])->name('show'); // Order details
    Route::get('/{order}/pay', [OrderController::class, 'payOrder'])->name('payment'); // Payment page
    Route::get('/{order}/pdf/download', [OrderPdfController::class, 'download'])->name('pdf.download');
    Route::get('/{order}/pdf/stream', [OrderPdfController::class, 'stream'])->name('pdf.download');
});



Route::post('/callback', [MidtransWebhookController::class, 'handle']);

require __DIR__ . '/settings.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
