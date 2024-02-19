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
        return ShippingCompany::where('name', $request->name)
            ->with('shippingPricings')
            ->first();
    }

    public function getPricings(Request $request)
    {
        $wilaya = $request->input('code');
        $shippingCompany = $request->input('company');

        // $cache = Cache::get(
            // 'shipping',
            // ShippingCompany::status()->where('name', $shippingCompany)->get()
        // );
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
