<?php

namespace App\Http\Controllers\Client;

use App\Events\Order\NewOrder;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Services\CouponService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreRequest;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('precognitive')->only('store');
        $this->middleware('auth')->only('index');
        $this->middleware('signed')->only(['newOrder', 'show']);
    }

    public function index(Request $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = $request->user();

        return Inertia::render('Order/Index', [
            'orders' => $user->orders->load('orderProducts'),
        ]);
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

        [$order, $orderProducts] = DB::transaction(function () use ($request, $couponService, $orderService) {

            $subTotal = $orderService->calculateSubTotal($request->cart);
            $discount = isset($request?->coupon['code']) ? $couponService->useCoupon($request?->coupon['code'], $subTotal) : null;


            /**
             * @var \App\Models\Order
             */
            $order = Order::create([
                'ref' => Order::generateRef(),
                'user_id' => $request->user()?->id,
                'client' => $request->only('name', 'phone', 'email', 'address', 'city', 'wilaya'),
                'shipping_type' => $request->shipping['name'],
                'shipping_cost' => $request->shipping['price'],
                'payment_method' => $request->paymentMethod,
                'coupon_id' => isset($request?->coupon['id']) ? $request?->coupon['id'] : null,
                'coupon_code' => isset($request?->coupon['code']) ? $request?->coupon['code'] : null,
                'discount' => $discount,
                'sub_total' => $subTotal,
                'total' => $orderService->calculateTotal($subTotal, $request->shipping['price'], $discount),
            ]);

            $orderProducts = $orderService->prepareOrderProducts($request->cart);
            $order->products()->attach($orderProducts);

            return [$order, $orderProducts];
        });


        session()->forget(['coupon', 'cart']);

        if ($request->input('email')) {
            event(new NewOrder($order, collect($orderProducts)->values(), URL::signedRoute('order.show', ['ref' => $order->ref])));
        }


        return redirect(
            URL::signedRoute('order.new', ['ref' => $order->ref], now()->addHour())
        )->with('alert', [
            'status' => 'success',
            'message' => 'Commande effectuer avec succés',
        ]);
    }

    public function newOrder(Request $request)
    {
        
        $order = Order::where('ref', $request->ref)->first();
        return Inertia::render('Order/NewOrder', [
            'order' => $order->load('orderProducts'),
        ]);
    }

    public function show(Request $request)
    {
        /**
         * @var \App\Models\Order
         */
        $order = Order::where('ref', $request->ref)->first();
        $order->orderProducts = OrderProduct::where('order_id', $order->id)->get();

        return Inertia::render('Order/Show', [
            'order' => $order,
        ]);
    }

    public function find()
    {
        
    }

    public function pdf(Request $request)
    {
        $order = Order::where('ref', $request->ref)->first();
        $order->orderProducts = OrderProduct::where('order_id', $order->id)->get();

        // $pdf = Pdf::setOption(['dpi' => 150, 'defaultFont' => 'sans-serif'])->loadView('pdf.order', [
            // 'order' => $order,
        // ]);
        // return $pdf->download("commande-{$order->ref}.pdf");
        // return $pdf->stream('doc.pdf');
    }
}
