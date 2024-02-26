import React from "react";
import { Link } from "@inertiajs/react";
import { currencyFormat } from "@/Logic/helper";
import Button from "@/Components/Button";

const OrderSummary = ({ order }) => {
	return (
		<>
			<div className="flex justify-between text-base text-gray-900">
				<p className="text-gray-600">Sous-total</p>
				<p className="font-medium">{currencyFormat(order.sub_total)}</p>
			</div>
			<div className="flex justify-between text-base text-gray-900">
				<p className="text-gray-600">Frais de livraison</p>
				<p className="font-medium">
					{currencyFormat(order.shipping_cost)}
				</p>
			</div>
			{order.discount && (
				<div className="flex justify-between text-base text-gray-900">
					<div className="flex items-center gap-2">
						<p className="text-gray-600">Coupon</p>
					</div>
					<p className="font-medium">
						- {currencyFormat(order.discount)}
					</p>
				</div>
			)}
			<hr className="my-4" />
			<div className="flex justify-between text-base text-gray-900">
				<p className="text-gray-600 font-medium">Total à payé</p>
				<p className="font-semibold">{currencyFormat(order.total)}</p>
			</div>
			<div className="mt-5">
				<a
					className="w-full flex items-center justify-center rounded-xl border border-transparent bg-gray-700 px-6 py-2.5 text-base font-medium text-white shadow-sm hover:bg-gray-600"
					href={route("order.pdf", { ref: order.ref })}
				>
					Télécharger le fichier PDF
				</a>
			</div>
		</>
	);
};

export default OrderSummary;
