<?php

namespace App\Http\Controllers\Client;

use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Cache;

class CouponController extends Controller
{
    use HttpResponses;

    public function add(Request $request)
    {

        $coupon = Coupon::isValid($request->code)->first();
        if (!$coupon) {
            return redirect()->back()->with('alert', [
                'status' => 'danger',
                'message' => 'Coupon non valide!'
            ]);
        }

        Cache::put('coupon-' . session()->getId(), $coupon, now()->addHour());

        session()->put('coupon', $coupon->only('code', 'type', 'value', 'max_amount'));

        return redirect()->back()->with('alert', [
            'show' => false,
            'status' => 'success',
            'message' => "Coupon code de - {$coupon->value} " . ($coupon->type == 'percentage' ? '%' : 'DZD') . " est activé"
        ]);
    }
}
