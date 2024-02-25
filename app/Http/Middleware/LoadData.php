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
            Inertia::share('categories', $hierarchicalCategories);


            $cart = [];
            if (session()->has('cart') && count(session('cart')) > 0) {
                $cartCollection = collect(session('cart'));

                // Get product id's from the session
                $productIds = $cartCollection->pluck('product_id')->toArray();
                // Retrieve all products using a single query
                $products = Product::active()->shoppingCart()->whereIn('id', $productIds)->get();

                $newSessionCart = [];
                foreach (session('cart') as $cartItem) {
                    if ($product = $products->firstWhere('id', $cartItem['product_id'])) {
                        // the new session cart
                        $newSessionCart[] = $cartItem;

                        $cartItem['product'] = $product;
                        $cart[] = $cartItem;
                    }
                }

                session()->put('cart', $newSessionCart);
            }
            $request->merge(['cart' => $cart]);
            Inertia::share('cart', $cart);


            if (session()->has('coupon')) {
                Inertia::share('coupon', session()->get('coupon'));
                $request->merge(['coupon' =>     session()->get('coupon')]);
            }
        }
        return $next($request);
    }
}
