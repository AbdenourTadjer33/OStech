import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Authenticated from "@/Components/Section/Client/Authenticated";
import Table from "@/Components/Table";
import { currencyFormat } from "@/Logic/helper";
import Modal from "@/Components/Modal";
import OrderSummary from "@/Components/Section/Client/Order/OrderSummary";
import OrderedItem from "@/Components/Section/Client/Order/OrderedItem";
import Badge from "@/Components/Badge";
import wilaya from "@/data/wilaya.json";

const Index = ({ orders }) => {
	return (
		<Authenticated>
			<Head title="Mes commande" />

			<section className=" bg-white shadow rounded sm:rounded-lg">
				{orders.length === 0 ? <NoOrder /> : <Orders orders={orders} />}
			</section>
		</Authenticated>
	);
};

const NoOrder = () => (
	<div className="text-center py-4">
		<h2 className="text-gray-700 text-xl font-medium">
			Aucune commande n'est trouvé
		</h2>
	</div>
);

const Orders = ({ orders }) => {
	const [order, setOrder] = useState(null);
	console.log(orders[0]);

	return (
		<>
			<div className="overflow-x-auto">
				<Table className="table-auto">
					<Table.Head>
						<Table.Row>
							<Table.Title className="px-2 py-3">
								référence
							</Table.Title>
							<Table.Title className="px-2 py-3">
								Total
							</Table.Title>
							<Table.Title className="px-2 py-3">
								status
							</Table.Title>
							<Table.Title className="px-2 py-3">
								commandé le
							</Table.Title>
							<Table.Title className="px-2 py-3"></Table.Title>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						{orders.map((order) => (
							<Table.Row
								key={order.ref}
								className="bg-white border-b hover:bg-gray-50"
							>
								<Table.Column className="px-2 py-3">
									{order.ref}
								</Table.Column>
								<Table.Column className="px-2 py-3">
									{currencyFormat(order.total)}
								</Table.Column>
								<Table.Column className="px-2 py-3 whitespace-nowrap">
									<Badge>{order.status}</Badge>
								</Table.Column>
								<Table.Column className="px-2 py-3 whitespace-nowrap">
									{order.created_at}
								</Table.Column>
								<Table.Column className="px-2 py-3 flex items-center gap-4">
									<div
										className="text-blue-600 sm:text-lg text-sm font-medium hover:underline underline-offset-1 cursor-pointer"
										onClick={() => setOrder(order)}
									>
										Voir
									</div>
									<a
										className="text-blue-600 sm:text-lg text-sm font-medium hover:underline underline-offset-1"
										href={route("order.pdf", {
											ref: order.ref,
										})}
									>
										PDF
									</a>
								</Table.Column>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>

			{order && (
				<Modal
					maxWidth="2xl"
					show={!!order}
					closeable
					onClose={(e) => setOrder(null)}
				>
					<div className="p-4">
						<header>
							<h1 className="text-xl text-gray-600 font-medium">
								Commande n° {order?.ref}
							</h1>
						</header>

						<hr className="mt-4 -mx-4" />

						<div className="max-h-[60vh] overflow-y-auto py-2">
							<section className="mb-4">
								<h3 className="text-lg font-medium">
									Coordonnées
								</h3>
								<div>
									<p>{order.client.name}</p>
									<p>{order.client.phone}</p>
									<p>
										{order.client.address +
											" " +
											order.client.city +
											" " +
											wilaya.find(
												(wilaya) =>
													wilaya.code ==
													order.client?.wilaya
											)?.name}.
									</p>
								</div>

								<h3 className="text-lg">
									Méthod de payment:{" "}
									<span className="font-medium">
										{order.payment_method}
									</span>
								</h3>

								<h3 className="text-lg">
									Méthod de livraison:{" "}
									<span className="font-medium">
										{order.shipping_type}
									</span>
								</h3>
							</section>

							<div className="flex flex-col justify-start items-end gap-4">
								<div className="divide-y w-full sm:max-w-2xl border border-gray-200 shadow-lg rounded">
									{order?.order_products.map((item, idx) => (
										<OrderedItem key={idx} item={item} />
									))}
								</div>
								<div className="w-full max-w-sm bg-white border p-4 shadow-lg rounded">
									<OrderSummary order={order} />
								</div>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default Index;
