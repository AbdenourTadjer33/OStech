import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { LiaShippingFastSolid } from "react-icons/lia";
import AlgeriaIcon from "@/Components/Icons/AlgeriaIcon";
import OnlineShipping from "@/Components/Icons/OnlineShipping";

const Welcome = () => {
	return (
		<AppLayout mainClass={false}>
			<Head title="Accueil" />

			<div className="flex w-full h-[40vh]">
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
			</div>

			<div className="w-full p-4 bg-gray-50">
				<ul className="flex items-center justify-around">
					<li className="flex flex-col items-center text-gray-600 text-sm sm:text-xl font-medium gap-2">
						<OnlineShipping className="w-5 h-5 sm:w-10 sm:h-10 text-info-500" />
						<span className="capitalize">Commande en ligne</span>
					</li>

					<li className="flex flex-col items-center text-gray-600 text-sm sm:text-xl font-medium gap-2">
						<LiaShippingFastSolid className="w-5 h-5 sm:w-10 sm:h-10 text-info-500" />
						<span className="capitalize">Livraison rapide</span>
					</li>

					<li className="flex flex-col items-center text-gray-600 text-sm sm:text-xl gap-2">
						<AlgeriaIcon className="w-5 h-5 sm:w-10 sm:h-10 text-info-500" />
						<span className="capitalize">Livraison 58 wilaya</span>
					</li>
				</ul>
			</div>
		</AppLayout>
	);
};

export default Welcome;
