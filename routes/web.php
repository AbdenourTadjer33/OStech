<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\Client\CouponController;
use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Client\WelcomeController;
use App\Http\Controllers\Client\CategoryController;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::controller(WelcomeController::class)->group(function () {
    Route::get('/', 'index')->name('welcome');
    Route::get('/contact-us', 'contact')->name('contact');
    Route::get('/our-catalogue', 'catalogue')->name('catalogue');
});


Route::prefix('products')->controller(ProductController::class)->group(function () {
    Route::get('/', 'index')->name('products');
    Route::get('/slug', 'show')->name('products.show');
});

Route::prefix('products')->controller(ProductController::class)->as('products.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/{slug}', [ProductController::class, 'show'])->name('show');
});

Route::prefix('category')->controller(CategoryController::class)->as('category.')->group(function () {
    Route::get('/{category_slug}/{subCategory_slug}', 'show')->name('show');
    Route::get('/', 'getByCategory')->name('get');
}); 

Route::prefix('cart')->controller(CartController::class)->group(function () {
    Route::get('/', 'index')->name('cart');
    Route::post('/add-prodouct/{id}', 'addItem')->name('cart.add');
    Route::post('/handle-product-qte/{id}', 'handleQte')->name('cart.handle.qte');
    Route::post('/remove-from-cart/{id}', 'destroyItem')->name('cart.remove');
    Route::get('/temp-destroy-cart', 'destroy')->name('cart.destroy');
});

Route::prefix('order')->controller(OrderController::class)->as('order.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::post('/create', 'store')->name('store');
    Route::get('/show/{ref}', 'show')->name('show');
    Route::get('/new/{ref}', 'newOrder')->name('new.show');

    Route::get('/download/pdf/{ref}', 'pdf')->name('pdf');

});

Route::prefix('coupon')->controller(CouponController::class)->group(function () {
    Route::post('/add', 'add')->name('coupon.add');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
