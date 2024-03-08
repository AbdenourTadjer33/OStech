<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class WilayaService
{
    public function getWilayas()
    {
        return Cache::driver('file')->rememberForever('wilaya', fn () => DB::table('wilayas')->get());
    }

    public function getWilayaByCode($code)
    {
        return $this->getWilayas()->firstWhere('code', $code)->name;
    }

    public function clearWilayaCache()
    {
        Cache::driver('file')->forget('wilaya');
    }
}
