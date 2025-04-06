<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')->latest()->paginate(10);
        return Inertia::render('admin/products/index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('admin/products/create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();

            if ($request->hasFile('thumbnail')) {
                $data['thumbnail'] = $request->file('thumbnail')
                    ->store('thumbnails/' . now()->format('Y/m/d'), 'public');
            }

            $product = Product::create($data);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('product_images/' . Str::slug($data['name']) . '/' . now()->format('Y/m/d'), 'public');
                    $product->images()->create(['image_url' => $path]);
                }
            }
        });

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $images = $product->images->map(fn($image) => asset('storage/' . $image->image_url));

        return Inertia::render('admin/products/edit', compact('product', 'categories', 'images'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        DB::transaction(function () use ($request, $product) {
            $data = $request->validated();

            if ($request->hasFile('thumbnail')) {
                if ($product->thumbnail && Storage::disk('public')->exists($product->thumbnail)) {
                    Storage::disk('public')->delete($product->thumbnail);
                }

                $data['thumbnail'] = $request->file('thumbnail')
                    ->store('thumbnails/' . now()->format('Y/m/d'), 'public');
            } else {
                $data['thumbnail'] = $product->thumbnail;
            }

            $product->update($data);

            // Delete images no longer selected
            if ($request->has('default_images')) {
                $existing = $product->images->pluck('image_url')->toArray();
                $keep = $request->default_images;
                $delete = array_diff($existing, $keep);

                foreach ($delete as $image) {
                    Storage::disk('public')->delete($image);
                    $product->images()->where('image_url', $image)->delete();
                }
            }

            // Add new uploaded images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('product_images/' . Str::slug($data['name']) . '/' . now()->format('Y/m/d'), 'public');
                    $product->images()->create(['image_url' => $path]);
                }
            }
        });

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        DB::transaction(function () use ($product) {
            if ($product->thumbnail && Storage::disk('public')->exists($product->thumbnail)) {
                Storage::disk('public')->delete($product->thumbnail);
            }

            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_url);
                $image->delete();
            }

            $product->delete();
        });

        return response()->json(['message' => 'Product deleted successfully.']);
    }
}
