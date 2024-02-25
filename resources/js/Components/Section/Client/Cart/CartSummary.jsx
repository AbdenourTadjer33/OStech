import { useContext } from "react";
import { CreateOrderContext } from "@/Pages/Order/Create";
import { currencyFormat } from "@/Logic/helper";

const CartSummary = () => {
	const {
		shippingPrice,
		coupon,
		memoizedSubTotal,
		memoizedCouponAmount,
		memoizedTotalCart,
	} = useContext(CreateOrderContext);
	return (
		<>
			<div className="flex justify-between text-base text-gray-900">
				<p className="text-gray-600">Sous-total</p>
				<p className="font-medium">
					{currencyFormat(memoizedSubTotal)}
				</p>
			</div>
			<div className="flex justify-between text-base text-gray-900">
				<p className="text-gray-600">Frais de livraison</p>
				<p className="font-medium">
					{shippingPrice ? (
						currencyFormat(shippingPrice)
					) : (
						<>--- ---</>
					)}
				</p>
			</div>
			{coupon && (
				<div className="flex justify-between text-base text-gray-900">
					<div className="flex items-center gap-2">
						<p className="text-gray-600">Coupon</p>
						<span className=" inline-flex items-center justify-center font-medium bg-indigo-100 text-indigo-800 text-base px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
							{coupon?.type == "percentage"
								? coupon.value + " %"
								: currencyFormat(coupon.value)}
						</span>
					</div>
					<p className="font-medium">
						- {currencyFormat(memoizedCouponAmount)}
					</p>
				</div>
			)}
			<hr className="pb-2" />
			<div className="flex justify-between text-base text-gray-900">
				<p className="text-gray-600 font-medium">Total</p>
				<p className="font-semibold">
					{currencyFormat(memoizedTotalCart)}
				</p>
			</div>
		</>
	);
};

export default CartSummary;
