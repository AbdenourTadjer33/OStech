import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import OrderSummary from "@/Components/Section/Client/Order/OrderSummary";
import OrderedItem from "@/Components/Section/Client/Order/OrderedItem";
import { currencyFormat } from "@/Logic/helper";
import wilaya from "@/data/wilaya.json";
const NewOrder = ({ order }) => {
	console.log(order);
	return (
		<AppLayout>
			<Head title={"Nouvelle commade n°" + order.ref} />

			<Container>
				<h1 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-5">
					Merci d'avoir fait du shopping avec nous!
				</h1>

				<div className="space-y-3">
					<div className="space-y-1 text-base text-gray-700">
						<p>
							Le numéro de référence de votre commande est :{" "}
							<span className="font-medium text-gray-800">
								{order.ref}
							</span>
						</p>

						{order?.client?.email && (
							<p>
								Les détails de votre commande vous ont été
								envoyé à :{" "}
								<span className="font-medium text-gray-800">
									{order?.client?.email}
								</span>
							</p>
						)}

						<p>
							Notre service commercial vous contactera pour toute
							information supplémentaire, soyez disponible s'il
							vous plaît.
						</p>
						<p>
							Vous pouvez vérifier l'état de votre commande à tout
							moment en suivant le lien ci-dessous :{" "}
							<Link
								href={route("order.find")}
								className="text-blue-700 underline"
							>
								Ma commande
							</Link>
						</p>
					</div>

					<div className="space-y-1 text-base text-gray-700">
						<h3 className="text-xl font-medium text-gray-800">
							Coordonnéés
						</h3>
						<p>
							Nom Prénom:{" "}
							<span className="text-gray-800 font-medium">
								{order.client?.name}
							</span>
						</p>
						<p>
							N° téléphone:{" "}
							<span className="text-gray-800 font-medium">
								{order.client?.phone}
							</span>
						</p>
						<p>
							Addresse:
							<span className="font-medium text-gray-800">
								{order.client?.address +
									" " +
									order.client?.city +
									" " +
									wilaya.find(
										(wilaya) =>
											wilaya.code == order.client?.wilaya
									)?.name}
							</span>
						</p>
						<p>
							Méthod de Paiement:{" "}
							<span className="font-medium text-gray-800">
								{order.payment_method}
							</span>
						</p>
						<p>
							Mode de livraison:{" "}
							<span className="font-medium text-gray-800">
								{order.shipping_type}
							</span>
						</p>
					</div>

					{order.payment_method != "Paiement à la livraison" && (
						<div>
							<p>
								<span className="text-red-600 font-medium">
									Important:{" "}
								</span>
								Vous devez transferer{" "}
								{currencyFormat(order.total)} au 08348923
							</p>
						</div>
					)}

					<div className="space-y-2">
						<div className="divide-y w-full border border-gray-200 shadow-lg rounded">
							{order.order_products.map((item, idx) => (
								<OrderedItem key={idx} item={item} />
							))}
						</div>
						<div className="flex justify-end">
							<div className="w-full max-w-lg bg-white border sm:p-4 p-2 shadow-lg rounded">
								<OrderSummary order={order} />
							</div>
						</div>
					</div>
				</div>
			</Container>
		</AppLayout>
	);
};

export default NewOrder;
