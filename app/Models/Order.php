<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\ShippingType;
use App\Traits\UniqueGenerator;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, UniqueGenerator, SoftDeletes;

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
        'payment_method' => PaymentMethod::class,
        'shipping_type' => ShippingType::class,
        'is_online' => 'boolean',
        'created_at' => 'datetime:d-m-Y H:i',
        'updated_at' => 'datetime:d-m-Y H:i'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(fn (Order $order) => $order->ref = $order->generateRef());
    }

    public static function intervals(): array
    {
        return [
            "today",
            "yesterday",
            "last7days",
            "last30days",
            "thisyear",
            "lastyear",
        ];
    }

    public function scopeAdmin(Builder $query)
    {
        $query->select('id', 'ref', 'client', 'shipping_type', 'shipping_cost', 'payment_method', 'coupon_code', 'discount', 'sub_total', 'total', 'status', 'is_online', 'created_at');
    }

    public function scopeToday(BUilder $query)
    {
        $query->whereDate('created_at', Carbon::now());
    }

    public function scopeYesterday(Builder $query)
    {
        $query->whereDate('created_at', Carbon::yesterday());
    }

    public function scopeLast7Days(Builder $query)
    {
        $query->whereDate('created_at', '>=', Carbon::now()->subDays(6))
            ->whereDate('created_at', '<=', Carbon::now());
    }

    public function scopeLast30Days(Builder $query)
    {
        $query->whereDate('created_at', '>=', Carbon::now()->subDays(29))
            ->whereDate('created_at', '<=', Carbon::now());
    }

    public function scopeThisYear(Builder $query)
    {
        $query->whereYear('created_at', date('Y'));
    }

    public function scopeLastYear(Builder $query)
    {
        $query->whereYear('created_at', date('Y') - 1);
    }

    public function scopeInterval(Builder $query, ?string $interval)
    {

        switch ($interval) {
            case Order::intervals()[0]:
                $query->today();
                break;
            case Order::intervals()[1]:
                $query->yesterday();
                break;
            case Order::intervals()[2]:
                $query->last7Days();
                break;
            case Order::intervals()[3]:
                $query->last30Days();
                break;
            case Order::intervals()[4]:
                $query->thisYear();
                break;
            case Order::intervals()[5];
                $query->lastYear();
                break;
            default:
                $query->today();
                break;
        }
    }

    public function scopeOnline(Builder $query)
    {
        $query->where('is_online', true);
    }

    public function scopeOffline(Builder $query)
    {
        $query->where('is_online', false);
    }

    public function scopeOnlineOption(Builder $query, $online)
    {
        switch ($online) {
            case "1":
                $query->online();
                break;
            case "2":
                $query->offline();
                break;
        }
    }

    public function scopeStatus(Builder $query, $status)
    {
        $query->where('status', $status);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)->withPivot(['qte', 'prices', 'product']);
    }

    public function orderProducts(): HasMany
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class, 'coupon_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
