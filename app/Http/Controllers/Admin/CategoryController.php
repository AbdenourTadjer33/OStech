<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\MediaService;
use App\Services\CategoryService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;
use App\Models\Media;

class CategoryController extends Controller
{
    public function storeCategory(StoreRequest $request)
    {
        DB::transaction(function () use ($request) {
            Category::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
            ]);
        });

        return session()->flash('');
    }

    public function storeSubCategory(StoreRequest $request)
    {
        DB::transaction(function () use ($request) {
            $subCategory = Category::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'parent_id' => $request->parent_id,
            ]);

            if ($banner = $request->file('banner')) {
                (new MediaService)->storeCategoryBanner($banner, $subCategory);
            }
        });
        return session()->flash('');
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
        if ($category->subCategories_count > 0) {
            // return throw an error
        }

        if (!DB::transaction(fn () => $category->delete())) {
            // return somthing went wrong
        }

        return session()->flash('');
    }

    public function destroySubCategory(Request $request)
    {
        /**
         * @var \App\Models\Category
         */
        $subCategory = Category::where('id', $request->id)->withCount('products')->with('banner')->firstOrFail();
        if ($subCategory->products_count > 0) {
            // return we cant delete this subcategory
        }

        DB::transaction(function () use($subCategory) {
            (new MediaService)->unLinkImage($subCategory->banner);
            $subCategory->banner->delete();
            $subCategory->delete();

        });

        return session()->flash('');
    }
}
