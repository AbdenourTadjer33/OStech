import React, {
	useContext,
	useState,
	useEffect,
	Fragment,
	useRef,
} from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import { Combobox, Transition, RadioGroup } from "@headlessui/react";
import Label from "@/Components/Label";
import TextInput, { PopoverInput } from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import axios from "axios";
import { capitalize, currencyFormat } from "@/Logic/helper";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import wilaya from "@/data/wilaya.json";
import { CreateOrderContext } from "@/Pages/Order/Create";
import { IndigoButton } from "@/Components/Button";

const CreateOrder = () => {
	const { setShippingPrice } = useContext(CreateOrderContext);

	const { user } = usePage().props;
	const [query, setQuery] = useState("");

	const [shippings, setShippings] = useState([]);

	const paymentMehods = [
		{
			name: "Paiement à la livraison",
			label: "paiement à la livraison",
			description: null,
		},
		{
			name: "Virement",
			label: "virement CCP/Baridimob",
			description: null,
		},
	];

	const { post, data, setData, processing, errors, hasErrors } = useForm({
		name: user?.name || "",
		phone: user?.phone || "",
		email: user?.email || "",
		address: user?.data?.address || "",
		city: user?.data?.city || "",
		wilaya: user?.data?.wilaya || "",
		paymentMethod: "",
		shipping: {},
	});

	const getShippingPricing = async () => {
		try {
			const response = await axios.get(
				route("shipping.pricings", {
					_query: {
						wilaya: data.wilaya,
					},
				})
			);

			if (response.data) {
				setShippings(response.data);
			}
		} catch (e) {
			console.error("Error fetching shipping pricings", e);
		}
	};

	useEffect(() => {
		if (data.wilaya) {
			getShippingPricing();
			setData("shipping", {});
		}
	}, [data.wilaya]);

	useEffect(() => {
		if (data.shipping && data.shipping?.price) {
			setShippingPrice(data.shipping?.price);
		}
	}, [data.shipping]);

	const filteredWilaya =
		query === ""
			? wilaya
			: wilaya.filter((wilaya) =>
					wilaya.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	const submitHandler = (e) => {
		e.preventDefault();
		post(route("order.store"), {
			preserveScroll: true,
		});
	};

	const formRef = useRef();

	useEffect(() => {
		if (hasErrors && formRef.current) {
			formRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [hasErrors]);

	return (
		<div className="shadow-lg rounded-xl py-6 px-4 space-y-6 bg-white border border-gray-200">
			<form ref={formRef} onSubmit={submitHandler}>
				<div className="grid gap-4 sm:grid-cols-2 mb-5">
					<div className="sm:col-span-2">
						<h3 className="text-xl font-medium text-gray-800">
							Coordonnées
						</h3>
					</div>

					<div className="sm:col-span-2">
						<Label htmlFor="name" required className="mb-2">
							Nom prénom
						</Label>
						<TextInput
							id="name"
							name="name"
							value={data.name}
							onChange={(e) => setData("name", e.target.value)}
						/>
						<InputError message={errors.name} className="mt-2" />
					</div>

					<div className="sm:col-span-2">
						<Label required htmlFor="phone" className="mb-2">
							N° tél
						</Label>
						<div className="relative">
							<TextInput
								id="phone"
								name="phone"
								value={data.phone}
								onChange={(e) =>
									setData("phone", e.target.value)
								}
							/>
							<div className="absolute right-2 top-1/2 -translate-y-1/2 z-[51]">
								<PopoverInput>
									Le champ n° téléphone est requis. Ce champ
									doit commencé avec 05, 06 ou 07. et ne
									dépasse pas les 10 caractères. le numero de
									fix n'est pas accéptée
								</PopoverInput>
							</div>
						</div>
						<InputError className="mt-2" message={errors.phone} />
					</div>

					<div className="sm:col-span-2">
						<Label htmlFor="email" className="mb-2">
							Email
						</Label>
						<div className="relative">
							<TextInput
								id="email"
								name="email"
								type="email"
								value={data.email}
								onChange={(e) =>
									setData("email", e.target.value)
								}
							/>
							<div className="absolute right-2 top-1/2 -translate-y-1/2 z-50">
								<PopoverInput>
									Le champ d'addresse e-mail n'est pas requis
									mais en le fournissant, nous pouvons vous
									envoyer des mises à jour et des
									notifications importantes concernant vos
									commandes, telles que des confirmations de
									commande et des mises à jour d'expédition.
								</PopoverInput>
							</div>
						</div>
						<InputError className="mt-2" message={errors.email} />
					</div>

					<hr className="sm:col-span-2" />

					<div className="sm:col-span-2">
						<h3 className="text-xl font-medium text-gray-800">
							Informations sur la livraison
						</h3>
					</div>

					<div className="sm:col-span-2">
						<Label htmlFor="address" required className="mb-2">
							Adresse
						</Label>
						<TextInput
							id="address"
							name="address"
							value={data.address}
							onChange={(e) => setData("address", e.target.value)}
						/>
						<InputError message={errors.address} className="mt-2" />
					</div>

					<div>
						<Label htmlFor="city" required className="mb-2">
							Ville
						</Label>
						<TextInput
							id="city"
							name="city"
							value={data.city}
							onChange={(e) => setData("city", e.target.value)}
						/>
						<InputError message={errors.city} className="mt-2" />
					</div>

					<div>
						<Label required className="mb-2">
							Wilaya
						</Label>

						<Combobox
							value={data.wilaya}
							onChange={(e) => setData("wilaya", e)}
						>
							<div className="relative">
								<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left">
									<Combobox.Input
										spellCheck={false}
										className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										onChange={(event) =>
											setQuery(event.target.value)
										}
										displayValue={(obj) =>
											wilaya.find(
												(wilaya) =>
													wilaya.code === data.wilaya
											)?.name
										}
									/>
									<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
										<HiMiniChevronUpDown
											className="h-5 w-5 text-gray-800 dark:text-gray-400"
											aria-hidden="true"
										/>
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
										{filteredWilaya.length === 0 &&
										query !== "" ? (
											<>
												<div className="relative cursor-default text-sm select-none px-2.5 py-2 text-gray-700 dark:text-gray-50">
													Wilaya recherché non trouvé
												</div>
											</>
										) : (
											filteredWilaya.map((wilaya) => (
												<Combobox.Option
													key={wilaya.code}
													value={wilaya.code}
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
																{wilaya.code +
																	" - " +
																	wilaya.name}
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

						<InputError message={errors.wilaya} className="mt-2" />
					</div>

					<div className="sm:col-span-2">
						<h3 className="text-xl font-medium text-gray-800">
							Méthode de livraison
						</h3>
					</div>

					<div className="sm:col-span-2">
						{!data.wilaya && shippings.length === 0 ? (
							<>Veuillez séléctionnez une wilaya</>
						) : (
							<>
								<RadioGroup
									value={data.shipping}
									onChange={(e) => {
										setData("shipping", e);
									}}
								>
									<RadioGroup.Label className="sr-only">
										Shipping type
									</RadioGroup.Label>
									<div className="grid gap-4 sm:grid-cols-2">
										{shippings.map((type, idx) => (
											<RadioGroup.Option
												key={idx}
												value={type}
												className={({
													checked,
													active,
												}) => `border relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none bg-gray-50
                        ${active ? " ring-2 ring-info-400 " : ""}
                            ${
								checked
									? "border-2 border-info-500"
									: "border-gray-300"
							}`}
											>
												{({ checked }) => (
													<>
														<div className="flex w-full items-center justify-between">
															<div className="flex items-center">
																<div className="text-sm">
																	<RadioGroup.Label
																		as="p"
																		className={`font-medium

                                                    `}
																	>
																		{capitalize(
																			type.name
																		)}
																	</RadioGroup.Label>
																	<RadioGroup.Description
																		as="span"
																		className={`inline text-gray-500`}
																	>
																		<span className="block">
																			{type.price
																				? currencyFormat(
																						type.price
																				  )
																				: ""}
																		</span>

																		<span className="block">
																			{type.delay
																				? `Durré: ${
																						type.delay
																				  } jour${
																						type.delay >
																						1
																							? "s"
																							: ""
																				  }`
																				: ""}
																		</span>
																	</RadioGroup.Description>
																</div>
															</div>
															<input
																type="radio"
																className="w-4 h-4 text-info-600 bg-gray-100 border-gray-300 outline-none focus:ring-0 focus:ring-transparent"
																checked={
																	checked
																}
																onChange={(e) =>
																	(e.target.checked =
																		checked)
																}
															/>
														</div>
													</>
												)}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>

								<InputError
									message={errors.shipping}
									className="mt-2"
								/>
							</>
						)}
					</div>

					<div className="sm:col-span-2">
						<h3 className="text-xl font-medium text-gray-800">
							Mode de paiement
						</h3>
					</div>

					<div className="sm:col-span-2">
						<RadioGroup
							value={data.paymentMethod}
							onChange={(e) => setData("paymentMethod", e)}
						>
							<RadioGroup.Label className="sr-only">
								Méthod de payement
							</RadioGroup.Label>
							<div className="grid gap-4 sm:grid-cols-2">
								{paymentMehods.map((method, idx) => (
									<RadioGroup.Option
										key={idx}
										value={method.name}
										className={({
											checked,
											active,
										}) => `border relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none bg-gray-50
                        ${active ? " ring-2 ring-info-400 " : ""}
                            ${
								checked
									? "border-2 border-info-500"
									: "border-gray-300"
							}`}
									>
										{({ checked }) => (
											<>
												<div className="flex w-full items-center justify-between">
													<div className="flex items-center">
														<div className="text-sm">
															<RadioGroup.Label
																as="p"
																className={`font-medium

                                                    `}
															>
																{capitalize(
																	method.label
																)}
															</RadioGroup.Label>
															<RadioGroup.Description
																as="span"
																className={`inline ${
																	checked
																		? "text-info-100"
																		: "text-gray-500"
																}`}
															>
																<span>
																	{
																		method?.description
																	}
																</span>
															</RadioGroup.Description>
														</div>
													</div>
													<input
														type="radio"
														className="w-4 h-4 text-info-600 bg-gray-100 border-gray-300 outline-none focus:ring-0 focus:ring-transparent"
														checked={checked}
														onChange={(e) =>
															(e.target.checked =
																checked)
														}
													/>
												</div>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
						</RadioGroup>

						<InputError
							message={errors.paymentMethod}
							className="mt-2"
						/>
					</div>
				</div>

				<IndigoButton className="w-full" disabled={processing}>
					{capitalize("Commander")}
				</IndigoButton>
			</form>
		</div>
	);
};

export default CreateOrder;
