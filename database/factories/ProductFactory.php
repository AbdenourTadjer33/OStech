<?php

namespace Database\Factories;

use App\Models\Category;
use App\Services\BrandService;
use App\Services\CategoryService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = (new CategoryService)->getCategories();
        return [
            'name' => fake()->name(),
            'slug' => fake()->slug(),
            'price' => rand(1500, 200000),
            'status' => rand(0,1),
            'catalog' => rand(0,1),
            'category_id' => (new CategoryService)->subCategories($categories)->random()->id,
            'brand_id' => (new BrandService)->getBrands()->random()->id,
            'total_sales' => rand(0, 100),

        ];
    }
}
