<?php

namespace App\Models;

use App\Traits\UniqueGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory, UniqueGenerator;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
    ];

    protected $casts = [
        'created_at' => 'datetime:d-m-Y H:i',
        'updated_at' => 'datetime:d-m-Y H:i',
    ];

    protected static function boot()
    {
        parent::boot();

        static::updating(function (Category $category) {
            dd('here on the model');
            $category->slug = $category->generateSlug('slug', $category->name);
        });

        static::creating(function (Category $category) {
            $category->slug = $category->generateSlug('slug', $category->name);
        });

    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),
        );
    }

    public function scopeSubCategory(Builder $query)
    {
        $query->where('parent_id', '<>', 'null');
    }

    public function scopeMainCategory(Builder $query)
    {
        $query->whereNull('parent_id');
    }



    public function subCategories(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function parentCategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Accessor to check if a category is a main category (no parent)
    public function isMainCategory()
    {
        return $this->parent_id === null;
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
