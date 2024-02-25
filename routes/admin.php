<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\WilayaController;
use App\Http\Controllers\Admin\ShippingController;

Route::get('/', fn () => to_route('admin.dashboard'));
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::prefix('brand')->controller(BrandController::class)->group(function () {
    Route::get('/', 'index')->name('brands.index');
    Route::get('/create', 'create')->name('brands.create');
    Route::post('/create', 'store')->name('brands.store');
    Route::get('edit/{id}', 'edit')->name('brands.edit');
    Route::post('edit/{id}', 'update')->name('brands.update');
    Route::delete('destroy/{id}', 'destroy')->name('brands.destroy');
});

Route::prefix('category')->controller(CategoryController::class)->group(function () {
    Route::get('/', 'index')->name('categories.index');

    Route::post('/create-category', 'storeCategory')->name('categories.storeCategory');
    Route::post('/create-subcategory', 'storeSubCategory')->name('categories.storeSubCategory');

    Route::post('/edit-category/{id}', 'updateCategory')->name('categories.updateCategory');
    Route::post('/edit-subcategory/{id}', 'updateSubCategory')->name('categories.updateSubCategory');

    Route::delete('/delete-category/{id}', 'destroyCategory')->name('categories.destroyCategory');
    Route::delete('/delete-subcategory/{id}', 'destroySubCategory')->name('categories.destroySubCategory');
});

Route::prefix('product')->controller(ProductController::class)->group(function () {
    Route::get('/', 'index')->name('products.index');
    Route::get('/create', 'create')->name('products.create');
    Route::post('/create', 'store')->name('products.store');
    Route::get('/edit/{id}', 'edit')->name('products.edit');
    Route::post('/edit/{id}', 'update')->name('products.update');
    Route::post('/restore/{id}', 'restore')->name('products.restore');
    Route::delete('/destroy/{id}', 'destroy')->name('products.destroy');
    Route::delete('/force-destroy/{id}', 'forceDestroy')->name('products.forceDestroy');
});

Route::prefix('coupon')->controller(CouponController::class)->as('coupon.')->group(function() {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::post('/create', 'store')->name('store');
    Route::get('/edit/{id}', 'edit')->name('edit');
    Route::post('/edit/{id}', 'update')->name('update');
    Route::delete('/destroy/{id}', 'destroy')->name('destroy');
});

Route::prefix('group')->controller(GroupController::class)->as('group.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::post('/create', 'store')->name('store');
    Route::get('edit/{id}', 'edit')->name('edit');
    Route::post('update/{id}')->name('update');
    Route::delete('destroy/{id}')->name('destroy');
});

Route::prefix('orders')->controller(OrderController::class)->as('order.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/{ref}', 'show')->name('show');
});

Route::prefix('shipping-companies')->controller(ShippingController::class)->group(function () {
    Route::get('/', 'index')->name('shippings.index');
    Route::get('/create', 'create')->name('shippings.create');
    Route::post('/create', 'store')->name('shippings.store');

    Route::get('/edit/{id}', 'edit')->name('shippings.edit');
    Route::post('/edit/{id}', 'update')->name('shippings.update');
});




Route::prefix('settings')->group(function () {
    Route::get('/', [DashboardController::class, 'settings'])->name('settings');

    // tags
    Route::get('/tags', [TagController::class, 'index'])->name('settings.tags.index');
    Route::post('/tags/create', [TagController::class, 'store'])->name('settings.tags.store');
    Route::post('/tags/edit/{id}', [TagController::class, 'update'])->name('settings.tags.update');

    // roles
    Route::get('/roles', [RoleController::class, 'index'])->name('settings.roles.index');
    Route::get('/roles/create', [RoleController::class, 'create'])->name('settings.roles.create');
    Route::post('/roles/create', [RoleController::class, 'store'])->name('settings.roles.store');
    Route::get('/roles/edit/{id}', [RoleController::class, 'edit'])->name('settings.roles.edit');
    Route::post('/roles/edit/{id}', [RoleController::class, 'update'])->name('settings.roles.update');
    Route::delete('/roles/destroy/{id}', [RoleController::class, 'destroy'])->name('settings.roles.destroy');

    // admins
    Route::get('/users', [AdminController::class, 'index'])->name('settings.users.index');
    // Route::get('/users/{uuid}', [AdminController::class, 'show'])->name('settings.users.show');
    Route::get('/users/create', [AdminController::class, 'create'])->name('settings.users.create');
    Route::post('/users/create', [AdminController::class, 'store'])->name('settings.users.store');
    Route::get('/users/edit/{uuid}', [AdminController::class, 'edit'])->name('settings.users.edit');
    Route::post('/users/edit/{uuid}', [AdminController::class, 'update'])->name('settings.users.update');
    Route::delete('/users/destroy/{uuid}', [AdminController::class, 'destroy'])->name('settings.users.destroy');

    Route::get('/wilaya', [WilayaController::class, 'index'])->name('settings.wilaya.index');
    Route::get('/wilaya/update', [WilayaController::class, "update"])->name('settings.wilaya.update');
});
