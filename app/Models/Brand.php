<?php

namespace App\Models;

use App\Traits\UniqueGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends Model
{
    use HasFactory, UniqueGenerator;

    protected $fillable = [
        'name',
        'slug',
        'logo',
    ];

    protected $casts = [
        'created_at' => 'datetime:d-m-Y H:i',
        'updated_at' => 'datetime:d-m-Y H:i'
    ];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),
        );
    }


    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'brand_id', 'id');
    }
}
