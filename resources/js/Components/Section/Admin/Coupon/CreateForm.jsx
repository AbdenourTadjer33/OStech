import React, {Fragment, } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import Button from "@/Components/Button";
import { FaCheck } from "react-icons/fa";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import Toggle from "@/Components/Toggle";
import { Datepicker } from "flowbite-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { capitalize } from "@/Logic/helper";

const CreateForm = ({ setCreateModal}) => {
	const { data, setData, errors, processing, post } = useForm({
		type: "pourcentage",
		value: "",
		startAt: new Date(),
		expireAt: new Date(),
		maxUse: "",
		maxAmount: "",
		status: true,
	});

	const submitHandler = (e) => {
		e.preventDefault();

		post("/coupon/create", {
			onSuccess: () => setCreateModal(false),
		});
	};
	return (
		<form className="space-y-5" onSubmit={submitHandler}>
			<div className="grid md:grid-cols-4 gap-4">
				<div>
					<InputLabel required className="mb-2">
						Type de coupon
					</InputLabel>

					<Listbox
						value={data.type}
						onChange={(e) => setData("type", e)}
					>
						{({ open }) => (
							<>
								<div className="relative mt-2">
									<Listbox.Button className="relative cursor-default py-2 pl-3 pr-10 text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm sm:leading-6">
										<span className="flex items-center">
											<span className="ml-3 block truncate">
												{capitalize(data.type)}
											</span>
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
											<HiMiniChevronUpDown
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>

									<Transition
										show={open}
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{['pourcentage', 'fix'].map((type, idx) => (
												<Listbox.Option
													key={idx}
													className={({ active }) =>
														`${
															active
																? "bg-indigo-600 text-white"
																: "text-gray-900"
														} relative cursor-default select-none py-2 pl-3 pr-9`
													}
													value={type}
												>
													{({ selected, active }) => (
														<>
															<div className="flex items-center">
																<span
																	className={`${
																		selected
																			? "font-semibold"
																			: "font-normal"
																	} ml-3 block truncate`}
																>
																	{capitalize(type)}
																</span>
															</div>

															{selected ? (
																<span
																	className={`${
																		active
																			? "text-white"
																			: "text-indigo-600"
																	}
																						absolute inset-y-0 right-0 flex items-center pr-4`}
																>
																	<FaCheck
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</>
						)}
					</Listbox>

					<InputError message={errors.type} className="mt-2" />
				</div>

				<div>
					<InputLabel required className="mb-2">
						Reduction de coupon
					</InputLabel>

					<div className="relative">
						<div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
							<span className="text-gray-500 dark:text-gray-200">
								{data.type === "fix" ? "DA" : "%"}
							</span>
						</div>
						<TextInput
							name="value"
							value={data.value}
							onChange={(e) => setData("value", e.target.value)}
						/>
					</div>
					<InputError className="mt-2" message={errors.value} />
				</div>

				<div>
					<InputLabel className="mb-2">
						Max reduction
					</InputLabel>

					<div className="relative">
						<div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
							<span className="text-gray-500 dark:text-gray-200">
								DA
							</span>
						</div>
						<TextInput
							name="max_amount"
							value={data.maxAmount}
							onChange={(e) =>
								setData("maxAmount", e.target.value)
							}
						/>
					</div>

					<InputError className="mt-2" message={errors.maxAmount} />
				</div>

				<div>
					<InputLabel required className="mb-2">
						Max utilisation
					</InputLabel>

					<TextInput
						type="number"
						name="max_use"
						value={data.maxUse}
						min="0"
						max="30"
						onChange={(e) => setData("maxUse", e.target.value)}
					/>

					<InputError className="mt-2" message={errors.maxUse} />
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<InputLabel required className="mb-2">
						date de début
					</InputLabel>

					<Datepicker
						language="fr"
						minDate={new Date()}
						value={new Date(data.startAt).toLocaleDateString(
							"fr-FR",
							{
								day: "2-digit",
								month: "long",
								year: "numeric",
							}
						)}
						onSelectedDateChanged={(date) =>
							setData("startAt", date)
						}
					/>
				</div>

				<div>
					<InputLabel required className="mb-2">
						date d'expiration
					</InputLabel>

					<Datepicker
						language="fr"
						minDate={new Date(data.startAt)}
						value={new Date(data.expireAt).toLocaleDateString(
							"fr-FR",
							{
								day: "2-digit",
								month: "long",
								year: "numeric",
							}
						)}
						onSelectedDateChanged={(date) =>
							setData("expireAt", date)
						}
					/>
				</div>
			</div>

			<div className="flex gap-4 flex-col justify-center lg:flex-row">
				<label htmlFor="status">
					<div className="inline-flex items-center justify-between gap-4 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700">
						<div className="block">
							<h4 className="text-2xl font-semibold">Status</h4>
							<p className="text-base">
								S'il le status est activé, le coupon sera actevé
								entre date de debut et d'expiration
							</p>
						</div>
						<Toggle
							id="status"
							name="status"
							defaultChecked={data.status}
							onChange={(e) => {
								setData("status", e.target.checked);
							}}
						/>
					</div>
				</label>
			</div>

			<div className="flex gap-4">
				<Button
					onClick={() => setCreateModal(false)}
					className="w-full justify-center"
					btn="danger"
					type="button"
					disabled={processing}
				>
					Annuler
				</Button>
				<Button disabled={processing} className="w-full justify-center">Créer</Button>
			</div>
		</form>
	);
};

export default CreateForm;
