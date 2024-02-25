<?php

namespace App\Services;

use App\Models\ShippingPricing;

class OrderService
{
    public function calculatePromo($price, $percentage)
    {
        return $price - (($price * $percentage) / 100);
    }

    /**
     * this service method calculate and return sub total 
     * @var array the cart array
     * @return float
     */
    public function calculateSubTotal(array $cart): float
    {
        $subTotal = 0;
        foreach ($cart as $cartItem) {
            $subTotal += $cartItem['product']?->calculateFinalPrice() * (int) $cartItem['qte'];
        }
        return $subTotal;
    }

    /**
     * this service method prepare orderProduct for the pivot table
     * @var array the cart array
     */
    public function prepareOrderProducts(array $cart): array
    {
        $orderProducts = [];
        foreach ($cart as $cartItem) {
            /**
             * @var \App\Models\Product
             */
            $product = $cartItem['product'];
            $orderProducts[$cartItem['product']?->id] = [
                'qte' => $cartItem['qte'],
                'prices' => collect([
                    'price' => $product?->price,
                    'promo' => $product?->promo
                ])->toJson(),
                'total' => $product?->calculateFinalPrice()
            ];
        }
        return $orderProducts;
    }

    /**
     * @param int $wilayaCode
     * @param string $shippingType
     * @return null|float 
     */
    public function shippingPricing($wilayaCode, $shippingType): null|float
    {
        $shippingPricing = ShippingPricing::where('wilaya_id', (int) $wilayaCode)->first();
        if (!$shippingPricing) return null;

        switch ($shippingType) {
            case 'cost_home':
                return $shippingPricing->cost_home;
            case 'cost_stop_desk':
                return $shippingPricing->cost_stop_desk;
            default:
                return null;
        }
    }

    /**
     * @param float $subTotal
     * @param ?float $shippingCost
     * @param ?float $couponDiscount 
     * @return float
     */
    public function calculateTotal(float $subTotal, ?float $shippingCost, ?float $couponDiscount): float
    {
        if (!$couponDiscount && !$shippingCost) return $subTotal;

        // If there's no coupon discount but there's a shipping cost, add it to the subtotal and return
        if (!$couponDiscount && $shippingCost) {
            return $subTotal + $shippingCost;
        }

        // If there's no shipping cost but there's a coupon discount, subtract it from the subtotal and return
        if (!$shippingCost && $couponDiscount) {
            return max(0, $subTotal - $couponDiscount);
        }

        // If both coupon discount and shipping cost are present, subtract coupon discount from subtotal, then add shipping cost
        return max(0, $subTotal - $couponDiscount) + $shippingCost;
    }
}
