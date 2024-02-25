<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Coupon\StoreRequest;
use App\Http\Requests\Coupon\UpdateRequest;
use DateTime;

class CouponController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Coupon/Index', [
            'coupons' => Coupon::get(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        DB::transaction(
            fn () =>
            Coupon::create([
                'type' => $request->input('type'),
                'value' => $request->input('value'),
                'start_at' => new DateTime($request->input('startAt')),
                'expire_at' => new DateTime($request->input('expireAt')),
                'max_use' => $request->input('maxUse'),
                'max_amount' => $request->input('maxAmount'),
                'status' => $request->input('status'),
            ])
        );

        return redirect()->back()->with('alert', [
            'status' => 'success',
            'message' => "Coupon créer avec succés"
        ]);
    }

    public function update(UpdateRequest $request)
    {
        DB::transaction(
            fn () =>
            Coupon::where('id', $request->id)->update([
                'type' => $request->input('type'),
                'value' => $request->input('value'),
                'start_at' => new DateTime($request->input('startAt')),
                'expire_at' => new DateTime($request->input('expireAt')),
                'max_use' => $request->input('maxUse'),
                'max_amount' => $request->input('maxAmount'),
                'status' => $request->input('status')
            ])
        );

        return redirect()->back()->with('alert', [
            'status' => 'success',
            'message' => 'Coupon edité avec succés'
        ]);
    }

    public function destroy(Request $request)
    {
        if (!Coupon::where('id', $request->id)->delete()) {
            return redirect()->back()->with('alert', [
                'status' => 'danger',
                'message' => 'something went wrong, pls retry later',
            ]);
        }

        return redirect()->back()->with('alert', [
            'status' => 'success',
            'message' => 'Coupon supprimé avec succés',
        ]);
    }
}
