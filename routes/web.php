<?php

use App\Http\Controllers\Client\WelcomeController;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\ProfileController;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('/product', function () {
    return Inertia::render('Client/Product');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get('/test', function () {
    $city = DB::table('cities')->get();

    Storage::put('data/city.json', json_encode($city, JSON_UNESCAPED_UNICODE));
});


require __DIR__ . '/auth.php';
