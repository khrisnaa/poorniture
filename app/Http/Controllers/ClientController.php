<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function products(Request $request)
    {
        $category = $request->query('category');
        $priceRange = $request->query('price');


        $prices = [
            ['value' => '<1jt', 'min' => 0, 'max' => 1000000],
            ['value' => '1-3jt', 'min' => 1000000, 'max' => 3000000],
            ['value' => '3-5jt', 'min' => 3000000, 'max' => 5000000],
            ['value' => '5-10jt', 'min' => 5000000, 'max' => 10000000],
            ['value' => '>10jt', 'min' => 10000000, 'max' => 100000000],
        ];


        $categories = Category::pluck('name');

        $products = Product::with('category')
            ->when($category && $category !== 'all', function ($query) use ($category) {
                return $query->whereHas('category', function ($q) use ($category) {
                    $q->where('name', $category);
                });
            })
            ->when($priceRange, function ($query) use ($prices, $priceRange) {
                $selectedPrice = collect($prices)->firstWhere('value', $priceRange);
                if ($selectedPrice) {
                    return $query->whereBetween('price', [$selectedPrice['min'], $selectedPrice['max']]);
                }
            })
            ->latest()
            ->get();

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'prices' => $prices,
            'filters' => [
                'category' => $category,
                'price' => $priceRange,
            ],
        ]);
    }
}
