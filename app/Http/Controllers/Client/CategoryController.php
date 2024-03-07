<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{

    public function show(Request $request)
    {

        $parentCategory = $request->categories->first(
            fn (Category $category) =>
            $category->slug === $request->category && is_null($category->parent_id)
        );

        if (!$parentCategory) return abort(404);

        $subCategory = $request->categories->first(
            fn (Category $category) =>
            $category->slug === $request->subCategory && $category->parent_id == $parentCategory->id
        );

        if (!$subCategory) return abort(404);

        $products = Product::active()
            ->where('category_id', $subCategory->id)
            ->client()
            ->cursorPaginate(20);

        return Inertia::render('Product/Index', [
            'products' => $products,
            'categoryName' => $subCategory->only('name')['name'],
        ]);
    }

    public function getByCategory(Request $request)
    {
        $parentCategory = $request->categories->firstWhere('slug', $request->slug);
        $ids = $request->categories->where('parent_id', $parentCategory->id)->pluck('id');

        return Product::whereIn('category_id', $ids)
            ->active()
            ->sample()
            ->latest()
            ->limit(10)
            ->get();
    }
}
