import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Table from "@/Components/Table";
import { currencyFormat } from "@/Logic/helper";
import Badge from "@/Components/Badge";
import { StatusCercle } from "@/Components/Status";
import {
	MdKeyboardArrowDown as AD,
	MdKeyboardArrowUp as AT,
} from "react-icons/md";
import { BigCheckbox } from "@/Components/Checkbox";
import Heading from "@/Components/Heading";
import wilaya from "@/data/wilaya.json";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Combobox, Transition } from "@headlessui/react";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { Fragment } from "react";
import { FaCheck } from "react-icons/fa";
import Button from "@/Components/Button";

const findWilaya = (code) => {
	return wilaya.find((state) => state.code == code)?.name;
};

export const OrderRow = ({ record }) => {
	const {
		ref,
		client,
		shipping_type: shippingType,
		shipping_cost: shippingCost,
		payment_method: paymentMethod,
		total,
		is_online: isOnline,
		status,
		created_at: createdAt,
	} = record;

	const [isDetails, setIsDetails] = useState(false);

	return (
		<>
			<Table.Row className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm sm:text-base">
				<Table.Column
					className="px-2"
					onClick={() => handleSelectedProducts(id)}
				>
					<BigCheckbox />
				</Table.Column>
				<Table.Column className="py-3">
					<button
						type="button"
						onClick={() => setIsDetails(!isDetails)}
					>
						{isDetails ? (
							<AT className="w-6 h-6" />
						) : (
							<AD className="w-6 h-6" />
						)}
					</button>
				</Table.Column>
				<Table.Column className="px-2 py-3">{ref}</Table.Column>
				<Table.Column className="px-2 py-3 whitespace-nowrap">
					{shippingType}
				</Table.Column>
				<Table.Column className="px- py-3 whitespace-nowrap">
					{paymentMethod}
				</Table.Column>
				<Table.Column className="px-2 py-3 whitespace-nowrap">
					{currencyFormat(total)}
				</Table.Column>
				<Table.Column className="px-2 py-4">
					<Badge className="whitespace-nowrap">{status}</Badge>
				</Table.Column>
				<Table.Column className="px-2 py-3">
					<StatusCercle status={record.is_online} />
				</Table.Column>
				<Table.Column className="px-2 py-3 whitespace-nowrap">
					{createdAt}
				</Table.Column>
			</Table.Row>
			{isDetails && (
				<Table.Row className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-auto">
					<OrderDetails order={record} />
				</Table.Row>
			)}
		</>
	);
};

const OrderDetails = ({ order }) => {
	const {
		id,
		ref,
		client,
		status,
		order_products: orderedProducts,
		shipping_type: shippingType,
		shipping_cost: shippingCost,
		sub_total: subTotal,
		total,
	} = order;

	return (
		<Table.Column colSpan={10} className="p-4">
			<div className="grid gap-4 lg:grid-cols-2">
				<div className="w-full max-w-xl space-y-2">
					<ClientDetails client={client} />
					<div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-md">
						<OrderStatusHandler status={status} orderRef={ref} />
					</div>
				</div>
				<div>
					<OrderProductsSummary
						orderedProducts={orderedProducts}
						total={total}
						subTotal={subTotal}
						shippingCost={shippingCost}
						shippingType={shippingType}
					/>
				</div>
			</div>
		</Table.Column>
	);
};

const ClientDetails = ({ client }) => {
	const { name, phone, email, city, address, wilaya } = client;

	return (
		<div className="w-full">
			<Heading level={4}>Information client</Heading>
			<ul>
				<li>
					<span className="dark:text-gray-200 me-2">
						Nom prénom :
					</span>
					<span className=" font-medium dark:text-white">{name}</span>
				</li>
				<li>
					<span className="dark:text-gray-200 me-2">
						N° téléphone :
					</span>
					<span className=" font-medium dark:text-white">
						{phone}
					</span>
				</li>
				{email && (
					<li>
						<span className="dark:text-gray-200 me-2">
							Adresse e-mail :
						</span>
						<span className=" font-medium dark:text-white">
							{email}
						</span>
					</li>
				)}
				<li>
					<span className="dark:text-gray-200 me-2">Adresse :</span>
					<span className=" font-medium dark:text-white">
						{address}
					</span>
				</li>
				<li>
					<span className="dark:text-gray-200 me-2">Ville :</span>
					<span className=" font-medium dark:text-white">{city}</span>
				</li>
				<li>
					<span className="dark:text-gray-200 me-2">Wilaya :</span>
					<span className=" font-medium dark:text-white">
						{findWilaya(wilaya)}
					</span>
				</li>
			</ul>
		</div>
	);
};

