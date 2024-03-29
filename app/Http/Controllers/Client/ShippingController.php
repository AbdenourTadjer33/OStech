<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\ShippingPricing;
use App\Services\ShippingService;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function getPricings(Request $request, ShippingService $shippingService)
    {
        if (!$request->isXmlHttpRequest()) {
            abort(404);
        }

        $code = (int) $request->input('wilaya');
        if (!$code) {
            return response()->json(null, 204);
        }


        $shippingPricing = $shippingService->getPricing($code);

        if (!$shippingPricing) {
            return response()->json(null, 404);
        }

        return response()->json([
            [
                'name' => 'Tarif à domicile',
                'price' => $shippingPricing->cost_home,
                'delay' => $shippingPricing->delay,
            ],
            [
                'name' => 'Tarif stop-desk',
                'price' => $shippingPricing->cost_stop_desk,
                'delay' => $shippingPricing->delay,
            ],
        ]);
    }
}
