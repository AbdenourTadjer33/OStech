<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreRequest;
use App\Models\ShippingCompany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('precognitive')->only('store');
    }

    public function index()
    {
    }

    public function store(StoreRequest $request)
    {
        dd($request->all(), session('cart'), session('coupon'), $request->cookie());
    }

    public function validateCustomer(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:2'],
            'phone' => ['required', 'regex:/^(05|06|07)[0-9]{8}$/'],
            'email' => ['required', 'email'],
            'address' => ['required', 'string', 'min:4'],
            'city' => ['required', 'min:2'],
            'wilaya' => ['required'],
        ]);

        return redirect()->back();
    }

    public function validatePaymentMethod(Request $request)
    {
        $request->validate([
            'paymentMethod' => ['required', Rule::in(['bank-transfer', 'cash-on-delivery'])]
        ]);

        return redirect()->back();
    }

    public function validateShippingMethod(Request $request) {
        $request->validate([
            // 'shippingCompany' => ['required'],
            'shippingType' => ['required'],
        ]);
    }

    public function validateData(Request $request)
    {
        $request->validate([
            'name' => [Rule::requiredIf($request->has('name')), 'string', 'min:2'],
            'email' => [Rule::requiredIf($request->has('email')), 'email'],
            'phone' => [Rule::requiredIf($request->has('phone')), 'regex:/^(05|06|07)[0-9]{8}$/'],
            'address' => [Rule::requiredIf($request->has('address')), 'string', 'min:4'],
            'city' => [Rule::requiredIf($request->has('city')), 'min:2'],
            'wilaya' => [Rule::requiredIf($request->has(''))],
        ]);
    }

    public function shippingPrice(Request $request)
    {
        return ShippingCompany::where('name', $request->name)->with('shippingPricings')->first();
    }
}
