<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\ProductImage;
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
            $validated = $request->validated();

            //Check if has thumbnail, store new thumbnail
            if ($request->hasFile('thumbnail')) {
                $thumbnailPath = $request->file('thumbnail')->store('thumbnails/' . date('Y/m/d'), 'public');
                $validated['thumbnail'] = $thumbnailPath;
            }

            $product = Product::create($validated);

            //Check if has images, store images to product images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath =  $image->store('product_images/' . Str::slug($validated['name']) . '-' . date('Y/m/d'), 'public');
                    $product->images()->create([
                        'image_url' => $imagePath
                    ]);
                }
            }
        });

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $images = $product->images->map(function ($image) {
            return asset('storage/' . $image->path);
        });

        return Inertia::render('admin/products/edit', compact('product', 'categories', 'images'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // dd($request->all());

        DB::transaction(function () use ($request, $product) {
            $validated = $request->validated();

            if ($request->hasFile('thumbnail')) {
                // Pastikan thumbnail lama ada dan valid, baru dihapus
                if ($product->thumbnail && Storage::disk('public')->exists($product->thumbnail)) {
                    Storage::disk('public')->delete($product->thumbnail);
                }

                // Simpan thumbnail baru
                $thumbnailPath = $request->file('thumbnail')->store('thumbnails/' . date('Y/m/d'), 'public');
                $validated['thumbnail'] = $thumbnailPath;
            } else {
                $validated['thumbnail'] = $product->thumbnail;
            }





            $product->update($validated);

            if ($request->has('default_images')) {
                $existingImages = $product->images->pluck('image_url')->toArray(); // Ambil semua gambar dari database
                $newImages = $request->default_images; // Gambar yang dikirim dalam request

                // Cari gambar yang tidak ada dalam request (harus dihapus)
                $imagesToDelete = array_diff($existingImages, $newImages);

                foreach ($imagesToDelete as $image) {
                    Storage::disk('public')->delete($image); // Hapus dari storage
                    $product->images()->where('image_url', $image)->delete(); // Hapus dari database
                }
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath =  $image->store('product_images/' . Str::slug($validated['name']) . '-' . date('Y/m/d'), 'public');
                    $product->images()->create([
                        'image_url' => $imagePath
                    ]);
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
            $product->delete();
        });

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
