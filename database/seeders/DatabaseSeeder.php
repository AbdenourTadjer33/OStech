<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // \App\Models\User::factory(100)->create();

        // $role = \App\Models\Role::create([
        //     'name' => 'administrateur',
        //     'description' => 'ce role est pour un administrateur, avec tous les permissions',
        //     'permission' => 'all'
        // ]);

        // \App\Models\User::create([
        //     'name' => 'abdenour tadjer',
        //     'email' => 'tad.abdenour33@gmail.com',
        //     'phone' => '0780115527',
        //     'status' => true,
        //     'type' => 'admin',
        //     'role_id' => 1,
        //     'password' => 'password',
        //     'data' => [
        //         'wilaya' => '16',
        //         'address' => '67 rue zououa',
        //         'city' => 'cheraga',
        //     ]
        // ]);

        // $wilayas = Storage::json('data/wilaya.json');
        // DB::table('wilayas')->insert($wilayas);

        // DB::table('shipping_pricings')->insert(Storage::json('data/yalidinePrices.json'));


        // \App\Models\Product::factory(100)->create();

        // \App\Models\Order::factory(10)->create();
// 
        // $orders = Order::get();
        // foreach ($orders as $order)
        // {
            // $product = Product::active()->get()->random();
            // $order->orderProducts()->create([
                // 'product_id' => $product->id,
                // 'qte' => 4,
                // 'total' => $product->price * 4,
                // 'product' => $product->only(['id', 'slug', 'name', 'price', 'promo']),
            // ]);
        // }

        
        Cache::clear();
        Cache::driver('file')->clear();
    }
}
