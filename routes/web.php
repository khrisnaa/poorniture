<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/products', [ClientController::class, 'products'])->name('products');

require __DIR__ . '/settings.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
