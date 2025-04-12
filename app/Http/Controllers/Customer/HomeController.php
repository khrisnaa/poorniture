<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;

class HomeController extends Controller
{
    public function listCategories()
    {
        $categories = Category::pluck('name')->map(function ($name) {
            return strtolower($name);
        });

        return response()->json([
            'categories' => $categories
        ]);
    }

    public function latestProducts()
    {
        $categories = Category::pluck('name');
        $latestProducts = [];

        foreach ($categories as $category) {
            $latestProducts[strtolower($category)] = Product::whereHas('category', function ($query) use ($category) {
                $query->where('name', $category);
            })->latest()->take(3)->get();
        }

        return response()->json([
            'latestProducts' => $latestProducts
        ]);
    }
}