const OrderProductsSummary = ({
	orderedProducts,
	total,
	subTotal,
	shippingCost,
	shippingType,
}) => {
	return (
		<Table className="w-full border border-gray-100 dark:border-gray-600">
			<Table.Head>
				<Table.Row>
					<Table.Title className="p-2">Produit</Table.Title>
					<Table.Title className="p-2">Prix de vente</Table.Title>
					<Table.Title className="p-2">Quantité</Table.Title>
					<Table.Title className="p-2">Total</Table.Title>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{orderedProducts.map(
					({ product_id: productId, qte, product, total }, idx) => (
						<Table.Row
							key={idx}
							className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-600 border-b"
						>
							<Table.Title className="p-2">
								{product.name}
							</Table.Title>
							<Table.Column className="p-2">
								{currencyFormat(product.price)}
							</Table.Column>
							<Table.Column className="p-2">{qte}</Table.Column>
							<Table.Column className="p-2">{total}</Table.Column>
						</Table.Row>
					)
				)}
			</Table.Body>
			<Table.Foot>
				<Table.Row className="font-semibold text-gray-800 dark:text-white text-base sm:text-lg">
					<Table.Column colSpan={4} className="py-2 px-4 w-full">
						<ul className="space-y-1">
							<li>
								<div className="flex items-center justify-between">
									<Heading level={6}>Sout total</Heading>
									<span>{currencyFormat(subTotal)}</span>
								</div>
							</li>
							<li>
								<div className="flex items-center justify-between">
									<div className="relative">
										<Heading level={6}>Livraison</Heading>
										<Badge className="absolute -right-32 top-1/2 -translate-y-1/2">
											{shippingType}
										</Badge>
									</div>
									<div>{currencyFormat(shippingCost)}</div>
								</div>
							</li>
							<li>
								<div className="flex items-center justify-between">
									<Heading level={6}>Total</Heading>
									<div>{currencyFormat(total)}</div>
								</div>
							</li>
						</ul>
					</Table.Column>
				</Table.Row>
			</Table.Foot>
		</Table>
	);
};

const OrderStatusHandler = ({ status, orderRef }) => {
	const [query, setQuery] = useState("");
	const { data, setData, post, errors } = useForm({
		status: status,
	});

	const orderStatus = [
		"Nouvel commande",
		"Payé",
		"En cours de traitement",
		"Fini",
		"Annulé",
		"Remboursement demandé",
		"Commande retournée",
		"Commande remboursée",
	];

	const filteredOrderStatus =
		query === ""
			? orderStatus
			: orderStatus.filter((status) =>
					status
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	const submitHandler = (e) => {
		e.preventDefault();

		post(`/orders/edit-status/${orderRef}`, {
			preserveScroll: true,
		});
	};

	return (
		<form onSubmit={submitHandler}>
			<InputLabel className="mb-2" htmlFor="status">
				Status de la commande
			</InputLabel>
			<div className="flex items-center gap-2">
				<Combobox
					value={data.status}
					onChange={(e) => setData("status", e)}
					className="w-full"
				>
					<div className="relative">
						<div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left">
							<Combobox.Input
								id="status"
								spellCheck={false}
								className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								onChange={(e) => setQuery(e.target.value)}
							/>
							<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
								<HiMiniChevronUpDown className="w-5 h-5 text-gray-800 dark:text-gray-400" />
							</Combobox.Button>
						</div>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => setQuery("")}
						>
							<Combobox.Options className="absolute mt-1.5 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-700 py-1 text-base sm:text-lg shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
								{filteredOrderStatus.length === 0 &&
								query !== "" ? (
									<div className="relative cursor-default text-sm select-none px-2.5 py-2 text-gray-700 dark:text-gray-50">
										Status non trouvé
									</div>
								) : (
									filteredOrderStatus.map((status, idx) => (
										<Combobox.Option
											key={idx}
											value={status}
											className={({ active }) =>
												`relative cursor-default select-none flex items-center gap-4 py-2 pl-4 pr-10 ${
													active
														? "bg-primary-600 text-white"
														: "text-gray-900 dark:text-gray-50"
												}`
											}
										>
											{({ selected, active }) => (
												<>
													<span
														className={`block truncate ${
															selected
																? "font-medium"
																: "font-normal"
														}`}
													>
														{status}
													</span>
													{selected ? (
														<span
															className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
																active
																	? "text-gray-50"
																	: "text-primary-600"
															}`}
														>
															<FaCheck
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Combobox.Option>
									))
								)}
							</Combobox.Options>
						</Transition>
					</div>
				</Combobox>
				<Button>Confirmé</Button>
			</div>
		</form>
	);
};

export const OrderTitleRow = () => (
	<Table.Head>
		<Table.Row className=" ">
			<Table.Title className="py-3 px-2">
				<BigCheckbox />
			</Table.Title>
			<Table.Title className="py-3"></Table.Title>
			<Table.Title className="whitespace-nowrap px-2 py-3">
				referance
			</Table.Title>
			<Table.Title className="whitespace-nowrap px-2 py-3">
				Méthod de livraison
			</Table.Title>
			<Table.Title className="whitespace-nowrap px-2 py-3">
				Type de paiement
			</Table.Title>
			<Table.Title className="whitespace-nowrap px-2 py-3">
				Total
			</Table.Title>
			<Table.Title className="whitespace-nowrap px-2 py-3">
				status
			</Table.Title>
			<Table.Title className="whitespace-nowrap px-2 py-3">
				Online
			</Table.Title>
			<Table.Title className="whitespace-nowrap px-2 py-3">
				Date de commande
			</Table.Title>
		</Table.Row>
	</Table.Head>
);
