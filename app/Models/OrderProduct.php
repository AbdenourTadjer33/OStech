<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;

    protected $table = 'order_product';
    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'product_id',
        'qte',
        'product',
        'total',
    ];

    protected $casts = [
        'qte' => 'integer',
        'prices' => 'array',
        'product' => 'array',
        'total' => 'float',
    ];
}
