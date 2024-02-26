import React, { useContext, Fragment, useState, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { AppLayoutContext } from "@/Layouts/AppLayout";
import { Popover, Transition } from "@headlessui/react";
import axios from "axios";
import { MinProductCard } from "@/Pages/Product/Show";

const DynamicNavBar = () => {
	const { categories } = useContext(AppLayoutContext);

	return (
		<div className="pt-20 sm:pt-[5.5rem] w-full bg-gray-100 shadow">
			<div className="max-w-screen-xl p-4 mx-auto ">
				<div className="flex items-center">
					<ul className="flex font-medium mt-0 space-x-8 text-sm">
						{categories.map((category) => (
							<li key={category.id}>
								<Popover className="relative">
									{({ open }) => (
										<>
											<Popover.Button
												className={`${
													open
														? "text-gray-800"
														: "text-gray-800/85"
												} group inline-flex items-center rounded-md text-base font-medium focus:outline-none`}
											>
												<span>{category.name}</span>
											</Popover.Button>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-200"
												enterFrom="opacity-0 translate-y-1"
												enterTo="opacity-100 translate-y-0"
												leave="transition ease-in duration-150"
												leaveFrom="opacity-100 translate-y-0"
												leaveTo="opacity-0 translate-y-1"
											>
												<Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
													<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
														<div className="relative bg-white p-2 flex gap-4">
															<div>
																{category?.subCategories.map(
																	(
																		subCategory
																	) => (
																		<Link
																			href={route(
																				"category.show",
																				{
																					category_slug:
																						category.slug,
																					subCategory_slug:
																						subCategory.slug,
																				}
																			)}
																			key={
																				subCategory.id
																			}
																			className="flex items-center rounded-lg py-2.5 px-4 transition duration-150 ease-in-out hover:bg-gray-100"
																		>
																			<div className="text-base font-medium text-blue-500 underline">
																				{
																					subCategory.name
																				}
																			</div>
																		</Link>
																	)
																)}
															</div>
															<PopoverCard
																open={open}
																category={
																	category
																}
															/>
														</div>
														<div className="bg-gray-50 p-4">
															<a
																href="##"
																className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
															>
																<span className="flex items-center">
																	<span className="text-sm font-medium text-gray-900">
																		Documentation
																	</span>
																</span>
																<span className="block text-sm text-gray-500">
																	Start
																	integrating
																	products and
																	tools
																</span>
															</a>
														</div>
													</div>
												</Popover.Panel>
											</Transition>
										</>
									)}
								</Popover>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

const PopoverCard = ({ category, open }) => {
	const [products, setProducts] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const getProductByCategory = async (slug) => {
		try {
			setIsLoading(true);
			const response = await axios.get(route("category.get", { slug }));
			setProducts(response.data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!products) {
			getProductByCategory(category.slug);
		}
		console.log(products);
	}, [products]);

	return (
		<div className="flex items-center">
			{isLoading && <>Loading...</>}
			{products &&
				products.map((product, idx) => (
					<MinProductCard
						key={idx}
						slug={product.slug}
						name={product.name}
						img={product.images[0]}
						price={product.price}
						promo={product?.promo}
					/>
				))}
		</div>
	);

	// return <div>{isLoading && <>Loading...</>}
	//     {products && products.map((product, idx) => {
	//         <div key={idx} >{product.name}</div>
	//     })}
	// </div>;
};

export default DynamicNavBar;
