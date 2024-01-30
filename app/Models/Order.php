<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'ref',
        'coupon_id',
        'user_id',
        'shipping_company_id',
        'address',
        'client',
        'coupon_code',
        'discount',
        'shipping_company_name',
        'shipping_company_cost',
        'total',
        'status',
        'is_online',
    ];

    protected $casts = [
        'client' => 'array',
        'status' => 'boolean',
        'is_online' => 'boolean',
    ];


    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'order_products');
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class, 'coupon_id', 'id');
    }

    public function shippingCompany(): BelongsTo
    {
        return $this->belongsTo(ShippingCompany::class, 'shipping_company_id', 'id');
    }

    public function user(): BelongsTo
    {
        // if (!$this->user_id) {
        //     return $this->client;
        // }
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function pdf(): MorphOne
    {
        return $this->morphOne(Media::class, 'mediable');
    }
}
