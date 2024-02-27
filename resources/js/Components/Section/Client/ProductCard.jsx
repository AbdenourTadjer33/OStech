import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { calculatePrice, currencyFormat } from "@/Logic/helper";
import { TbShoppingCartPlus } from "react-icons/tb";
import Button from "@/Components/Button";

const ProductCard = ({
	id,
	slug,
	name,
	price,
	promo,
	image,
	category,
	parentCategory,
}) => {
	const { post, processing } = useForm();

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
					src={`/media/${image ? image : "default.png"}`}
				/>
				{promo && (
					<div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between">
						<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
							- {promo} %
						</span>
					</div>
				)}
			</Link>

			<div className="pt-5 space-y-4">
				<h6 className="text-sm text-gray-500">
					{parentCategory} {">"} {category}
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
						{/* Affiché */}
						<Link
							href={route("products.show", { slug })}
							// className="text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition ease-in-out duration-150 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center "
						>
							<Button btn="info" type="button">
								Affiché
							</Button>
						</Link>
						<button
							className="text-info-800 hover:text-info-500"
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

export default ProductCard;
