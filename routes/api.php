<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Client\CouponController;
use App\Http\Controllers\Client\ProductController as ClientProductController;
use App\Http\Controllers\Client\ShippingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('generate-password', [AdminController::class, 'generatePassword'])->name('admin.generate.password');

    Route::post('/save-temp-images', [ProductController::class, 'saveTempImages'])->name('save.temp.imgs');
    Route::post('/edit-temp-image', [ProductController::class, 'editTempImage'])->name('edit.temp.img');
    Route::post('/destroy-temp-image', [ProductController::class, 'destroyTempImage'])->name('destroy.temp.img');

    Route::post('/save-temp', [UploadController::class, 'saveTemp'])->name('save.temp');
    Route::post('/edit-temp', [UploadController::class, 'editTemp'])->name('edit.temp');
    Route::post('/destroy-temp', [UploadController::class, 'destroyTemp'])->name('destroy.temp');
});


Route::post('/coupon/verify', [CouponController::class, 'verify'])->name('coupon.verify');
