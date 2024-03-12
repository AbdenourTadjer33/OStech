<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class CartController extends Controller
{
    public function addItem(Request $request)
    {
        if (session('cart') && count(session('cart')) >= 5) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'Cinq produits au maximum dans le panier.',
            ]);
        }

        $product = Cache::remember(
            "product-$request->id",
            now()->addMinutes(3),
            fn () => Product::where('id', $request->id)->shoppingCart()->first()
        );

        $cartItem = [
            'product_id' => $product->id,
            'qte' => 1,
        ];

        if (!session()->has('cart')) {
            session()->put('cart', [$cartItem]);
            return session()->flash('alert', [
                'status' => 'success',
                'message' => 'Produit ajouté au panier.'
            ]);
        }

        if ($this->isInCart(session()->get('cart'), $request->id)) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'Ce produit est déja présent dans le panier.',
            ]);
        }

        session()->push('cart', $cartItem);
        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'Produit ajouté au panier.',
        ]);
    }

    private function isInCart($cart, $productId)
    {
        foreach ($cart as $index => $item) {
            if (isset($item['product_id']) && $item['product_id'] == $productId) {
                return true; // Return the index of the item if found
            }
        }
        return false; // Return false if item not found
    }

    public function handleQte(Request $request)
    {
        $cart = session('cart');

        $cart[array_search($request->id, array_column($cart, 'product_id'))]['qte'] = $request->qte;

        session()->put('cart', $cart);
    }

    public function destroyItem(Request $request)
    {
        $cart = session()->get('cart');

        array_splice($cart, array_search($request->id, array_column($cart, 'product_id')), 1);

        session()->put('cart', $cart);
    }
}
