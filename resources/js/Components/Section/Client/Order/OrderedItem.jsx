import React from "react";
import { currencyFormat, calculatePrice } from "@/Logic/helper";

const OrderedItem = ({ item }) => {
	return (
		<div className="relative transition duration-200 hover:bg-gray-100 sm:p-4 p-2 flex w-full">
			<div className="flex flex-1 flex-col">
				<div className="space-y-3">
					<div className="flex justify-between gap-4">
						<h3 className="text-base font-medium pe-5">
							{item.product.name}
						</h3>
						<div className="text-sm sm:text-lg">
							Total:{" "}
							<span className="font-medium">
								{item.product.promo
									? currencyFormat(
											calculatePrice(
												item.product.price,
												item.product.promo
											) * item.qte
									  )
									: currencyFormat(
											item?.product?.price * item.qte
									  )}
							</span>
						</div>
					</div>
					<div className="mt-0.5 text-sm text-gray-500 relative">
						{item.product.promo ? (
							<div className="flex gap-2">
								<div>
									<div className="absolute translate-y-4">
										<span className="text-xs line-through">
											{currencyFormat(item.product.price)}
										</span>
									</div>
									<p className="text-base font-medium text-gray-500">
										<span className="font-medium text-gray-800">
											x{item.qte}
										</span>{" "}
										{currencyFormat(
											calculatePrice(
												item.product.price,
												item.product.promo
											)
										)}
									</p>
								</div>
								<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
									- {item.product.promo} %
								</span>
							</div>
						) : (
							<p className="text-base text-gray-500 font-medium">
								<span className="font-medium text-gray-800">x{item.qte}</span>{" "}
								{currencyFormat(item?.product.price)}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderedItem;
