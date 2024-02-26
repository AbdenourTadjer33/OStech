import React from "react";
import { Link } from "@inertiajs/react";
import { media, currencyFormat, calculatePrice } from "@/Logic/helper";

const OrderedItem = ({ item }) => {
	return (
		<div className="relative transition duration-200 hover:bg-gray-100 p-3 flex w-full">
			<div className="h-20 sm:h-24 object-contain overflow-hidden rounded ">
				<img
					src={media(item?.product?.images[0])}
					alt={item?.product?.name}
					className="h-full w-full object-cover object-center"
				/>
			</div>

			<div className="ml-4 flex flex-1 flex-col">
				<div className="space-y-3">
					<div className="flex flex-col text-base font-medium text-gray-900">
						<Link
							href={route("products.show", {
								slug: item?.product?.slug,
							})}
						>
							<h3 className="text-base font-medium pe-5">
								{item.product.name}
							</h3>
						</Link>
					</div>
					<hr />
					<div className="mt-1 text-sm text-gray-500 relative">
						{item.product.promo ? (
							<div className="flex gap-2">
								<div>
									<div className="absolute translate-y-4">
										<span className="text-xs line-through">
											{currencyFormat(item.product.price)}
										</span>
									</div>
									<p className="text-base font-medium text-gray-500">
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
								{currencyFormat(item?.product.price)}
							</p>
						)}
					</div>
				</div>
				<div className="flex flex-1 items-center justify-between text-sm mt-3">
					<div className="text-sm sm:text-lg text-gray-700">
						Quantité:{" "}
						<span className="font-medium">{item.qte}</span>
					</div>

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
			</div>
		</div>
	);
};

export default OrderedItem;
