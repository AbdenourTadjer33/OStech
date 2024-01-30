<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    public $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function updateName($name)
    {
        $this->product->name = $name;
    }

    public function updateRef($ref)
    {
        $this->product->ref = $ref;
    }

    public function updateDetails($details)
    {
        $this->product->details = $details;
    }

    public function updateStatus(array $data)
    {
        $this->product->status = $data['status'];
        $this->product->catalogue = $data['catalogue'];
    }

    // public function update

    public function __destruct()
    {
        $this->product->save();
    }
}
