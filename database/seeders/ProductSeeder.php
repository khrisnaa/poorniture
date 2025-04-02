<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = DB::table('categories')->pluck('id', 'name');

        $products = [
            'chairs' => [
                ['Luxury Chair', 2249850],
                ['Modern Chair', 2399850],
                ['Classic Chair', 2099850],
                ['Office Chair', 2699850],
                ['Gaming Chair', 2999850],
                ['Rocking Chair', 1949850],
                ['Minimalist Chair', 1649850],
                ['Ergonomic Chair', 2849850]
            ],
            'table' => [
                ['Wooden Table', 4499850],
                ['Glass Table', 5249850],
                ['Marble Table', 5999850],
                ['Foldable Table', 3899850]
            ],
            'buffet' => [
                ['Classic Buffet', 7499850],
                ['Minimalist Buffet', 6899850],
                ['Modern Buffet', 7999850],
                ['Luxury Buffet', 8699850]
            ],
            'nightstand' => [
                ['Simple Nightstand', 1499850],
                ['Modern Nightstand', 1949850],
                ['Vintage Nightstand', 1799850],
                ['Compact Nightstand', 1649850]
            ],
            'sofa' => [
                ['Comfortable Sofa', 10499750],
                ['Luxury Sofa', 13499750]
            ],
        ];

        foreach ($products as $category => $items) {
            foreach ($items as [$name, $price]) {
                DB::table('products')->insert([
                    'id' => (string) Str::uuid(),
                    'category_id' => $categories[$category] ?? null,
                    'name' => $name,
                    'description' => 'High-quality ' . strtolower($name) . ' for your home.',
                    'thumbnail' => null,
                    'price' => $price,
                    'stock' => rand(5, 20),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
