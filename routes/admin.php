<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Settings\AdminPasswordController;
use App\Http\Controllers\Settings\AdminProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::redirect('admin', 'admin/dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('/categories', CategoryController::class);
        Route::resource('/products', ProductController::class);
        Route::resource('/orders', OrderController::class)->only(['index', 'show']);
        Route::resource('/users', UserController::class)->only(['index', 'show']);
    });


Route::middleware('auth', 'admin')->group(function () {
    Route::redirect('settings', 'admin/settings/profile');
    Route::redirect('admin/settings', 'settings/profile');

    Route::get('admin/settings/profile', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('admin/settings/profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('admin/settings/profile', [AdminProfileController::class, 'destroy'])->name('admin.profile.destroy');

    Route::get('admin/settings/password', [AdminPasswordController::class, 'edit'])->name('admin.password.edit');
    Route::put('admin/settings/password', [AdminPasswordController::class, 'update'])->name('admin.password.update');

    Route::get('admin/settings/appearance', function () {
        return Inertia::render('admin/settings/appearance');
    })->name('admin.appearance');
});
