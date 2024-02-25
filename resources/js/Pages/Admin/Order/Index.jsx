import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import Button from "@/Components/Button";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Pagination from "@/Components/Pagination";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Table from "@/Components/Table";
import ReadMore from "@/Components/ReadMore";
import CurrencyFormat from "@/Components/CurrencyFormat";
import { Dropdown } from "flowbite-react";
import Accordion from "@/Components/Accordion";
import { currencyFormat, media } from "@/Logic/helper";
import Modal from "@/Components/Modal";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import TrueIcon from "@/Components/Icons/TrueIcon";
import FalseIcon from "@/Components/Icons/FalseIcon";

import { Search } from "@/Components/InputSearch";
import Badge from "@/Components/Badge";
import { StatusCercle } from "@/Components/Status";
import wilaya from "@/data/wilaya.json";

const Index = ({ orders }) => {
	const {
		data,
		current_page,
		next_page_url,
		prev_page_url,
		links,
		per_page,
		total,
		last_page,
	} = orders;

	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = data.filter(
			(record) =>
				record.ref.toLowerCase().includes(query) ||
				record?.client?.name.toLowerCase().includes(query)
		);

		setFilteredData(filtered);
	};

	useEffect(() => {
		setFilteredData(data);
	}, [data]);

	const findWilaya = (wilayaCode) => {
		return wilaya.find((state) => state.code === wilayaCode).name;
	};

	return (
		<AdminLayout>
			<Head title="Gestion de ventes" />
			<h1 className="text-4xl font-bold mb-3">Commande et ventes</h1>

			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
					<div className="p-4">
						<h4 className="text-xl">
							Total commande : <span>{total}</span>
						</h4>
					</div>

					<hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700 mx-4" />

					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<div className="w-full md:w-1/2">
							<form className="flex items-center">
								<div className="relative w-full">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
									</div>
									<Search
										value={searchQuery}
										onChange={handleSearch}
									/>
								</div>
							</form>
						</div>
						<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
							<div className="flex items-center space-x-3 w-full md:w-auto">
								<Dropdown
									label=""
									dismissOnClick={false}
									renderTrigger={() => (
										<button
											id="actionsDropdownButton"
											data-dropdown-toggle="actionsDropdown"
											className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
											type="button"
										>
											<MdKeyboardArrowDown className="-ml-1 mr-1.5 w-5 h-5" />
											Actions
										</button>
									)}
								>
									<Dropdown.Item>Mass Edit</Dropdown.Item>
									<Dropdown.Item>Delete all</Dropdown.Item>
								</Dropdown>

								<Dropdown
									label=""
									dismissOnClick={false}
									renderTrigger={() => (
										<button
											className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
											type="button"
										>
											<FaFilter className="h-4 w-4 mr-2 text-gray-400" />
											Filter
											<MdKeyboardArrowDown className="-mr-1 ml-1.5 w-5 h-5" />
										</button>
									)}
								>
									<div className="w-80">
										<Dropdown.Header>
											<span className="text-base font-medium text-gray-900 dark:text-white">
												Filter
											</span>
										</Dropdown.Header>

										<Accordion title="Categorie">
											<Accordion.Body>
												<Dropdown.Item>
													<input
														id="apple"
														type="checkbox"
														value=""
														className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
													/>
													<label
														htmlFor="apple"
														className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
													>
														Apple (56)
													</label>
												</Dropdown.Item>
												<Dropdown.Item>
													<input
														id="apple"
														type="checkbox"
														value=""
														className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
													/>
													<label
														htmlFor="apple"
														className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
													>
														Apple (56)
													</label>
												</Dropdown.Item>
											</Accordion.Body>
										</Accordion>

										<Dropdown.Divider />

										<Accordion title="Categorie">
											<Accordion.Body>
												<Dropdown.Item>
													<input
														id="apple"
														type="checkbox"
														value=""
														className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
													/>
													<label
														htmlFor="apple"
														className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
													>
														Apple (56)
													</label>
												</Dropdown.Item>
												<Dropdown.Item>
													<input
														id="apple"
														type="checkbox"
														value=""
														className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
													/>
													<label
														htmlFor="apple"
														className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
													>
														Apple (56)
													</label>
												</Dropdown.Item>
											</Accordion.Body>
										</Accordion>

										<Dropdown.Divider />

										<Accordion title="Categorie">
											<Accordion.Body>
												<Dropdown.Item>
													<input
														id="apple"
														type="checkbox"
														value=""
														className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
													/>
													<label
														htmlFor="apple"
														className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
													>
														Apple (56)
													</label>
												</Dropdown.Item>
												<Dropdown.Item>
													<input
														id="apple"
														type="checkbox"
														value=""
														className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
													/>
													<label
														htmlFor="apple"
														className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
													>
														Apple (56)
													</label>
												</Dropdown.Item>
											</Accordion.Body>
										</Accordion>

										<Dropdown.Divider />

										<div className="flex justify-center py-2">
											<Button type="button">
												Filtré les résultat
											</Button>
										</div>
									</div>
								</Dropdown>
							</div>

							<Link href={route("admin.products.create")}>
								<Button btn="primary" type="button">
									Créer un produit
								</Button>
							</Link>
						</div>
					</div>

					<div className="overflow-x-auto">
						<Table className="table-auto">
							<Table.Head>
								<Table.Row>
									<Table.Title className="px-2 py-3">
										ref
									</Table.Title>
									<Table.Title className="px-2 py-3">
										client
									</Table.Title>
									<Table.Title className="px-2 py-3">
										adresse
									</Table.Title>
									<Table.Title className="px-2 py-3">
										Livraison
									</Table.Title>
									<Table.Title className="px-2 py-3">
										Total
									</Table.Title>
									<Table.Title className="px-2 py-3">
										status
									</Table.Title>
									<Table.Title className="px-2 py-3">
										Online
									</Table.Title>
									<Table.Title className="px-2 py-3">
										Créer à
									</Table.Title>
									<Table.Title className="px-2 py-3"></Table.Title>
								</Table.Row>
							</Table.Head>
							<Table.Body>
								{filteredData.map((record) => {
									return (
										<Table.Row
											key={record.ref}
											className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
										>
											<Table.Column className="px-2 py-3">
												{record.ref}
											</Table.Column>
											<Table.Column className="px-2 py-3">
												{record?.client?.name}
												<br />
												{record?.client?.phone}
												<br />
												{record?.client?.email}
											</Table.Column>

											<Table.Column className="px-2 py-4">
												{record?.client?.address},{" "}
												{record?.client?.city}
												<br />
												{findWilaya(
													record?.client?.wilaya
												)}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{record?.shipping_type}
												<br />
												{currencyFormat(
													record?.shipping_cost
												)}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{currencyFormat(record.total)}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												<Badge>{record.status}</Badge>
											</Table.Column>
											<Table.Column className="px-2 py-4">
												<StatusCercle
													status={record.is_online}
												/>
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{record.created_at}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												<Dropdown
													label=""
													dismissOnClick
													renderTrigger={() => (
														<button
															className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
															type="button"
														>
															<PiDotsThreeOutlineVerticalFill className="w-5 h-5" />
														</button>
													)}
												>
													<div className="w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
														<ul
															className="py-1 text-sm text-gray-700 dark:text-gray-200"
															aria-labelledby="apple-imac-27-dropdown-button"
														>
															<li>
																<button className="w-full text-start py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
																	Afficher
																</button>
															</li>
															<li>
																<Link
																	href={route(
																		"admin.products.edit",
																		{
																			id: record.id,
																		}
																	)}
																	className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
																>
																	Éditer
																</Link>
															</li>
														</ul>
														<div className="py-1">
															{record.deleted_at && (
																<button
																	onClick={() =>
																		restore(
																			record.id
																		)
																	}
																	className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
																>
																	Restorer
																</button>
															)}
															{!record.deleted_at && (
																<button
																	onClick={() =>
																		setArchiveModal(
																			{
																				status: true,
																				product:
																					record,
																			}
																		)
																	}
																	className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
																>
																	Archivé
																</button>
															)}

															<button
																onClick={() =>
																	setDeleteModal(
																		{
																			status: true,
																			product:
																				record,
																		}
																	)
																}
																className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
															>
																Supprimé
															</button>
														</div>
													</div>
												</Dropdown>
											</Table.Column>
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
					</div>

					<nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
						<Pagination
							currentPage={current_page}
							next={next_page_url}
							prev={prev_page_url}
							links={links}
							perPage={per_page}
							total={total}
							last_page={last_page}
						/>
					</nav>
				</div>
			</div>

			{/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
		</AdminLayout>
	);
};

export default Index;
