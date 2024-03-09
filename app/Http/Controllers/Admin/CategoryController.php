<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\StoreSubCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Requests\Category\UpdateSubCategoryRequest;
use App\Services\CategoryService;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // FINISHED
    public function index(CategoryService $categoryService)
    {
        $categories = $categoryService->getCategories();

        $categories->loadCount('products');

        return Inertia::render('Admin/Category/Index', [
            'hierarchicalCategories' => $categoryService->hierarchicalCategories($categories)->toArray(),
            'mainCategoriesCount' => $categoryService->countMainCategories($categories),
            'subCategoriesCount' => $categoryService->countSubCategories($categories),
        ]);
    }

    // FINISHED
    public function storeCategory(StoreCategoryRequest $request)
    {
        DB::transaction(function () use ($request) {
            Category::create([
                'name' => $request->name,
            ]);
        });

        $this->clearCacheCategories();

        return redirect(route('admin.category.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Catégorie créer avec succés'
        ]);
    }

    // FINISHED
    public function storeSubCategory(StoreSubCategoryRequest $request)
    {
        DB::transaction(fn () => Category::create([
            'name' => $request->input('name'),
            'parent_id' => $request->mainCategory,
        ]));

        $this->clearCacheCategories();

        return redirect(route('admin.category.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Sous catégorie créer avec succés',
        ]);
    }

    // FINISHED
    public function updateCategory(UpdateCategoryRequest $request)
    {
        DB::transaction(
            fn () =>
            Category::mainCategory()
                ->where('id', $request->mainCategory)
                ->update([
                    'name' => $request->name,
                    'slug' => Category::generateSlug('slug', $request->name)
                ])
        );

        $this->clearCacheCategories();

        return redirect(route('admin.category.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Catégorie editer avec succés'
        ]);
    }

    // FINISHED
    public function updateSubCategory(UpdateSubCategoryRequest $request)
    {
        DB::transaction(
            fn () => Category::subCategory()
                ->where('parent_id', $request->mainCategory)
                ->where('id', $request->subCategory)
                ->update([
                    'name' => $request->name,
                    'slug' => Category::generateSlug('slug', $request->name),
                ])
        );

        $this->clearCacheCategories();

        return redirect(route('admin.category.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Sous catégorie editer avec succés',
        ]);
    }

    // FINISHED
    public function destroyCategory(Request $request)
    {
        $isDeleted = DB::transaction(
            fn () =>
            Category::mainCategory()
                ->where('id', $request->mainCategory)
                ->delete()
        );

        if (!$isDeleted) {
            return redirect()->back()->with('alert', [
                'status' => 'danger',
                'message' => 'Something wen wrong',
            ]);
        }

        $this->clearCacheCategories();

        return redirect()->back()->with('alert', [
            'status' => 'success',
            'message' => 'Catégorie supprimé avec succés',
        ]);
    }

    // FINISHED
    public function destroySubCategory(Request $request)
    {
        $isDeleted = DB::transaction(
            fn () =>
            Category::subCategory()
                ->where('parent_id', $request->mainCategory)
                ->where('id', $request->subCategory)
                ->delete()
        );

        if (!$isDeleted) {
            return redirect()->back()->with('alert', [
                'status' => 'danger',
                'message' => 'Something went wrong',
            ]);
        }

        $this->clearCacheCategories();

        return redirect()->back()->with('alert', [
            'status' => 'success',
            'message' => 'Sous catégorie supprimé avec succés',
        ]);
    }

    // FINISHED
    private function clearCacheCategories()
    {
        Cache::forget('categories');
    }
}
