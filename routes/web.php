<?php

use App\Models\Order;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\Client\CouponController;
use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Client\SettingController;
use App\Http\Controllers\Client\WelcomeController;
use App\Http\Controllers\Client\CategoryController;
use App\Http\Controllers\Client\ShippingController;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::controller(WelcomeController::class)->group(function () {
    Route::get('/', 'index')->name('welcome');
    Route::get('/contact-us', 'contact')->name('contact');
    Route::get('/our-catalogue', 'catalogue')->name('catalogue');


    Route::get('/terms-and-conditions', 'termAndCondition');
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
    Route::get('/{category:slug}/{subCategory:slug}', 'show')->name('show');


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

    Route::get('new/{ref}', 'newOrder')->name('new');
    Route::get('/show/{ref}', 'show')->name('show');

    Route::get('/find', 'find')->name('find');

    Route::get('/download/pdf/{ref}', 'pdf')->name('pdf');
});

Route::get('/shipping-pricing', [ShippingController::class, 'getPricings'])->name('shipping.pricings');

Route::prefix('coupon')->controller(CouponController::class)->group(function () {
    Route::post('/add', 'add')->name('coupon.add');
});

Route::prefix('setting')->controller(SettingController::class)->as('setting.')->group(function () {
    Route::get('/', 'index')->name('index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
});


require __DIR__ . '/auth.php';