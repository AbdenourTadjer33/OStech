<?php

use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Client\WelcomeController;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\ProfileController;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');


Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/{subCategory}/products', [ProductController::class, 'subCategory'])->name('subCategory.products');

Route::prefix('cart')->controller(CartController::class)->group(function () {
    Route::get('/', 'index')->name('cart.index');
    Route::post('/add-prodouct/{id}', 'addItem')->name('cart.add');
    Route::post('/handle-product-qte/{id}', 'handleQte')->name('cart.handle.qte');
    Route::post('/remove-from-cart/{id}', 'destroyItem')->name('cart.remove');

    Route::get('/temp-destroy-cart', 'destroy')->name('cart.destroy');
});


Route::get('/catalogue', [WelcomeController::class, 'index'])->name('catalogue');
Route::get('/contact', [WelcomeController::class, 'index'])->name('contact');

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
