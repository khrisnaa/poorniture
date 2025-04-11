<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\ProductImage;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Users
        $admin = User::create([
            'id' => Str::uuid(),
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $member = User::create([
            'id' => Str::uuid(),
            'name' => 'Member User',
            'email' => 'member@example.com',
            'password' => Hash::make('password'),
            'role' => 'member',
        ]);

        // Categories
        $categoryNames = ['seating', 'tables', 'cabinet', 'bedrooms', 'art decor'];
        $categories = [];

        foreach ($categoryNames as $name) {
            $categories[$name] = Category::create([
                'id' => Str::uuid(),
                'name' => ucfirst($name),
            ]);
        }

        // Product names
        $coolNames = ['Caila', 'Morizne', 'Rui', 'Zaro', 'Liora', 'Velza', 'Noctra', 'Ezven', 'Yuki', 'Astrell', 'Kaen', 'Solari', 'Draxon', 'Isari', 'Thorne', 'Myra', 'Neris', 'Zinra', 'Quorra', 'Fenric'];

        $nameIndex = 0;
        $products = [];

        $prices = [
            ['value' => '<1jt', 'min' => 500000, 'max' => 999000],
            ['value' => '1-3jt', 'min' => 1000000, 'max' => 2990000],
            ['value' => '3-5jt', 'min' => 3000000, 'max' => 4990000],
            ['value' => '5-10jt', 'min' => 5000000, 'max' => 9990000],
            ['value' => '>10jt', 'min' => 10000000, 'max' => 15000000],
        ];


        $priceOptions = [];

        foreach ($prices as $range) {
            for ($i = 0; $i < 2; $i++) {
                $random = rand($range['min'], $range['max']);


                $rounded = round($random / 50000) * 50000;

                $priceOptions[] = $rounded;
            }
        }

        foreach ($categories as $key => $category) {
            for ($i = 0; $i < 4; $i++) {
                $productName = $coolNames[$nameIndex++] ?? "Unnamed";

                $product = Product::create([
                    'id' => Str::uuid(),
                    'category_id' => $category->id,
                    'name' => $productName,
                    'description' => "The stylish and unique $productName from the $key collection.",
                    'thumbnail' => null,
                    'price' => $priceOptions[array_rand($priceOptions)],
                    'stock' => rand(10, 50),
                ]);

                $products[] = $product;
            }
        }

        // Orders for member
        for ($o = 1; $o <= 2; $o++) {
            $order = Order::create([
                'id' => Str::uuid(),
                'user_id' => $member->id,
                'total_price' => 0,
                'status' => 'completed',
                'snap_token' => null,
            ]);

            $total = 0;

            foreach (collect($products)->random(3) as $product) {
                $quantity = rand(1, 3);
                $subtotal = $product->price * $quantity;

                OrderItem::create([
                    'id' => Str::uuid(),
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'subtotal' => $subtotal,
                ]);

                $total += $subtotal;
            }

            $order->update(['total_price' => $total]);
        }
    }
}
