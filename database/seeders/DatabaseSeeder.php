<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Brand;
use App\Models\Coupon;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Models\ShippingCompany;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(100)->create();

        // \App\Models\ShippingCompany::factory(50)->create();
        // \App\Models\ShippingPricing::factory(400)->create();

        $role = \App\Models\Role::create([
            'name' => 'administrateur',
            'description' => 'ce role est pour un administrateur, avec tous les permissions',
            'permission' => 'all'
        ]);

        \App\Models\User::create([
            'name' => 'abdenour tadjer',
            'email' => 'tad.abdenour33@gmail.com',
            'phone' => '0780115527',
            'status' => true,
            'type' => 'admin',
            'role_id' => $role->id,
            'password' => 'password',
            'data' => [
                'wilaya' => '16',
                'address' => '67 rue zououa',
                'city' => 'cheraga',
            ]
        ]);

        $wilayas = Storage::json('data/wilaya.json');
        DB::table('wilayas')->insert($wilayas);

        $cities = Storage::json('data/cities.json');
        $cities = array_map(function ($city) {
            return [
                'commune_name' => $city['commune_name_ascii'],
                'ar_commune_name' => $city['commune_name'],
                'daira_name' => $city['daira_name_ascii'],
                'ar_daira_name' => $city['daira_name'],
                'wilaya_id' => $city['wilaya_code']
            ];
        }, $cities);

        DB::table('cities')->insert($cities);

        $shipping = ShippingCompany::create([
            'name' => 'yalidine',
            'status' => true,
        ]);

        $shipping->shippingPricings()->createMany(Storage::json('data/yalidinePrices.json'));

        foreach (Storage::json('data/brands.json') as $brand) {
            Brand::create($brand);
        }

        // foreach(Storage::json('data/products.json') as $product)
        // {
        //     Product::create($product);
        // }


    }
}
