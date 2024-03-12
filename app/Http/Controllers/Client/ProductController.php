<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $productsQuery = Product::active()->client();

        if ($request->has('sort') && in_array($request->input('sort'), ['name', 'price_asc', 'price_desc', 'sales'])) {
            $productsQuery->orderBy();
        }

        $products = $productsQuery->paginate(15);

        $products->map(function (Product $product) use($request) {
            $subCategory = $request?->categories->firstWhere('id', $product->category_id);
            $mainCategory = $request?->categories->firstWhere('id', $subCategory->parent_id);
            $product->brand = $request->brands->firstWhere('id', $product->brand_id)?->name;

            $product->subCategory = $subCategory->name;
            $product->mainCategory = $mainCategory->name;
        });

        return Inertia::render('Product/Products', [
            'products' => $products,
        ]);
    }

    public function show(Request $request)
    {
        $product = Product::active()
            ->where('slug', $request->slug)
            ->details()->firstOrFail();


        $subCategory = $request?->categories->firstWhere('id', $product->category_id);
        $mainCategory = $request?->categories->firstWhere('id', $subCategory->parent_id);

        $product->brand = $request->brands->firstWhere('id', $product->brand_id)?->name;
        $product->subCategory = $subCategory->name;
        $product->mainCategory = $mainCategory->name;

        $similairProducts = Product::sample()
            ->where('category_id', $product->category_id)
            ->whereNot('id', $product->id)
            ->latest()
            ->limit(10)
            ->get();


        return Inertia::render('Product/Show', [
            'product' => $product,
            'similairProducts' => $similairProducts
        ]);
    }
}
