import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { currencyFormat, media } from "@/Logic/helper";
import Table from "@/Components/Table";
import { BadgeStatus } from "@/Components/Badge";
import Checkbox from "@/Components/Checkbox";
import { StatusCercle } from "@/Components/Status";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown } from "flowbite-react";

const ProductRow = ({
	record,
	setArchiveModal,
	setDeleteModal,
	handleSelectedProducts,
	selectedProducts,
}) => {
	const {
		id,
		name,
		price,
		images,
		status,
		catalog,
		mainCategory,
		subCategory,
		brand,
		total_sales: totalSales,
		created_at: createdAt,
		deleted_at: deletedAt,
		qte,
	} = record;

	const { post } = useForm();

	const statusProduct = () => {
		if (!status) {
			post(`/product/active/status/${id}`, {
				preserveScroll: true,
			});
			return;
		}
		post(`/product/disable/status/${id}`, {
			preserveScroll: true,
		});
	};

	const catalogProduct = () => {
		if (!catalog) {
			post(`/product/active/catalog/${id}`, {
				preserveScroll: true,
			});
			return;
		}
		post(`/product/disable/catalog/${id}`, {
			preserveScroll: true,
		});
	};

	const restore = () => {
		post(`/product/restore/${id}`, { preserveScroll: true });
	};

	return (
		<>
			<Table.Column className="px-2 py-3">
				<Checkbox
					onChange={() => handleSelectedProducts(id)}
					checked={selectedProducts.includes(id)}
				/>
			</Table.Column>
			<Table.Column className="px-2 py-3 w-12">
				<img
					className="w-full h-full"
					src={media(images?.[0] ?? "default.png")}
				/>
			</Table.Column>
			<Table.Column className="px-2 py-3 whitespace-nowrap">
				{name}
			</Table.Column>
			<Table.Column className="px-2 py-3 whitespace-nowrap">
				{currencyFormat(price)}
			</Table.Column>
			<Table.Column className="px-2 py-3 whitespace-nowrap">
				<BadgeStatus isActive={status} />
			</Table.Column>
			<Table.Column className="px-2 py-3 whitespace-nowrap">
				<BadgeStatus isActive={catalog} />
			</Table.Column>
			<Table.Column className="px-2 py-3 text-sm font-medium whitespace-nowrap">
				{mainCategory?.name}
				{" > "}
				{subCategory?.name}
			</Table.Column>
			<Table.Column className="px-2 py-3 whitespace-nowrap">
				{brand?.name}
			</Table.Column>
			<Table.Column className="px-2 py-3 whitespace-nowrap">
				{totalSales}
			</Table.Column>
			<Table.Column className="px-2 py-3 whitespace-nowrap">
				<StatusCercle status={deletedAt} />
			</Table.Column>
			<Table.Column className="px-2 py-3">
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
									href={`/product/edit/${id}`}
									className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Éditer
								</Link>
							</li>
							<li>
								<button
									className="w-full text-start py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									onClick={() => statusProduct()}
								>
									{status ? (
										<>Désactiver le status</>
									) : (
										<>Activé le status</>
									)}
								</button>
							</li>
							<li>
								<button
									className="w-full text-start py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									onClick={() => catalogProduct()}
								>
									{catalog ? (
										<>Désactiver dans catalogue</>
									) : (
										<>Activé dans catalogue</>
									)}
								</button>
							</li>
						</ul>
						<div className="py-1">
							{deletedAt && (
								<button
									onClick={() => restore()}
									className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Restorer
								</button>
							)}
							{!deletedAt && (
								<button
									onClick={() =>
										setArchiveModal({
											status: true,
											product: record,
										})
									}
									className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Archivé
								</button>
							)}
							<button
								onClick={() =>
									setDeleteModal({
										status: true,
										product: record,
									})
								}
								className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
							>
								Supprimé
							</button>
						</div>
					</div>
				</Dropdown>
			</Table.Column>
		</>
	);
};

export const ProductTitleRow = () => (
	<Table.Row>
		<Table.Title className="px-2 py-3">
			<Checkbox />
		</Table.Title>
		<Table.Title className="px-2 py-3"></Table.Title>
		<Table.Title className="px-2 py-3">PRODUIT</Table.Title>
		<Table.Title className="px-2 py-3">PRIX</Table.Title>
		<Table.Title className="px-2 py-3">STATUS</Table.Title>
		<Table.Title className="px-2 py-3">CATALOGUE</Table.Title>
		<Table.Title className="px-2 py-3">CATEGORIE</Table.Title>
		<Table.Title className="px-2 py-3">BRAND</Table.Title>
		<Table.Title className="px-2 py-3">VENTES TOTALES</Table.Title>
		<Table.Title className="px-2 py-3">ARCHIVE</Table.Title>
		<Table.Title className="px-2 py-3"></Table.Title>
	</Table.Row>
);



export default ProductRow;
