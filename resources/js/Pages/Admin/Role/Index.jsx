import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Dropdown } from "flowbite-react";

import AdminLayout from "@/Layouts/AdminLayout";

import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import Heading from "@/Components/Heading";
import { Search } from "@/Components/InputSearch";

import Badge from "@/Components/Badge";
import { FaSearch, FaSpinner, FaFilter } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Index = ({ roles }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(roles);

	const { delete: destroy, processing, reset } = useForm();
	const [deleteModal, setDeleteModal] = useState({ status: false });

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = roles.filter((record) =>
			record.name.toLowerCase().includes(query)
		);

		setFilteredData(filtered);
	};

	const deleteRole = () => {
		destroy(`/admin/role/destroy/${deleteModal?.role?.id}`, {
			onSuccess: () => setDeleteModal({status: false})
		});
	};

	useEffect(() => {
		setFilteredData(roles);
	}, [roles]);

	return (
		<AdminLayout>
			<Head title="Roles" />
			<Heading level={3} className="mb-5">
				Gestion de role
			</Heading>

			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
					<div className="p-4">
						<h4 className="text-xl">
							Total roles : <span>{roles.length}</span>
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
							<Link href="/admin/role/create">
								<Button btn="primary" type="button">
									Créer un Role
								</Button>
							</Link>
						</div>
					</div>

					<div className="overflow-x-auto">
						<Table>
							<Table.Head>
								<Table.Row>
									<Table.Title className="px-2 py-3">
										nom
									</Table.Title>
									<Table.Title className="px-2 py-3">
										description
									</Table.Title>
									<Table.Title className="px-2 py-3">
										type
									</Table.Title>
									<Table.Title className="px-2 py-3">
										créer à
									</Table.Title>
									<Table.Title className="px-2 py-3"></Table.Title>
								</Table.Row>
							</Table.Head>
							<Table.Body>
								{filteredData.map((record) => {
									return (
										<Table.Row
											key={record.id}
											className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
										>
											<Table.Column className="px-2 py-3">
												{record.name}
											</Table.Column>
											<Table.Column className="px-2 py-3">
												{record.description}
											</Table.Column>
											<Table.Column className="px-2 py-3">
												<Badge>
													{record.permission === "all" ? "Tous les permission" : "Permission personnalisé"}
												</Badge>
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
																<Link
																	href={`/admin/role/edit/${record.id}`}
																	className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
																>
																	Éditer
																</Link>
															</li>
														</ul>
														<div className="py-1">
															<button
																onClick={() =>
																	setDeleteModal(
																		{
																			status: true,
																			role: record,
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

					<nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"></nav>
				</div>
			</div>

			<Modal show={deleteModal.status} maxWidth="lg">
				<div className="py-6 px-4">
					<div className="mb-3 text-gray-400 dark:text-gray-200">
						{processing ? (
							<FaSpinner className="animate-spin w-12 h-12 mx-auto" />
						) : (
							<IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
						)}
					</div>
					{deleteModal.role && (
						<>
							<h3 className="text-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
								Vous étes sur de vouloir supprimé le role{" "}
								<span className="font-medium text-gray-700 dark:text-gray-200">
									{deleteModal.role.name}
								</span>
							</h3>
							<div className="flex items-center gap-4 justify-center">
								<Button
									onClick={deleteRole}
									btn="danger"
									disabled={processing}
								>
									Supprimé
								</Button>

								<Button
									onClick={() =>
										setDeleteModal({ status: false })
									}
								>
									Annuler
								</Button>
							</div>
						</>
					)}
				</div>
			</Modal>
		</AdminLayout>
	);
};

export default Index;
