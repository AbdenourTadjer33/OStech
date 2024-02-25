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
    public function index()
    {
        $products = Product::active()->select([
            'products.id',
            'products.slug',
            'products.name',
            'products.price',
            'products.promo',
            DB::raw("JSON_UNQUOTE(JSON_EXTRACT(products.images, '$[0]')) as image"),
            'brands.name as brand_name',
            'categories.name as category',
            'parent_categories.name as parent_category'
        ])
            ->leftJoin('brands', 'products.brand_id', '=', 'brands.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('categories as parent_categories', 'categories.parent_id', '=', 'parent_categories.id')
            ->orderBy('products.id', 'desc')
            ->cursorPaginate(15);

        return Inertia::render('Product/Products', [
            'products' => $products,
        ]);
    }

    public function show(Request $request)
    {
        $product = Product::where('products.slug', $request->slug)
            ->status()
            ->select([
                'products.id', 'products.slug', 'products.name', 'products.price', 'products.promo', 'products.images', 'products.description', 'products.features',
                'brands.name as brand',
                'categories.name as category',
                'parent_categories.name as parent_category'
            ])
            ->leftJoin('brands', 'products.brand_id', '=', 'brands.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('categories as parent_categories', 'categories.parent_id', '=', 'parent_categories.id')
            ->firstOrFail();


        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }

    public function subCategory(Request $request)
    {
        DB::table('products')
            ->where('status', true)
            ->select([
                'products.id',
                'products.slug',
                'products.name',
                'products.price',
                'products.promo',
                DB::raw("JSON_UNQUOTE(JSON_EXTRACT(products.images, '$[0]')) as image"),
                'brands.name as brand_name',
                'categories.name as category',
                'parent_categories.name as parent_category'
            ])
            ->leftJoin('brands', 'products.brand_id', '=', 'brands.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('categories as parent_categories', 'categories.parent_id', '=', 'parent_categories.id');


        $products = Category::where('slug', $request->subCategory)->first()->load('products');


        dump($products);
    }
}
