<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('test', function () {
    DB::transaction(function () {
        $category = Category::create([
            'name' => 'Accessoire',
            'slug' => 'accessoire',
        ]);

        $category->subCategories()->insert([
            [
                'name' => 'iphone',
                'slug' => 'iphone',
                'parent_id' => $category->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Galaxy',
                'slug' => 'galaxy',
                'parent_id' => $category->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'autre',
                'slug' => 'autre',
                'parent_id' => $category->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    });
    dump(true);
});

require __DIR__ . '/auth.php';
