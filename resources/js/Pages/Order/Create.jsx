import React, { createContext, useState, useMemo } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import CartItem from "@/Components/Section/Client/Cart/CartItem";

import CreateOrder from "@/Components/Section/Client/Order/CreateOrder";
import CartSummary from "@/Components/Section/Client/Cart/CartSummary";
import Coupon from "@/Components/Section/Client/Cart/Coupon";
import { calculatePrice } from "@/Logic/helper";

export const CreateOrderContext = createContext();

const Index = () => {
	const { cart, coupon } = usePage().props;
	const [shippingPrice, setShippingPrice] = useState(null);

	const subTotal = () => {
		let sum = 0;
		cart.forEach((item) => {
			const qte = item.qte;
			let price = item.product?.price;
			if (item.product.promo) {
				price = calculatePrice(item.product.price, item.product.promo);
			}
			sum += qte * price;
		});
		return sum;
	};

	const couponAmount = () => {
		if (!coupon) return;

		let reduction;
		if (coupon.type === "percentage") {
			reduction = (subTotal() * coupon.value) / 100;
		} else {
			reduction = subTotal() - coupon.value;
		}

		return reduction > coupon?.max_amount ? coupon.max_amount : reduction;
	};

	const totalCart = () => {
		let sum = subTotal();

		if (shippingPrice) {
			sum += shippingPrice;
		}

		return couponAmount() ? sum - couponAmount() : sum;
	};

	const memoizedSubTotal = useMemo(() => subTotal(), [cart]);
	const memoizedCouponAmount = useMemo(
		() => couponAmount(),
		[cart, coupon, shippingPrice]
	);
	const memoizedTotalCart = useMemo(
		() => totalCart(),
		[cart, coupon, shippingPrice]
	);

	return (
		<CreateOrderContext.Provider
			value={{
				setShippingPrice,
				shippingPrice,
				coupon,
				memoizedSubTotal,
				memoizedCouponAmount,
				memoizedTotalCart,
			}}
		>
			<AppLayout>
				<Head title="Commander" />

				<Container className="py-0 flex flex-col gap-4">
					<h1 className="text-4xl font-medium text-gray-800 my-4">
						Finaliser ma commande
					</h1>
					<div className="flex justify-between items-start gap-4 flex-row-reverse">
						<div className="sticky top-28 w-full sm:max-w-xl border border-gray-200 shadow-lg rounded">
							<div className="divide-y">
								{cart.map((item, index) => (
									<CartItem key={index} item={item} />
								))}
							</div>

							<div className="px-4 py-6 sm:px-6 border-t">
								<div className="mb-4">
									<Coupon coupon={coupon} />
								</div>

								<div className="space-y-2">
									<CartSummary />
								</div>
							</div>
						</div>

						<div className="w-full">
							<CreateOrder />
						</div>
					</div>
				</Container>
			</AppLayout>
		</CreateOrderContext.Provider>
	);
};

export default Index;
