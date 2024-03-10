<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Support\Facades\Cache;

class BrandService
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getBrands(): \Illuminate\Database\Eloquent\Collection
    {
        return Cache::remember('brands', now()->addDay(), fn () => Brand::get());
    }
}
