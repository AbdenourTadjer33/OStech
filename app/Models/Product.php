<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'ref',
        'name',
        'slug',
        'description',
        'details',
        'choice',
        'promo',
        'qte',
        'price',
        'status',
        'catalogue',
        'category_id',
        'brand_id',
    ];

    protected $casts = [
        'details' => 'array',
        'choice' => 'array',
        'status' => 'boolean',
        'catalogue' => 'boolean',
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
