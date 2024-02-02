<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'title',
        'label',
        'detail',
        'is_html',
    ];

    protected $casts = [
        'is_html' => 'boolean',
    ];

    public function product(): HasOne
    {
        return $this->hasOne(Product::class);
    }
}
