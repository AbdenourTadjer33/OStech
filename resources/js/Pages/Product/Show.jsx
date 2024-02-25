import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import ProductCard from "@/Components/Section/Client/ProductCard";
import AppLayout from "@/Layouts/AppLayout";
import { calculatePrice, currencyFormat, media } from "@/Logic/helper";
import Button from "@/Components/Button";
import { TbShoppingCartPlus } from "react-icons/tb";
import Container from "@/Components/Container";
import { useRef } from "react";

const Show = ({ product }) => {
	const { post, processing } = useForm();

	const addToCart = (id) => {
		post(route("cart.add", { id }), {
			preserveScroll: true,
		});
	};
	return (
		<AppLayout>
			<Head title={product.name} />

			<ProductDetails product={product} addToCart={addToCart} />

			<div className="bg-info-50 p-4 mb-10">
				<Container>
					<div className="flex items-center justify-between">
						<h4 className="text-lg font-medium">Modèles pareils</h4>
					</div>
				</Container>
			</div>

			<Container>
				<div className="mb-5">
					<ul className="rounded-lg overflow-hidden w-full mx-auto border border-gray-200 shadow">
						<li className="p-4 bg-white ">
							<h2 className="uppercase text-xl sm:text-3xl text-gray-900 font-meduim">
								Caractéristique
							</h2>
						</li>
						<div className="divide-y divide-gray-200">
							{product.features.map((section, idx) => {
								return (
									<li
										key={idx}
										className="p-4 bg-white hover:bg-gray-50 flex items-center"
									>
										<h3 className="text-base sm:text-xl text-gray-800 font-medium sm:font-semibold capitalize basis-1/4">
											{section?.title}
										</h3>

										<div className="basis-3/4">
											{section?.features.map(
												(feature, idx) => (
													<div
														key={idx}
														className="grid gap-4 grid-cols-3"
													>
														<div
															key={idx}
															className="text-sm sm:text-lg sm:font-medium text-gray-700"
														>
															{feature.label}
														</div>
														<div className="text-xs sm:text-base text-gray-600 col-span-2">
															{
																feature.description
															}
														</div>
													</div>
												)
											)}
										</div>
									</li>
								);
							})}
						</div>
					</ul>
				</div>
			</Container>
		</AppLayout>
	);
};

const ProductDetails = ({ product, addToCart }) => {
	const {
		name,
		description,
		price,
		promo,
		images,
		brand,
		category,
		parent_category,
	} = product;

	const mainImgRef = useRef();

	const visualize = (e) => {
		mainImgRef.current.src = e.target.src;
	};

	return (
		<Container>
			<section className="flex flex-col md:flex-row gap-4">
				<div className="flex flex-row w-full md:w-1/2 gap-4 justify-center">
					<div className="flex flex-col items-center justify-start gap-4 overflow-y-auto">
						{images.map((img, idx) => (
							<img
								key={idx}
								src={media(img)}
								className="h-16 cursor-pointer"
								onClick={visualize}
							/>
						))}
					</div>

					<div className="relative h-[30vh] w-[30vh]">
						<img
							ref={mainImgRef}
							src={media(images?.[0])}
							// className="h-[30vh] w-auto"
							className="h-full w-full object-contain object-center"
						/>
						{promo && (
							<div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between">
								<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
									- {promo} %
								</span>
							</div>
						)}
					</div>
				</div>

				<div className="space-y-3 md:mt-4 md:ms-2">
					<h6 className="text-sm text-gray-500">
						{parent_category} {">"} {category}
					</h6>
					<h2 className="text-xl font-medium text-info-950">
						{name}
					</h2>

					<div className="relative">
						{promo ? (
							<>
								<span className="text-lg line-through text-gray-500">
									{currencyFormat(price)}
								</span>
								<h4 className="text-2xl font-medium text-indigo-800">
									{currencyFormat(
										calculatePrice(price, promo)
									)}
								</h4>
							</>
						) : (
							<h4 className="text-2xl font-medium text-indigo-800">
								{currencyFormat(product.price)}
							</h4>
						)}
					</div>

					<div className="flex gap-2 items-center justify-start">
						<Button btn="info" className="capitalize">
							Commander maintenant
						</Button>
						<button
							className="text-info-800 hover:text-info-500"
							onClick={() => addToCart(product.id)}
						>
							<TbShoppingCartPlus className="w-6 h-6" />
						</button>
					</div>
					{description && (
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Mauris vel magna id velit dictum consequat.
							Pellentesque eget ipsum ac turpis accumsan faucibus.
							Ut non hendrerit odio. Proin vitae semper lacus.
							Integer commodo odio nec velit euismod condimentum
						</div>
					)}
				</div>
			</section>
		</Container>
	);
};

export default Show;

// {/* <Container>
// 	<section className="flex flex-col md:flex-row gap-4">
// 		<div className="flex flex-row w-full md:w-1/2 gap-2 justify-center">
// 			<div className="flex flex-col items-center justify-start gap-4 overflow-y-auto">
// 				{product.images.map((img, idx) => (
// 					<img
// 						key={idx}
// 						src={media(img)}
// 						className="h-16 cursor-pointer"
// 					/>
// 				))}
// 			</div>

// 			<img src={media(product.images?.[0])} className="h-[30vh] w-auto" />
// 		</div>

// 		<div className="space-y-3 md:mt-4 md:ms-2">
// 			<h6 className="text-sm text-gray-500">
// 				{product.parent_category} {">"} {product.category}
// 			</h6>
// 			<h2 className="text-xl font-medium text-info-950">
// 				{product.name}
// 			</h2>
// 			{/* {product.promo ? (
// 							<>
// 								<div className="absolute w-full text-center translate-y-4">
// 									<span className="text-xs line-through">
// 										{currencyFormat(price)}
// 									</span>
// 								</div>
// 								<h4 className="text-lg font-medium text-gray-800">
// 									{currencyFormat(
// 										price - (price * promo) / 100
// 									)}
// 								</h4>
// 							</>
// 						) : (
// 							<h4 className="text-lg font-medium text-gray-800">
// 								{currencyFormat(product.price)}
// 							</h4>
// 						)} */}
// 			<div className="flex gap-2 items-center justify-start">
// 				<Button btn="info" className="capitalize">
// 					Commander maintenant
// 				</Button>
// 				<button
// 					className="text-info-800 hover:text-info-500"
// 					onClick={() => addToCart(product.id)}
// 				>
// 					<TbShoppingCartPlus className="w-6 h-6" />
// 				</button>
// 			</div>
// 			{/* <div>
// 							Lorem ipsum dolor sit amet, consectetur adipiscing
// 							elit. Mauris vel magna id velit dictum consequat.
// 							Pellentesque eget ipsum ac turpis accumsan faucibus.
// 							Ut non hendrerit odio. Proin vitae semper lacus.
// 							Integer commodo odio nec velit euismod condimentum
// 						</div> */}
// 			{/* {product.description && (
//                             <div
//                                 dangerouslySetInnerHTML={{
//                                     __html: product.description,
//                                 }}
//                             />
//                         )} */}
// 		</div>
// 	</section>
// </Container>; */}
