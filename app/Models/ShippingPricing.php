<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShippingPricing extends Model
{
    use HasFactory;

    protected $fillable = [
        'shipping_company_id',
        'wilaya_id',
        'delay',
        'cost_home',
        'cost_stop_desk',
    ];

    public function shippingCompany(): BelongsTo
    {
        return $this->belongsTo(ShippingCompany::class, 'shipping_company_id', 'id');
    }

    public $timestamps = false;
}
