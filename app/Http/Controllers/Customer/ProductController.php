<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function listProducts(Request $request)
    {
        $filters = [
            'category' => $request->query('category'),
            'price' => $request->query('price'),
        ];

        $priceRanges = $this->priceRanges();

        $categories = Category::select('id', 'name')->get();

        $products = Product::with(['category', 'images'])
            ->when($filters['category'] && $filters['category'] !== 'all', function ($query) use ($filters) {
                $query->whereHas('category', fn($q) => $q->where('name', $filters['category']));
            })
            ->when($filters['price'], function ($query) use ($priceRanges, $filters) {
                $range = collect($priceRanges)->firstWhere('value', $filters['price']);
                if ($range) {
                    $query->whereBetween('price', [$range['min'], $range['max']]);
                }
            })
            ->latest()
            ->get();

        return Inertia::render('products/index', compact('products', 'categories', 'priceRanges', 'filters'));
    }

    public function productDetails(Product $product)
    {
        $product->load(['category', 'images']);

        return Inertia::render('products/details', compact('product'));
    }

    private function priceRanges(): array
    {
        return [
            ['value' => '<1jt', 'min' => 0, 'max' => 1000000],
            ['value' => '1-3jt', 'min' => 1000000, 'max' => 3000000],
            ['value' => '3-5jt', 'min' => 3000000, 'max' => 5000000],
            ['value' => '5-10jt', 'min' => 5000000, 'max' => 10000000],
            ['value' => '>10jt', 'min' => 10000000, 'max' => 100000000],
        ];
    }
}
