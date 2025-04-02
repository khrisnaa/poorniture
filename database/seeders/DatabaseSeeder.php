<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'role' => 'admin'
        ]);


        // Call CategorySeeder first
        $this->call(CategorySeeder::class);

        // Call ProductSeeder after CategorySeeder
        $this->call(ProductSeeder::class);

        // Generate 10 orders after products are seeded
        Order::factory(10)->create();
    }
}
