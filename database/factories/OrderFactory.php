<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = rand(0, 1) ? null : User::get()->random();
        return [
            'ref' => Order::generateRef('ref'),
            'user_id' =>   $user?->id,
            'client' => [
                'name' => $user?->name ?? fake()->name(),
                'phone' => fake()->phoneNumber(),
                'address' => fake()->address(),
                'city' => fake()->city(),
                'wilaya' => rand(1, 48) 
            ],
            'shipping_type' => 'Tarif stop-desk',
            'shipping_cost' => 500,
            
            'payment_method' => 'Paiement à la livraison',

            'sub_total' => 4000,
            'total' => 4500,
            'status' => 'Nouvel commande',
            'is_online' => true,
            'created_at' => now()->subYear(),
            'updated_at' => now()->subYear()
        ];
    }
}
