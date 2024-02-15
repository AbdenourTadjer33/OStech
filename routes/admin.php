<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\WilayaController;
use App\Http\Controllers\Admin\ShippingController;

Route::get('/', fn () => to_route('admin.dashboard'))->name('admin');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

Route::prefix('brand')->controller(BrandController::class)->group(function () {
    Route::get('/', 'index')->name('admin.brands.index');
    Route::get('/create', 'create')->name('admin.brands.create');
    Route::post('/create', 'store')->name('admin.brands.store');
    Route::get('edit/{id}', 'edit')->name('admin.brands.edit');
    Route::post('edit/{id}', 'update')->name('admin.brands.update');
    Route::delete('destroy/{id}', 'destroy')->name('admin.brands.destroy');
});

Route::prefix('category')->controller(CategoryController::class)->group(function () {
    Route::get('/', 'index')->name('admin.categories.index');

    Route::post('/create-category', 'storeCategory')->name('admin.categories.storeCategory');
    Route::post('/create-subcategory', 'storeSubCategory')->name('admin.categories.storeSubCategory');

    Route::post('/edit-category/{id}', 'updateCategory')->name('admin.categories.updateCategory');
    Route::post('/edit-subcategory/{id}', 'updateSubCategory')->name('admin.categories.updateSubCategory');

    Route::delete('/delete-category/{id}', 'destroyCategory')->name('admin.categories.destroyCategory');
    Route::delete('/delete-subcategory/{id}', 'destroySubCategory')->name('admin.categories.destroySubCategory');
});

Route::prefix('product')->controller(ProductController::class)->group(function () {
    Route::get('/', 'index')->name('admin.products.index');
    Route::get('/create', 'create')->name('admin.products.create');
    Route::post('/create', 'store')->name('admin.products.store');
    Route::get('/edit/{id}', 'edit')->name('admin.products.edit');
    Route::post('/edit/{id}', 'update')->name('admin.products.update');
    Route::post('/restore/{id}', 'restore')->name('admin.products.restore');
    Route::delete('/destroy/{id}', 'destroy')->name('admin.products.destroy');
    Route::delete('/force-destroy/{id}', 'forceDestroy')->name('admin.products.forceDestroy');
});

Route::prefix('shipping-companies')->controller(ShippingController::class)->group(function () {
    Route::get('/', 'index')->name('admin.shippings.index');
    Route::get('/create', 'create')->name('admin.shippings.create');
    Route::post('/create', 'store')->name('admin.shippings.store');

    Route::get('/edit/{id}', 'edit')->name('admin.shippings.edit');
    Route::post('/edit/{id}', 'update')->name('admin.shippings.update');
});




Route::prefix('settings')->group(function () {
    Route::get('/', [DashboardController::class, 'settings'])->name('admin.settings');

    // tags
    Route::get('/tags', [TagController::class, 'index'])->name('admin.settings.tags.index');
    Route::post('/tags/create', [TagController::class, 'store'])->name('admin.settings.tags.store');
    Route::post('/tags/edit/{id}', [TagController::class, 'update'])->name('admin.settings.tags.update');

    // roles
    Route::get('/roles', [RoleController::class, 'index'])->name('admin.settings.roles.index');
    Route::get('/roles/create', [RoleController::class, 'create'])->name('admin.settings.roles.create');
    Route::post('/roles/create', [RoleController::class, 'store'])->name('admin.settings.roles.store');
    Route::get('/roles/edit/{id}', [RoleController::class, 'edit'])->name('admin.settings.roles.edit');
    Route::post('/roles/edit/{id}', [RoleController::class, 'update'])->name('admin.settings.roles.update');
    Route::delete('/roles/destroy/{id}', [RoleController::class, 'destroy'])->name('admin.settings.roles.destroy');

    // admins
    Route::get('/users', [AdminController::class, 'index'])->name('admin.settings.users.index');
    // Route::get('/users/{uuid}', [AdminController::class, 'show'])->name('admin.settings.users.show');
    Route::get('/users/create', [AdminController::class, 'create'])->name('admin.settings.users.create');
    Route::post('/users/create', [AdminController::class, 'store'])->name('admin.settings.users.store');
    Route::get('/users/edit/{uuid}', [AdminController::class, 'edit'])->name('admin.settings.users.edit');
    Route::post('/users/edit/{uuid}', [AdminController::class, 'update'])->name('admin.settings.users.update');
    Route::delete('/users/destroy/{uuid}', [AdminController::class, 'destroy'])->name('admin.settings.users.destroy');

    Route::get('/wilaya', [WilayaController::class, 'index'])->name('admin.settings.wilaya.index');
    Route::get('/wilaya/update', [WilayaController::class, "update"])->name('admin.settings.wilaya.update');
});
