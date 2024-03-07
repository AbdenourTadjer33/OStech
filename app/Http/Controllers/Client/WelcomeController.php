<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {

        // $products = Product::addSelect(DB::raw('@rn := CASE WHEN @prevCategoryId = category_id THEN @rn + 1 ELSE 1 END AS row_number'))
        //     ->addSelect(DB::raw('@prevCategoryId := category_id'))
        //     ->whereRaw('(SELECT @rn := 0) = 0') // Initialize variables
        //     ->orderBy('category_id')
        //     ->having('row_number', '<=', 4)
        //     ->limit(20)
        //     ->get();

        $featuredProducts = Product::active()
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
            ->leftJoin('categories as parent_categories', 'categories.parent_id', '=', 'parent_categories.id')
            ->orderBy('products.id', 'desc')
            ->addSelect(DB::raw('@rn := CASE WHEN @prevCategoryId = category_id THEN @rn + 1 ELSE 1 END AS row_number, @prevCategoryId := category_id'))
            ->whereRaw('(SELECT @rn := 0) = 0') // Initialize variables
            ->orderBy('category_id')
            ->having('row_number', '<=', 4)
            ->limit(20)
            ->get();


        return Inertia::render('Welcome', [
            'featuredProducts' => $featuredProducts,
        ]);
    }

    public function contact(Request $request)
    {
    }

    public function catalogue(Request $request)
    {
    }

    public function termAndCondition()
    {
        return Inertia::render('TermsAndConditions');
    }
}
