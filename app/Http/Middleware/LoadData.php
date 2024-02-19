<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Coupon;
use App\Models\Product;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class LoadData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->routeIs('admin*')) {
            // $categories = Cache::remember('categories', now()->addDay(), fn () => Category::get());
            $categories = Category::get();

            $hierarchicalCategories = $categories->filter(function ($category) {
                return $category->isMainCategory();
            })->map(function (Category $mainCategory) use ($categories) {
                $mainCategory->subCategories = $categories->where('parent_id', $mainCategory->id)->all();
                return $mainCategory;
            })->values();



            $cart = array_map(function ($cartItem) {
                $product = Product::where('id', $cartItem['product_id'])->first();
                $cartItem['product'] = $product;
                return $cartItem;
            }, session()->get('cart', []));


            if ($request->routeIs('cart*') && Cache::get('coupon-' . session()->getId())) {
                Inertia::share('coupon', session()->get('coupon'));
            }

            Inertia::share('categories', $hierarchicalCategories);
            Inertia::share('cart', $cart);
        }
        return $next($request);
    }
}
