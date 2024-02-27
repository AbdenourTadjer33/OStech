import React, { createContext, useContext } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { LiaShippingFastSolid } from "react-icons/lia";
import AlgeriaIcon from "@/Components/Icons/AlgeriaIcon";
import OnlineShipping from "@/Components/Icons/OnlineShipping";
import Promotion from "@/Components/Icons/Promotion";
import { capitalize } from "@/Logic/helper";
import Container from "@/Components/Container";
import ProductCard from "@/Components/Section/Client/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WelcomePageContext = createContext();

const Welcome = ({ featuredProducts }) => {
	return (
		<WelcomePageContext.Provider value={{ featuredProducts }}>
			<AppLayout mainClass={false}>
				<Head title="Accueil" />

				{/* <div className="flex w-full h-[40vh]">
				<div className="w-1/2">
					<img
						className="w-full h-full"
						src="/assets/images/slides/slide1.jpg"
					/>
				</div>

				<div className="w-1/2 flex flex-col h-full">
					<img
						className="w-full h-full object-cover"
						src="/assets/images/slides/slide2.jpg"
					/>
				</div>
			</div> */}

				<FeaturesSection />

				{featuredProducts.length > 0 && <FeaturedProductSection />}

				<NewsLetter />
			</AppLayout>
		</WelcomePageContext.Provider>
	);
};

const HeroBanner = () => {};

const FeaturesSection = () => {
	const features = [
		{
			label: "Promotions",
			icon: Promotion,
		},
		{
			label: "Commande en ligne",
			icon: OnlineShipping,
		},
		{
			label: "Livraison rapide",
			icon: LiaShippingFastSolid,
		},
		{
			label: "Livraison 58 wilaya",
			icon: AlgeriaIcon,
		},
	];

	return (
		<div className="w-full bg-gray-50">
			<Container>
				<ul className="flex items-center justify-around">
					{features.map(({ label, icon: Icon }, idx) => (
						<li
							key={idx}
							className="flex flex-col items-center text-gray-600 text-sm sm:text-xl font-medium gap-2"
						>
							<Icon className="w-5 h-5 sm:w-7 sm:h-7 text-info-500" />
							<span className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
								{capitalize(label)}
							</span>
						</li>
					))}
				</ul>
			</Container>
		</div>
	);
};

const FeaturedProductSection = () => {
	const { featuredProducts } = useContext(WelcomePageContext);

	return (
		<Container className="space-y-5 my-10">
			<h2 className="text-4xl text-gray-700 font-semibold">
				Nos Meilleure Offre
			</h2>

			<div className="flex items-center justify-center gap-5 flex-wrap">
				{featuredProducts.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						slug={product.slug}
						name={product.name}
						price={product.price}
						promo={product.promo}
						image={product.image}
						category={product.category}
						parentCategory={product.parent_category}
					/>
				))}
			</div>
		</Container>
	);
};

const MostSelledProductSection = () => {};

const SecondBannerSection = () => {};

const NewsLetter = () => {
	return (
		<div
			className="my-10 p-10 bg-no-repeat bg-info-900"
			style={{
				backgroundImage: "url(/assets/images/banner/b14.png)",
				backgroundPosition: "20% 30%",
			}}
		>
			<Container className="flex items-center justify-between">
				<div>
					<h3 className="text-3xl font-bold text-gray-100">
						Abonnez-vous à la newsletter
					</h3>
					<p>
						Recevez des mises à jour par e-mail sur notre dernière
						boutique et <span clas>nos offres spéciales</span>.
					</p>
				</div>
				<div className="w-full inline-flex">
					<input
						placeholder="Coupon"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-[2rem] focus:ring-2 focus:ring-info-400 block w-full p-2.5 "
					/>
					<button className="inline-flex items-center text-white border border-gray-700 focus:ring-2 focus:ring-gray-400 font-medium rounded-e-[2rem] text-sm px-5 py-2.5 focus:outline-none  disabled:opacity-25 transition ease-in-out duration-150 bg-gray-700 hover:bg-gray-800">
						Ajouter
					</button>
				</div>
			</Container>
		</div>
	);
};

const brands = () => {};

export default Welcome;
