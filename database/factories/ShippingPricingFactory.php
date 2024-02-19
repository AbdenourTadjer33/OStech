<?php

namespace Database\Factories;

use App\Models\ShippingCompany;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ShippingPricingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'shipping_company_id' => ShippingCompany::all()->random()->id,
            'wilaya_id' => rand(1,58),
            'delay' => rand(1, 5),
            'cost_home' => 1200,
            'cost_stop_desk' => 1000,
        ];
    }
}
