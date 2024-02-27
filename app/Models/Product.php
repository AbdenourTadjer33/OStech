<?php

namespace App\Models;

use App\Traits\UniqueGenerator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory, UniqueGenerator, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'sku',
        'qte',
        'price',
        'promo',
        'features',
        'images',
        'status',
        'catalogue',
        'category_id',
        'brand_id',
    ];

    protected $casts = [
        'price' => 'double',
        'status' => 'boolean',
        'catalogue' => 'boolean',
        'features' => 'array',
        'images' => 'array',
        'created_at' => 'datetime:d-m-Y H:i',
        'updated_at' => 'datetime:d-m-Y H:i'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Product $product) {
            $product->slug = $product->generateSlug('slug', $product->name);
        });
    }

    public function scopeActive(Builder $query)
    {
        $query->where('status', true);
    }

    public function scopeStatus(Builder $query)
    {
        $query->where('status', true);
    }

    public function scopeClient(Builder $query)
    {
        $query->select(['id', 'slug', 'name', 'description', 'price', 'promo', 'images', 'features', 'category_id', 'brand_id']);
    }

    public function scopeShoppingCart(Builder $query)
    {
        $query->select(['id', 'slug', 'name', 'price', 'promo', 'images']);
    }

    public function scopeSample(Builder $query)
    {
        $query->select(['id', 'slug', 'name', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(products.images, '$[0]')) as image"), 'price', 'promo']);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class)->withPivot(['qte', 'prices']);
    }

    /**
     * this method check if a product has a promo
     * and calculate the final price of the product
     * else return the price
     * 
     * @return float
     */
    public function calculateFinalPrice(): float
    {
        if (!$this->promo) {
            return $this->price;
        }

        return $this->price - ($this->price * $this->promo / 100);
    }
}
