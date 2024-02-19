<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\MediaService;
use App\Services\CategoryService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\StoreSubCategoryRequest;

use App\Http\Requests\Category\UpdateRequest;
use App\Models\Media;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('precognitive')->only('storeCategory', 'storeSubCategory');
    }

    public function index()
    {
        /**
         * @var \Illuminate\Support\Collection
         */
        $categories = Category::get();
        // Cache::remember(
            // 'categories',
            // now()->addDay(),
            // fn () =>
            // Category::get()
        // );

        $hierarchicalCategories = $categories->filter(function ($category) {
            return $category->isMainCategory();
        })->map(function (Category $mainCategory) use ($categories) {
            $mainCategory->subCategories = $categories->where('parent_id', $mainCategory->id)->all();
            return $mainCategory;
        })->values();


        return Inertia::render('Admin/Category/Index', [
            'hierarchicalCategories' => $hierarchicalCategories->toArray(),
            'parentCategories' => $categories->whereNull('parent_id')->all(),
            'subCategories' => $categories->whereNotNull('parent_id')->all(),
        ]);
    }

    public function storeCategory(StoreCategoryRequest $request)
    {
        DB::transaction(function () use ($request) {
            Category::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
            ]);
        });

        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'Catégorie créer avec succés'
        ]);
    }

    public function storeSubCategory(StoreSubCategoryRequest $request)
    {
        DB::transaction(function () use ($request) {
            $subCategory = Category::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'parent_id' => $request->category_id,
            ]);

            if ($banner = $request->file('banner')) {
                (new MediaService)->storeCategoryBanner($banner, $subCategory);
            }
        });
        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'Sous-catégorie créer avec succés'
        ]);
    }

    public function updateCategory(UpdateRequest $request)
    {
        /**
         * @var \App\Models\Category 
         */
        $category = Category::where('id', $request->id)->firstOrFail();

        if (!$category->isMainCategory()) {
            // throw an error here.
        }
        DB::transaction(function () use ($category, $request) {
            return $category->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);
        });
        return session()->flash('');
    }

    public function updateSubCategory(UpdateRequest $request)
    {
        /**
         * @var \App\Models\Category
         */
        $subCategory = Category::where('id', $request->id)->with()->firstOrFail();

        if ($subCategory->isMainCategory()) {
            // return throw an error here.
        }
        DB::transaction(function () use ($subCategory, $request) {
            $subCategory->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);

            $banner = $request->file('banner');
            if ($banner && (new MediaService)->unLinkImage($subCategory->banner)) {
                (new MediaService)->storeCategoryBanner($banner, $subCategory);
            }
        });
        return session()->flash('');
    }

    public function destroyCategory(Request $request)
    {
        $category = Category::where('id', $request->id)->withCount('subCategories')->firstOrFail();

        if ($category->sub_categories_count) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'La catégorie ' . $category->name  . ' ne peut pas étre supprimé.'
            ]);
        }

        if (!DB::transaction(fn () => $category->delete())) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'Quel que chose est mal passé, Please retry later.',
            ]);
        }

        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'La catégorie ' . $category->name . ' est supprimé avec succés.'
        ]);
    }

    public function destroySubCategory(Request $request)
    {
        /**
         * @var \App\Models\Category
         */
        $subCategory = Category::where('id', $request->id)->withCount('products')->firstOrFail();
        if ($subCategory->products_count) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'La sous-catégorie ' . $subCategory?->name  . ' ne peut pas étre supprimé.'
            ]);
        }

        if (!DB::transaction(fn () => $subCategory->delete())) {
            return
                session()->flash('alert', [
                    'status' => 'danger',
                    'message' => 'Quel que chose est mal passé, Please retry later.',
                ]);
        }

        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'La sous-catégorie ' . $subCategory?->name . ' est supprimé avec succés.'
        ]);

        // DB::transaction(function () use ($subCategory) {
        // (new MediaService)->unLinkImage($subCategory->banner);
        // $subCategory->banner->delete();
        // $subCategory->delete();
        // });
    }
}
