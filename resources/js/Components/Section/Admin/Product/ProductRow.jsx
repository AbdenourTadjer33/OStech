import React, { useContext, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { currencyFormat, media, calculatePrice } from "@/Logic/helper";
import Table from "@/Components/Table";
import { BadgeStatus } from "@/Components/Badge";
import { BigCheckbox } from "@/Components/Checkbox";
import { StatusCercle } from "@/Components/Status";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown } from "flowbite-react";
import { ProductIndexContext } from "@/Pages/Admin/Product/Index";
import {
	MdKeyboardArrowDown as AD,
	MdKeyboardArrowUp as AT,
} from "react-icons/md";
import Heading from "@/Components/Heading";
import { IoOpenOutline } from "react-icons/io5";
import Button from "@/Components/Button";

const ProductRow = ({ record }) => {
	const {
		setArchiveModal,
		setDeleteModal,
		handleSelectedProducts,
		selectedProducts,
	} = useContext(ProductIndexContext);

	const [isDetails, setIsDetails] = useState(false);

	const {
		id,
		name,
		price,
		promo,
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
			<Table.Row className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
				<Table.Column
					className="px-2"
					onClick={() => handleSelectedProducts(id)}
				>
					<BigCheckbox
						onChange={() => handleSelectedProducts(id)}
						checked={selectedProducts.includes(id)}
					/>
				</Table.Column>
				<Table.Column className="px-2 py-3">
					<button
						type="button"
						onClick={() => setIsDetails(!isDetails)}
					>
						{isDetails ? (
							<AT className="w-6 h-6" />
						) : (
							<AD className="w-6 h-6" />
						)}
					</button>
				</Table.Column>
				<Table.Column className="px-2 py-3 w-12 flex">
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
			</Table.Row>
			{isDetails && (
				<Table.Row className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-auto">
					<ProductDetails product={record} />
				</Table.Row>
			)}
		</>
	);
};

const ProductDetails = ({ product }) => {
	const { id, slug, images, sku, qte, price, promo, description } = product;
	const { mainUrl } = usePage().props;
	return (
		<Table.Column colSpan="12" className="p-4 w-full">
				<div className="flex items-center gap-4 mb-4">
					{images?.map((img, idx) => (
						<div
							key={idx}
							className="h-20 sm:h-36 object-contain overflow-hidden rounded"
						>
							<img
								src={media(img)}
								className="h-full w-full object-cover object-center"
							/>
						</div>
					))}
				</div>

				<div className="grid sm:grid-cols-5 gap-4 mb-4">
					<div className="relative flex flex-col justify-between items-start p-3 rounded-lg border shadow bg-gray-200 dark:bg-gray-700 dark:border-gray-600">
						<Heading level={5}>Prix</Heading>
						<div className="relative">
							{promo ? (
								<>
									<div className="absolute w-full text-center translate-y-4">
										<span className="text-xs line-through">
											{currencyFormat(price)}
										</span>
									</div>
									<h4 className="text-lg font-medium">
										{currencyFormat(
											calculatePrice(price, promo)
										)}
									</h4>
								</>
							) : (
								<h4 className="text-lg font-medium">
									{currencyFormat(price)}
								</h4>
							)}
						</div>
						{promo && (
							<span className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
								- {promo} %
							</span>
						)}
					</div>

					<div className="flex flex-col justify-between items-start p-3 rounded-lg border shadow bg-gray-200 dark:bg-gray-700 dark:border-gray-600">
						<Heading level={5}>SKU</Heading>
						<span>{sku}</span>
					</div>

					<div className="flex flex-col justify-between items-start p-3 rounded-lg border shadow bg-gray-200 dark:bg-gray-700 dark:border-gray-600">
						<Heading level={5}>Quantité</Heading>
						<span>{qte} pc</span>
					</div>
				</div>

				<div className="flex justify-end gap-4">
					<a href={`${mainUrl}/products/${slug}`} target="_blank">
						<Button btn="info" className="items-center">
							<IoOpenOutline className="me-2 w-4 h-4" /> Voir
						</Button>
					</a>

					<Link href={`/product/edit/${id}`}>
						<Button btn="primary">Edit</Button>
					</Link>
				</div>
		</Table.Column>
	);
};

export const ProductTitleRow = () => {
	const { selectAllProducts } = useContext(ProductIndexContext);

	return (
		<Table.Row>
			<Table.Title className="px-2 py-3">
				<BigCheckbox onChange={selectAllProducts} />
			</Table.Title>
			<Table.Title className="px-2 py-3"></Table.Title>
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
};

export default ProductRow;
