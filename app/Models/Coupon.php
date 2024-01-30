<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type',
        'value',
        'start_date',
        'expire_date',
        'max_use',
        'used_times',
        'max_amount',
        'status',
        'scope',
        'scope_id',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'order_id', 'id');
    }
}
