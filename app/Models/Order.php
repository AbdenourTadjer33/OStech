<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Traits\ReferanceGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Order extends Model
{
    use HasFactory, ReferanceGenerator;

    protected $fillable = [
        'user_id',
        'client',
        'shipping_company_id',
        'shipping_type',
        'shipping_cost',
        'payment_method',
        'coupon_id',
        'coupon_code',
        'discount',
        'sub_total',
        'total',
        'status',
        'is_online',
    ];

    protected $casts = [
        'client' => 'array',
        'status' => OrderStatus::class,
        'is_online' => 'boolean',
        'created_at' => 'datetime:d-m-Y H:i',
        'updated_at' => 'datetime:d-m-Y H:i'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(fn (Order $order) => $order->ref = $order->generateRef());
    }

    public function scopeAdmin(Builder $query)
    {
        $query->select('id', 'ref', 'client', 'shipping_type', 'shipping_cost', 'payment_method', 'coupon_code', 'discount', 'sub_total', 'total', 'status', 'is_online', 'created_at');
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)->withPivot(['qte', 'prices', 'product']);
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
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function pdf(): MorphOne
    {
        return $this->morphOne(Media::class, 'mediable');
    }
}
