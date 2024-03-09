<?php

namespace App\Listeners;

use App\Events\Admin\NewAdmin;
use App\Mail\AdminDataMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendAdminCredentials implements ShouldQueue
{
    public function handle(NewAdmin $event): void
    {
        Mail::to($event->user['email'])->send(new AdminDataMail($event->user));
    }
}
