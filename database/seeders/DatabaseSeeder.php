<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(100)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'abdenour tadjer',
        //     'email' => 'tad.abdenour33@gmail.com',
        //     'status' => true,
        //     'type' => 'admin',
        //     'password' => 'password',
        // ]);

        // \App\Models\Role::create([
        //     'name' => 'admin',
        //     'permission' => 'all',
        // ]);
    }
}
