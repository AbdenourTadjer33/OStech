import React, { useState, useEffect, Fragment } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import Button from "@/Components/Button";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Table from "@/Components/Table";
import { Dropdown } from "flowbite-react";
import Accordion from "@/Components/Accordion";
import { currencyFormat } from "@/Logic/helper";
import Modal from "@/Components/Modal";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

import { Search } from "@/Components/InputSearch";
import Badge from "@/Components/Badge";
import CreateForm from "@/Components/Section/Admin/Coupon/CreateForm";
import EditForm from "@/Components/Section/Admin/Coupon/EditForm";

const Index = ({ coupons }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(coupons);
	const [createModal, setCreateModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState({ status: false });

	const { delete: destroy, processing } = useForm();

	const deleteCoupon = (e, couponId) => {
		e.preventDefault();

		destroy(route("admin.coupon.destroy", { id: deleteModal.couponId }), {
			onSuccess: () => setDeleteModal({ status: false }),
		});
	};

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		const filtered = coupons.filter(
			(record) =>
				record.code.toLowerCase().includes(query) ||
				record.type.toLowerCase().includes(query)
		);

		setFilteredData(filtered);
	};

	useEffect(() => {
		setFilteredData(coupons);
	}, [coupons]);

	return (
		<AdminLayout>
			<Head title="Gestion De coupon et code promo" />
			<h1 className="text-4xl font-bold mb-3">Coupon et code promo</h1>

			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg overflow-visible">
					<div className="p-4">
						<h4 className="text-xl">
							Total coupon : <span>{coupons.length}</span>
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

							<Button
								btn="primary"
								type="button"
								onClick={() => setCreateModal(true)}
								className=" justify-center"
							>
								Créer un coupon
							</Button>
						</div>
					</div>

					<div className="overflow-x-auto">
						<Table className="table-auto">
							<Table.Head>
								<Table.Row>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										code
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										type
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										reduction
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										max réduction
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										date début
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										date expiration
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										max utilisation
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										N° d'utilisation
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										status
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap">
										Créer à
									</Table.Title>
									<Table.Title className="px-2 py-3 whitespace-nowrap"></Table.Title>
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
												{record.code}
											</Table.Column>
											<Table.Column className="px-2 py-3">
												<Badge>{record.type}</Badge>
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{record.type === "fix"
													? currencyFormat(
															record.value
													  )
													: record.value + " %"}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{currencyFormat(
													record.max_amount
												)}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{record.start_at}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{record.expire_at}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{record.max_use}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{record.used_times}
											</Table.Column>
											<Table.Column className="px-2 py-4">
												{record.status ? (
													<Badge type="green">
														active
													</Badge>
												) : (
													<Badge type="red">
														Inactive
													</Badge>
												)}
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
															<li
																onClick={(e) =>
																	setUpdateModal(
																		{
																			status: true,
																			coupon: record,
																		}
																	)
																}
																className="block cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
															>
																Éditer
															</li>
															<li
																onClick={() =>
																	setDeleteModal(
																		{
																			status: true,
																			couponId:
																				record.id,
																		}
																	)
																}
																className="block cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
															>
																Supprimé
															</li>
														</ul>
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

			<Modal
				show={createModal}
				maxWidth="6xl"
				className=" overflow-visible"
			>
				<div className="py-6 px-4 dark:bg-slate-800 rounded-lg">
					<h2 className="text-gray-800 dark:text-white text-3xl font-medium ">
						Créer un coupon
					</h2>
					<hr className="h-px my-4 dark:bg-gray-400 bg-gray-800 border-0" />
					<CreateForm setCreateModal={setCreateModal} />
				</div>
			</Modal>

			<Modal
				show={updateModal.status}
				maxWidth="6xl"
				className=" overflow-visible"
			>
				{updateModal.coupon && (
					<div className="py-6 px-4 dark:bg-slate-800 rounded-lg">
						<h2 className="text-gray-800 dark:text-white text-3xl font-medium ">
							Editer le coupon {updateModal.coupon.code}
						</h2>
						<hr className="h-px my-4 dark:bg-gray-400 bg-gray-800 border-0" />
						<EditForm
							updateModal={updateModal}
							setUpdateModal={setUpdateModal}
						/>
					</div>
				)}
			</Modal>

			<Modal show={deleteModal.status}>
				<div className="py-6 px-4">
					<div className="mb-3 text-gray-400 dark:text-gray-200">
						{processing ? (
							<FaSpinner className="animate-spin w-12 h-12 mx-auto" />
						) : (
							<IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
						)}
					</div>
					<>
						<h3 className="text-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
							Vous étes sur de vouloir supprimé le coupon
						</h3>
						<div className="flex items-center gap-4 justify-center">
							<Button
								disabled={processing}
								onClick={deleteCoupon}
								btn="danger"
							>
								Supprimé
							</Button>

							<Button
								btn="primary"
								disabled={processing}
								onClick={() =>
									setDeleteModal({ status: false })
								}
							>
								Annuler
							</Button>
						</div>
					</>
				</div>
			</Modal>
		</AdminLayout>
	);
};

export default Index;
