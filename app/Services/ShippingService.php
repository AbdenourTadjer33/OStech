<?php

namespace App\Services;

use App\Models\ShippingPricing;
use Illuminate\Support\Facades\Cache;

class ShippingService
{

    public function getShippings(): \Illuminate\Database\Eloquent\Collection
    {
        return Cache::remember('shippings', now()->addDay(), fn () => ShippingPricing::get());
    }

    public function getPricing($wilayaId)
    {
        $shippings = $this->getShippings();
        return $shippings->firstWhere('wilaya_id', $wilayaId);
    }
}
