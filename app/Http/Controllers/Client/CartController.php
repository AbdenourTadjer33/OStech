<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class CartController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Cart/Index');
    }

    public function addItem(Request $request)
    {
        $product = Product::where('id', $request->id)->first();

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
        $cart = session()->get('cart');

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
