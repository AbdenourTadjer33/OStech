import React, { useState, useEffect, createContext } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import { FaFilter, FaSearch, FaSpinner } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import { Dropdown } from "flowbite-react";
import Accordion from "@/Components/Accordion";
import Modal from "@/Components/Modal";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Search } from "@/Components/InputSearch";
import Checkbox from "@/Components/Checkbox";
import RadioInput from "@/Components/RadioInput";
import TextInput from "@/Components/TextInput";
import ProductRow, {
	ProductTitleRow,
} from "@/Components/Section/Admin/Product/ProductRow";
import Heading from "@/Components/Heading";

export const ProductIndexContext = createContext();

const Index = ({ products, subCategories, brands }) => {
	const {
		data,
		current_page,
		next_page_url,
		prev_page_url,
		links,
		per_page,
		total,
		last_page,
	} = products;

	const { delete: destroy, processing } = useForm();

	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	const [archiveModal, setArchiveModal] = useState({ status: false });
	const [deleteModal, setDeleteModal] = useState({ status: false });

	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState();
	const [selectedCatalog, setSelectedCatalog] = useState();
	const [selectedArchive, setSelectedArchive] = useState();
	const [pagination, setPagination] = useState(per_page);

	const [selectedProducts, setSelectedProducts] = useState([]);

	const handleSelectedProducts = (productId) => {
		const index = selectedProducts.indexOf(productId);

		if (index === -1) {
			// If not selected, add it to the state
			setSelectedProducts([...selectedProducts, productId]);
		} else {
			// If already selected, remove it from the state
			const updatedSelectedProducts = [...selectedProducts];
			updatedSelectedProducts.splice(index, 1);
			setSelectedProducts(updatedSelectedProducts);
		}
	};

	const selectAllProducts = (e) => {
		if (e.target.checked) {
			const allIds = data.map((item) => item.id);
			setSelectedProducts(allIds);
		} else {
			setSelectedProducts([]);
		}
	};

	const handleSelectedCategories = (categoryId) => {
		// Check if the category is already selected
		const index = selectedCategories.indexOf(categoryId);

		if (index === -1) {
			// If not selected, add it to the state
			setSelectedCategories([...selectedCategories, categoryId]);
		} else {
			// If already selected, remove it from the state
			const updatedCategories = [...selectedCategories];
			updatedCategories.splice(index, 1);
			setSelectedCategories(updatedCategories);
		}
	};

	const handleSelectedBrands = (brandId) => {
		const index = selectedBrands.indexOf(brandId);

		if (index === -1) {
			// If not selected, add it to the state
			setSelectedBrands([...selectedBrands, brandId]);
		} else {
			// If already selected, remove it from the state
			const updatedBrands = [...selectedBrands];
			updatedBrands.splice(index, 1);
			setSelectedBrands(updatedBrands);
		}
	};

	const filter = () => {
		router.visit("/product", {
			method: "get",
			preserveScroll: true,
			preserveState: true,
			data: {
				category: selectedCategories.toString(),
				brand: selectedBrands.toString(),
				archive: selectedArchive,
				status: selectedStatus,
				catalog: selectedCatalog,
				pagination: pagination,
			},
		});
	};

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = data.filter(
			(record) =>
				record.name.toLowerCase().includes(query) ||
				record?.sku?.toLowerCase().includes(query) ||
				record.category?.name.toLowerCase().includes(query)
		);

		setFilteredData(filtered);
	};

	const deleteMass = () => {
		router.delete("/product/mass-destroy", {
			preserveScroll: true,
			data: {
				ids: selectedProducts,
			},
		});
	};

	const archive = () => {
		destroy(
			route("admin.product.destroy", { id: archiveModal.product.id }),
			{
				onSuccess: () => setArchiveModal({ status: false }),
				preserveScroll: true,
			}
		);
	};

	const forceDelete = () => {
		destroy(`product/force-destroy/${deleteModal.product.id}`, {
			onSuccess: () => setDeleteModal({ status: false }),
			preserveScroll: true,
		});
	};

	useEffect(() => {
		setFilteredData(data);
	}, [data]);

	return (
		<AdminLayout>
			<Head title="Gestion De Produit" />
			<Heading level={3} className="mb-5">
				Gestion de produit
			</Heading>

			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
					<div className="p-4">
						<h4 className="text-xl">
							Total produits : <span>{total}</span>
						</h4>
					</div>

					<hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700 mx-4" />

					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<div className="w-full md:w-1/2">
							<div className="flex items-center">
								<div className="relative w-full">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
									</div>
									<Search
										value={searchQuery}
										onChange={handleSearch}
									/>
								</div>
							</div>
						</div>

						<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
							<Dropdown
								renderTrigger={() => (
									<button
										className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
										type="button"
									>
										<FaFilter className="h-4 w-4 mr-2 text-gray-400" />
										Action
										<MdKeyboardArrowDown className="-mr-1 ml-1.5 w-5 h-5" />
									</button>
								)}
							>
								<div className="w-40">
									<Dropdown.Item>Tous Archivé</Dropdown.Item>
									<Dropdown.Item>
										Tous désactiver
									</Dropdown.Item>
									<Dropdown.Item onClick={deleteMass}>
										Tous supprimé
									</Dropdown.Item>
								</div>
							</Dropdown>
							<div className="flex items-center space-x-3 w-full md:w-auto">
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
												{subCategories.map(
													(category) => (
														<Dropdown.Item
															key={category.id}
															as="label"
															htmlFor={`category-${category.id}`}
														>
															<Checkbox
																id={`category-${category.id}`}
																value={
																	category.id
																}
																onChange={() =>
																	handleSelectedCategories(
																		category.id
																	)
																}
																checked={selectedCategories.includes(
																	category.id
																)}
															/>
															<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
																{category.name}
															</span>
														</Dropdown.Item>
													)
												)}
											</Accordion.Body>
										</Accordion>

										<Dropdown.Divider />

										<Accordion title="Brand">
											<Accordion.Body>
												{brands.map((brand) => (
													<Dropdown.Item
														key={brand.id}
														as="label"
														htmlFor={`brand-${brand.id}`}
													>
														<Checkbox
															id={`brand-${brand.id}`}
															value={brand.id}
															onChange={() =>
																handleSelectedBrands(
																	brand.id
																)
															}
															checked={selectedBrands.includes(
																brand.id
															)}
														/>
														<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
															{brand.name}
														</span>
													</Dropdown.Item>
												))}
											</Accordion.Body>
										</Accordion>

										<Dropdown.Divider />

										<Accordion title="Archive">
											<Accordion.Body>
												<Dropdown.Item
													as="label"
													htmlFor="archive-all"
												>
													<RadioInput
														id="archive-all"
														name="archive"
														value="all"
														checked={
															selectedArchive ==
															"all"
														}
														onChange={(e) =>
															setSelectedArchive(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Tous les produits
													</span>
												</Dropdown.Item>
												<Dropdown.Item
													as="label"
													htmlFor="archive-1"
												>
													<RadioInput
														id="archive-1"
														name="archive"
														value="1"
														checked={
															selectedArchive ==
															"1"
														}
														onChange={(e) =>
															setSelectedArchive(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Produit archivé
													</span>
												</Dropdown.Item>
												<Dropdown.Item
													as="label"
													htmlFor="archive-0"
												>
													<RadioInput
														id="archive-0"
														name="archive"
														value="0"
														checked={
															selectedArchive ==
															"0"
														}
														onChange={(e) =>
															setSelectedArchive(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Produit non-archivé
													</span>
												</Dropdown.Item>
											</Accordion.Body>
										</Accordion>

										<Dropdown.Divider />

										<Accordion title="Status">
											<Accordion.Body>
												<Dropdown.Item
													as="label"
													htmlFor="status-all"
												>
													<RadioInput
														id="status-all"
														name="status"
														value="all"
														checked={
															selectedStatus ==
															"all"
														}
														onChange={(e) =>
															setSelectedStatus(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Tous
													</span>
												</Dropdown.Item>

												<Dropdown.Item
													as="label"
													htmlFor="status-1"
												>
													<RadioInput
														id="status-1"
														name="status"
														value="1"
														checked={
															selectedStatus ==
															"1"
														}
														onChange={(e) =>
															setSelectedStatus(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Active
													</span>
												</Dropdown.Item>

												<Dropdown.Item
													as="label"
													htmlFor="status-0"
												>
													<RadioInput
														id="status-0"
														name="status"
														value="0"
														checked={
															selectedStatus ==
															"0"
														}
														onChange={(e) =>
															setSelectedStatus(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Non active
													</span>
												</Dropdown.Item>
											</Accordion.Body>
										</Accordion>

										<Dropdown.Divider />

										<Accordion title="Catalogue">
											<Accordion.Body>
												<Dropdown.Item
													as="label"
													htmlFor="catalog-all"
												>
													<RadioInput
														id="catalog-all"
														name="catalog"
														value="all"
														checked={
															selectedCatalog ==
															"all"
														}
														onChange={(e) =>
															setSelectedCatalog(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Tous
													</span>
												</Dropdown.Item>

												<Dropdown.Item
													as="label"
													htmlFor="catalog-1"
												>
													<RadioInput
														id="catalog-1"
														name="catalog"
														value="1"
														checked={
															selectedCatalog ==
															"1"
														}
														onChange={(e) =>
															setSelectedCatalog(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Active
													</span>
												</Dropdown.Item>
												<Dropdown.Item
													as="label"
													htmlFor="catalog-0"
												>
													<RadioInput
														id="catalog-0"
														name="catalog"
														value="0"
														checked={
															selectedCatalog ==
															"0"
														}
														onChange={(e) =>
															setSelectedCatalog(
																e.target.value
															)
														}
													/>
													<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
														Non active
													</span>
												</Dropdown.Item>
											</Accordion.Body>
										</Accordion>

										<Dropdown.Divider />

										<Accordion title="Pagination">
											<Accordion.Body>
												<Dropdown.Item className="flex items-center gap-4">
													<TextInput
														type="range"
														min="10"
														step="1"
														max="50"
														value={pagination}
														onChange={(e) =>
															setPagination(
																e.target.value
															)
														}
													/>

													<span>{pagination}</span>
												</Dropdown.Item>
											</Accordion.Body>
										</Accordion>

										<div className="flex justify-center py-2">
											<Button
												type="button"
												onClick={filter}
											>
												Filtré les résultat
											</Button>
										</div>
									</div>
								</Dropdown>
							</div>

							<Link href={"/product/create"}>
								<Button btn="primary" type="button">
									Créer un produit
								</Button>
							</Link>
						</div>
					</div>

					<div className="overflow-x-auto">
						<ProductIndexContext.Provider
							value={{
								selectAllProducts,
								setArchiveModal,
								setDeleteModal,
								handleSelectedProducts,
								selectedProducts,
							}}
						>
							<Table>
								<Table.Head>
									<ProductTitleRow />
								</Table.Head>
								<Table.Body>
									{filteredData.map((record) => {
										return (
											<ProductRow
												key={record.id}
												record={record}
											/>
										);
									})}
								</Table.Body>
							</Table>
						</ProductIndexContext.Provider>
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

			<Modal show={archiveModal.status} maxWidth="lg">
				<div className="py-6 px-4">
					<div className="mb-3 text-gray-400 dark:text-gray-200">
						{processing ? (
							<FaSpinner className="animate-spin w-12 h-12 mx-auto" />
						) : (
							<IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
						)}
					</div>
					{archiveModal.product && (
						<>
							<h3 className="text-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
								Vous étes sur de vouloir archivé ce produit{" "}
								<span className="font-medium text-gray-700 dark:text-gray-200">
									{archiveModal.product.name}
								</span>
							</h3>
							<div className="flex items-center gap-4 justify-center">
								<Button
									disabled={processing}
									onClick={archive}
									btn="danger"
								>
									Archivé
								</Button>

								<Button
									btn="primary"
									disabled={processing}
									onClick={() =>
										setArchiveModal({ status: false })
									}
								>
									Annuler
								</Button>
							</div>
						</>
					)}
				</div>
			</Modal>

			<Modal show={deleteModal.status} maxWidth="lg">
				<div className="py-6 px-4">
					<div className="mb-3 text-gray-400 dark:text-gray-200">
						{processing ? (
							<FaSpinner className="animate-spin w-12 h-12 mx-auto" />
						) : (
							<IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
						)}
					</div>
					{deleteModal.product && (
						<>
							<h3 className="text-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
								Vous étes sur de vouloir supprimé le produit{" "}
								<span className="font-medium text-gray-700 dark:text-gray-200">
									{deleteModal.product.name}
								</span>
							</h3>
							<div className="flex items-center gap-4 justify-center">
								<Button
									disabled={processing}
									onClick={forceDelete}
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
					)}
				</div>
			</Modal>
		</AdminLayout>
	);
};

export default Index;
