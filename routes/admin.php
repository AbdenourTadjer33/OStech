<?php

use App\Events\MyEvent;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ShippingController;
use App\Http\Controllers\Admin\UploadController;


Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login.create');
    Route::post('/login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/', fn () => to_route('admin.dashboard'));
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // FINISHED 
    Route::prefix('brand')->controller(BrandController::class)->as('brand.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/create', 'store')->name('store');
        Route::get('edit/{id}', 'edit')->name('edit');
        Route::post('edit/{id}', 'update')->name('update');
        Route::delete('destroy/{id}', 'destroy')->name('destroy');
    });

    // FINISHED
    Route::prefix('category')->controller(CategoryController::class)->as('category.')->group(function () {
        Route::get('/', 'index')->name('index');

        Route::post('/create', 'storeCategory')->name('storeCategory');
        Route::post('/create/{mainCategory}', 'storeSubCategory')->name('storeSubCategory');

        Route::post('/edit/{mainCategory}', 'updateCategory')->name('updateCategory');
        Route::post('/edit/{mainCategory}/{subCategory}', 'updateSubCategory')->name('updateSubCategory');

        Route::delete('/destroy/{mainCategory}', 'destroyCategory')->name('destroyCategory');
        Route::delete('/destroy/{mainCategory}/{subCategory}', 'destroySubCategory')->name('destroySubCategory');
    });

    Route::get('test-broadcast', function () {
        broadcast(new MyEvent('test messaeg'));
    });

    // FINISHED
    Route::prefix('product')->controller(ProductController::class)->as('product.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/create', 'store')->name('store');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::post('/edit/{id}', 'update')->name('update');


        Route::post('/restore/{id}', 'restore')->name('restore');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');

        Route::delete('/force-destroy/{id}', 'forceDestroy')->name('forceDestroy');

        Route::delete('/mass-destroy', 'massDestroy')->name('massDestroy');
        Route::delete('/mass-force-destroy', 'massForceDestroy')->name('massForceDestroy');

        Route::post('/mass-active/status', 'massActive')->name('massActive');
        Route::post('/mass-disable/status', 'massDisable')->name('massDisable');

        Route::post('/mass-active/status', 'massActive')->name('massActive');
        Route::post('/mass-disable/status', 'massDisable')->name('massDisable');

        Route::post('/active/status/{id}', 'activeStatus')->name('activeStatus');
        Route::post('/disable/status/{id}', 'disableStatus')->name('disableStatus');

        Route::post('active/catalog/{id}', 'activeCatalog')->name('activeCatalog');
        Route::post('/disable/catalog/{id}', 'disableCatalog')->name('disableCatalog');
        Route::get('/{id}', 'show')->name('show');
    });

    // FINISHED
    Route::prefix('coupon')->controller(CouponController::class)->as('coupon.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/create', 'store')->name('store');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::post('/edit/{id}', 'update')->name('update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
    });


    Route::prefix('orders')->controller(OrderController::class)->as('order.')->group(function () {
        Route::get('/', 'index')->name('index');
        // Route::get('/{ref}', 'show')->name('show');

        Route::post('/edit-status/{ref}', 'editStatus')->name('editStatus');
    });

    // FINISHED
    Route::prefix('shipping')->controller(ShippingController::class)->group(function () {
        Route::get('/', 'index')->name('shipping.index');
        Route::post('/edit/{wilayaId}', 'update')->name('shipping.update');
    });

    // FINISHED
    Route::get('/settings', [DashboardController::class, 'settings'])->name('settings');

    // FINISHED
    Route::prefix('administrateur')->controller(AdminController::class)->as('administrateur.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/create', 'store')->name('store');
        Route::get('/edit/{uuid}', 'edit')->name('edit');
        Route::post('/edit/{uuid}', 'update')->name('update');

        Route::post('/active/{uuid}', 'active')->name('active');
        Route::post('/disable/{uuid}', 'disable')->name('disable');

        Route::delete('/destroy/{uuid}', 'destroy')->name('destroy');
    });

    // FINISHED
    Route::prefix('role')->controller(RoleController::class)->as('role.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/create', 'store')->name('store');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::post('/edit/{id}', 'update')->name('update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
    });

    // FINISHED
    Route::prefix('upload')->controller(UploadController::class)->as('upload.')->group(function () {
        Route::post('/save-temp', 'saveTemp')->name('save.temp');
        Route::post('/edit-temp', 'editTemp')->name('edit');
        Route::post('/destroy-temp', 'destroy')->name('destroy');
    });
});

Route::get("{catchall}", function () {
    dd("404 page from subdomain");
})->where('catchall', '(.*)');