import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Combobox, Transition } from "@headlessui/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import Button from "@/Components/Button";
import Heading from "@/Components/Heading";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { generatePassword } from "@/Logic/helper";

const CreateForm = ({ roles }) => {
	const { data, setData, processing, errors, post, reset, clearErrors } =
		useForm({
			name: "",
			email: "",
			phone: "",
			password: "",
			status: true,
			role: "",
		});

	const [query, setQuery] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();

		post("/administrateur/create", {
			onSuccess: () => reset(),
		});
	};

	const filteredRoles =
		query === ""
			? roles
			: roles.filter((role) =>
					role.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
			  );
	return (
		<form onSubmit={submitHandler}>
			<Heading level={3} className="mb-6">
				Créer un administrateur
			</Heading>

			<div className="grid sm:grid-cols-2 gap-4 mb-5">
				<div className="col-span-2 grid md:grid-cols-3 gap-4">
					<div>
						<InputLabel className="mb-2">Nom prénom</InputLabel>
						<TextInput
							value={data.name}
							onChange={(e) => setData("name", e.target.value)}
						/>
						<InputError message={errors.name} className="mt-2" />
					</div>
					<div>
						<InputLabel className="mb-2">N° tél</InputLabel>
						<TextInput
							value={data.phone}
							onChange={(e) => setData("phone", e.target.value)}
						/>
						<InputError message={errors.phone} className="mt-2" />
					</div>
					<div>
						<InputLabel className="mb-2">Role</InputLabel>

						<Combobox
							value={data.role}
							onChange={(e) => setData("role", e)}
						>
							<div className="relative">
								<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left">
									<Combobox.Input
										className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										onChange={(event) =>
											setQuery(event.target.value)
										}
										displayValue={(role) =>
											roles.find(
												(role) => role.id === data.role
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
										{filteredRoles.length === 0 &&
										query !== "" ? (
											<>
												<div className="relative cursor-default text-sm select-none px-2.5 py-2 text-gray-700 dark:text-gray-50">
													Role non trouvé
												</div>
											</>
										) : (
											filteredRoles.map((role) => (
												<Combobox.Option
													key={role.id}
													value={role.id}
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
																{role.name}
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

						<InputError message={errors.role} className="mt-2" />
					</div>
				</div>

				<div>
					<InputLabel className="mb-2">Adresse e-mail</InputLabel>
					<TextInput
						value={data.email}
						onChange={(e) => setData("email", e.target.value)}
					/>
					<InputError message={errors.email} className="mt-2" />
				</div>

				<div>
					<InputLabel className="mb-2">Mot de passe</InputLabel>
					<div className="relative">
						<TextInput
							value={data.password}
							onChange={(e) =>
								setData("password", e.target.value)
							}
						/>
						<span
							className="absolute right-0 top-1/2 -translate-y-1/2 me-2 p-1 cursor-pointer select-none"
							onClick={() =>
								setData("password", generatePassword())
							}
						>
							Générer
						</span>
					</div>
					<InputError message={errors.password} className="mt-2" />
				</div>

				<div className="col-span-2">
					<InputLabel className="select-none">
						<Checkbox
							checked={data.status}
							onChange={(e) =>
								setData("status", e.target.checked)
							}
						/>
						Status de l'utilisateur
					</InputLabel>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<Button
					btn="danger"
					type="button"
					onClick={() => {
						reset();
						clearErrors();
					}}
					className="w-full justify-center"
					disabled={processing}
				>
					Annuler
				</Button>
				<Button disabled={processing} btn="primary" className="w-full justify-center">
					Créer
				</Button>
			</div>
		</form>
	);
};

export default CreateForm;
