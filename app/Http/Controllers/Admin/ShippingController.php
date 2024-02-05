<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Shipping\StoreRequest;
use App\Http\Requests\Shipping\UpdateRequest;
use App\Models\ShippingCompany;
use App\Models\ShippingPricing;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ShippingController extends Controller
{

    public function __construct()
    {

        $this->middleware('precognitive')->only(['store', 'update']);
    }

    public function index()
    {
        return Inertia::render('Admin/Shipping/Index', [
        'shippings' => ShippingCompany::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Shipping/Create', [
            'wilayas' => Storage::json('data/wilaya.json'),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $pricings = collect($request->pricings)->map(function ($pricing) {
            return [
                'wilaya_id' => $pricing['code'],
                'delay' => $pricing['delay'],
                'cost_home' => $pricing['cost_home'],
                'cost_stop_desk' => $pricing['cost_stop_desk']
            ];
        });

        $status = DB::transaction(function () use ($request, $pricings) {
            /**
             * @var \App\Models\ShippingCompany
             */
            $shippingCompany = ShippingCompany::create([
                'name' => $request->input('name'),
                'status' => $request->input('status'),
            ]);

            $shippingCompany->shippingPricings()->createMany($pricings);

            return true;
        });

        if (!$status) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'something went wrong',
            ]);
        }

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'Company created successfully'
        ]);

        // return redirect(route('admin.shippings.index'));
    }

    public function edit()
    {
    }

    public function update(UpdateRequest $request)
    {
    }

    public function destroy()
    {
    }
}
