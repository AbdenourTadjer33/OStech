<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Client\CouponController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/coupon/verify', [CouponController::class, 'verify'])->name('coupon.verify');
