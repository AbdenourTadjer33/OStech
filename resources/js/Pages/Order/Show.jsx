import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import OrderedItem from "@/Components/Section/Client/Order/OrderedItem";
import OrderSummary from "@/Components/Section/Client/Order/OrderSummary";

const Show = ({ order }) => {
	return (
		<AppLayout>
			<Head title={`Commande n°${order.ref}`} />

			<Container>
				<h1 className="text-2xl sm:text-4xl font-medium text-gray-800 mb-5">
					Nous vous remercions de votre commande {":)"}
				</h1>

				<div className="text-base sm:text-lg text-gray-700 space-y-1 sm:space-y-0 leading-relaxed mb-5">
					<p>
						Le numéro de référence de votre commande est :{" "}
						<span className="font-medium text-gray-800">
							{order.ref}
						</span>
					</p>
					<p>
						Les détails de votre commande vous ont été envoyé à :{" "}
						<span className="font-medium text-gray-800">
							{order?.client?.email}
						</span>
					</p>
					<p>
						Notre service commercial vous contactera pour toute
						information supplémentaire, soyez disponible s'il vous
						plaît.
					</p>
					<p>
						Vous pouvez vérifier l'état de votre commande à tout
						moment en suivant le lien ci-dessous :{" "}
						<a href="#" className="text-blue-700 underline">
							Ma commande
						</a>
					</p>
				</div>

				<div className="flex justify-start items-end gap-4">
					<div className="divide-y w-full sm:max-w-2xl border border-gray-200 shadow-lg rounded">
						{order.orderProducts.map((item, idx) => (
							<OrderedItem key={idx} item={item} />
						))}
					</div>

					<div className="w-full max-w-sm bg-white border p-4 shadow-lg rounded">
						<OrderSummary order={order} />
					</div>
				</div>

				{/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
			</Container>
		</AppLayout>
	);
};

export default Show;
