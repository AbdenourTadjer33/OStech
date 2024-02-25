import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";

const Show = ({ order }) => {
	console.log(order);
	return (
		<AppLayout>
			<Head title={`Commande n°${order.ref}`} />

			<Container>
				<h1 className="text-2xl sm:text-4xl font-medium text-gray-800 mb-4">
					Nous vous remercions de votre commande {":)"}
				</h1>

				<div className="text-base sm:text-lg text-gray-700 space-y-1 sm:space-y-0 leading-relaxed">
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

				<pre>{ JSON.stringify(order, null, 2)}</pre>
			</Container>
		</AppLayout>
	);
};

export default Show;
