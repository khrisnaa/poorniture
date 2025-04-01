<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {


        Route::get('dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('dashboard');
        Route::resource('/categories', CategoryController::class);
        Route::resource('/products', ProductController::class);
        Route::resource('/orders', OrderController::class)->only(['index', 'show']);
        Route::resource('/users', UserController::class)->only(['index', 'show']);
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
