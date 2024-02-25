<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\ShippingCompany;
use App\Models\ShippingPricing;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ShippingController extends Controller
{
    public function get(Request $request)
    {
        return ShippingCompany::where('name', $request->name)->first();
    }

    public function getPricings(Request $request)
    {
        $code = (int) $request->input('wilaya');
        $shipping = ShippingPricing::where('wilaya_id', $code)->first();
        if (!$shipping) {
            return;
        }
        return [
            ['price' => $shipping->cost_home, 'label' => 'tarif à domicile', 'name' => 'cost_home'],
            ['price' => $shipping->cost_stop_desk, 'label' => 'tarif stop desk', 'name' => 'cost_stop_desk'],
        ];

        // return ShippingCompany::status()
        //     ->whereHas('shippingPricings', fn ($query) => $query->where('wilaya_id', $code))
        //     ->with(['shippingPricings' => fn ($query) => $query->where('wilaya_id', $code)])
        //     ->get();
    }

    public function index()
    {
        $result = Cache::remember(
            'shipping',
            now()->addWeek(),
            fn () =>
            ShippingCompany::status()->with('shippingPricings')->get()
        );

        dump($result);
    }

    public function bestPlan()
    {
        (ShippingCompany::status()->with('shippingPricings')->get());
        dump(ShippingPricing::where('wilaya_id', 16)->with('shippingCompany')->get());
    }
}
