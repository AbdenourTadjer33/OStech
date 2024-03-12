import React, {
	useContext,
	Fragment,
	useState,
	useEffect,
	useRef,
} from "react";
import { AppLayoutContext } from "@/Layouts/AppLayout";

import axios from "axios";
import { Link } from "@inertiajs/react";
import { Transition, Dialog } from "@headlessui/react";
import { MdClose } from "react-icons/md";

import { MinProductCard } from "@/Pages/Product/Show";
import Container from "@/Components/Container";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DynamicNavBar = () => {
	const { categories } = useContext(AppLayoutContext);

	const [categoryBar, setCategoryBar] = useState(false);
	const [category, setCategory] = useState();

	const openBar = (category) => {
		setCategory(category);
		setCategoryBar(true);
	};

	const closeBar = () => {
		setCategoryBar(false);
		setCategory(null);
	};

	return (
		<>
			<div className="pt-20 sm:pt-[5.5rem] w-full bg-gray-100 shadow overflow-x-auto">
				<Container>
					<div className="flex items-center">
						<ul className="flex font-medium mt-0 space-x-8 text-sm">
							{categories.map((category) => (
								<li key={category.id}>
									<div
										className="text-base font-medium text-blue-600 hover:text-info-600 hover:underline cursor-pointer whitespace-nowrap"
										onClick={() => openBar(category)}
									>
										{category.name}
									</div>
								</li>
							))}
						</ul>
					</div>
				</Container>
			</div>

			<Transition.Root show={categoryBar && !!category} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeBar}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pb-[26rem]">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500"
									enterFrom="-translate-y-full"
									enterTo="translate-y-0"
									leave="transform transition ease-in-out duration-200"
									leaveFrom="translate-y-0"
									leaveTo="-translate-y-full"
								>
									<Dialog.Panel className="pointer-events-auto w-screen">
										<div className="flex flex-col bg-white shadow-xl">
											<div className="flex-1 overflow-hidden px-4 py-6 relative">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-2xl font-medium text-gray-900"></Dialog.Title>
													<div className="ml-3 flex h-7 items-center">
														<button
															type="button"
															className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 outline-none"
															onClick={closeBar}
														>
															<span className="absolute -inset-0.5" />
															<span className="sr-only">
																Close panel
															</span>
															<MdClose className="h-6 w-6" />
														</button>
													</div>
												</div>

												<Container className="flex flex-col gap-5 sm:gap-10">
													<div className="flex flex-col gap-3">
														{category?.subCategories.map(
															(subCategory) => (
																<Link
																	href={route(
																		"category.show",
																		{
																			category:
																				category.slug,
																			subCategory:
																				subCategory.slug,
																		}
																	)}
																	key={
																		subCategory.id
																	}
																	className="text-base whitespace-nowrap font-medium text-blue-600 underline underline-offset-2"
																>
																	{
																		subCategory.name
																	}
																</Link>
															)
														)}
													</div>

													<div className="w-full">
														<ProductSlider
															category={category}
															isOpen={categoryBar}
														/>
													</div>
												</Container>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

const ProductSlider = ({ category, isOpen }) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const cancelTokenRef = useRef(null);

	const getProductByCategory = async (slug) => {
		const cachedData = JSON.parse(localStorage.getItem(`category-${slug}`));
		if (cachedData && Date.now() - cachedData.timestamp < 300000) {
			setProducts(cachedData.products);
			return;
		}

		if (!cancelTokenRef.current) {
			cancelTokenRef.current = axios.CancelToken.source();
		}

		try {
			setIsLoading(true);
			const response = await axios.get(route("category.get", { slug }), {
				cancelToken: cancelTokenRef.current.token,
			});

			if (response.data.length > 0) {
				localStorage.setItem(
					`category-${slug}`,
					JSON.stringify({
						products: response.data,
						timestamp: Date.now(),
					})
				);

				setProducts(response.data);
			}

			setIsLoading(false);
		} catch (error) {
			if (axios.isCancel(error)) {
				console.log("Request canceled", error.message);
			} else {
				console.error("Error fetching data:", error);
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!isOpen) {
			if (cancelTokenRef.current) {
				cancelTokenRef.current.cancel("Request canceled");
				cancelTokenRef.current = null;
			}
		} else {
			getProductByCategory(category.slug);
		}

		return () => {
			if (cancelTokenRef.current) {
				cancelTokenRef.current.cancel("Request canceled");
				cancelTokenRef.current = null;
			}
		};
	}, [isOpen]);

	const settings = {
		dots: true,
		infinite: products.length >= 3,
		speed: 500,
		slidesToShow: products.length >= 3 ? 3 : products.length,
		slidesToScroll: 1,
		initialSlide: 0,
		autoplay: true,
		autoplaySpeed: 2000,
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<>
			{isLoading && (
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-info-100 w-full overflow-hidden">
					<div
						className="bg-info-400 w-full h-full"
						style={{
							animation:
								"indeterminateAnimation 1s infinite linear",
							transformOrigin: "0% 50%",
						}}
					></div>
				</div>
			)}
			{products.length > 0 && (
				<Slider {...settings}>
					{products.map((product, idx) => (
						<MinProductCard
							key={idx}
							name={product.name}
							slug={product.slug}
							price={product.price}
							promo={product.promo}
							image={product.image}
							className="mx-auto"
						/>
					))}
				</Slider>
			)}
		</>
	);
};

export default DynamicNavBar;
