<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Support\Str;
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

        $role = \App\Models\Role::create([
            'name' => 'administrateur',
            'description' => 'ce role est pour un administrateur, avec tous les permissions',
            'permission' => 'all'

        ]);

        \App\Models\User::create([
            'name' => 'abdenour tadjer',
            'email' => 'tad.abdenour33@gmail.com',
            'status' => true,
            'type' => 'admin',
            'role_id' => $role->id,
            'password' => 'password',
        ]);

        DB::table('categories')->insert([
            [
                'id' => 1,
                'name' => 'Accessoire',
                'slug' => Str::slug('Accessoire'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Télephone mobile',
                'slug' => Str::slug('Télephone mobile'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Autre',
                'slug' => Str::slug("autre"),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('categories')->insert([
            [
                'id' => 4,
                'name' => 'Casque',
                'slug' => Str::slug('casque'),
                'parent_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'Coques de protection',
                'slug' => Str::slug('coques de protection'),
                'parent_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'name' => 'Montres intelligentes',
                'slug' => Str::slug('Montres intelligentes'),
                'parent_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
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
    }
}
