<?php

namespace App\Events\Order;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewOrder
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;
    public $orderProducts;
    public $orderLink;

    public function __construct($order, $orderProducts, $orderLink)
    {
        $this->order = $order;
        $this->orderProducts = $orderProducts;
        $this->orderLink = $orderLink;
    }
}
