<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Models\ShippingPricing;
use App\Services\CouponService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Order\StoreRequest;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('precognitive')->only('store');
    }

    public function index(Request $request)
    {
    }

    public function create(Request $request)
    {
        if (empty($request->cart)) {
            session()->flash('alert', [
                'status' => 'danger',
                'message' => 'Votre panier est vide',
            ]);
            return to_route('welcome');
        }
        return Inertia::render('Order/Create');
    }


    public function store(StoreRequest $request, CouponService $couponService, OrderService $orderService)
    {
        if (!$request->cart) {
            return to_route('welcome')->with('alert', [
                'status' => 'danger',
                'message' => 'Votre panier est vide',
            ]);
        }

        $order = DB::transaction(function () use ($request, $couponService, $orderService) {

            $subTotal = $orderService->calculateSubTotal($request->cart);
            $shippingCost = $orderService->shippingPricing((int) $request->wilaya, $request->shippingType);
            $discount = isset($request?->coupon['code']) ? $couponService->useCoupon($request?->coupon['code'], $subTotal) : null;


            /**
             * @var \App\Models\Order
             */
            $order = Order::create([
                'ref' => Order::generateRef(),
                'user_id' => $request->user()?->id,
                'client' => $request->only('name', 'phone', 'email', 'address', 'city', 'wilaya'),
                'shipping_company_id' => $request->shippingCompany,
                'shipping_type' => $request->shippingType,
                'shipping_cost' => $shippingCost,
                'payment_method' => $request->paymentMethod,
                'coupon_id' => isset($request?->coupon['id']) ? $request?->coupon['id'] : null,
                'coupon_code' => isset($request?->coupon['code']) ? $request?->coupon['code'] : null,
                'discount' => $discount,
                'sub_total' => $subTotal,
                'total' => $orderService->calculateTotal($subTotal, $shippingCost, $discount),
            ]);

            $orderProducts = $orderService->prepareOrderProducts($request->cart);
            $order->products()->attach($orderProducts);

            return $order;
        });

        session()->forget(['coupon', 'cart']);

        return redirect(route('order.show', ['ref' => $order->ref]))
            ->with('alert', [
                'status' => 'success',
                'message' => 'Commande effectuer avec succés',
            ]);
    }

    // public function newOrder(Request $request)
    // {
    //     /**
    //      * @var \App\Models\Order
    //      */
    //     $order = Order::where('ref', $request->ref)->first();
    //     if (auth()->check() && $request->user()->id === $order->user_id) {
    //         dump($order);
    //     }
    // }

    public function show(Request $request)
    {
        /**
         * @var \App\Models\Order
         */
        $order = Order::where('ref', $request->ref)->first();

        if (!$order) {
            abort(404);
        }

        if ($order->user_id && !auth()->check()) {
            return abort(401);
        }

        $order->orderProducts = OrderProduct::where('order_id', $order->id)->get();

        return Inertia::render('Order/Show', [
            'order' => $order,
        ]);
    }

    public function pdf(Request $request)
    {
        $order = Order::where('ref', $request->ref)->first();
        $order->orderProducts = OrderProduct::where('order_id', $order->id)->get();

        $pdf = Pdf::setOption(['dpi' => 150, 'defaultFont' => 'sans-serif'])->loadView('pdf.order', [
            'order' => $order,
        ]);
        return $pdf->download("commande-{$order->ref}.pdf");
    }
}
