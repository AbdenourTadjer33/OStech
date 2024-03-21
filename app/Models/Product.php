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
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use HasFactory, UniqueGenerator, SoftDeletes, Searchable;

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
        'catalog',
        'colors',
        'options',
        'total_sales',
        'category_id',
        'brand_id',
    ];

    protected $casts = [
        'price' => 'double',
        'status' => 'boolean',
        'catalog' => 'boolean',
        'features' => 'array',
        'options' => 'array',
        'colors' => 'array',
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

    public function orderProducts(): HasMany
    {
        return $this->hasMany(OrderProduct::class, 'product_id', 'id');
    }

    public function scopeActive(Builder $query)
    {
        $query->where('status', true);
    }

    public function scopeNotActive(Builder $query)
    {
        $query->where('status', false);
    }

    public function scopeActiveCatalog(Builder $query)
    {
        $query->where('catalog', true);
    }

    public function scopeNotActiveCatalog(Builder $query)
    {
        $query->where('catalog', false);
    }

    public function scopeAdmin(Builder $query)
    {
        $query->select([
            'id',
            'slug',
            'name',
            'description',
            'sku',
            'qte',
            'price',
            'promo',
            'status',
            'catalog',
            'total_sales',
            'category_id',
            'brand_id',
            'images',
            'created_at',
            'updated_at',
            'deleted_at',
        ]);
    }

    public function scopeShoppingCart(Builder $query)
    {
        $query->select(['id', 'slug', 'name', 'price', 'promo', 'images']);
    }

    public function scopeSample(Builder $query)
    {
        $query->select(['id', 'slug', 'name', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(products.images, '$[0]')) as image"), 'price', 'promo']);
    }

    public function scopeClient(Builder $query)
    {
        $query->select([
            'id',
            'slug',
            'name',
            'price',
            'promo',
            DB::raw("JSON_UNQUOTE(JSON_EXTRACT(products.images, '$[0]')) as image"),
            'brand_id',
            'category_id',
        ]);
    }

    public function scopeDetails(Builder $query)
    {
        $query->select([
            'id',
            'slug',
            'name',
            'description',
            'features',
            'price',
            'promo',
            'images',
            'brand_id',
            'category_id',

        ]);
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
