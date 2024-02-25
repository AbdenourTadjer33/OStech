import React, { useRef, useEffect } from "react";
import { useForm, Link } from "@inertiajs/react";
import {
	debounce,
	media,
	currencyFormat,
	calculatePrice,
} from "@/Logic/helper";
import Minus from "@/Components/Icons/Minus";
import Plus from "@/Components/Icons/Plus";
import { Tooltip } from "flowbite-react";
import { FaRegTrashCan } from "react-icons/fa6";
const CartItem = ({ item }) => {
	const { post, processing, data, setData } = useForm({
		qte: item.qte,
	});
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (!isFirstRender.current) {
			const debouncedApiCall = debounce(() => {
				post(route("cart.handle.qte", { id: item?.product?.id }));
			}, 1000);

			debouncedApiCall();

			return () => debouncedApiCall.cancel();
		} else {
			isFirstRender.current = false;
		}
	}, [data.qte]);

	const handleCounter = (increment = false) => {
		const qte = data.qte;
		if ((!increment && qte === 1) || (increment && qte === 5)) {
			return;
		}

		setData("qte", increment ? qte + 1 : qte - 1);
	};

	const destroyItem = () => {
		post(route("cart.remove", { id: item?.product?.id }));
	};

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
					<div className="flex items-center">
						<button
							onClick={() => handleCounter(false)}
							className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
							type="button"
						>
							<Minus />
						</button>
						<div>
							<input
								type="text"
								className="bg-gray-50 w-10 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								value={data.qte}
								readOnly
							/>
						</div>
						<button
							onClick={() => handleCounter(true)}
							className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
							type="button"
						>
							<Plus />
						</button>
					</div>
					<div className="text-sm sm:text-lg">
						Total:{" "}
						<span className="font-medium">
							{item.product.promo
								? currencyFormat(
										calculatePrice(
											item.product.price,
											item.product.promo
										) * data.qte
								  )
								: currencyFormat(
										item?.product?.price * data.qte
								  )}
						</span>
					</div>
					<button
						type="button"
						className="absolute top-3 right-2 font-medium text-info-600 hover:text-info-500"
						onClick={() => destroyItem(item.product?.id)}
					>
						<FaRegTrashCan className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
