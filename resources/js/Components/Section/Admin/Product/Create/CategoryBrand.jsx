import React, { useState, Fragment, useContext, useEffect } from "react";
import { CreateProductFormContext } from "../CreateForm";
import { Combobox, Transition } from "@headlessui/react";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { media } from "@/Logic/helper";

const CategoryBrand = () => {
	const { data, setData, errors, mainCategories, subCategories, brands } =
		useContext(CreateProductFormContext);

	const [query, setQuery] = useState("");
	const [subCategoriesToSelect, setSubCategoriesToSelect] = useState([]);

	useEffect(() => {
		setSubCategoriesToSelect([]);
		subCategories.forEach((subCategory) => {
			if (subCategory.parent_id == data.mainCategory.id) {
				setSubCategoriesToSelect((prevData) => [...prevData, subCategory]);
			}
		});
		setData("subCategory", "");
	}, [data.mainCategory]);

	const filteredMainCategories =
		query === ""
			? mainCategories
			: mainCategories.filter((mainCategory) =>
					mainCategory.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
			  );

	const filteredSubCategories =
		query === ""
			? subCategoriesToSelect
			: subCategoriesToSelect.filter((subCategory) =>
					subCategory.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
			  );

	const filteredBrands =
		query === ""
			? brands
			: brands.filter((brand) =>
					brand.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		<div className="grid gap-4 mb-5 md:grid-cols-3">
			<div>
				<InputLabel required className="mb-2">
					catégorie
				</InputLabel>

				<Combobox
					value={data.mainCategory}
					onChange={(e) => setData("mainCategory", e)}
				>
					<div className="relative">
						<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left">
							<Combobox.Input
								className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								displayValue={(mainCategory) =>
									mainCategory?.name
								}
								onChange={(event) =>
									setQuery(event.target.value)
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
								{filteredMainCategories.length === 0 &&
								query !== "" ? (
									<>
										<div className="relative cursor-default text-sm select-none px-2.5 py-2 text-gray-700 dark:text-gray-50">
											Catégorie non trouvé
										</div>
										<Combobox.Option
											value={""}
											className="relative cursor-default select-none py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-500"
										>
											Créer la catégorie{" "}
											<span className="text-sm">
												"{query}"
											</span>
										</Combobox.Option>
									</>
								) : (
									filteredMainCategories.map(
										(mainCategory) => (
											<Combobox.Option
												key={mainCategory.id}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active
															? "bg-primary-600 text-white"
															: "text-gray-900 dark:text-gray-50"
													}`
												}
												value={mainCategory}
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
															{mainCategory.name}
														</span>
														{selected && (
															<span
																className={`absolute inset-y-0 left-0 flex items-center pl-3 
                                                                ${
																	active
																		? "text-gray-50"
																		: "text-primary-600"
																}
                                                                `}
															>
																<FaCheck
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														)}
													</>
												)}
											</Combobox.Option>
										)
									)
								)}
							</Combobox.Options>
						</Transition>
					</div>
				</Combobox>
				<InputError message={errors.mainCategory} className="mt-2" />
			</div>

			<div>
				<InputLabel required className="mb-2">
					sous-catégorie
				</InputLabel>

				<Combobox
					value={data.subCategory}
					onChange={(e) => setData("subCategory", e)}
				>
					<div className="relative">
						<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left">
							<Combobox.Input
								className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								displayValue={(subCategory) =>
									subCategory?.name
								}
								onChange={(event) =>
									setQuery(event.target.value)
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
								{filteredSubCategories.length === 0 &&
								query !== "" ? (
									<>
										<div
											onClick={(e) => {
												setData("parentCategory", "");
											}}
											className="relative cursor-default text-sm select-none px-2.5 py-2 text-gray-700 dark:text-gray-50"
										>
											Catégorie non trouvé
										</div>
										<Combobox.Option
											value={""}
											className="relative cursor-default select-none py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-500"
										>
											Créer la sous-catégorie{" "}
											<span className="text-sm">
												"{query}"
											</span>
										</Combobox.Option>
									</>
								) : filteredSubCategories.length === 0 &&
								  query == "" ? (
									<div className="relative cursor-default text-sm select-none px-2.5 py-2 text-red-700 dark:text-red-400">
										Aucune catégorie n'est sélectionnez
									</div>
								) : (
									filteredSubCategories.map((subCategory) => (
										<Combobox.Option
											key={subCategory.id}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active
														? "bg-primary-600 text-white"
														: "text-gray-900 dark:text-gray-50"
												}`
											}
											value={subCategory}
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
														{subCategory.name}
													</span>
													{selected ? (
														<span
															className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
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
				<InputError message={errors.subCategory} className="mt-2" />
			</div>

			<div>
				<InputLabel className="mb-2">Brand</InputLabel>
				<Combobox
					value={data.brand}
					onChange={(e) => setData("brand", e)}
				>
					<div className="relative ">
						<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left ">
							<Combobox.Input
								className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								displayValue={(brand) => brand?.name}
								onChange={(event) =>
									setQuery(event.target.value)
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
								{filteredBrands.length === 0 && query !== "" ? (
									<>
										<div className="relative cursor-default text-sm select-none px-2.5 py-2 text-gray-700 dark:text-gray-50">
											Brand non trouvé
										</div>
										<Combobox.Option
											value={""}
											className="relative cursor-default select-none py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-500"
										>
											Créer Brand{" "}
											<span className="text-sm">
												"{query}"
											</span>
										</Combobox.Option>
									</>
								) : filteredBrands.length === 0 &&
								  query == "" ? (
									<div className="relative cursor-default text-sm select-none px-2.5 py-2 text-red-700 dark:text-red-400">
										Aucun Brand trouvé
									</div>
								) : (
									filteredBrands.map((brand) => (
										<Combobox.Option
											key={brand.id}
											className={({ active }) =>
												`relative cursor-default select-none flex items-center gap-4 py-2 pl-4 pr-10 ${
													active
														? "bg-primary-600 text-white"
														: "text-gray-900 dark:text-gray-50"
												}`
											}
											value={brand}
										>
											{({ selected, active }) => (
												<>
													<img
														src={media(brand?.logo)}
														loading="lazy"
														className="h-10 w-10 object-contain"
													/>
													<span
														className={`block truncate ${
															selected
																? "font-medium"
																: "font-normal"
														}`}
													>
														{brand.name}
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
				<InputError message={errors.brand} className="mt-2" />
			</div>
		</div>
	);
};

export default CategoryBrand;
