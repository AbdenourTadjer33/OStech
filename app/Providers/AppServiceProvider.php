<?php

namespace App\Providers;

use App\Services\CouponService;
use App\Services\OrderService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(CouponService::class, function ($app) {
            return new CouponService();
        });

        $this->app->singleton(OrderService::class, function ($app) {
            return new OrderService();
        });

        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
