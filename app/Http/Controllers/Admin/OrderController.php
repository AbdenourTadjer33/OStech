<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\OrderProduct;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
	public function index(Request $request)
	{
		/**
		 * @var \App\Models\Order
		 */
		$orderQuery = Order::withCount('products')->admin();

		if ($request->input('latest')) {
			$orderQuery->latest();
		}

		if ($request->input('oldest')) {
			$orderQuery->latest();
		}

		$orders = $orderQuery->paginate((int) $request->input('pagination') ?? 15);

		$orderIds = $orders->pluck('id');

		$orderProduct = OrderProduct::whereIn('order_id', $orderIds)->get();

		$orderProductsGrouped = $orderProduct->groupBy('order_id');

		$orders->map(function ($order) use ($orderProductsGrouped) {
			// Retrieve order products for this order
			$orderProduct = $orderProductsGrouped[$order->id] ?? collect();

			// Add orderProducts key to the order and assign order products
			$order->orderProducts = $orderProduct;

			return $order;
		});

		return Inertia::render('Admin/Order/Index', [
			'orders' => $orders->appends($request->query()),
		]);
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
