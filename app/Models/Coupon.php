<?php

namespace App\Models;

use App\Traits\CodeGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coupon extends Model
{
    use HasFactory, CodeGenerator;

    protected $fillable = [
        'type',
        'value',
        'start_at',
        'expire_at',
        'max_use',
        'used_times',
        'max_amount',
        'status',
        'scope',
        'scope_id',
    ];

    protected $casts = [
        'code' => 'string',
        'value' => 'float',
        'start_at' => 'datetime:d-m-Y H:i',
        'expire_at' => 'datetime:d-m-Y H:i',
        'max_use' => 'integer',
        'used_times' => 'integer',
        'max_amount' => 'float',
        'status' => 'boolean',
        'scope_users' => 'array',
        'scope_products' => 'array',
        'created_at' => 'datetime:d-m-Y H:i',
        'updated_at' => 'datetime:d-m-Y H:i',
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(fn (Coupon $coupon) => $coupon->code = $coupon->generate(6, 'code'));
    }


    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'order_id', 'id');
    }


    public function scopeIsValid(Builder $query, $code = null)
    {
        return $query->where('code', $code)
            ->where('status', true)
            ->where(function ($query) {
                $query->whereNull('start_at')
                    ->orWhere('start_at', '<=', now());
            })
            ->where(function ($query) {
                $query->whereNull('expire_at')
                    ->orWhere('expire_at', '>=', now());
            })
            ->where(function ($query) {
                $query->whereNull('max_use') // Check if max_use is null (unlimited use) or
                    ->orWhere('used_times', '<', DB::raw('max_use')); // used_times is less than max_use
            });
    }

    public function discount($amount)
    {
        $reduction = $amount - $this->value;
        if ($this->type === 'percentage') {
            $reduction = ($amount * $this->value) / 100;
        }

        return $reduction > $this->max_amount ? $this->max_amount : $reduction;
    }
}
