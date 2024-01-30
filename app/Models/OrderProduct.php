<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'order_id',
        'product',
        'choice',
        'qte',
        'prices',
        'total',
    ];

    protected $casts = [
        'product' => 'array',
        'chioce' => 'array',
        'prices' => 'array',
    ];
}
