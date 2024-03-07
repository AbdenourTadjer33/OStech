<?php

namespace App\Listeners;

use App\Events\Order\NewOrder;
use App\Mail\NewOrderMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendNewOrderNotification implements ShouldQueue
{

    public function handle(NewOrder $event): void
    {
        Mail::to($event->order?->client['email'], $event->order?->client['name'])->send(new NewOrderMail($event->order, $event->orderProducts, $event->orderLink));
    }
}
