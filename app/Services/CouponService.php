<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Coupon;

class CouponService
{

    public function isCouponValid($code): bool|Coupon
    {
        $coupon = Coupon::where('code', $code)
            ->where('status', true)
            ->where(function ($query) {
                $query->whereNull('start_at')
                    ->orWhere('start_at', '<=', Carbon::now());
            })
            ->where(function ($query) {
                $query->whereNull('expire_at')
                    ->orWhere('expire_at', '>=', Carbon::now());
            })
            ->first();

        if ($coupon && $coupon->max_use > $coupon->used_times) {
            return $coupon;
        }

        return false;
    }
}
