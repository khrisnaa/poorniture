<?php

namespace App\Http\Controllers\Customer;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function listProducts(Request $request)
    {
        $filters = [
            'category' =>  $request->query('category', 'all'),
            'price' => $request->query('price'),
        ];

        $priceRanges = $this->priceRanges();

        $categories = collect([
            ['id' => 'all', 'value' => 'all'],
            ...Category::select('id', 'name')
                ->get()
                ->map(fn($item) => [
                    'id' => $item->id,
                    'value' => Str::slug($item->name),
                ])
                ->toArray()
        ]);

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

        return Inertia::render('customer/products/index', compact('products', 'categories', 'priceRanges', 'filters'));
    }

    public function productDetails(Product $product)
    {
        $product->load(['category', 'images']);

        return Inertia::render('customer/products/detail', compact('product'));
    }

    private function priceRanges(): array
    {
        return [
            ['id' => 1, 'value' => '<1jt', 'min' => 0, 'max' => 1000000],
            ['id' => 2, 'value' => '1-3jt', 'min' => 1000000, 'max' => 3000000],
            ['id' => 3, 'value' => '3-5jt', 'min' => 3000000, 'max' => 5000000],
            ['id' => 4, 'value' => '5-10jt', 'min' => 5000000, 'max' => 10000000],
            ['id' => 5, 'value' => '>10jt', 'min' => 10000000, 'max' => 100000000],
        ];
    }
}
