import React, { Fragment, useState } from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import Authenticated from "@/Components/Section/Client/Authenticated";
import { Input } from "@/Components/TextInput";
import Label from "@/Components/Label";
import InputError from "@/Components/InputError";
import { IndigoButton } from "@/Components/Button";

import wilaya from "@/data/wilaya.json";
import { FaCheck } from "react-icons/fa";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { Combobox, Transition } from "@headlessui/react";

const Index = () => {
	const { user } = usePage().props;

	const [query, setQuery] = useState('');
	const { data, setData, post, errors, clearErrors } = useForm({
		name: user.name,
		email: user.email,
		phone: user.phone || "",
		address: user?.data?.address || "",
		city: user?.data?.city || "",
		wilaya: user?.data?.wilaya || "",
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		clearErrors(name);
		setData(name, value);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		post(route("profile.update"), {
			preserveScroll: true,
		});
	};

	const filteredWilaya =
		query === ""
			? wilaya
			: wilaya.filter((wilaya) =>
					wilaya.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		<Authenticated>
			<Head title="Profile" />

			<section className="p-4 bg-white shadow rounded sm:rounded-lg">
				<form onSubmit={submitHandler}>
					<div className="max-w-xl mb-5 space-y-5 ">
						<header>
							<h2 className="text-lg font-medium text-gray-900">
								Informations sur le profil
							</h2>

							<p className="mt-1 text-sm text-gray-600">
								Mettez à jour les informations de votre compte.
							</p>
						</header>

						<div>
							<Label htmlFor="name" className="mb-2">
								Nom prénom
							</Label>
							<Input
								id="name"
								name="name"
								value={data.name}
								onChange={changeHandler}
							/>
							<InputError
								className="mt-2"
								message={errors.name}
							/>
						</div>

						<div>
							<Label htmlFor="email" className="mb-2">
								Email
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={data.email}
								onChange={changeHandler}
							/>
							<InputError
								className="mt-2"
								message={errors.email}
							/>
						</div>

						<div>
							<Label htmlFor="phone" className="mb-2">
								N° téléphone
							</Label>
							<Input
								id="phone"
								name="phone"
								value={data.phone}
								onChange={changeHandler}
							/>
							<InputError
								className="mt-2"
								message={errors.phone}
							/>
						</div>

						<header>
							<h2 className="text-lg font-medium text-gray-900">
								Informations de livraison
							</h2>

							<p className="mt-1 text-sm text-gray-600">
								Mettez à jour votre adresse de livraison.
							</p>
						</header>

						<div>
							<Label htmlFor="address" className="mb-2">
								Adresse
							</Label>
							<Input
								id="address"
								name="address"
								value={data.address}
								onChange={changeHandler}
							/>
							<InputError
								className="mt-2"
								message={errors.address}
							/>
						</div>

						<div>
							<Label htmlFor="city" className="mb-2">
								Ville
							</Label>
							<Input
								id="city"
								name="city"
								value={data.city}
								onChange={changeHandler}
							/>
							<InputError
								className="mt-2"
								message={errors.city}
							/>
						</div>

						<div>
							<Label htmlFor="wilaya" className="mb-2">
								Wilaya
							</Label>

							<Combobox
								value={data.wilaya}
								onChange={(e) => setData("wilaya", e)}
							>
								<div className="relative">
									<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left">
										<Combobox.Input
											id="wilaya"
											spellCheck={false}
											className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											onChange={(event) =>
												setQuery(event.target.value)
											}
											displayValue={(obj) =>
												wilaya.find(
													(wilaya) =>
														wilaya.code ===
														data.wilaya
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
														Wilaya recherché non
														trouvé
													</div>
												</>
											) : (
												filteredWilaya.map((wilaya) => (
													<Combobox.Option
														key={wilaya.code}
														value={wilaya.code}
														className={({
															active,
														}) =>
															`relative cursor-default select-none flex items-center gap-4 py-2 pl-4 pr-10 ${
																active
																	? "bg-primary-600 text-white"
																	: "text-gray-900 dark:text-gray-50"
															}`
														}
													>
														{({
															selected,
															active,
														}) => (
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

							<InputError
								className="mt-2"
								message={errors.wilaya}
							/>
						</div>
					</div>

					<IndigoButton>Sauvegarder</IndigoButton>
				</form>
			</section>
		</Authenticated>
	);
};

export default Index;
