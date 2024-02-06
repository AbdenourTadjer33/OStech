<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('generate-password', [AdminController::class, 'generatePassword'])->name('api.admin.generate.password');
    Route::get('/categories', [CategoryController::class, "get"])->name('api.getCategories');
});
