<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
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

        $productsQuery = Product::active()->where('category_id', $subCategory->id)->client();

        if ($request->has('sort') && in_array($request->input('sort'), ['name', 'price_asc', 'price_desc', 'sales'])) {
            $productsQuery->orderBy();
        }

        $products = $productsQuery->paginate(15);

        $products->map(function (Product $product) use ($request) {
            $subCategory = $request?->categories->firstWhere('id', $product->category_id);
            $mainCategory = $request?->categories->firstWhere('id', $subCategory->parent_id);
            $product->brand = $request->brands->firstWhere('id', $product->brand_id)?->name;

            $product->subCategory = $subCategory->name;
            $product->mainCategory = $mainCategory->name;
        });

        return Inertia::render('Product/Index', [
            'products' => $products,
            'categoryName' => $subCategory->only('name')['name'],
        ]);
    }

    public function getByCategory(Request $request)
    {
        $parentCategory = $request->categories->firstWhere('slug', $request->slug);
        $ids = $request->categories->where('parent_id', $parentCategory->id)->pluck('id');

        return Product::active()
            ->whereIn('category_id', $ids)
            ->sample()
            ->latest()
            ->limit(10)
            ->get();
    }
}
