import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { calculatePrice, currencyFormat } from "@/Logic/helper";
import Button, { IndigoButton } from "@/Components/Button";
import Container from "@/Components/Container";
import { ProductDetails } from "@/Components/Section/Client/Product/DetailsProduct";
import { ProductFeatures } from "@/Components/Section/Client/Product/DetailsProduct";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Show = ({ product, similairProducts }) => {
	const { data, setData, post, processing } = useForm({});

	const addToCart = (id) => {
		post(route("cart.add", { id }), {
			preserveScroll: true,
		});
	};

	const settings = {
		dots: true,
		infinite: similairProducts.length >= 3,
		speed: 500,
		slidesToShow:
			similairProducts.length >= 3 ? 3 : similairProducts.length,
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
		<AppLayout>
			<Head title={product.name} />

			<Container>
				<ProductDetails
					product={product}
					addToCart={addToCart}
					processing={processing}
					data={data}
					setData={setData}
				/>

				<ProductFeatures features={product.features} />

				{similairProducts.length > 0 && (
					<div className="mt-10 space-y-4">
						<h1 className="text-3xl text-gray-700 font-semibold">
							Produits similaires
						</h1>

						<Slider {...settings}>
							{similairProducts.map((product, idx) => (
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
					</div>
				)}
			</Container>
		</AppLayout>
	);
};

export const MinProductCard = ({
	slug,
	name,
	image,
	price,
	promo,
	className = "",
}) => {
	return (
		<div
			className={`group w-full max-w-sm p-4 bg-white border rounded-lg overflow-hidden transition-all duration-300 ${className}`}
		>
			<div className="relative overflow-hidden block">
				<img
					className="w-full h-44 rounded-t-lg object-contain"
					src={`/media/${image ? image : "default.png"}`}
				/>
				{promo && (
					<div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between">
						<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
							- {promo} %
						</span>
					</div>
				)}
			</div>
			<div className="pt-5 space-y-4">
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
						<Link href={route("products.show", { slug })}>
							<IndigoButton type="button">
								Affiché
							</IndigoButton>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Show;
