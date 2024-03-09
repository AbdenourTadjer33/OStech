<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShippingPricing extends Model
{
    use HasFactory;

    protected $fillable = [
        'wilaya_id',
        'delay',
        'cost_home',
        'cost_stop_desk',
    ];


    public $timestamps = false;
}
