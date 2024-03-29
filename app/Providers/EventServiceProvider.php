<?php

namespace App\Providers;

use App\Events\Admin\NewAdmin;
use App\Events\MyEvent;
use App\Events\Order\NewOrder;
use App\Listeners\SendAdminCredentials;
use App\Listeners\SendNewOrderNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        MyEvent::class => [],

        Registered::class => [
            SendEmailVerificationNotification::class,
        ],

        NewOrder::class => [
            SendNewOrderNotification::class
        ],

        NewAdmin::class => [
            SendAdminCredentials::class,
        ]
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
