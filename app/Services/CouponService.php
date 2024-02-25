<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Coupon;

class CouponService
{
    /**
     * this service method verify if an coupon is valid.
     * if is valid the coupon used_times attribute will incremented and we will calcul the discount and return it
     * in the case of invalid coupon null is returned
     * @param string $code
     * @return ?float
     */
    public function useCoupon(?string $code, $amount): ?float
    {
        if (!$code) return null;
        /**
         * @var \App\Models\Coupon
         */
        $coupon = Coupon::isValid($code)->first();
        if (!$coupon) return null;

        $coupon->increment('used_times');

        return $coupon->discount($amount);
    }
}
