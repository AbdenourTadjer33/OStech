<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ShippingPricing;
use App\Services\ShippingService;
use App\Services\WilayaService;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ShippingController extends Controller
{
    public function index(WilayaService $wilayaService, ShippingService $shippingService)
    {
        $shippings = $shippingService->getShippings();
        $wilayas = $wilayaService->getWilayas();

        $shippings->map(
            fn ($shipping) =>
            $shipping->wilaya_name = $wilayas->firstWhere('code', $shipping->wilaya_id)->name
        );

        return Inertia::render('Admin/Shipping/Index', [
            'shippings' => $shippings,
        ]);
    }

    public function update(Request $request, WilayaService $wilayaService)
    {
        $request->validate([
            'delay' => ['nullable', 'string'],
            'cost_home' => ['nullable', 'numeric'],
            'cost_stop_desk' => ['nullable', 'numeric'],
        ]);

        DB::transaction(
            fn () =>
            ShippingPricing::where('wilaya_id', $request->wilayaId)->update([
                'cost_home' => $request->input('cost_home'),
                'cost_stop_desk' => $request->input('cost_stop_desk'),
                'delay' => $request->input('delay'),
            ])
        );

        $this->clearCacheShippings();

        $wilaya = $wilayaService->getWilayaByCode($request->wilayaId);

        return redirect(route('admin.shipping.index'))->with('alert', [
            'status' => 'success',
            'message' => "tarification de $wilaya sont editer avec succés",
        ]);
    }

    private function clearCacheShippings()
    {
        Cache::forget('shipping_pricings');
    }
}
