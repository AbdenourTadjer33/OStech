<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Services\ApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('generate-password', [AdminController::class, 'generatePassword'])->name('api.admin.generate.password');

    Route::get('/categories_brands', [ApiService::class, 'getCategoriesBrands'])->name('api.categiries.brands');

    Route::post('/save-temp-images', [ProductController::class, 'saveTempImages'])->name('api.save.temp.imgs');
    Route::post('/destroy-temp-image', [ProductController::class, 'destroyTempImage'])->name('api.destroy.temp.img');
});
