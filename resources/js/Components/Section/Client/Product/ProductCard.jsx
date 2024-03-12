import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { calculatePrice, currencyFormat, media } from "@/Logic/helper";
import { TbShoppingCartPlus } from "react-icons/tb";
import Button, { IndigoButton } from "@/Components/Button";

const ProductCard = ({
	id,
	slug,
	name,
	price,
	promo,
	image,
	colors,
	subCategory,
	mainCategory,
}) => {
	const { post } = useForm();

	const addToCart = (id) => {
		post(route("cart.add", { id }), {
			preserveScroll: true,
		});
	};

	return (
		<div className="group w-full max-w-sm border p-4 bg-white shadow rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
			<Link
				href={route("products.show", { slug })}
				className="relative overflow-hidden block"
			>
				<img
					className="w-full h-64 rounded-t-lg object-contain"
					src={media(image ?? "default.png")}
				/>
				{promo && (
					<div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between">
						<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
							- {promo} %
						</span>
					</div>
				)}

				{/* {colors && (
					<div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-2">
						{colors.map((color, idx) => (
							<span
								key={idx}
								className="w-6 h-6 rounded-full inline-flex border-2 outline-none ring-2 ring-indigo-300 border-opacity-10"
								style={{ background: color.code }}
							></span>
						))}
					</div>
				)} */}
			</Link>

			<div className="pt-5 space-y-4">
				<h6 className="text-sm text-gray-500">
					{mainCategory} {">"} {subCategory}
				</h6>
				<Link href={route("products.show", { slug })}>
					<h5 className="text-lg font-medium leading-tight text-info-950 h-11 my-1 overflow-hidden">
						{name}
					</h5>
				</Link>
				<div className="flex items-center justify-between">
					<div className="relative">
						{promo ? (
							<>
								<div className="absolute w-full text-center translate-y-4">
									<span className="text-xs line-through">
										{currencyFormat(price)}
									</span>
								</div>
								<h4 className="text-lg font-medium text-gray-800">
									{currencyFormat(
										calculatePrice(price, promo)
									)}
								</h4>
							</>
						) : (
							<h4 className="text-lg font-medium text-gray-800">
								{currencyFormat(price)}
							</h4>
						)}
					</div>
					<div className="flex gap-3">
						<Link href={route("products.show", { slug })}>
							<IndigoButton type="button">Affiché</IndigoButton>
						</Link>

						<button
							className="text-info-600 hover:text-info-500"
							onClick={() => addToCart(id)}
						>
							<TbShoppingCartPlus className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const PreviewProductCard = ({
	name,
	price,
	promo,
	image,
	mainCategory,
	subCategory,
	colors,
}) => {
	return (
		<div className="group w-full max-w-sm border p-4 bg-white shadow rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
			<div className="relative overflow-hidden block">
				<img
					className="w-full h-64 rounded-t-lg object-contain"
					src={media(image ?? "default.png")}
				/>
				{promo && (
					<div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between">
						<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
							- {promo} %
						</span>
					</div>
				)}
				{/* {colors && (
					<div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-2">
						{colors.map((color, idx) => (
							<span
								key={idx}
								className="w-6 h-6 rounded-full inline-flex border-2 outline-none ring-2 ring-indigo-300 border-opacity-10"
								style={{ background: color.code }}
							></span>
						))}
					</div>
				)} */}
			</div>

			<div className="pt-5 space-y-4">
				<h6 className="text-sm text-gray-500">
					{mainCategory} {">"} {subCategory}
				</h6>
				<div>
					<h5 className="text-lg font-medium leading-tight text-info-950 h-11 my-1 overflow-hidden">
						{name}
					</h5>
				</div>
				<div className="flex items-center justify-between">
					<div className="relative">
						{promo ? (
							<>
								<div className="absolute w-full text-center translate-y-4">
									<span className="text-xs line-through">
										{currencyFormat(price)}
									</span>
								</div>
								<h4 className="text-lg font-medium text-gray-800">
									{currencyFormat(
										calculatePrice(price, promo)
									)}
								</h4>
							</>
						) : (
							<h4 className="text-lg font-medium text-gray-800">
								{currencyFormat(price)}
							</h4>
						)}
					</div>
					<div className="flex gap-3">
						<div>
							<Button btn="info" type="button">
								Affiché
							</Button>
						</div>

						<button className="text-info-800 hover:text-info-500">
							<TbShoppingCartPlus className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
