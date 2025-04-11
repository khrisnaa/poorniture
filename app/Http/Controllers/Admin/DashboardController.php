<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $now = Carbon::now();

        // Range this month
        $currentStart = $now->copy()->startOfMonth();
        $currentEnd = $now->copy()->endOfMonth();

        // Range past month
        $lastStart = $now->copy()->subMonth()->startOfMonth();
        $lastEnd = $now->copy()->subMonth()->endOfMonth();

        // Total Revenue
        $currentRevenue = Order::whereBetween('created_at', [$currentStart, $currentEnd])->sum('total_price');
        $lastRevenue = Order::whereBetween('created_at', [$lastStart, $lastEnd])->sum('total_price');

        // Total Users (non-admin)
        $currentUsers = User::where('role', '!=', 'admin')->whereBetween('created_at', [$currentStart, $currentEnd])->count();
        $lastUsers = User::where('role', '!=', 'admin')->whereBetween('created_at', [$lastStart, $lastEnd])->count();

        // Total Products
        $currentProducts = Product::whereBetween('created_at', [$currentStart, $currentEnd])->count();
        $lastProducts = Product::whereBetween('created_at', [$lastStart, $lastEnd])->count();

        // Trend function
        $getTrend = fn($current, $last) => $last == 0 && $current > 0 ? 'up'
            : ($last == 0 && $current == 0 ? 'flat'
                : ($current > $last ? 'up' : ($current < $last ? 'down' : 'flat')));

        $getPercentage = fn($current, $last) => $last > 0 ? round((($current - $last) / $last) * 100, 2) : ($current > 0 ? 100 : 0);

        return Inertia::render('admin/dashboard', [
            'revenue' => [
                'total' => $currentRevenue,
                'last' => $lastRevenue,
                'trend' => $getTrend($currentRevenue, $lastRevenue),
                'percentage' => $getPercentage($currentRevenue, $lastRevenue),
            ],
            'users' => [
                'total' => User::where('role', '!=', 'admin')->count(),
                'current' => $currentUsers,
                'last' => $lastUsers,
                'trend' => $getTrend($currentUsers, $lastUsers),
                'percentage' => $getPercentage($currentUsers, $lastUsers),
            ],
            'products' => [
                'total' => Product::count(),
                'current' => $currentProducts,
                'last' => $lastProducts,
                'trend' => $getTrend($currentProducts, $lastProducts),
                'percentage' => $getPercentage($currentProducts, $lastProducts),
            ],
        ]);
    }
}
