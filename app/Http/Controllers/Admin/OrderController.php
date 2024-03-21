<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\GetRequest;
use App\Http\Requests\Order\UpdateRequest;
use App\Models\OrderProduct;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
	public function index(GetRequest $request)
	{
		/**
		 * @var \App\Models\Order
		 */
		$orderQuery = Order::admin()->interval($request->input('interval'))->with('orderProducts');

		if ($request->has('online') && $request->input('online') !== "all") {
			$orderQuery->online($request->input('online'));
		}

		if ($request->has('status') && $request->input('status') !== "all") {
			$orderQuery->status($request->input('status'));
		}

		$orders = $orderQuery->paginate(15)->appends(request()->query());

		session()->put('orders_url', $request->fullUrl());
		return Inertia::render('Admin/Order/Index', [
			'orders' => $orders,
		]);
	}

	public function editStatus(UpdateRequest $request)
	{
		DB::transaction(
			fn () =>
			Order::where('ref', $request->ref)->update([
				'status' => $request->input('status'),
			])
		);

		session()->flash('alert', [
			'status' => 'success',
			'message' => 'status changé aves succés',
		]);

		if (session()->has('orders_url')) {
			return redirect(session()->get('orders_url'));
		}

		return redirect(route('admin.order.index'));
	}

	public function show()
	{
	}

	public function edit()
	{
	}

	public function update()
	{
	}
}
