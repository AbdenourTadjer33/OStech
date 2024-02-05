<?php

namespace App\Models;

use App\Traits\ReferanceGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Product extends Model
{
    use HasFactory, ReferanceGenerator;

    protected $fillable = [
        'ref',
        'name',
        'slug',
        'description',
        'sku',
        'qte',
        'price',
        'promo',
        'features',
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
        'created_at' => 'datetime:d-m-Y H:i',
        'updated_at' => 'datetime:d-m-Y H:i'
    ];

    public function assets(): MorphMany
    {
        return $this->morphMany(Media::class, 'mediable');
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'product_tags', 'product_id', 'tag_id');
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_products');
    }
}
