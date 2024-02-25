<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Client\CouponController;
use App\Http\Controllers\Client\ShippingController;
use App\Services\ApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('generate-password', [AdminController::class, 'generatePassword'])->name('admin.generate.password');

    Route::get('/categories_brands', [ApiService::class, 'getCategoriesBrands'])->name('categiries.brands');

    Route::post('/save-temp-images', [ProductController::class, 'saveTempImages'])->name('save.temp.imgs');
    Route::post('/edit-temp-image', [ProductController::class, 'editTempImage'])->name('edit.temp.img');
    Route::post('/destroy-temp-image', [ProductController::class, 'destroyTempImage'])->name('destroy.temp.img');

    Route::post('/save-temp', [UploadController::class, 'saveTemp'])->name('save.temp');
    Route::post('/edit-temp', [UploadController::class, 'editTemp'])->name('edit.temp');
    Route::post('/destroy-temp', [UploadController::class, 'destroyTemp'])->name('destroy.temp');
});


Route::post('/coupon/verify', [CouponController::class, 'verify'])->name('coupon.verify');
Route::get('/shipping-pricing', [ShippingController::class, 'getPricings'])->name('shipping.pricings');

// Route::get('/shipping-prices', [])

Route::post('test-api', function (Request $request) {
    return session()->get('cart');
})->name('test.api');
