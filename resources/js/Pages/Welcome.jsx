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
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";

const WelcomePageContext = createContext();

const Welcome = ({ featuredProducts }) => {
	return (
		<WelcomePageContext.Provider value={{ featuredProducts }}>
			<AppLayout mainClass={false}>
				<Head title="Accueil" />

				<HeroBanner />

				<FeaturesSection />

				{featuredProducts.length > 0 && <FeaturedProductSection />}

				<NewsLetter />
			</AppLayout>
		</WelcomePageContext.Provider>
	);
};

const HeroBanner = () => (
	<div
		className="h-[40rem] bg-center bg-no-repeat bg-cover bg-fixed relative"
		style={{
			backgroundImage:
				"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/images/slides/slide1.jpg)",
		}}
	>
		{/* <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
			<h1>I am John Doe</h1>
			<p>And I'm a Photographer</p>
			<button className="outline-none inline-block py-2.5 px-6 text-black bg-primary-50 text-center cursor-pointer hover:bg-gray-500 hover:text-white">
				Hire me
			</button>
		</div> */}
	</div>
);

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
		<div className="bg-gray-50 w-full">
			<Container className="overflow-hidden">
				<ul className="flex items-center gap-2 justify-around">
					{features.map(({ label, icon: Icon }, idx) => (
						<li
							key={idx}
							className="flex flex-col items-center text-gray-600 text-sm sm:text-xl font-medium gap-2"
						>
							<Icon className="w-5 h-5 sm:w-7 sm:h-7 text-info-500" />
							<span className="text-xs sm:text-sm  font-medium text-gray-500 whitespace-nowrap">
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

export const NewsLetter = () => {
	return (
		<div
			className="my-10 bg-no-repeat bg-info-900"
			style={{
				backgroundImage: "url(/assets/images/banner/b14.png)",
				backgroundPosition: "20% 30%",
			}}
		>
			<Container className="py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 md:gap-10">
				<div className="space-y-2">
					<h3 className="text-4xl font-bold sm:whitespace-nowrap text-gray-100">
						Abonnez-vous à la newsletter
					</h3>
					<p className="text-base font-semibold text-white">
						Recevez des mises à jour par e-mail sur notre dernière
						boutique et{" "}
						<span className=" text-info-200">
							nos offres spéciales
						</span>
						.
					</p>
				</div>
				<div className="bg-white/15 border border-gray-50/25 p-4 sm:p-8 shadow-xl rounded-xl w-full overflow-hidden">
					<form>
						<div className="flex items-center gap-4">
							<TextInput
								placeholder="Votre adresse email"
								autoComplete="username"
							/>
							<Button btn="info">Rejoindre</Button>
						</div>
					</form>
				</div>
			</Container>
		</div>
	);
};

export default Welcome;
